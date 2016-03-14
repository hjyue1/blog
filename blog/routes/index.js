var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//数据库链接
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


//查看数据库
router.get('/task', function(req, res){
  Taskk.find({}, function (err, docs) {
    res.render('task', {
      title: '索引视图',
      docs: docs
    });
  });
});

//加入数据到数据库POST请求
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

//写入数据页面
router.get('/tasknew',function(req,res){
	res.render('tasknew',{title:'New Task'})
});


//编辑数据页面
router.get('/task/:id/edit',function(req,res){
  console.log(req.params.id);
  Taskk.findById(req.params.id,function(err,doc){
    console.log(doc);
    res.render('edit',{
      title:'Edit视图',
      task:doc
    });
  });
});

//修改
router.post('/task/:id',function(req,res){
  Taskk.findById(req.params.id,function(err,doc){
    doc.city=req.body.city;
    doc.save(function(err){
      if (!err) {
        res.redirect('/task');
      }
      else{
        console.log(err);
      }
    });
  });
});
//删除
router.post('/task/:id/del',function(req,res){
  Taskk.findById(req.params.id,function(err,doc){
    if (!err) {
        doc.remove(function(){
      res.redirect('/task');
    })
      }else{
          console.log(err);
      }
  
  });
});





module.exports = router;
