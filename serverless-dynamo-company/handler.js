'use strict';

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

function createResponse(statusCode, message){
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

module.exports.saveItem = (event, context, callback) => {

  const item = JSON.parse(event.body);
  console.log(item);
  item.Id = uuidv1();

  databaseManager.saveItem(item).then(response =>{
    console.log(response);
    callback(null, createResponse(200, response));
  });
};


module.exports.getItem = (event, context, callback) => {

  const itemId = event.pathParameters.Id;

  databaseManager.getItem(itemId).then(response =>{
    console.log(response);
    callback(null, createResponse(200, response));
  });
  
};

module.exports.deleteItem = (event, context, callback) => {

  const itemId = event.pathParameters.Id;

  databaseManager.deleteItem(itemId).then(response =>{
    //console.log(response);
    callback(null, createResponse(200, 'Company was deleted'));
  });
};

module.exports.updateItem = (event, context, callback) => {

  const itemId = event.pathParameters.Id;
  const body = JSON.parse(event.body);
  const paramName = body.paramName;
  const paramValue = body.paramValue;

  databaseManager.updateItem(itemId, paramName, paramValue).then(response =>{
    console.log(response);
    callback(null, createResponse(200, response));
  });
  
};

