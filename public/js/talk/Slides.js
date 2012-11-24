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
      $(talk).trigger('populateslide', slide);
    }else{
      $('section').html(slide.html);
      $('title').html($(slide.html).html());
    }
    $(talk).trigger('slideshowing', slide);
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