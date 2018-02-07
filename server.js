//server.js
require('dotenv').config()

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/comments');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

//db configuration
mongoose.connect("mongodb://"+process.env.MY_DB_CREDS+"@ds125618.mlab.com:25618/dsalib-comment-box")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.setHeader('Cache-Control', 'no-cache');
  next();
})

router.get('/', (req, res) =>{
  res.json({message: 'API Started!'});
})

router.route('/comments')
.get((req, res) => {
  Comment.find((err,comments) =>{
    if (err) res.send(err);
    res.json(comments);
  });
}).post((req, res) =>{
  var comment = new Comment();
  comment.author = req.body.author;
  comment.text = req.body.text;

  comment.save((err) => {
    if (err) res.send(err);
    res.json({message: "Comment added!"});
  });
});

router.route('/comments/:comment_id').put((req,res) =>{
  Comment.findById(req.params.comment_id,(err, comment)=>{
    if (err) res.send(err);
    (req.body.author) ? comment.author = req.body.author : null;
    (req.body.text) ? comment.text = req.body.text : null;
    comment.save((err) => {
      if(err) res.send(err);
      res.json({message: 'Comment has been updated!'});
    });
  });
})
.delete((req, res) => {
  Comment.remove({ _id: req.params.comment_id }, (err, comment)=>{
    if(err) res.send(err);
    res.json({message: "Comment deleted!"});
  });
});

app.use('/api', router);

app.listen(port, function(){
  console.log('API running on port ' + port);
});
