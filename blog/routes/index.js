var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema= mongoose.Schema;
var ObjectId=Schema.ObjectId;
var Task= new Schema({
  num : Number,
  city:String

});
var Taskk =mongoose.model('liudTask',Task);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页'});
});
router.get('/404', function(req, res, next) {
  res.render('404', { title: '404' });
});


router.get('/task', function(req, res){
  Taskk.find({}, function (err, docs) {
    res.render('task', {
      title: '索引视图',
      docs: docs
    });
  });
});

//写入数据
router.post('/task',function(req,res,next){
	 console.log(req.body);
  Taskk.create(req.body,function(err) {
      if(!err){
     res.redirect('/task')
   }else{
     console.log(err);
     res.redirect('/task/new');
   }
  })
});

router.get('/tasknew',function(req,res){
	res.render('tasknew',{title:'New Task'})
});

module.exports = router;
