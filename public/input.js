$(function(){
	var host = window.location.hostname;
	var socket = io.connect('http://' + host + ':3000');
	socket.emit('forward');
	$('#forward').click(function(){
		socket.emit('forward');
		return false;
	});

	$('#backward').click(function(){
		socket.emit('backward');
		return false;
	});
});