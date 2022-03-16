const {count} = require("./DatabaseConnector");

const express = require('express')
const app = express()
const port = 3000

app.get('/:event/count', async (req, res) => {
    const amount = await count(req.params.event);
    console.log(amount);
    res.setHeader('Cache-Control', 'max-age: 60')
    res.send({
        count:amount,
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})