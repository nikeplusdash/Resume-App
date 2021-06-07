var express = require('express');
var router = express.Router();
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const gClient = new OAuth2Client(process.env.CLIENT_ID)
const CVResume = db.cvresume;

router.use('/', async (req, res, next) => {
    const token = req.headers['authorization'];
    const gAuth = req.headers['g-auth'] === 'true' ? true : false
    const secret = process.env.SECRET;
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
    if (gAuth) {
        const ticket = await gClient.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        }).catch(err => { return res.status(401).send({ auth: false, message: 'Invalid token.' }); })
        const profile = ticket.getPayload()
        res.locals.auth = profile.email
    }
    else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return res.status(401).send({ auth: false, message: 'Invalid token.' });
            res.locals.auth = decoded.id
        })
    }
    next()
})

router.post('/fetch', async (req, res) => {
    let id = res.locals.auth
    let template = {
        image: { display: false },
        name: "",
        current: "",
        theme: 2,
        description: "",
        highlight: [],
        education: [],
        experience: [],
        organization: [],
        languages: [],
        skills: [],
        interests: []
    }
    await CVResume.findOrCreate({
        where: { email_id: id },
        defaults: {
            cvname: id,
            email_id: id,
            content: template,
        }
    }).then(fields => {
        let [row, wasCreated] = fields
        return res.status(200).send(row.content)
    }).catch(err => res.status(401).send({ message: "error" }))
})

router.post('/save', async (req, res) => {
    let id = res.locals.auth
    await CVResume.update(
        { content: req.body.content },
        { where: { email_id: id } }
    )
    .then(row => {
        return res.status(200).send({message: "Updated"})
    })
    .catch(err => res.status(401).send({ message: "error" }))
        
})

module.exports = router