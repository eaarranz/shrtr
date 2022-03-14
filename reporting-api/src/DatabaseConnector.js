const { ES_HOSTS} = require("./settings");
const { Client } = require('@elastic/elasticsearch')

const esClient = new Client({ node: ES_HOSTS })

const count = async (event) => {
    const response = await esClient.count({
        index: event + '-*'
    })
    return response.count;
}
module.exports = {
    count
}