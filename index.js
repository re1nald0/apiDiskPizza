var express = require('express');
var app = express();

require('dotenv-safe').config();
var jwt = require('jsonwebtoken');

var morgan = require('morgan');
app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.json())
//app.use(express.urlencoded({ extended: false }))

const {index} = require('./models');
const routes = require('./routes/api');

app.use('/', routes);

const port = 8080;
app.listen(port, function() {
    console.log(`Server running on port ${port}`);
});

module.exports = app;