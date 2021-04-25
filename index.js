const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const util = require('./controller/auth')
const app = express()
const port = 8081
require('dotenv').config()

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(cookieParser());
app.use(cors())
const db = require('./models/db')
db.sequelize.sync({ force: true }).then(() => {
	console.log("Drop and re-sync db.");
});

app.get('/api', (req, res) => {
	res.json({ message: 'Welcome to PopResume! You should not be here' })
});

app.post('/api/verify',util.valid);

app.post('/api/login',util.login);

app.post('/api/register',util.signup);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}/api`)
})