var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;