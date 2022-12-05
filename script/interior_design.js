//클래스
class Litho {
  init(){
    this.header();
    this.section1();
    this.section2();
    this.section3();
  }
  header(){
    let oldScr = 0;
    let newScr = 0;
    let scrP = null;
    //scroll event
    $(window).scroll(function(e){
      newScr = $(window).scrollTop();

      if (newScr>oldScr){scrP = 'DOWN';}
      if (newScr<oldScr){scrP = 'UP';}
      //console.log(scrP);

      if ($(window).scrollTop() ===0){
        $('#header').removeClass('on');
      }
      else {
        $('#header').addClass('on');
        if (scrP==='DOWN'){$('#header').addClass('up');}
        if (scrP==='UP'){$('#header').removeClass('up');}
      }
      oldScr = newScr;
   });
    
    $('#nav .main-btn').on({
      mouseenter(){
        $('#nav .sub').stop().hide();
        $(this).next().stop().show();
      }
    });

    $('#nav .sub-btn').on({
      mouseenter(){
        $('#nav .sub-sub').stop().hide();
        $(this).next().stop().show();
      }
    });

    $('#nav .sub-sub-btn').on({
      mouseenter(){
        $('#nav .sub-sub-sub').stop().hide();
        $(this).next().stop().show();
      }
    });

    $('#nav > ul > li').on({
      mouseleave(){
        $('#nav .sub').stop().hide();
        $('#nav .sub-sub').stop().hide();
        $('#nav .sub-sub-sub').stop().hide();
      }
    });

    // 모바일 메뉴
    $('#mobile-menu').on({
      click(e){
        e.preventDefault();
        $('#mobile-menu .bar').toggleClass('on');
        $('.mobile-box').slideToggle(300);
      }
    });

    $('#mobile-nav .main-btn').on({
      click(e){
        e.preventDefault();
        $(this).find('img').toggleClass('on');
        $(this).next().slideToggle(300);
        $('#mobile-nav').toggleClass('on');
      }
    });

  }
  section1(){
    let cnt=0;
    let setId=0;
    const $slideWrap= $('#section1 .s-wrap');
    
    function mainSlide(){
      $slideWrap.stop().animate({left:`${-100*cnt}%`}, 600, 'easeInOutExpo', function(){
        if (cnt>2){cnt=0}
        if (cnt<0){cnt=2}
        $slideWrap.stop().animate({left:`${-100*cnt}%`}, 0);
      });
    }
    function nextCount(){
      cnt++;
      mainSlide();
    }
    function prevCount(){
      cnt--;
      mainSlide();
    }
    function autoTimer(){
      setId = setInterval(nextCount, 4000);
    }
    autoTimer();

    $('.prev-btn').on({
      click(e){
        e.preventDefault();
        if(!$slideWrap.is(':animated')){prevCount();}
        clearInterval(setId);
      }
    });
    $('.next-btn').on({
      click(e){
        e.preventDefault();
        if(!$slideWrap.is(':animated')){nextCount();}
        clearInterval(setId);
      }
    });

    //터치 스와이프
    let touchStart = null;
    let touchEnd = null;
    let dragStart = null;
    let dragEnd = null; //드래그는 반드시 마우스다운 시에만 드래그시작으로 간주
    let mouseDown = false;
    let winW = $(window).width(); //터치할 때마다 창 너비 가져와서 변수에 저장

    $slideWrap.on({
      mousedown(e){ //터치시작
        touchStart = e.clientX;
        dragStart = e.clientX - $slideWrap.offset().left-winW;
        mouseDown = true;
        clearInterval(setId);
      },
      mouseup(e){ //터치끝
        touchEnd = e.clientX;
        //console.log(touchStart-touchEnd); //양수면 nextSlide
        if (touchStart-touchEnd>30){
          if(!$slideWrap.is(':animated')){nextCount();}
        }
        else {
          if(!$slideWrap.is(':animated')){prevCount();}
        }
        mouseDown=false; //드래그 끝
      },
      mousemove(e){
        if (mouseDown !== true){return;} //if (!mouseDown) return;
        dragEnd = e.clientX;
        $slideWrap.css({left: dragEnd-dragStart});
      },
      mouseleave(e){
        if (mouseDown !== true){return;}

        touchEnd = e.clientX;
        if (touchStart-touchEnd>30){
          if(!$slideWrap.is(':animated')){nextCount();}
        }
        else {
          if(!$slideWrap.is(':animated')){prevCount();}
        }
        mouseDown=false; //드래그 끝
      }
    });
  }
  section2(){
    const s1Top = $('#section1').offset().top+400;
    $(window).scroll(function(){
      if( $(window).scrollTop() > s1Top ){
         $('#section2').addClass('on');
      }
   });
  }
  section3(){
    let cnt=0;
    let setId=0;
    const $slideWrap= $('#section3 .s-wrap');
    let slideWidth = $('#section3 .slide').innerWidth();

    //////////////////// 반응형 슬라이드
    resizeSlide(); // 홈페이지 로딩시 실행
    function resizeSlide(){
      slideWidth = $('#section3 .slide').innerWidth();
      mainSlide();
    }
    //창너비 높이 변경되면 즉시 실행
    $(window).resize(function(){
      resizeSlide();
    });
    
    function mainSlide(){
      $slideWrap.stop().animate({left:`${-slideWidth*cnt}px`}, 600, 'easeInOutExpo', function(){
        if (cnt>3){cnt=0}
        if (cnt<0){cnt=3}
        $slideWrap.stop().animate({left:`${-slideWidth*cnt}px`}, 0);
      });
    }
    function nextCount(){
      cnt++;
      mainSlide();
    }
    function prevCount(){
      cnt--;
      mainSlide();
    }
    function autoTimer(){
      setId = setInterval(nextCount, 4000);
    }
    autoTimer();

    $('.prev-btn').on({
      click(e){
        e.preventDefault();
        if(!$slideWrap.is(':animated')){prevCount();}
        clearInterval(setId);
      }
    });
    $('.next-btn').on({
      click(e){
        e.preventDefault();
        if(!$slideWrap.is(':animated')){nextCount();}
        clearInterval(setId);
      }
    });

    //터치 스와이프
    let touchStart = null;
    let touchEnd = null;
    let dragStart = null;
    let dragEnd = null; //드래그는 반드시 마우스다운 시에만 드래그시작으로 간주
    let mouseDown = false;

    $slideWrap.on({
      mousedown(e){ //터치시작
        touchStart = e.clientX;
        dragStart = e.clientX - $slideWrap.offset().left-slideWidth;
        mouseDown = true;
        clearInterval(setId);
      },
      mouseup(e){ //터치끝
        touchEnd = e.clientX;
        //console.log(touchStart-touchEnd); //양수면 nextSlide
        if (touchStart-touchEnd>30){
          if(!$slideWrap.is(':animated')){nextCount();}
        }
        else {
          if(!$slideWrap.is(':animated')){prevCount();}
        }
        mouseDown=false; //드래그 끝
      },
      mousemove(e){
        if (mouseDown !== true){return;} //if (!mouseDown) return;
        dragEnd = e.clientX;
        $slideWrap.css({left: dragEnd-dragStart});
      },
      mouseleave(e){
        if (mouseDown !== true){return;}

        touchEnd = e.clientX;
        if (touchStart-touchEnd>30){
          if(!$slideWrap.is(':animated')){nextCount();}
        }
        else {
          if(!$slideWrap.is(':animated')){prevCount();}
        }
        mouseDown=false; //드래그 끝
      }
    });
  }
}
const newLitho = new Litho();
newLitho.init();