const { Op } = require("sequelize");
const { OAuth2Client } = require('google-auth-library')
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const request = require('request');
const nodemailer = require('nodemailer')
const fs = require('fs')
const handlebars = require('handlebars')
const Encrypter = require('./encrypt')
const db = require('../models/db');
const gClient = new OAuth2Client(process.env.CLIENT_ID)
const encrypter = new Encrypter(process.env.SECRET)
const readFile = promisify(fs.readFile);
const Client = db.client;
const OTP = db.otp;

exports.auth = async (req, res) => {
    const token = req.headers['authorization'];
    const gAuth = req.headers['g-auth'] === 'true' ? true : false
    const secret = process.env.SECRET;
    if (gAuth) {
        const ticket = await gClient.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        }).catch(err => { return res.status(401).send({ auth: false, message: 'Invalid token.' }); })
        const profile = ticket.getPayload()
        return res.status(200).send({ auth: true, decoded: { data: profile.profileObj, accessToken: profile.access_token } });
    }
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send({ auth: false, message: 'Invalid token.' });
        return res.status(200).send({ auth: true, decoded });
    })
}

exports.gAuth = async (req, res) => {
    const { accessToken } = req.query
    const ticket = await gClient.verifyIdToken({
        idToken: accessToken,
        audience: process.env.CLIENT_ID
    }).catch(err => { return res.status(401).send({ auth: false, message: 'Invalid token.' }); })
    const { given_name, family_name, email, picture } = ticket.getPayload();
    await Client.findOrCreate({ where: { id: email }, defaults: { id: email, fname: given_name, lname: family_name, link_gmail: true } })
        .then(userV => {
            let [user, wasCreated] = userV
            if (wasCreated) {
                request.get(picture, { encoding: 'base64' }, (err, res, body) => {
                    if (err) console.err(err)
                    let imgData = 'data:' + res.headers['content-type'] + ';base64,' + body
                    user.update({ img_thumb: imgData })
                })
                // user.update({img_thumb: picture.toString()})
            }
            if (!wasCreated) user.update({ link_gmail: true })
            let imgData = user.img_thumb
            return res.status(200).send({ id: email, fname: given_name, lname: family_name, img_thumb: imgData, accessToken: accessToken })
        })
}

exports.valid = async (req, res) => {
    let email_id = req.body.id, fname = req.body.fname, lname = req.body.lname, pwd = req.body.pwd
    let expiryTime = 7 * 60 // in seconds
    let req_time = new Date().getTime()
    let html = await readFile('./static/email.html', 'utf8')
    await OTP.destroy({ where: { expiry: { [Op.lte]: req_time } } })
    await Client.count({ where: { id: email_id } })
        .then(v => {
            if (v) res.send({ code: 402, message: "User already exists" })
            else {                
                let eat = new Date().getTime() + expiryTime * 1000, otp = parseInt(Math.random() * 900000 + 100000);
                let token = jwt.sign({
                    id: email_id,
                    fname: fname,
                    lname: lname,
                    pwd: bcrypt.hashSync(pwd, 8),
                    otp: String(otp)
                }, process.env.SECRET, { expiresIn: expiryTime })
                token = encrypter.encrypt(token)
                OTP.create({
                    email_id: email_id,
                    otp: otp,
                    expiry: eat
                })
                    .then(_ => {
                        nodemailer.createTestAccount((err, account) => {
                            let transporter = nodemailer.createTransport({
                                host: account.smtp.host,
                                port: account.smtp.port,
                                secure: account.smtp.secure,
                                auth: {
                                    user: account.user,
                                    pass: account.pass
                                }
                            });
                            let template = handlebars.compile(html)
                            let html2send = template({ otp: otp, otpURL: "localhost:8081/api/user/otp/" + token.toString() })
                            let message = {
                                from: 'no-reply@popresume.com',
                                to: email_id,
                                subject: 'OTP for Pop Resume',
                                text: 'OTP: ' + otp,
                                html: html2send
                            };
                            transporter.sendMail(message, (err, info) => {
                                if (err) {
                                    console.log('Error occurred. ' + err.message);
                                    return process.exit(1);
                                }
                                console.log('Message sent: %s', info.messageId);
                                // Preview only available when sending through an Ethereal account
                                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            });
                        });
                    })
                    .then(_ => res.send({ code: 200, message: "Valid Id", timestamp: eat }))
            }
        })
        .catch(err => console.log(err))
}

exports.signup = async (req, res) => {
    let user = {
        id: req.body.id,
        pwd: req.body.pwd,
        fname: req.body.fname,
        lname: req.body.lname,
        otp: req.body.otp
    }

    await OTP.findOne({
        where: { email_id: user.id },
        order: [['expiry', 'DESC']]
    })
        .then(row => {
            if (row.otp !== String(user.otp) || row.email_id !== user.id) {
                return res.status(403).send({ message: "Invalid OTP", otp: row.otp, userotp: user.otp })
            }
            let secret = process.env.SECRET
            let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 })
            Client.create({
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                pwd: bcrypt.hashSync(user.pwd, 8)
            })
                .then(user => res.status(200).send({
                    emailId: user.id,
                    fName: user.fname,
                    lName: user.lname,
                    email: user.email,
                    linkGmail: user.link_gmail,
                    imgThumb: user.img_thumb,
                    accessToken: token
                }))
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}

exports.login = async (req, res) => {
    let secret = process.env.SECRET;
    let { id, pwd, rememberMe } = req.body;
    await Client.findOne({ where: { id: id } })
        .then(user => {
            if (!user) {
                return res.status(401).send({
                    accessToken: null,
                    code: -1,
                    message: "Invalid Email ID!"
                });
            }
            let pwdIsValid = bcrypt.compareSync(pwd, user.pwd);
            if (!pwdIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    code: -2,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: user.id }, secret, { expiresIn: rememberMe ? 604800 : 86400 })
            res.status(200).send({
                emailId: user.id,
                fName: user.fname,
                lName: user.lname,
                email: user.email,
                linkGmail: user.link_gmail,
                imgThumb: user.img_thumb,
                accessToken: token
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ message: err.message });
        });
}

exports.otp = async (req, res) => {
    let token = encrypter.decrypt(req.params.token)
    let user = jwt.decode(token)
    let io = req.app.get('socketio')
    res.send("Close this tab")
    await OTP.findOne({
        where: { email_id: user.id },
        order: [['expiry', 'DESC']]
    })
        .then(row => {
            if (row.otp !== user.otp || row.email_id !== user.id || user.expiry < new Date().getTime()) {
                io.sockets.emit("onVerification", { id: user.id, verification: false })
            }
            Client.findOrCreate({
                where: {
                    id: user.id,
                }, defaults: {
                    id: user.id,
                    fname: user.fname,
                    lname: user.lname,
                    pwd: user.pwd,
                    link_gmail: false
                }
            })
            io.sockets.emit("onVerification", { id: user.id, verification: true })
        })
        .catch(err => console.log(err.message))
}