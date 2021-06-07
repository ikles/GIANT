jQuery(document).ready(function( $ ) {

  $(".toggle-mnu").click(function() {
    $(this).toggleClass("on");
    $(".top-mnu").slideToggle('1000');
    return false;
  });

  $('body').click(function () {
    if( $(".toggle-mnu").hasClass("on") ){
      $(".toggle-mnu").removeClass("on");
      $(".top-mnu").fadeOut();
    }
  });

//top-ul


/*$('.filtr-card-img-w').replaceWith(function(){  
  return $("<a href='#' class='filtr-card-img-w filtr-card-img-w-2 lazy-bg-w'>"+$(this).html()+'</a>');
});*/

/*$('.filtr-card-txt-1').replaceWith(function(){  
  return $("<a href='#'' class='filtr-card-txt-1'>"+$(this).html()+'</a>');
});*/



$(".top-mnu, .modal-form__block").click(function (e) {
  e.stopPropagation();
});

$('.comp-rev .tabs_control_link').click(function (e) {
  e.preventDefault();

  var item = $(this).closest('.comp-rev .tabs_control_item'),
  contentItem = $('.comp-rev .tabs_content_item'),
  itemPosition = item.index();

  contentItem.eq(itemPosition)
  .add(item)
  .addClass('active')
  .siblings()
  .removeClass('active');

});


$('.icon-search').click(function (e) {
  e.preventDefault();
  $('.top-search-w').addClass('on');
  $('.overlay').fadeIn();
});

$('.overlay').click(function (e) {
  e.preventDefault();
  $(this).fadeOut();
  $('.top-search-w').removeClass('on');
});

/************************************/

/*$('.wrapper').prepend('<span class="eye-3"></span>');
let pg = parseInt(document.location.pathname.match(/\d+/))
$('body').addClass('active').css('background-image', "url('../img/"+pg+".jpg')");
$('body:not(.active)').css('background-image', "unset");

$('.eye-3').click(function (e) {
  e.preventDefault();  
  $('body').toggleClass('active');
  let pg = parseInt(document.location.pathname.match(/\d+/));
  $('body.active').css('background-image', "url('../img/"+pg+".jpg')");
  $('body:not(.active)').css('background-image', "unset");

});*/

/************************************/



$('div.lazy').lazy();


$('img.lazy').lazy({
  effect: "fadeIn",
  effectTime: 200,
  threshold: 0,  
});




if($(".comp-rev-col-2").length) {
  $(".comp-rev-col-2").mCustomScrollbar({
    axis: "y",
    theme: "dark-3",
    mouseWheel: 1,
    scrollInertia: '230'
  });
}



if ( $('.slider-container').length ) {
  new Swiper('.slider-container', {

    scrollbar: {
      el: '.swiper-scrollbar',      
      draggable: true
    },
    slidesPerView: 1,    
    simulateTouch: true,    
    touchRatio: 2,    
    touchAngle: 45,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {

      200: {   
        slidesPerView: 1, 
        spaceBetween: 0,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
    },

  });
}


if ( $('.club-container').length ) {
  new Swiper('.club-container', {

    scrollbar: {
      el: '.swiper-scrollbar',      
      draggable: true
    },
    slidesPerView: 1,    
    simulateTouch: true,    
    touchRatio: 2,    
    touchAngle: 45,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      1200: {
        slidesPerView: 2, 
        spaceBetween: 37,
        loop: true,
      },
      200: {
        slidesPerView: 1, 
        spaceBetween: 37,
        loop: true,
      },
    },

  });
}



if ( $('.calendar-it-container').length ) {
  new Swiper('.calendar-it-container', {

    scrollbar: {
      el: '.swiper-scrollbar',      
      draggable: true
    },
    slidesPerView: 4,    
    spaceBetween: 40,
    simulateTouch: true,    
    touchRatio: 2,    
    touchAngle: 45,    
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },

    breakpoints: {
      1367: {
        slidesPerView: 4, 
        spaceBetween: 40,
        loop: true,
      },      
      1200: {   
        slidesPerView: 3, 
        spaceBetween: 40,
        loop: false,

      },      
      641: {   
        slidesPerView: 2, 
        spaceBetween: 40,
        loop: true,

      },
      200: {   
        slidesPerView: 1,
        spaceBetween: 40,
        loop: true,

      },
    },

  });
}





if ( $('.privilege-slider-container').length ) {
  new Swiper('.privilege-slider-container', {

    scrollbar: {
      el: '.swiper-scrollbar',      
      draggable: true
    },
    slidesPerView: 4,    
    spaceBetween: 40,
    simulateTouch: true,    
    touchRatio: 2,    
    touchAngle: 45,    
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      993: {
        slidesPerView: 4, 
        spaceBetween: 40,
        loop: true,
      },      
      769: {   
        slidesPerView: 3, 
        spaceBetween: 30,
        loop: true,
      },
      641: {   
        slidesPerView: 2, 
        spaceBetween: 30,
        loop: true,
      },
      200: {   
        slidesPerView: 1, 
        spaceBetween: 40,
        loop: true,
      },
    },

  });
}


if( $('.route-graph-scroll').length ) {

  if( $(window).width() < 769 ) {
    $(".route-graph-scroll").mCustomScrollbar({
      axis: "x",
      theme: "dark-3",
      mouseWheel: 0,
      scrollInertia: '230'
    });    
  }

  if( $(window).width() > 768 ) {
    $(".route-graph-scroll").mCustomScrollbar("destroy");
  }


  $(window).resize(function() {
    if( $(window).width() < 769 ) {
      $(".route-graph-scroll").mCustomScrollbar({
        axis: "x",
        theme: "dark-3",
        mouseWheel: 0,
        scrollInertia: '230'
      });
    }
    if( $(window).width() > 768 ) {
      $(".route-graph-scroll").mCustomScrollbar("destroy");
    }
  });


} //


  //$("#phone_1").mask("+7 (999) 999-99-99");



  $('.link').click(function(e) {
    $('.modal-overlay_1').fadeIn();
    e.preventDefault();
    $('body').addClass('ohi');    
  });


  $('.pop-close, .modal-overlay').click(function(e) {
    e.preventDefault();
    $('.modal-overlay').fadeOut();
    $('body').removeClass('ohi');
  });

  if ($('[data-fancybox="gallery-1"]').length) {

    $('[data-fancybox="gallery-1"]').fancybox({
      arrows: true,
      infobar: false,
      smallBtn: true,
      toolbar: false,
      iframe : {
        css : {
          width : '950px'
        }
      },    
      slideClass: "myClass",
      baseClass: "myclass"
    });
  }





  let imgWrapper = document.querySelector('.img_wrapper');
  let imgWrapper2 = document.querySelector('.img_wrapper_2');
  let fileMulti = document.querySelector('#fileMulti-1');
  let fileMulti2 = document.querySelector('#fileMulti-2');

  
  function download(input) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      let img = document.createElement('img');
      img.src = reader.result;
      let linkImg = document.createElement('span');
      linkImg.classList.add('add-comp-col-1-l-img-w');
      linkImg.appendChild(img);
      //console.log(img);
      imgWrapper.appendChild(linkImg);
    //console.log(imgWrapper);
    removeImg();
  }
}

function download2(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    let img = document.createElement('img');
    img.src = reader.result;
    let linkImg = document.createElement('span');
    linkImg.classList.add('add-comp-col-1-l-img-w');
    linkImg.appendChild(img);
      //console.log(img);
      imgWrapper2.appendChild(linkImg);
    //console.log(imgWrapper);
    removeImg();
  }
}

function removeImg() {
  $('.add-comp-col-1-l-img-w').click(function () {
    this.remove();
  });  
}

removeImg();


if($('#fileMulti-1').length) {
  fileMulti.addEventListener("change", function() {
   download(this); 
 });
}


if($('#fileMulti-2').length) {
  fileMulti2.addEventListener("change", function() {
   download2(this); 
 });
}

$('.top-search').click(function (e) {
  e.preventDefault();
  $('.top-search-f').toggleClass('on');
  $('.top-right-link').toggleClass('off');
});



$('.back-s').click(function (e) {
  e.preventDefault();
  $('.top-search-f').removeClass('on');
  $('.top-right-link').removeClass('off');
})



/*$('select').fancySelect();*/

$('select').select2({
  minimumResultsForSearch: -1
});

}); //ready

