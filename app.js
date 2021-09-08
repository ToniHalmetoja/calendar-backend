var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var dotenv = require("dotenv").config()
const MongoClient = require("mongodb").MongoClient;

var indexRouter = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

let connectionString = "mongodb+srv://admin:" + process.env.API_KEY + "@calendarevents.0ph6i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(connectionString, {
        useUnifiedTopology: true
    })
    .then(client => {
        console.log("Connection established");
        const db = client.db("calendar");
        app.locals.db = db;
    })
module.exports = app;
