window.Sockets = function(talk){
  var host = window.location.hostname;
  $.getScript("http://" + host + ":3000/socket.io/socket.io.js", function() {
    var socket = io.connect('http://'+host+':3000');
    $(talk).trigger('loaded', 'sockets');

    socket.on('forward', function (data) {
      $(talk).trigger('forward');
    });
    socket.on('backward', function (data) {
      $(talk).trigger('backward');
    });
  });
};