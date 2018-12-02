const elasticsearch = require('elasticsearch')
const cnf = require("../config.json")
const client = elasticsearch.Client({
    host: cnf.elsearch.host,
    //log: 'trace'
  })

module.exports = client