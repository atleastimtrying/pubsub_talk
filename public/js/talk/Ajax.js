window.Ajax = function(talk){
  
  var populateSlide = function(message,slide){
    $.get(slide.url, function(data){
      slide.html = $(data).find('section').html();
      $('section').html(slide.html);
    });
  };

  $(talk).bind('populateslide',populateSlide);  
};