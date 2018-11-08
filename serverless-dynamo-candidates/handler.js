'use strict';

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

const  AWS = require ('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region:'us-east-2'});

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

exports.getSkill = function (e,ctx,callback) {
  const params = {
     TableName: 'sls-candidates-dev',
     FilterExpression: '#primarySkill = :skill',
     ExpressionAttributeNames: {
         '#primarySkill': 'primarySkill',
     },
     ExpressionAttributeValues: {
         ':skill': e.skill,
     },
  }
     
docClient.scan(params,function(err,data)
 {
     if(err){
         callback(err,null);
     }
     else{
     callback(null,data);
     }
 });
 
};
/*
module.exports.getItem = (event, context, callback) => {

  const itemId = event.pathParameters.Id;

  databaseManager.getItem(itemId).then(response =>{
    console.log(response);
    callback(null, createResponse(200, response));
  });
  
};
*/

module.exports.getItem = (event, context, callback) => {

  const itemId = event.pathParameters.Id;
  console.log(itemId);
  databaseManager.getItem(itemId).then(response =>{
    console.log(response);
    callback(null, createResponse(200, response));
  });
  
};

module.exports.deleteItem = (event, context, callback) => {

  const itemId = event.pathParameters.Id;

  databaseManager.deleteItem(itemId).then(response =>{
    //console.log(response);
    callback(null, createResponse(200, 'Candidates was deleted'));
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

