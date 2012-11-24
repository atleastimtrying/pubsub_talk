window.Logger = function(talk){
  var logit = function(event, message){
    console.log(message);
  };
  $(talk).bind('loaded',logit);
  $(talk).bind('slideshowing',logit);
};