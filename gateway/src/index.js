
const express = require('express')
const app = express()
const fetch = require('node-fetch');
const port = 3000
const config = require('./config.json');
const httpProxy = require('http-proxy');
const {AUTH_HOST} = require("./settings");
const cache = require("./cache");
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
                let authResponse = await cache.get('auth:' + token);
                if (authResponse === null) {
                    console.log("Not cached, going to request to auth host");
                    authResponse = await fetch(AUTH_HOST + "/authentication/validate", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token })
                    }).then(authResponse => authResponse.json());
                    await cache.set('auth:' + token, authResponse);
                } else {
                    console.log("Cached!");
                }
                console.log(`Got token validation: ${JSON.stringify(authResponse)}`);
                if (!authResponse.ok) {
                    res.sendStatus(401);
                    return;
                }
            }
        }
        const cacheKey = buildCacheKey(req);
        const cached = await cache.get(cacheKey);
        if (cached === null) {
            proxy.web(req, res, {
                target: route.host
            }, () => {
                const cachePolicy = res.header('X-Cache-Control');
                if (cachePolicy && cachePolicy !== 'none') {
                    cache.set(cacheKey, res.body(), {})
                }
            });
        } else {
            res.sendStatus().send()
        }
    } else {
        res.sendStatus(404).send({});
    }
})
cache.setupCache();
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})