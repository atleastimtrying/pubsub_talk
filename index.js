var connect = require("connect");
var app = connect().use(connect.logger('dev')).use(connect.static('public')).listen(8080);
var io = require('socket.io').listen(3000);

io.sockets.on('connection', function (socket) {
  socket.on('forward', function (data) {
    socket.broadcast.emit('forward');
  });
  socket.on('backward', function (data) {
    socket.broadcast.emit('backward');
  });
});