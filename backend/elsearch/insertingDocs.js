const Conspect = require("../models/Conspect")
const cnf = require("../config.json")
const { verifyIndexExists, createIndex, insertDocument, deleteIndex } = require('../utils/search.js')
const client = require('./index.js')

Conspect.findAll().then(conspects => {
    conspects.forEach(conspect => {
        insertDocument(conspect.dataValues, cnf.elsearch.conspectIndex, cnf.elsearch.conspectType, client)
            .catch(error => console.error(error))
    })
})
