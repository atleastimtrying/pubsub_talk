$(function(){
  var socket = io.connect('http://localhost:3000');
	$('#forward').click(function(){
		socket.emit('forward');
		return false;
	});

	$('#backward').click(function(){
		socket.emit('backward');
		return false;
	});
});