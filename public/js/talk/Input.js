window.Input = function(talk){
  $(talk).trigger('loaded', 'input');
  
  var click = function(event){
    $(talk).trigger('forward');
  };

  var keyPress = function(event) {
    $(talk).trigger('backward');
  };

  $(window).keypress(keyPress);
  $('article').click(click);   
};