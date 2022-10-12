const express = global.express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
  res.send('Hello World!!');
});
app.use('/api/members', require('./routes/members.js'));

app.listen(port, function() {
  console.log('start');
});