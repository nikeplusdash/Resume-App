const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = db.client;

exports.signup = (req, res) => {
    client.create({
        id: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        pwd: bcrypt.hashSync(req.body.pwd, 8)
    })
        .then(user => res.status(200).send({ message: "Registered the user" }))
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.login = (req, res) => {
    let secret = process.env.secret;
    let { email, pwd, rememberMe } = req.body;
    client.findOne({ where: { id: email } })
        .then(user => {
            let pwdIsValid = bcrypt.compareSync(req.body.pwd, user.pwd);

            if (!pwdIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            let token = jwt.sign({ id: client.id }, secret, { expiresIn: rememberMe ? 86400 : 3600 })
            res.status(200).send({
                emailId: client.id,
                fName: client.fname,
                lName: client.lname,
                email: client.email,
                linkGmail: client.link_gmail,
                imgThumb: client.img_thumb,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

}

// const verify = (req, res, next) => {
//     let token = req.headers["x-access-token"];
//     let secret = process.env.secret;
//     if (!token) {
//         return res.status(403).send({
//             message: "No token provided!"
//         });
//     }

//     jwt.verify(token, secret, (err, decoded) => {
//         if (err) {
//             return res.status(401).send({
//                 message: "Unauthorized!"
//             });
//         }
//         req.userId = decoded.id;
//         next();
//     });
// };