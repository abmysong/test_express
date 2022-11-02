const express = global.express = require('express');
const app = express();
const port = 3000;

// MySql
global.db = require('./mysql-connector.js');

// CROS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-jwt-token');
  next();
});

// JSON
app.use(express.json());

app.get('/', function(req, res) {
  res.send('Hello World!!');
});

app.use('/api/members', require('./routes/members.js'));

app.listen(port, function() {
  console.log('start');
});