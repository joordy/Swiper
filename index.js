// require packages
const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongo = require('mongodb');
const assert = require('assert');
const routing = require('./routing/route.js');
require("dotenv").config();

// Variables
const app = express();
const PORT = process.env.DB_PORT;

// Middleware set-up
app.set('view engine', 'ejs');
app.set('views', 'view-ejs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true
        // cookie: { secure: true }
}));
app.use('/', routing); // using routing module


// Server deploying on https://localhost:4000.
app.listen(PORT, () => console.log(`App is listening on ${PORT}!`));