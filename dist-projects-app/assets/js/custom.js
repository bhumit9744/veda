// goToTop
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('#scroll').fadeIn();
    } else {
        $('#scroll').fadeOut();
    }
});
$('#scroll').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});

// HEADER ON SCROLL CHANGE
$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        var $pad = $(".nav-link");
        $pad.toggleClass('line-set', $(this).scrollTop() > $nav.height());
    });
});

// SCROLLING NAV
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location
            .hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 56)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 100
    });

})(jQuery); // End of use strict

// lightGallery
$(document).ready(function () {
    $("#lightgallery, #lightgallery2, #locapop").lightGallery({
        share: false,
        actualSize: false,
        thumbnail:false,
        download:false,
        autoplay:false,
        loop:false,
        closable:false,
        hideControlOnEnd:true,
        autoplayControls:false
    });
    $(".video").lightGallery({
        share: false,
        actualSize: false,
        thumbnail:false,
        download:false,
        autoplay:false,
        loop:false,
        closable:false,
        hideControlOnEnd:true,
        autoplayControls:false
    });
    $("#floor-plan-gallery").lightGallery({
        share: false,
        actualSize: false,
        thumbnail:false,
        download:false,
        autoplay:false,
        loop:false,
        closable:false,
        hideControlOnEnd:true,
        autoplayControls:false
    });
    $(".fplans").lightGallery({
        selector: '.item',
        share: false,
        actualSize: false,
        galleryId: 1,
        thumbnail:false,
        download:false,
        autoplay:false,
        loop:false,
        closable:false,
        hideControlOnEnd:true,
    });
    $('.owl-three').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        margin: 0,
        responsiveClass: true,
        smartSpeed: 1200,
        smartSpeed: 1500,
        autoplay: false,
       //  slideTransition: 'linear',
      //   autoplayTimeout: 1000,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            600: {
                items: 2,
                margin: 10
            },
            1000: {
                items: 3,
                margin: 20,
            }
        }
    });
    $('.owl-two').owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        margin: 0,
        responsiveClass: true,
        smartSpeed: 1200,
        smartSpeed: 1500,
        autoplay: false,
        // slideTransition: 'linear',
        // autoplayTimeout: 1000,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            600: {
                items: 2,
                margin: 10
            },
            1000: {
                items: 2,
                margin: 20,
            }
        }
    });

});
//  const pagelaod  = localStorage.getItem("pageload");
//         if (pagelaod === "yes"){
//             $('#onload-form').modal('hide');
//         }else{
//             // $(window).on('load',function(){
//                 $('#onload-form').modal('show');
//             // });
//         }
// SLIDER INIT
$('.multi-item-carousel').on('slide.bs.carousel', function (e) {
    let $e = $(e.relatedTarget),
        itemsPerSlide = 3,
        totalItems = $('.carousel-item', this).length,
        $itemsContainer = $('.carousel-inner', this),
        it = itemsPerSlide - (totalItems - $e.index());
    if (it > 0) {
        for (var i = 0; i < it; i++) {
            $('.carousel-item', this).eq(e.direction == "left" ? i : 0).
            // append slides to the end/beginning
            appendTo($itemsContainer);
        }
    }
});



