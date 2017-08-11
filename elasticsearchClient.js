const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: process.env.ES_HOST || 'http://localhost:9200',
    log: 'trace',
});

module.exports = client;
