var express = require('express');
var cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
var path = require('path');
require('./db')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var membersRouter = require('./routes/members');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/members', membersRouter);


module.exports = app;
