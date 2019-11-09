const express = require('express');

const app = express();
const port = process.env.DIST_PORT || 4789;
const bodyParser = require('body-parser');

// Setting up app to listen Port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const path = require('path');

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(['/', '/login'], (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html')), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  };
});
