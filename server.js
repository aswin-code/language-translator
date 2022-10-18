const port = 3001;
const express = require('express')
const axios = require('axios');
const cors = require('cors');
var bodyParser = require('body-parser')
require('dotenv').config()
const app = express();
app.use(cors())
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.post('/api/detect', (req, res) => {
    try {
        console.log(req.body.word)
        const encodedParams = new URLSearchParams();
        encodedParams.append("q", req.body.word);

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams
        };

        axios.request(options).then(function (response) {
            console.log(response.data.data.detections[0][0].language);
            res.json({ language: response.data.data.detections[0][0].language })
        }).catch(function (error) {
            console.error(error);
        });
    } catch (err) {

    }
})
app.post('/api/translate', (req, res) => {
    console.log(req.body)
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", req.body.translate);
    encodedParams.append("target", "en");
    encodedParams.append("source", req.body.languagecode);

    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
})

app.listen(port, () => {
    console.log('running on port' + port)
})