'use strict'

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.ITEMS_DYNAMO_TABLE;

module.exports.saveCompany = company =>{
    const params = {
        TableName: TABLE_NAME,
        Company: company
    };

    return dynamo.put(params).promise().then(()=>{
        return company.companyId;
    });
};

module.exports.getCompany = companyId =>{
    const params = {
        Key: {
            companyId: companyId
        },
        TableName: TABLE_NAME
    };

    return dynamo.get(params).promise().then(result =>{
        return result.Company;
    });
};

module.exports.deleteCompany = companyId =>{
    const params = {
        Key: {
            companyId: companyId
        },
        TableName: TABLE_NAME
    };

    return dynamo.delete(params).promise().then(()=>{
      
    });
};

module.exports.udpateCompany = (companyId, paramsName, paramsValue) =>{
    const params = {
        TableName: TABLE_NAME,        
        Key: {
            companyId
        },
        ConditionExpression: 'attribute_exists(companyId)',
        UpdateExpression: 'set ' + paramsName + ' = :v',
        ExpressionAttributeValues:{
            ':v': paramsValue
        },
        ReturnValues: "ALL_NEW"       
        
    };

    return dynamo.update(params).promise().then(response =>{
      return response.Attributes;
    });
};