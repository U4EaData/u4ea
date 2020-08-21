import { Connection } from './index'
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = {
    authentication: {
      options: {
        userName: "azureuser", // update me
        password: "Azure123!" // update me
      },
      type: "default"
    },
    server: "mysqlserver-3.database.windows.net", // update me
    options: {
      database: "Users", //update me
      encrypt: true
    }
}

const connection = new Connection(config);

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const checkUserRequest = new Request(
        'SELECT * FROM login WHERE LoginName = \'' + req.body + '\';',
        (err, rowCount, rows) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(rowCount > 0);
          }
        }
      );
      checkUserRequest.on('row', function(columns) {
          if (columns) {
            return res.status(400).json({ email: "Email already exists" });
          } else {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                  const request = new Request(
                    'INSERT INTO login VALUES (\'' + req.body.email + '\', CAST( \'' + hash + '\' AS BINARY(60) ));',
                    (err, rowCount, rows) => {
                      if (err) {
                        console.error(err.message);
                      } else {
                          res.json(rows);
                      }
                    }
                  );
                  connection.execSql(request);
                });
              });
          }
      });

      connection.execSql(checkUserRequest);
  });
  
  // @route POST api/users/login
  // @desc Login user and return JWT token
  // @access Public
  router.post("/login", (req, res) => {
    // Validation
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    // Find user
    const email = req.body.email;
    const password = req.body.password;

    const checkUserRequest = new Request(
        'SELECT * FROM login WHERE LoginName = \'' + email + '\';',
        (err, rowCount, rows) => {
          if (err) {
            console.error(err.message);
          } else if (!rows) {
            return res.status(404).json({ emailnotfound: "Email not found" });
          } else {
            bcrypt.compare(password, rows.password).then(isMatch => {
                if (isMatch) {
                  const payload = {
                    id: rows.id,
                    name: rows.name,
                    email: rows.email,
                  };
                  // TODO: Check this middleware
                  // Signin token
                  jwt.sign(
                    payload,
                    "secret",
                    {
                      expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token,
                      });
                    }
                  );
                } else {
                  return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
                }
              });
          }
        }
      );

      connection.execSql(checkUserRequest);


  });
  
  
  
  module.exports = router;