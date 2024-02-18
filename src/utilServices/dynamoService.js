const config = require('../configs/config.json');
const  { DynamoDBDocument } = require('@aws-sdk/lib-dynamodb');
const { DynamoDB } = require('@aws-sdk/client-dynamodb');

async function putItemToDyanamoDb(item, tableName){
    try {
        let docClient = DynamoDBDocument.from(new DynamoDB({ region: "ap-south-1" }));
        const params = {
            TableName: tableName,
            Item: item
        };
        const response = await docClient.put(params);

        return {
            status: true,
            message: config.successMessages.itemPut,
            payload: response
        }
    }
    catch (error) {
        return {
            status: false,
            message: config.errorMessage.unableToPutItem,
            payload: error
        }
    }
}
async function getItemFromDyanamoDb(key, tableName) {
    try {

        let docClient = DynamoDBDocument.from(new DynamoDB({ region: "ap-south-1" }));
        const params = {
            TableName: tableName,
            Key: key
        };
        const response = await docClient.get(params);
        return {
            status: true,
            message: config.successMessages.itemFetched,
            payload: response
        }
    }
    catch (error) {
        return {
            status: false,
            message: config.errorMessage.unableToGetItem,
            payload: error
        }
    }
}
async function deleteItemFromDyanamoDb(key, tableName) {
    try {
        let docClient = DynamoDBDocument.from(new DynamoDB({ region: "ap-south-1" }));
        const params = {
            TableName: tableName,
            Key: key
        };
        const response = await docClient.delete(params);
        return {
            status: true,
            message: config.successMessages.itemDeleted,
            payload: response
        }
    }

    catch (error) {
        return {
            status: false,
            message: config.errorMessage.unableToDeleteItem,
            payload: error
        }
    }
}

module.exports.deleteItemFromDyanamoDb = deleteItemFromDyanamoDb;
module.exports.getItemFromDyanamoDb = getItemFromDyanamoDb;
module.exports.putItemToDyanamoDb = putItemToDyanamoDb;