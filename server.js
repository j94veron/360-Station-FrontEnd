const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./dist/sakai'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/*', (req, res) =>  {
  res.sendFile(path.join(__dirname, '/dist/sakai/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
	console.log('Server start');
});