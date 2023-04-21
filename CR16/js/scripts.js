$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};


    //popups
    let popupCurrent;
    $('.js-popup-open').on('click', function () {
        $('.popup-outer-box').removeClass('active');
        $('body').addClass('popup-open');
        popupCurrent = $(this).attr('data-popup');
        $('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
        return false;
    })
    $('.js-popup-close').on('click', function () {
        $('body').removeClass('popup-open');
        $('.popup-outer-box').removeClass('active');
        return false;
    })
    
    
    //help
    $('.js-help .help-ico').on('click', function() {
        $('.js-help.active').removeClass('active');
        $(this).parent('.js-help').addClass('active');
        $('body').addClass('help-open');
    })
    $('.js-help-close').on('click', function() {
        $(this).parents('.js-help').removeClass('active');
        $('body').removeClass('help-open');
        return false;
    })
    $('.elm-overlay').on('click', function() {
        $('.js-help.active').removeClass('active');
        $('body').removeClass('help-open');
        return false;
    })


    //item-tile-video
    $('.js-btn-video').on('click', function () {
        let videoURL = $(this).parent('.item-tile-video').attr('data-video');
        $(this).parents('.item-tile-video').addClass('active');
        $(this).parents('.item-tile-video').append('<iframe width="100%" height="100%" src="' + videoURL + '" frameborder="0" allowfullscreen></iframe>')
        return false;
    })
    
    


    //swipebox
    $('[data-swipebox]').swipebox();


    if (!!$('.header').offset()) {
        var stickyTop = $('.wrap').offset().top + 700;
        $(window).scroll(function () {
            var windowTop = $(window).scrollTop();
            if (stickyTop < windowTop) {
                $('.wrap').addClass('header-fixed');
            } else {
                $('.wrap').removeClass('header-fixed');
            }
        });
    }
    if (!!$('.main-menu-box.menu-top').offset()) {
        var menuStickyTop = $('.wrap').offset().top + $('.main-menu-box.menu-top').outerHeight();
        $(window).scroll(function () {
            var menuWindowTop = $(window).scrollTop();
            if (menuStickyTop < menuWindowTop) {
                $('.wrap').addClass('menu-fixed');
            } else {
                $('.wrap').removeClass('menu-fixed');
            }
        });
    }


    //popup block
    $('.js-popup-wrap .js-btn-toggle').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('menu-show');
            $('.js-popup-wrap').removeClass('popup-right');
        } else {
            $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
            $(this).addClass('active');
            if ($(this).parent().hasClass('main-menu-wrap')) {
                $('body').addClass('menu-show');
            }
            pLeft = $(this).parent('.js-popup-wrap').find('.js-popup-block').offset().left;
            pWidth = $(this).parent('.js-popup-wrap').find('.js-popup-block').outerWidth();
            pMax = pLeft + pWidth;
            if ( pMax > $('.wrap').width() ) {
                $(this).parent('.js-popup-wrap').addClass('popup-right');
            } else {
                $('.js-popup-wrap').removeClass('popup-right');
            }
        }
        return false;
    })
    $('.js-popup-wrap .js-btn-close').on('click', function() {
        $(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
        $('body').removeClass('menu-show');
        return false;
    })
    $(document).click(function(event) {
        if ($(event.target).closest(".js-popup-block").length) return;
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
        $('body').removeClass('menu-show');
        event.stopPropagation();
    });
    $('.js-popup-wrap').each(function() {
        if ($(this).hasClass('js-popup-select')) {
            if ($(this).find('.js-popup-block').find('.active').length>0) {
                $(this).find('.js-btn-toggle').addClass('selected');
                var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                $(this).find('.js-btn-toggle').children('.button-title').html(currentSelect);
            } else {
                $(this).find('.js-btn-toggle').removeClass('selected');
            }
        }
    })
    $('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
        if ($(this).hasClass('active')) {} else {
            $(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tab-block').removeClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.js-popup-block').find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        $('.js-popup-wrap').each(function() {
            if ($(this).hasClass('js-popup-select')) {
                if ($(this).find('.js-popup-block').find('.active').length>0) {
                    $(this).find('.js-btn-toggle').addClass('selected');
                    var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                    $(this).find('.js-btn-toggle').children('.button-title').html(currentSelect);
                } else {
                    $(this).find('.js-btn-toggle').removeClass('selected');
                }
            }
        })
        $(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
        return false;
    })

    //tabs
    $('.js-tabs-nav').each(function() {
        $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
    })
    $('.js-tab-title').each(function() {
        if ($(this).hasClass('active')) {
            $(this).next('.js-tab-content').show(0);
        }
    })
    $('.js-tabs-nav').on('click', 'a[data-tab]', function() {
        if ($(this).hasClass('active')) {} else {
            $('.js-tab-block').removeClass('active');
            $(this).parents('.js-tabs-nav').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        return false;
    })
    $('.js-tab-title').on('click' , function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next('.js-tab-content').slideUp(200);
        } else {
            $(this).addClass('active').next('.js-tab-content').slideDown(200);
        }
    })


    //gallery slider
    if (!!$('.overview-media-box').offset()) {
        let pSlider = $('.overview-media-box .slider-wrap .slider').slick({
            dots: false,
            slidesToShow: 1,
            infinite: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
        });
        $('.overview-media-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $('.overview-media-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
            $('.overview-media-box .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
        });
        $('.overview-media-box .slider-preview-wrap .slider .elm-photo').click(function () {
            let newSlide = $(this).attr('data-slide');
            $('.overview-media-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
            $(this).parent().addClass('active');
            $('.overview-media-box .slider-wrap .slider').slick('slickGoTo', newSlide);
            return false;
        })
        $('.overview-media-box .elm-photo[data-slide="0"]').parent('.sl-wrap').addClass('active');
    }
    $('.slider-outer-wrap .slider-nav-wrap .ico-arrow-prev').on('click', function () {
        $(this).parents('.slider-outer-wrap').find('.slider-wrap').find('.ico-arrow-prev').click();
        return false;
    })
    $('.slider-outer-wrap .slider-nav-wrap .ico-arrow-next').on('click', function () {
        $(this).parents('.slider-outer-wrap').find('.slider-wrap').find('.ico-arrow-next').click();
        return false;
    })
    
    
    //main menu box scroll
    if ($('.main-menu-box').offset()) {
        $('.main-menu-box').each(function() {
            let currentElement = $(this).find('.menu');
            let currentElementRightPos = (currentElement.find('li:last').offset().left)+currentElement.find('li:last').width();
            let currentElementInnerWidth = (currentElement.width()+64);
            let currentElementLeft = currentElement.scrollLeft();
            if (currentElementLeft > 0) {
                $(this).find('.button-menu-prev').addClass('active');
            } else {
                $(this).find('.button-menu-prev').removeClass('active');
            }
            if (currentElementRightPos >= currentElementInnerWidth) {
                $(this).find('.button-menu-next').addClass('active');
            } else {
                $(this).find('.button-menu-next').removeClass('active');
            }
        })
        $('.main-menu-box .menu').scroll(function() {
            let currentElement = $(this);
            let currentElementRightPos = (currentElement.find('li:last').offset().left)+currentElement.find('li:last').width();
            let currentElementInnerWidth = (currentElement.width()+64);
            let currentElementLeft = currentElement.scrollLeft();
            if (currentElementLeft > 0) {
                $(this).parents('.main-menu-box').find('.button-menu-prev').addClass('active');
            } else {
                $(this).parents('.main-menu-box').find('.button-menu-prev').removeClass('active');
            }
            if (currentElementRightPos >= currentElementInnerWidth) {
                $(this).parents('.main-menu-box').find('.button-menu-next').addClass('active');
            } else {
                $(this).parents('.main-menu-box').find('.button-menu-next').removeClass('active');
            }
        })
        $('.main-menu-box .button-menu-prev').on('click', function() {
            let currentElement = $(this).parents('.main-menu-box').find('.menu');
            let currentElementLeft = currentElement.scrollLeft() - 300;
            console.log(currentElementLeft)
            currentElement.animate({scrollLeft: currentElementLeft}, 800);
            return false;
        })
        $('.main-menu-box .button-menu-next').on('click', function() {
            let currentElement = $(this).parents('.main-menu-box').find('.menu');
            let currentElementLeft = currentElement.scrollLeft() + 300;
            console.log(currentElementLeft)
            currentElement.animate({scrollLeft: currentElementLeft}, 800);
            return false;
        })
    }
    
});


