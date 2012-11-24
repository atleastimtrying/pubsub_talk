window.GamePad = function(talk){
  $(talk).trigger('loaded', 'gamepad');
  // need to use polling to check state
  var button1 = 0
  var button2 = 0
  var checkGamepad = '';
  var useGamePad = '';
  checkGamepad = function(){
    pad = navigator.webkitGetGamepads()[0];
    if (pad) {
      button1 = navigator.webkitGetGamepads()[0].buttons[0];//a
      button2 = navigator.webkitGetGamepads()[0].buttons[1];//b
    }else{
      button1 = 0;
      button2 = 0;
    }
    setTimeout(checkGamepad, 60);
  };

  useGamePad = function(){
    if(button1 === 1){
      $(talk).trigger('forward');
    }
    if(button2 === 1){
      $(talk).trigger('backward');
    }
    setTimeout(useGamePad, 500);
  }
  
  checkGamepad();
  useGamePad();
};