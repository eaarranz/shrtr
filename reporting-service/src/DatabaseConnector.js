const { ES_HOSTS} = require("./settings");
const { Client } = require('@elastic/elasticsearch')

const esClient = new Client({ node: ES_HOSTS })

const store = ({topic, message}) => {
    const date = new Date().toISOString().split('T')[0];
    esClient.index({index: topic.toLowerCase() + '-'+date, document: message});
}
module.exports = {
    store
}