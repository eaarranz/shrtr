const { createClient } = require('redis');
const  {CACHE_HOST} =  require("./settings");

let client;
const setupCache = async () => {
    client = createClient({
        url: `redis://${CACHE_HOST}`
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
}

const get = async key => {
    const response = await client.GET(key);
    if (response !== null) {
        return JSON.parse(response);
    }
    return null;
}
const set = async (key, value) => {
    await client.SET(key, JSON.stringify(value), {
        EX: 60,
    })
}
module.exports = {
    get,
    setupCache,
    set,
}