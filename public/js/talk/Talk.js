window.Talk = function(){
  //this.logger = new Logger(this);
  this.sockets = new Sockets(this);
  if(window.history){
    this.history = new History(this);
  }
  this.ajax = new Ajax(this);
  this.gamePad = new GamePad(this);
  this.input = new Input(this);
  this.slides = new Slides(this);
};