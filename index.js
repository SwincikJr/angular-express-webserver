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

const fs = require('file-system')
const ssl = process.env.ACTIVATE_SSL === 'true'
const sslOpt = {
  pfx: fs.readFileSync(process.env.CERTIFICATE_URL),
  passphrase: process.env.PASSPHRASE
}

const http = ssl ? require('https') : require('http');
const port = process.env.PORT || '3000';

app.set('port', port);

const server = ssl ? http.createServer(sslOpt, app) : http.createServer(app);

server.listen(port, () => {
  console.log(`server listening on port ${process.env.PORT}\nSSL: ${process.env.ACTIVATE_SSL}`)
});
