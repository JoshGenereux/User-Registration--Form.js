require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const ctrl = require('./controller')
const {SERVER_PORT: SP} = process.env

app.post('/password-manager', ctrl.login);
app.post('/password-manager/sign-in', ctrl.signIn);

app.listen(SP, ()=> console.log(`Running on port ${SP}`))