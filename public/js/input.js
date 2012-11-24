$(function(){
	var host = window.location.hostname;
	$.getScript("http://" + host + ":3000/socket.io/socket.io.js", function(data, textStatus, jqxhr) {
		var socket = io.connect('http://' + host + ':3000');
		$('#forward').click(function(){
			socket.emit('forward');
			return false;
		});

		$('#backward').click(function(){
			socket.emit('backward');
			return false;
		});
	});
});