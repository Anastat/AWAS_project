const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express();

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname + '/public')));

const port = process.env.PORT || 5000;

const server = http.createServer(app)

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
  app, server
}