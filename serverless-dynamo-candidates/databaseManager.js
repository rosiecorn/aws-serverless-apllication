'use strict'

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.ITEMS_DYNAMO_TABLE;

module.exports.saveItem = item =>{
    const params = {
        TableName: TABLE_NAME,
        Item: item
    };

    return dynamo.put(params).promise().then(()=>{
        return item.Id;
    });
};

module.exports.getItem = itemId =>{
    const params = {
        Key: {
            Id: itemId
        },
        TableName: TABLE_NAME
    };

    return dynamo.get(params).promise().then(result =>{
        return result.Item;
    });
};


module.exports.deleteItem = itemId =>{
    const params = {
        Key: {
            Id: itemId
        },
        TableName: TABLE_NAME
    };

    return dynamo.delete(params).promise().then(()=>{
      
    });
};

module.exports.updateItem = (itemId, paramsName, paramsValue) =>{
    const params = {
        TableName: TABLE_NAME,        
        Key: {
            Id:itemId
        },
        ConditionExpression: 'attribute_exists(CandidateId)',
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
