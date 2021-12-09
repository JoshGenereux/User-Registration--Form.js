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
        const {firstName, lastName, userName, email, password, confirmPassword} = req.body;

        let salt = bcrypt.genSaltSync(5)
        let passHash = bcrypt.hashSync(password, salt)
        let confirmPassHash = bcrypt.hashSync(confirmPassword, salt)

        let userObj = {
            firstName,
            lastName,
            userName,
            email,
            passHash,
            confirmPassHash
        }

        let userDb;

        sequelize.query('SELECT * FROM users')
            .then((dbRes)=>{
                userDb = dbRes[0];
                console.log(userDb)
                queryHandler(userDb)
            })

        function queryHandler (array) {
            for(let i = 0; i < array[0].length; i++) {
                if (!array.includes(email, userName)) {
                    sequelize.query(`INSERT INTO users (first_name, last_name, user_name, email, password)
                              VALUES ('${firstName}', '${lastName}', '${userName}', '${email}', '${passHash}')`)
                        .then(dbRes => {
                            res.status(200).send(array)
                        })
                    .catch(err => console.log(err))
                }
            }
            // if (!array.includes(email, userName)) {
            //     sequelize.query(`INSERT INTO users (first_name, last_name, user_name, email, password)
            //                   VALUES ('${firstName}', '${lastName}', '${userName}', '${email}', '${passHash}')`)
            //         .then(dbRes => {
            //             res.status(200).send(dbRes[0])
            //         })
            //     .catch(err => console.log(err))
            // }
        }
        console.log(userObj)
    }
}