require('dotenv')
const {CONNECTION_STRING: CS} = process.env;
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CS, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
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

        sequelize.query(`INSERT INTO users (first_name, last_name, user_name, email, password)
                              VALUES ('${firstName}', '${lastName}', '${userName}', '${email}', '${passHash}')`)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
            })
            .catch(err => console.log(err))

        userArray.push(userObj)
        console.log(userObj)
    }
}