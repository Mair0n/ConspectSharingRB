const Sequelize = require("sequelize")
const cnf = require("../config.json")

function createDb(sequelize) {
    return new Promise((resolve,reject) => {
        const query = "CREATE DATABASE IF NOT EXISTS "+cnf.database.dbname+";"
        sequelize.query(query).then(result => {
            if (result) resolve(result)
            else reject("error")
        })
    })
}

function createUsersTable(sequelize) {
    return new Promise((resolve,reject) => {
        const query ="CREATE TABLE IF NOT EXISTS "+cnf.database.usersTableName+"(id int primary key AUTO_INCREMENT, first_name text, last_name text, email text, password text, created text, confirmed tinyint(4), isAdmin tinyint(4));";
        sequelize.query(query).then(result => {
            if (result) resolve(result)
            else reject("error")
        })
    })
}

function createConspectsTable(sequelize) {
    return new Promise((resolve,reject) => {
        const query ="CREATE TABLE IF NOT EXISTS "+cnf.database.conspectsTableName+"(id int primary key AUTO_INCREMENT, title text, description text, depNumber text, body text, created text, rate int default 0, userId int);";
        sequelize.query(query).then(result => {
            if  (result) resolve(result)
            else reject("error")
        })
    })
}

module.exports = {
    createDb,
    createUsersTable,
    createConspectsTable
}