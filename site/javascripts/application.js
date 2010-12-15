$(document).ready(function() {

  // Star rating
  _($('.stars .rating')).each(function(div){$(div).rater()});



  // Find all articles
  $('.article').each(function(i, article){

    // When heading clicked, toggle content area
    $(article).find('h2 a').click(function(e){
      $(article).find('.content').toggle();
      $(article).find('h2').toggleClass('opened closed');
      e.preventDefault();
    });

    // Close every article except the first
    if (i > 0) {
      $(article).find('h2 a').click();
    }
  });




  // Handle the home page carasoul
  $('.carousel').each(function(i, carousel){

    // Classify the first slide as current
    $(carousel).find('ul.slides > li:first-child').addClass('current');
    // Classify everything 5th slide, including the first
    $(carousel).find('ul.slides > li:nth-child(4n+1)').addClass('first');

    $(carousel).find('ul.slides').width(($(carousel).find('ul.slides > li').length * 172) + 30);

    // Cover up outside slides with opaque divs
    $(carousel).find('ul.slides').after('<div class="left_shim"></div><div class="right_shim">');
    // set real width in JS to avoid a jarring load
    $(carousel).find('.carousel_mask').width(718);

    // Take all slides out of the flow and position them absolute instead
    $(carousel).find('ul.slides > li').each(function(i, li){
      $(li).css('left', $(li).position().left + parseInt($(li).css('marginLeft')) + 'px');
    })
    $(carousel).find('ul.slides > li').css('position', 'absolute');
    $(carousel).find('ul.slides > li').css('marginLeft', '0');

    $(carousel).find('ul.slides > li').last().after('<li class="left_inner_shim"></li><li class="right_inner_shim"></li>')


    // Next slide group
    $(carousel).find('a.carousel_nav_next').click(function(e){
      e.preventDefault();
      if ($(carousel).find('a.carousel_nav_next').hasClass('carousel_nav_disabled')) { return }

      var current_slide = $(carousel).find('li.current');
      // var next_slide = $(current_slide).nextAll('li.first').first();
      var next_slide = $(current_slide).next();
      var next_slide_pos = (($(next_slide).position().left-15)*-1) + 'px';
      $(carousel).find('ul.slides').animate({left: next_slide_pos });

      $(current_slide).removeClass('current');
      $(next_slide).addClass('current');
      carousel_nav();
    });

    // Previous slide group
    $(carousel).find('a.carousel_nav_previous').click(function(e){
      e.preventDefault();
      if ($(carousel).find('a.carousel_nav_previous').hasClass('carousel_nav_disabled')) { return }

      var current_slide = $(carousel).find('li.current');
      // var previous_slide = $(current_slide).prevAll('li.first').first();
      var previous_slide = $(current_slide).prev();
      var previous_slide_pos = (($(previous_slide).position().left-15)*-1) + 'px';
      $(carousel).find('ul.slides').animate({left: previous_slide_pos });

      $(current_slide).removeClass('current');
      $(previous_slide).addClass('current');
      carousel_nav();
    });

    // Classify next/prev links as disabled if there are no next/prev slides
    function carousel_nav(){
      var current_slide = $('.carousel ul.slides li.current').first();
      var nav_previous = $('.carousel a.carousel_nav_previous').first();
      var nav_next = $('.carousel a.carousel_nav_next').first();

      // if ($(current_slide).nextAll('li.first').length < 1) {
      if ($(current_slide).nextAll('li').not('.left_inner_shim').not('.right_inner_shim').length < 4) {
        $(nav_next).addClass('carousel_nav_disabled');
      } else {
        $(nav_next).removeClass('carousel_nav_disabled');
      }

      // if ($(current_slide).prevAll('li.first').length < 1) {
      if ($(current_slide).prevAll('li').length < 1) {
        $(nav_previous).addClass('carousel_nav_disabled');
      } else {
        $(nav_previous).removeClass('carousel_nav_disabled');
      }
    }
    carousel_nav();
  });



 // Handle the magniication effect on carousel slides
 $('.carousel_slide').each(function(i, slide){

   // On mouse over...
   $(slide).mouseenter(function(){

    // Set the z-index huge so it's on top of everything!
    $(slide).css('zIndex','50');
    $(slide).parent('li').css('zIndex','50');
    $(slide).next('.carousel_shadow').css('zIndex','40');

    $('.carousel .left_inner_shim').css('left', ($('.carousel ul.slides > li.current').position().left - 15) + 'px').show();
    $('.carousel .right_inner_shim').css('left', ($('.carousel ul.slides > li.current').next().next().next().next().position().left) + 'px').show();
    $('.carousel .left_shim').hide();
    $('.carousel .right_shim').hide();

    // Animate the growing
    $(slide).animate({
      width: '190px',
      height: '260px',
      marginLeft: '-10px',
      marginRight: '-10px',
      marginTop: '-10px'
    }, 100);


    // Center the image, show the stars and reveal the shadow
    $(slide).find('.image img').animate({ left:'0px' }, 100);
    $(slide).find('.stars').show();
    $(slide).next('.carousel_shadow').show();
   });

   // On mouse out...
   $(slide).mouseleave(function(){

    $('.carousel .left_inner_shim').hide();
    $('.carousel .right_inner_shim').hide();
    $('.carousel .left_shim').show();
    $('.carousel .right_shim').show();

    // Animate the shrinking
    $(slide).animate({
      width: '170px',
      height: '240px',
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '0px'
    }, 100, function(){

      // Set the z-index back to normal
      $(slide).css('zIndex','10');
      $(slide).parent('li').css('zIndex','10');
      $(slide).next('.carousel_shadow').css('zIndex','0');

      // Refresh the UL to fix a stupid IE bug
      $(slide).parent().parent().hide().show();
    });


    // Center the image, remove the stars and hide the shadow
    $(slide).find('.image img').animate({ left:'-10px' }, 100);
    $(slide).find('.stars').hide();
    $(slide).next('.carousel_shadow').hide();
   });

 });




  // Find all upcoming events
  $('.upcoming_event').each(function(event_id, upcoming_event){

    // Bump the id by 1 (don't start at zero)
    event_id++;

    // Classify the event
    $(upcoming_event).addClass('upcoming_event_'+event_id);

    // Build numeric navigation
    var navigation = '';

    // Build an li a for each event
    _($('.upcoming_event').length).times(function(nav_id){
      nav_id++;
      active = (nav_id==event_id) ? 'active ' : '';
      navigation = '<li><a class="'+active+'upcoming_event_'+nav_id+'" href="#'+nav_id+'">'+nav_id+'</a></li>' + navigation;
    });

    // Insert this li a string into the event's once-empty ol
    $(upcoming_event).find('.event_image ol').html(navigation);

    $(upcoming_event).find('.event_image ol li a').css('line-height','18px');

    // Now for each li a, create a click event to show its corresponding event
    $(upcoming_event).find('.event_image ol li a').each(function(i, a){
      $(a).click(function(e){
        var current_event = '.' + a.className;
        $(current_event).show()
        $('.upcoming_event').not(current_event).hide()
        e.preventDefault();
      })
    })

    // Hide every event except the first
    if (event_id > 1) {
      $(upcoming_event).hide();
    }
  });


});
