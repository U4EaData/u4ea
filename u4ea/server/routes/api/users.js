const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var saltRounds = 5;
const { Connection, Request } = require("tedious");
const validateRegisterInput = require("../../utils/registerValidator");
const validateLoginInput = require("../../utils/loginValidator");
const config = require("./config/config")

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const connection = new Connection(config);

  connection.on('connect', function (err) {

    // Read all rows from table
    const request = new Request(
      'SELECT * FROM login WHERE LoginName = \'' + req.body.email + '\';',
      (err, rowCount, rows) => {
        if (err) {
          console.error(err.message);
        } else {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
              const request = new Request(
                'INSERT INTO login VALUES (\'' + req.body.email + '\', CAST( \'' + hash + '\' AS BINARY(60) ));',
                function (err, rowCount, rows) {
                  connection.close();
                  if (err) {
                    console.error(err.message);
                  } else {
                    res.json(rows);
                    console.log(rows);
                  }
                }
              );
              connection.execSql(request);
            });
          });
        }
      }
    );
    connection.execSql(request);
  })
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

  const connection = new Connection(config);

  connection.on('connect', function (err) {
    const checkUserRequest = new Request(
      'SELECT * FROM login WHERE LoginName = \'' + email + '\';',
      function (err, rowCount, rows) {
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

                  })
                }
              );
            } else {
              return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
          })
            .catch(err => {
              res.status(500).send('Internal server error');

            });
        }
      }
    );
    connection.execSql(checkUserRequest);

  })
});



module.exports = router;