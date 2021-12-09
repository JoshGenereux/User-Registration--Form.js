const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const ctrl = require('./controller')

app.post('/password-manager', ctrl.login);
app.post('/password-manager/sign-in', ctrl.signIn);

app.listen(4000, ()=> console.log("Running on port 4000"))