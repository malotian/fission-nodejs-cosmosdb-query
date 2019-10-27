'use strict';

const rp = require('request-promise-native');
const url = require('url');
const CosmosClient = require('@azure/cosmos').CosmosClient;


module.exports = async function (context) {

    var url_parts = url.parse(context.request.url, true);
    var query = url_parts.query;

    const databaseId = "Families";
    const containerId = "Families";

    var cosmosDbEndPoint = context.request.headers['cosmosdb-endpoint'];
    var cosmosDbPrimaryKey = context.request.headers['cosmosdb-primary-key'];

    const client = new CosmosClient({ endpoint: cosmosDbEndPoint, auth: { masterKey: cosmosDbPrimaryKey } });

    const result  = await client.database(query.databaseId).container(query.containerId).items.query(context.request.body, {enableCrossPartitionQuery:true}).toArray();

    return {
        status: 200,
        body: JSON.stringify(result),
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

