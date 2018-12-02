const Sequelize = require("sequelize")
const cnf = require("../config.json")

const db = {}
var sequelize = new Sequelize(cnf.database.dbname, cnf.database.username, cnf.database.password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.sequelize
.authenticate()
.then(() => {
  console.log("Connected to database successfully")
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = db;
