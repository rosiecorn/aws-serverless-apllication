'use strict';

const databaseManager = require('./databaseManager');
const uuidv1 = require('uuid/v1');

function createResponse(statusCode, message){
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}


module.exports.saveCompany = (event, context, callback) => {

  const company = JSON.parse(event.body);
  console.log(company);
  company.companyId = uuidv1();

  databaseManager.saveCompany(company).then(response =>{
    console.log(response);
    callback(null, createResponse(200, response));
  });
};

module.exports.getCompany = (event, context, callback) => {

  const companyId = event.pathParameters.companyId;

  databaseManager.getCompany(companyId).then(response =>{
    console.log(response);
    callback(null, createResponse(200, response));
  });
  
};
  
module.exports.deleteCompany = (event, context, callback) => {

  const companyId = event.pathParameters.companyId;

  databaseManager.getCompany(companyId).then(response =>{
    //console.log(response);
    callback(null, createResponse(200, 'Company was deleted'));
  });
  
};

module.exports.updateCompany = (event, context, callback) => {

  const companyId = event.pathParameters.companyId;
  const body = JSON.parse(event.body);
  const paramName = body.paramName;
  const paramValue = body.paramValue;

  databaseManager.updateCompany(companyId, paramName, paramValue).then(response =>{
    console.log(response);
    callback(null, createResponse(200, response));
  });
  
};


