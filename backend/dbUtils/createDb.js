const Sequelize = require("sequelize")
const cnf = require("../config.json")
const { createDb, createUsersTable, createConspectsTable } = require("./dbUtils.js")

var sequelize = new Sequelize("", cnf.database.username, cnf.database.password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
})

createDb(sequelize).then(dbresult => {
    if (dbresult) {

        sequelize = new Sequelize(cnf.database.dbname, cnf.database.username, cnf.database.password, {
            host: 'localhost',
            dialect: 'mysql',
            operatorsAliases: false,
          })

        createUsersTable(sequelize).then(usersResult => {
            if (usersResult) console.log(usersResult) 
            else console.log("error with creating users table")
        })
        createConspectsTable(sequelize).then(conspectsResult => {
            if (conspectsResult) console.log(conspectsResult)
            else console.log("error with creating conspects table")
        })
    } else console.log("error with creating database")
})