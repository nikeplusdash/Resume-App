const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const gClient = new OAuth2Client(process.env.CLIENT_ID)
const Client = db.client;

// crete a restore end point

exports.auth = async  (req, res) => {
    const token = req.headers['authorization'];
    const gAuth = req.body.accessToken
    const secret = process.env.SECRET;
    if (gAuth) {
        const ticket = await gClient.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        let profile = ticket.payload()
        res.status(200).send({ auth: true, decoded: {data: profile.profileObj, accessToken: profile.access_token}});
    }
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send({ auth: false, message: 'Invalid token.' });
        res.status(200).send({ auth: true, decoded });
    })
}

exports.gAuth = async (req, res) => {
    const { accessToken } = req.query
    const ticket = await gClient.verifyIdToken({
        idToken: accessToken,
        audience: process.env.CLIENT_ID
    })
    const { given_name, family_name, email, picture } = ticket.getPayload();
    await Client.findOrCreate({ where: { id: email }, defaults: { id: email, fname: given_name, lname: family_name, imgThumb: picture, link_gmail: true } })
        .then(userV => {
            let [user, wasCreated] = userV
            if (!wasCreated) user.update({link_gmail: true})
            res.status(200).send({ id: email, fname: given_name, lname: family_name, imgThumb: picture, accessToken: accessToken})

        })
}

exports.valid = async (req, res) => {
    await Client.count({ where: { id: req.body.id } })
        .then(v => {
            if (v) res.send({ code: 402, message: "User already exists" })
            else {
                // send OTP to emailID
                res.send({ code: 200, message: "Valid Id", timestamp: (new Date().getTime() + 420 * 1000) })
            }
        })
        .catch(err => res.status(500).send(err))
}

exports.signup = async (req, res) => {
    let user = {
        id: req.body.id,
        pwd: req.body.pwd,
        fname: req.body.fname,
        lname: req.body.lname,
        otp: req.body.otp
    }

    //verify OTP

    let secret = process.env.SECRET
    let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 })
    await Client.create({
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