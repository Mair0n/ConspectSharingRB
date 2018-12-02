const Sequelize = require("sequelize")
const db = require("../database/db")


const Conspects = db.sequelize.define(
    'conspects',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        depNumber: {
            type: Sequelize.STRING
        },
        body: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        rate: {
            type: Sequelize.INTEGER,
            defaultValue:0
        },
        userId: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)

module.exports = Conspects