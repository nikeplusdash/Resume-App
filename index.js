const express = require('express')
const http = require("http");
const socketio = require("socket.io");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user')
const dataRoute = require('./routes/data')
const app = express()
const port = 8081
require('dotenv').config()

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(cookieParser());
app.use(cors())
const db = require('./models/db')
db.sequelize.sync({ alter: true }).then(() => {
	console.log("Drop and re-sync db.");
});

app.get('/api', (req, res) => { res.json({ message: 'Welcome to PopResume! You should not be here' }) })
app.use('/api/user', userRoute)
app.use('/api/data', dataRoute)

server = app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}/api`)
})
app.set("socketio", socketio(server, {cors: {origin: '*',}}))