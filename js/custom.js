$(function () {
  //-----header------- hover
  $('header').mouseover(function () {
    $(this).addClass('active');
  });
  $('header').mouseleave(function () {
    $(this).removeClass('active');
  });

  // skip menu
  $('.skip a').on('focus', function () {
    $(this).stop().animate({ top: 0, opacity: 1 });
  });
  $('.skip a').on('click', function () {
    $(this).stop().animate({ top: '-30px', opacity: 0 });
  });
  $('.skip a').on('focusout', function () {
    $(this).stop().animate({ top: '-30px', opacity: 0 });
  });

  //-----toggle btn--------
  $('.toggle').click(function () {
    $(this).toggleClass('active');
  });
  //-----toggle depth2 나타나게--------

  $('.toggle_menu .depth1').mouseenter(function () {
    $('.toggle_menu .depth1').removeClass('active');
    $(this).addClass('active');
  });
  // #main plus hover
  $('.plus').mouseover(function () {
    $(this).find('.plus_hover').addClass('active');
  });
  $('.plus').mouseleave(function () {
    $(this).find('.plus_hover').removeClass('active');
  });

  $('.header_menu > li').mouseover(function () {
    $(this).find('.two_depth').addClass('active');
  });
  $('.header_menu > li').mouseleave(function () {
    $(this).find('.two_depth').removeClass('active');
  });
  $('.lang_btn').click(function () {
    $(this).find('ul').slideToggle();
  });

  // 배경 애니메이션
  // if ($('#slider').hasClass('visible')) {
  //   $('#slider').find('.slider').addClass('active');
  // } //왜 안돼..?

  //----- #slider - main slider-------
  var currentIndex = 0;
  var slides = $('.slides');
  var slideCount = $('.slide').length;
  var slideThumb = $('.thumb_img > li');

  slides.children('div:gt(0)').hide();
  var Interval = setInterval(function () {
    var nextIndex = (currentIndex + 1) % slideCount;
    $('.slide').fadeOut();
    $('.slide').eq(nextIndex).fadeIn();
    slideThumb.removeClass('active');
    slideThumb.eq(nextIndex).addClass('active');
    currentIndex = nextIndex;
  }, 3000);

  //thumb이미지 클릭
  slideThumb.click(function () {
    slideThumb.removeClass('active');
    $(this).addClass('active');
    var idx = $(this).index();
    $('.slide').hide();
    $('.slide').eq(idx).stop().show();
    //모달창 나타나게
    $('.modal').addClass('active');
  });

  ///// gototop button

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      $('.gototop').addClass('active');
    } else {
      $('.gototop').removeClass('active');
    }
  });

  // Smooth Scrolling
  $('.gototop').click(function (e) {
    e.preventDefault();
    $.scrollTo(this.hash || 0, 900);
  });

  // slick js - history
  $('.history-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // slick js - project photo
  $('.project-photo').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  });

  //slick js - modal dots에 이미지 넣기
  var imgSrc = [];
  var $modalSlides = $('.modal_img');
  $('.modal_inner').slick({
    fade: true,
    dots: true,
  });
  var modalSlider = $('.modal_img');
  var modalDots = $('.modal .slick-dots > li');
  modalSlider.each(function () {
    var $this = $(this);
    imgSrc.push($this.find('img').attr('src'));
  }); //modalSlider each

  $('.modal .slick-dots > li').each(function () {
    var $thisLi = $(this);
    var idx = $thisLi.index();
    var $ImgCurrentSrc = imgSrc[idx];
    $thisLi.prepend('<img src="' + $ImgCurrentSrc + '" alt="item1_modal" />');
  }); //$('.slick-dots > li').each

  //modal - X버튼 클릭하면 닫히게
  $('.modal_del').click(function () {
    $('.modal').removeClass('active');
  });
  //숫자 애니메이션
  var $counterData = $('.facility_inner .list_item .list_num');
  var $facilityExecuted = false;
  if ($('#facility').length) {
    if (!$facilityExecuted) {
      $('.facility_inner').mouseenter(function () {
        $.NumAnimation = $counterData.each(function () {
          var $current = $(this);
          var $target = $current.attr('data-num');
          //animate, progress, rate

          $({ rate: 0 }).animate(
            { rate: $target },
            {
              duration: 2000,
              progress: function () {
                var now = this.rate;
                $current.text(Math.ceil(now));
              }, //Math.ceil() -> 올림함수
            }
          );
        }); //each
      }); //mouseenter
      $facilityExecuted = true;
    } //if
  }

  //-------------------------- SUBPAGE --------------------------------------
  // PRODUCT 모달창
  var $ProductItem = $('.product_item');
  if ($ProductItem.length) {
    $ProductItem.mouseover(function () {
      $ProductItem.removeClass('active');
      $(this).addClass('active');
    });
    $ProductItem.click(function () {
      $('.modal').addClass('active');
    });
  }

  // 품질보증 - QMS SLIDE
  var $qlySlideWrap = $('.qly_slide_list');
  var $qlySlide = $('.qly_slide_list li');
  var $qlyBtn = $('.qly_slide_dots span');
  var $qlyCurrentIdx = 0;
  var $qlySlideNum = $qlySlide.length;

  $qlySlideWrap.children('li:gt(0)').hide();
  $qlyBtn.eq(0).addClass('active');
  setInterval(function () {
    if ($qlyCurrentIdx < $qlySlideNum - 1) {
      $qlyCurrentIdx++;
    } else {
      $qlyCurrentIdx = 0;
    }
    $qlySlide.fadeOut(300);
    $qlySlide.eq($qlyCurrentIdx).fadeIn(300);
    $qlyBtn.removeClass('active');
    $qlyBtn.eq($qlyCurrentIdx).addClass('active');
  }, 2500);

  $qlyBtn.click(function () {
    $qlyBtn.removeClass('active');
    $(this).addClass('active');
    $qlnBtnIdx = $(this).index();
    $qlySlide.fadeOut();
    $qlySlide.eq($qlnBtnIdx).fadeIn();
    $qlyCurrentIdx = $qlnBtnIdx;
  });
  //////스크롤이벤트 /////
  $(window).scroll(function () {
    var $wScroll = $(this).scrollTop();
    //about innotech

    var $idologyList = $('.ideology_list');
    if ($idologyList.length) {
      if ($wScroll >= $idologyList.offset().top - 700) {
        $idologyList.find('li').each(function () {
          $(this).addClass('on');
        });
      }
    }
    // about - history
    var $history = $('.history_wrap ul li');
    if ($history.length) {
      $history.each(function () {
        $historyOffset = $(this).offset().top;
        if ($wScroll >= $historyOffset - 700) {
          $(this).addClass('on');
        }
      });
    }
    // about - partners
    var $partners = $('.partners_list > div');
    if ($partners.length) {
      $partners.each(function () {
        $partnersOffset = $(this).offset().top;
        if ($wScroll >= $partnersOffset - 700) {
          $(this).addClass('on');
        }
      });
    }
    // technology - 연구개발
    var $capability = $('.capa_content');
    var $facility = $('.facility_inner');
    var $quality = $('.quality_inner');

    if ($capability.length) {
      if ($wScroll >= $facility.offset().top - 700) {
        $facility.addClass('on');
        $capability.addClass('on');
        if (!$facilityExecuted) {
          $.NumAnimation = $counterData.each(function () {
            var $current = $(this);
            var $target = $current.attr('data-num');
            //animate, progress, rate

            $({ rate: 0 }).animate(
              { rate: $target },
              {
                duration: 2000,
                progress: function () {
                  var now = this.rate;
                  $current.text(Math.ceil(now));
                }, //Math.ceil() -> 올림함수
              }
            );
          }); //each

          $facilityExecuted = true;
        } //if
      }

      if ($wScroll >= $capability.offset().top - 700) {
        $capability.addClass('on');
      }
      if ($('.quality_inner').length) {
        if ($wScroll >= $quality.offset().top - 700) {
          $quality.addClass('on');
        }
      } //technology - 연구개발 끝
    } // technology - 주요설비(equipment)
    if ($quality.length) {
      if ($wScroll >= $quality.offset().top - 700) {
        $quality.addClass('on');
      }
      if ($wScroll >= $facility.offset().top - 700) {
        $facility.addClass('on');
        $capability.addClass('on');
        if (!$facilityExecuted) {
          $.NumAnimation = $counterData.each(function () {
            var $current = $(this);
            var $target = $current.attr('data-num');
            //animate, progress, rate

            $({ rate: 0 }).animate(
              { rate: $target },
              {
                duration: 2000,
                progress: function () {
                  var now = this.rate;
                  $current.text(Math.ceil(now));
                }, //Math.ceil() -> 올림함수
              }
            );
          }); //each

          $facilityExecuted = true;
        } //if
      }
    } //technology - 주요설비(equipment) 끝

    // QMS - 품질보증
    var $qlyMng = $('.qly_mng');
    var $qlyEnv = $('.qly_env');
    if ($('.qly_content_top').length) {
      if ($wScroll >= $qlyMng.offset().top - 700) {
        $qlyMng.addClass('on');
      }

      if ($wScroll >= $qlyEnv.offset().top - 700) {
        $qlyEnv.addClass('on');
      }
    } //QMS - 품질보증 끝

    //talnet - recruit (인재상)
    var $guide = $('.guide');
    if ($guide.length) {
      if ($wScroll >= $guide.offset().top - 700) {
        $guide.addClass('on');
      }
    }
  }); //window scroll

  // QMS - 인증현황 - 모달
  if ($('.certi_modal').length) {
    var $certiModal = $('.certi_modal');
    var $certiModalImg = $certiModal.find('.certi_modal_img');
    var $certiModalTit = $certiModal.find('p');
    var $certiList = $('.certifi_list li a');
    $certiList.click(function (e) {
      e.preventDefault();
      var $certiImg = $(this).find('img').clone();
      var $certiListTit = $(this).find('.certifi_tit').text();
      $certiModalImg.append($certiImg);
      $certiModalTit.text($certiListTit);
      $certiModal.addClass('show');
    });
    $certiModal.find('.close').click(function () {
      $certiModal.removeClass('show');
      $certiModalImg.find('img').remove();
    });
    $certiModal.find('.certi_modal_bg').click(function () {
      $certiModal.removeClass('show');
      $certiModalImg.find('img').remove();
    });
  }

  //------------ footer ------------
  $('.family_site_open_btn').click(function (e) {
    e.preventDefault();
    $(this).next('ul').slideToggle();
  });
});
