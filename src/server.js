const path = require("path");
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

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

app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

const Post = require('./models/post');

app.get('/', (req, res) => {
    Post.find({}).lean()
        .then(posts => {
            res.render('posts-index', { posts });
        })
        .catch(err => {
            console.log(err.message);
        })
})

app.get("/posts/new", function(req,res){
    return res.render("posts-new")
})

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);

// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
  
module.exports = app;