var http= require('http');
var fs=require('fs');
var count=0;
var server=http.createServer(function(req,res){
  fs.readFile('./index.html',function(error,data){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data,'utf-8');
  });
}).listen(3000,'127.0.0.1');
console.log('服务开启在http://127.0.0.1');
var io =require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
  count++;
  console.log('用户数量：'+count+'人');
  socket.emit('users',{number:count});
  socket.broadcast.emit('users',{number:count});
  socket.on('disconnect',function(){
    count--;
    console.log('用户数量'+count+'人数');
    socket.broadcast.emit('users',{number:count});
  });
  socket.on('message',function(data){
    socket.broadcast.emit('push message',data);
  })
});