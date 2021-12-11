require('dotenv')
const {CONNECTION_STRING: CS} = process.env;
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = new Sequelize(CS, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    signIn: (req, res) => {
        const {firstName, lastName, userName, email, password} = req.body;

        let salt = bcrypt.genSaltSync(5)
        let passHash = bcrypt.hashSync(password, salt)
        // let confirmPassHash = bcrypt.hashSync(confirmPassword, salt)

        let userObj = {
            firstName,
            lastName,
            userName,
            email,
            passHash,
            // confirmPassHash
        }

        sequelize.query(`SELECT * FROM users WHERE email = '${email}'`)
            .then((dbRes)=>{
                if(dbRes[0] === email){
                    res.status(400)
                    console.log("user already exists")
                } else {
                    sequelize.query(`INSERT INTO users (first_name, last_name, user_name, email, password)
                              VALUES ('${firstName}', '${lastName}', '${userName}', '${email}', '${passHash}')`)
                        .then(dbRes => {
                             res.status(200).send(dbRes[0])
                         })
                         .catch(err => console.log(err))
                }
            })
            .catch(err=> console.log(err))


        console.log(userObj)
    }
}