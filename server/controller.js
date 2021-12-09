const userArray = require('./db.json')
const bcrypt = require('bcrypt')
let globalId = 2;

module.exports = {
    login: (req, res) => {
        const {userName, passWord} = req.body

        for(let i = 0; i < userArray.length; i++){
            if(userArray.includes(userName)){
                res.status(200).send(userArray[i])
                console.log(userArray)
            }
        }
    },
    signIn: (req, res) => {
        const {firstName, lastName, userName, email, password, confirmPassword} = req.body;

        // for(let i = 0; i < userArray.length; i++){
        //     const exists = bcrypt.compareSync(password, userArray[i].passHash)
        //
        // }

        let salt = bcrypt.genSaltSync(5)
        let passHash = bcrypt.hashSync(password, salt)
        let confirmPassHash = bcrypt.hashSync(confirmPassword, salt)

        let userObj = {
            id: globalId,
            firstName,
            lastName,
            userName,
            email,
            passHash,
            confirmPassHash
        }
        globalId++;

        userArray.push(userObj)
        console.log(userObj)
        console.log(userArray)
        res.status(200).send(userObj)
    }
}