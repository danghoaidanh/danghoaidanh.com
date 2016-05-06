var functions = require('./libs/functions.js');
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var mongoose = require('mongoose');



var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals._      = require('underscore');
app.locals._.str  = require('underscore.string');
app.locals.moment = require('moment');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/pictures/', express.static(__dirname + '/public/upload/'));

//connect to mongo
mongoose.connect('mongodb://localhost/test');

//initial coonection object to test
var dbMongo = mongoose.connection;

//handlle if you open connection ok or erro happens?
dbMongo.on('error', console.error.bind(console, 'connection error'));

dbMongo.once('open',function(){
  console.log('MongoDb connect ok');
});

//postSchema
var PostSchema = mongoose.Schema({
  title: String,
  slug: String,
  picture: String,
  picture1: String,
  picture2: String,
  picture3: String,
  picture4: String,
  teaser: String,
  content: String,
  author: String,
  time: Number
});

//Model Post with PostSchema perspective
var Post = mongoose.model('Post', PostSchema);

//get blog page

app.get('/english-everyday', function (req, res) {
  //get all essays and put data into the template blog and output to html
  var posts = Post.find({}, function(err, result){
    //sort by newest essay
    result = result.sort({'id' : -1});

    res.render('blog', {title:'English Everyday', posts: result, functions : functions});

  });
});

//get blog detail page

app.get('/post/:title/:id.html', function(req,res){
  //get id param
  var id = req.params.id || 0;

  // find the essay that associate with the id

  Post.findById(id, function(err, post){

    //return html detail of the essays
    if (post){
      res.render('post/detail', {title: post.title, post: post});
      return false;

    }

    // file not found here
    res.render('404');
  });

});

// page to create the asseasy

app.get('/create-post', function(req,res){
  res.render('post/create', {title: 'Create a post'});
});

//handle to create a post
app.post('/create-post', multipartMiddleware, function (req, res){

  //create post object
  var post = new Post;

  post.title = req.body.title;
  post.slug = functions.removeAccent(req.body.title);
  post.teaser = req.body.teaser;
  post.content = req.body.content;
  //var date = new Date.now();
  post.time = Date.now();

  //upload image0
  var file = req.files.picture;
  var originalFileName = file.name;
  var fileType = file.type.split('/'[1]);
  var fileSize = file.size;
  var pathUpload = __dirname + '/public/upload/' + originalFileName;

  if(originalFileName!==""){
    var data = fs.readFileSync(file.path);
    fs.writeFileSync(pathUpload, data);

    if(fs.existsSync(pathUpload)){
      post.picture = originalFileName;
    }
  }


  //upload image1
  var file1 = req.files.picture1;
  //console.log(file1);
  var originalFileName1 = file1.name;
  var fileType1 = file1.type.split('/'[1]);
  var fileSize1 = file1.size;
  var pathUpload1 = __dirname + '/public/upload/' + originalFileName1;


if(originalFileName1!==""){
  var data1 = fs.readFileSync(file1.path);
  fs.writeFileSync(pathUpload1, data1);
  if(fs.existsSync(pathUpload1)){
    post.picture1 = originalFileName1;
  }
}

  //upload image2
  var file2 = req.files.picture2;
  //console.log(file2);
  var originalFileName2 = file2.name;
  var fileType2 = file2.type.split('/'[1]);
  var fileSize2 = file2.size;
  var pathUpload2 = __dirname + '/public/upload/' + originalFileName2;


  if(originalFileName2!==""){
    var data2 = fs.readFileSync(file2.path);
    fs.writeFileSync(pathUpload2, data2);
    if(fs.existsSync(pathUpload2)){
      post.picture2 = originalFileName2;
    }
  }

  //upload image3
  var file3 = req.files.picture3;
  //console.log(file3);
  var originalFileName3 = file3.name;
  var fileType3 = file3.type.split('/'[1]);
  var fileSize3 = file3.size;
  var pathUpload3 = __dirname + '/public/upload/' + originalFileName3;


  if(originalFileName3!==""){
    var data3 = fs.readFileSync(file3.path);
    fs.writeFileSync(pathUpload3, data3);
    if(fs.existsSync(pathUpload3)){
      post.picture3 = originalFileName3;
    }
  }

  //upload image4
  var file4 = req.files.picture4;
  //console.log(file4);
  var originalFileName4 = file4.name;
  var fileType4 = file4.type.split('/'[1]);
  var fileSize4 = file4.size;
  var pathUpload4 = __dirname + '/public/upload/' + originalFileName4;


  if(originalFileName4!==""){
    var data4 = fs.readFileSync(file4.path);
    fs.writeFileSync(pathUpload4, data4);
    if(fs.existsSync(pathUpload4)){
      post.picture4 = originalFileName4;
    }
  }



  post.save(function(err,obj){
    if(!err){
      res.render('post/create', {status: 'success', message: 'post ok'});
      return false;
    }
  });

});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
