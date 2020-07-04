/* Setup */

// modules
var express = require('express');
var app = express();
var fs = require('fs');
var json2csv = require('json2csv').parse;
var json2xml = require('json2xml');
var mkdirp = require('mkdirp');
var Chart = require('chart.js');
var moment = require('moment');

// For parsing post requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // json encoded bodies
app.use(bodyParser.urlencoded({extended: false})); // encoded bodies

// Serve static files with express
app.use(express.static('public'));

/* MongoDB setup */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/twitter-collection',{useNewUrlParser: true});


app.route('/')
    .get(function (req, res) {
        res.sendFile(__dirname + '/public' + '/home.html');
    });

app.route('/app')
    .get(function (req, res) {
        res.sendFile(__dirname + '/public' + '/app.html');
    });

app.listen(3000, () => console.log('BevPricing listening on port 3000!'));