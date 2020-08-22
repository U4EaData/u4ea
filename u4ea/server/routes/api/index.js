const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Connection, Request } = require("tedious");
const config = require("./config/config")


const connection = new Connection(config);

connection.on('connect', function(err) {
    // If no error, then good to go...
      queryDatabase();
    }) 

function queryDatabase() {

    console.log("Reading rows from the Table...");
    // Read all rows from table
    const request = new Request(
      `SELECT * FROM login;`,
      (err, rowCount, rows) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );

    connection.execSql(request); 
}

