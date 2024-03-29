const express = require("express");
const { Router } = require("express");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const opts = {};
const passport = require("passport");
const { Connection, Request } = require("tedious");
const config = require("./config/config")

const users = require("./routes/api/users");

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
      'SELECT * FROM login WHERE LoginName = \'' + jwt_payload.id + '\';',
      function(err, rowCount, rows) {
        if (err) {
          console.error(err.message);
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
const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));