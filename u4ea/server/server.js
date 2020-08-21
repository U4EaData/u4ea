const express = require("express");
const { Router } = require("express");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const app = express();
const router = express.Router();
const opts = {};
const passport = require("passport");
const { Connection, Request } = require("tedious");

const users = require("./routes/api/users");

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

// Bodyparser Config
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Passport Config
app.use(passport.initialize());
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = true;
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    const request = new Request(
      'SELECT * FROM login WHERE LoginName = \'' + userName + '\';',
      (err, rowCount, rows) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(rowCount > 0);
        }
      }
    );
    request.on('row', function(columns) {
      if(columns) {
        return done(null, columns);
      } 
      return done(null, false);
    } 
  )
  connection.execSql(request);
}
));

// Routing
app.use("/api/users/", users);

// Listen
const port = 3306 || process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));