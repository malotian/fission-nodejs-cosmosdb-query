'use strict';

const rp = require('request-promise-native');
const CosmosClient = require('@azure/cosmos').CosmosClient;


module.exports = async function (context) {

    const databaseId = "Families";
    const containerId = "Families";
    const cosmosDbPrimaryKey = "pNyR8nSpamqpWbLTkF2GzwBunX58datla7jcPxKWSJqKAI7Exg8a5q0ECAjTOVipfyKFnvdLhb7EKScgmd7Ltg==";
    const cosmosDbEndPoint = "https://mlotian-cosmosdb-account.documents.azure.com:443";

    const client = new CosmosClient({ endpoint: cosmosDbEndPoint, auth: { masterKey: cosmosDbPrimaryKey } });

    const querySpec = {
        query: "select * from c",
        parameters: []
    };

    const { result: results } = await client.database(databaseId).container(containerId).items.query(querySpec, {enableCrossPartitionQuery:true}).toArray();
    let stringBody = "";
    for (var queryResult of results) {
        stringBody = JSON.stringify(queryResult);
    }

    return {
        status: 200,
        body: {
            text: `hello ${stringBody} `
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

