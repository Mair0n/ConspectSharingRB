const Conspect = require("../models/Conspect")

function verifyIndexExists(indexName, esClient) {
    return new Promise((resolve, reject) => {
      esClient.indices.exists({
        index: indexName
      }, (error, response) => {
        if (error) {
          reject(error)
        }
  
        resolve(response)
      })
    })
  }
  
  function createIndex(indexName, esClient) {
    return new Promise((resolve, reject) => {
      esClient.indices.create({
        index: indexName
      }, (error, response) => {
        if (error) {
          reject(error)
        }
        resolve(response)
      })
    })
  }
  
  function insertDocument(doc, indexName, docType, esClient) {
    return new Promise((resolve, reject) => {
      esClient.index({
        index: indexName,
        type: docType,
        id: doc.id,
        body: doc
      }, (error, response) => {
        if(error) {
          reject(error)
        }
  
        resolve(response)
      });
    })
  }

  function deleteIndex(indexName, esClient) {
    return new Promise((resolve, reject) => {
      esClient.indices.delete({
        index: indexName
      }, (error, response) => {
        if(error) {
          reject(error)
        }
  
        resolve(response)
      })
    })
  }

  function deleteDocument(conspectId, indexName, docType, esClient) {
    return new Promise((resolve, reject) => {
      esClient.delete({
        index: indexName,
        type: docType,
        id:conspectId
    }).catch(error => reject(error))
      Conspect.destroy({
          where: {
              id: conspectId
          }
      }).then(result => {
          resolve(result)
      }).catch(error => reject(error))
    })
  }
  
  module.exports = {
    verifyIndexExists,
    createIndex,
    insertDocument,
    deleteIndex,
    deleteDocument
  }