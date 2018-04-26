var express = require('express');
var cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
var path = require('path');
require('./db')

var usersRouter = require('./routes/users');
var membersRouter = require('./routes/members');
var gradesRouter = require('./routes/grades');
var classifyRouter = require('./routes/classifys')
var goodsRouter = require('./routes/goods')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/members', membersRouter);
app.use('/grades', gradesRouter);
app.use('/classifys', classifyRouter)
app.use('/goods', goodsRouter)

module.exports = app;
