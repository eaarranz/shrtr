const process = require('process');

const AUTH_HOST = process.env.AUTH_HOST || 'http://auth__api:3000';

module.exports = {
    AUTH_HOST,
}