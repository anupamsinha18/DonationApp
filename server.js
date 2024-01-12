const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'donation_app'
});

dbConn.connect((err) => {
  if (err) throw err;
  console.log('Database Connected!');
});

// Your API routes go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
