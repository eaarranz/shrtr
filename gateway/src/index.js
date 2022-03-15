
const express = require('express')
const app = express()
const port = 3000
const config = require('./config.json');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

app.all('*', async (req, res, next) => {
    const route = config.routes.find(x => {
        return req.url.startsWith(x.prefix)
    });
    console.log(`URL ${req.url} matches ${JSON.stringify(route)}`)
    if (route) {
        if (route.stripPrefix) {
            req.url = req.url.substring(route.prefix.length);
        }
        proxy.web(req, res, {
            target: route.host
        }, next);
    } else {
        res.sendStatus(404).send({});
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})