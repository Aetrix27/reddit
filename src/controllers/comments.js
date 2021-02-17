const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports = function(app) {
// CREATE Comment
  app.post("/posts/:postId/comments", function(req, res) {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
      // INSTANTIATE INSTANCE OF MODEL
    
      // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(post => {
        res.redirect(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  });

};

