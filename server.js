const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const { Pool, Client } = require('pg');

/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const client = new Client({
  connectionString: process.env.DATABASE_URL
});*/

//connection to database on Heroku

const client = new Client({
  user: "hfxtsnyxfoktse",
  password: "2a348570030a038e7b358a49370d1b7718a093bbbb671539959930dd8e2e10e8",
  database: "d1im5b5t0mehrn",
  port: 5432,
  host: "ec2-46-137-188-105.eu-west-1.compute.amazonaws.com",
  ssl: true
});

client.connect();

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