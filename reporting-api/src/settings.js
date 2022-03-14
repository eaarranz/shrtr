const process = require('process');

const ES_HOSTS = process.env.ES_HOSTS || 'http://reporting__es01:9200';

module.exports = {
    ES_HOSTS,
}