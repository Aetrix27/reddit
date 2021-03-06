var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require("path");
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
//var app = express();

app.use(cookieParser());
app.use(express.static('public'));

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Set db
require('./data/reddit-db');
port = 3000

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
    }
  
    next();
  };
app.use(checkAuth);

app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
  
module.exports = app;