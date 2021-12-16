require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const ctrl = require('./controller')
const {SERVER_PORT: SP} = process.env
app.use(express.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.sendfile(path.join(__dirname, '/front/welcome-page.html'))
})

// app.post('/password-manager/sign-in', ctrl.signIn);

const port = process.env.PORT || SP

app.listen(port, ()=> console.log(`Running on port ${port}`))
