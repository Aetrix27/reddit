
const path = require("path")
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
require('./controllers/posts.js')(app);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const port = 3000
// Set db
require('./data/reddit-db');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'main'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


app.get("/", function(req,res){
  return res.render("index")
})

app.get("/posts/new", function(req,res){
  return res.render("layouts/posts-new")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})