window.History = function(talk){
  var showHistory = function(event, slide){
    history.pushState(null, null, slide.url);
    $('nav a.active').removeClass('active');
    $('nav a[href="' + slide.url + '"]').addClass('active');
  };

  $(talk).trigger('loaded', 'history');
  $(talk).bind('slideshowing',showHistory); 
};