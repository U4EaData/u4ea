const express = require("express");
const app = express();

app.get('/', function (req, res) {
    res.render('index', {});
  });

// Listen
const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));