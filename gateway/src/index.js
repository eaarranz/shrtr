
const express = require('express')
const app = express()
const fetch = require('node-fetch');
const port = 3000
const config = require('./config.json');
const httpProxy = require('http-proxy');
const {AUTH_HOST} = require("./settings");
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
        if (route.auth) {
            const auth = route.auth.find(x => {
                return req.url.startsWith(x.prefix)
            });
            if (auth.auth === 'token') {
                console.log("Going to request token validation")
                const token = req.header('Authorization');
                const authResponse = await fetch(AUTH_HOST + "/authentication/validate", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token })
                }).then(authResponse => authResponse.json());
                console.log(`Got token validation: ${JSON.stringify(authResponse)}`);
                if (!authResponse.ok) {
                    res.sendStatus(401);
                    return;
                }
            }
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