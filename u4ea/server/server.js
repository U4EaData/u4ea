const express = require("express");
const { Router } = require("express");
const app = express();
const router = express.Router()

import DB from './routes'
import { restart } from 'nodemon';

app.get('/', function (req, res) {
    res.render('index', {});
  });

router.get('/api/users', async(req, res) => {
  try {
    let users = await DB.Users.all();
    res.json(users)
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }

})

// Listen
const port = 3306 || process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));