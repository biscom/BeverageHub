/* Setup */

// modules
var express = require('express');
var app = express();
var fs = require('fs');
var json2csv = require('json2csv').parse;
var json2xml = require('json2xml');
var mkdirp = require('mkdirp');
var moment = require('moment');
var config = require('config');

// For parsing post requests
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // json encoded bodies
app.use(bodyParser.urlencoded({extended: false})); // encoded bodies

// Node-Untappd API setup
var UntappdClient = require("node-untappd");

var debug = false;
var untappd = new UntappdClient(debug);

var clientId = config.get("clientId"); // CLIENT ID
var clientSecret = config.get("clientSecret"); // CLIENT SECRET

untappd.setClientId(clientId);
untappd.setClientSecret(clientSecret);

// Serve static files with express
app.use(express.static('public'));

/* MongoDB setup */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/untappd-collection',{useNewUrlParser: true});


app.route('/')
    .get(function (req, res) {
        res.sendFile(__dirname + '/public' + '/home.html');
    });

app.route('/app')
    .get(function (req, res) {
        res.sendFile(__dirname + '/public' + '/app.html');
    });

app.route('/app/apisearch')
    .post(function (req, res) {
        // q: A UTF-8, URL-encoded search query of 500 characters maximum, including operators.
        var q = req.body.q;
        // https://api.untappd.com/v4/search/beer

// The user we want to lookup for this example
    var data = {};
data.q = q;
untappd.beerSearch(function(err, obj) {
    console.log(err, obj);
    var beers = obj.response.beers
    res.json(beers);
}, data);
});

app.listen(3000, () => console.log('BevPricing listening on port 3000!'));