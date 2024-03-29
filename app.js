const request = require('request')
const express = require('express')
const app = express()
const path = require("path")
//const port = process.env.PORT || 3000
const PORT = 8080
const HOST = '0.0.0.0'
var result = {}

var options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-nfl-app'
    }
};

app.use(express.static(path.join(__dirname, "./")))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    next()
});

// wrap a request in an promise to ensure sportsApi response exists
const sportsApi = (team) => {
    options.url = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=' + team
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error)
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>')
            }
            parseResult(body)
            resolve(body)
        });
    });
}

const parseResult = (body) => {
    let json = JSON.parse(body);
    if (json.teams == null) {
        console.log(`Teams is null`)
        return
    }
    result['resultObject'] = [json.teams[0]]
    console.log(result.resultObject[0])
}

async function myBackEndLogic(req, res, result) {
    try {
        await sportsApi(req.params.team)
        res.send(result)
    } catch (error) {
        console.error('ERROR:')
        console.error(error)
    }
}

app.get('/nfl/:team', (req, res) => {
    myBackEndLogic(req, res, result)
})

app.get("/*", (req, res) =>{
    res.sendFile(path.join(__dirname, "./index.html"))
})

// app.listen(port, () => {
//     console.log(`App is listening on port ${port}`)
// })

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)