const process = require('process');

const AUTH_HOST = process.env.AUTH_HOST || 'http://auth__api:3000';
const CACHE_HOST = process.env.CACHE_HOST ||'gateway-cache:6379';

module.exports = {
    AUTH_HOST,
    CACHE_HOST,
}