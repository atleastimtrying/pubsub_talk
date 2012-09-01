/**
Depenencies
- jQuery - onload/trigger/bind/click/keypress
- gamepad.js - GamePad module
- socket.io - Sockets module
- array of slides in json with url/html
- a series of static html docs

*/


window.Sockets = function(){
	$(talk).trigger('loaded', 'sockets');
	// on socket message 'clicked'
	// if nextslide
	$(talk).trigger('nextslide');
	// else
	$(talk).trigger('previousslide');	
};

window.GamePad = function(){
	$(talk).trigger('loaded', 'gamepad');
	// need to use polling to check state
	var checkGamepad = function(){

	};
	$(talk).trigger('nextslide');
	$(talk).trigger('previousslide');
};

window.Input = function(){
	$(talk).trigger('loaded', 'input');
	
	var nextOnTrue = function(clause){
		var action = 'nextslide';
		if(clause){
			action = 'previousslide';
		}
		$(talk).trigger(action);
	};

	var click = function(event){
		nextOnTrue(event.which === 3);
	};

	var keyPress = function(event) {
		nextOnTrue(event.keyCode === 115);	
	};

	var click = function(event){
		var action = 'nextslide';
		if(event.which === 3){
			action = 'previousslide';
		}
		$(talk).trigger(action);
	};

	$(window).keypress(keyPress);
	$(window).click(click);		
};

window.Slides = function(){
	var collection = [
		{
			html:'html',
			url: '/whatever'
		},
		{
			html:'html2',
			url: '/whatever2'
		},
		{
			html:'html3',
			url: '/whatever3'
		}
	];

	var position = 0;
	var length = collection.length;

	var update = function(){
		var slide = collection[position];
		// load html in from url jquery load?
		$('#display').load(slide.url);
		$(talk).trigger('slideshowing', slide);
	};

	var previousSlide = function(event, message){
		if(position === 0){
			position = length + 1;
		}
		position -= 1;
		update();
	};

	var nextSlide = function(event, message){
		if(position === length){
			position = -1;
		}
		position += 1;
		update();
	};
	
	$(talk).trigger('loaded', 'slides');
	$(talk).bind('nextslide',nextSlide);
	$(talk).bind('previousslide',previousSlide);	
};

window.History = function(){
	var showHistory = function(event, slide){
		console.log(slide.url);
	};
	$(talk).trigger('loaded', 'history');
	$(talk).bind('slideshowing',showHistory);	
};

window.Logger = function(){
	var logit = function(event, message){
		console.log(message);
	};
	$(talk).bind('loaded',logit);
};

window.Talk = function(){
	// if dev
	this.logger = new Logger();
	// if socket.io and otehr includec
	this.sockets = new Sockets();
	// if history api
	this.history = new History();
	// if gamepad
	this.gamePad = new GamePad();
	this.input = new Input();
	this.slides = new Slides();
};

$(function(){
	window.talk = new Talk();
});