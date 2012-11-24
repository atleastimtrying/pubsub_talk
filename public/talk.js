/**
Depenencies
- jQuery - onload/trigger/bind/click/keypress
- gamepad.js - GamePad module
- socket.io - Sockets module
- array of slides in json with url/html
- a series of static html docs

*/


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

window.GamePad = function(talk){
  $(talk).trigger('loaded', 'gamepad');
  // need to use polling to check state
  var checkGamepad = function(){

  };
  $(talk).trigger('forward');
  $(talk).trigger('backward');
};

window.Input = function(talk){
  $(talk).trigger('loaded', 'input');
  
  var nextOnTrue = function(clause){
    var action = 'forward';
    if(clause){
      action = 'backward';
    }
    $(talk).trigger(action);
  };

  var click = function(event){
    nextOnTrue(event.which === 3);
  };

  var keyPress = function(event) {
    nextOnTrue(event.keyCode === 115);  
  };

  $(window).keypress(keyPress);
  $('section').click(click);   
};

window.Slides = function(talk){
  var collection = [];
  $('nav a').each(function(){
    collection.push({
      html: '',
      url: $(this).attr('href')
    });
  });
  var position = 0;
  var length = collection.length;
  var update = function(){
    var slide = collection[position];
    if(slide.html === ''){
      $.get(slide.url, function(data){
        slide.html = $(data).find('section').html();
        $('section').html(slide.html);
        $(talk).trigger('slideshowing', slide);
      });
    }else{
      $('section').html(slide.html);
      $(talk).trigger('slideshowing', slide);
    }
  };

  var backward = function(event, message){
    if(position <= 0){
      position = length ;
    }
    position -= 1;
    update();
  };

  var forward = function(event, message){
    if(position >= length -1){
      position = -1;
    }
    position += 1;
    update();
  };
  
  $(talk).trigger('loaded', 'slides');
  $(talk).bind('forward',forward);
  $(talk).bind('backward',backward);  
};

window.History = function(talk){
  var showHistory = function(event, slide){
    console.log(slide.url);
  };
  $(talk).trigger('loaded', 'history');
  $(talk).bind('slideshowing',showHistory); 
};

window.Logger = function(talk){
  var logit = function(event, message){
    console.log(message);
  };
  $(talk).bind('loaded',logit);
  $(talk).bind('slideshowing',logit);
};

window.Talk = function(){
  this.logger = new Logger(this);
  this.sockets = new Sockets(this);
  this.history = new History(this);
  this.gamePad = new GamePad(this);
  this.input = new Input(this);
  this.slides = new Slides(this);
};

$(function(){
  window.talk = new Talk();
});