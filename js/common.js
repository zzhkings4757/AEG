//阻止默认事件
function stopDefault(e) {
  var e = arguments.callee.caller.arguments[0] || event;
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }
  return false;
};

//阻止冒泡事件
function stopBubble(e) {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    window.event.cancelBubble = true;
  }
};


//下拉选择框
$('.select-group').on('click', function (e) {
  stopBubble(e);
  $('.select-group').not(this).removeClass('select-on');
  $(this).toggleClass('select-on');
});

$('body').on('click', function () {
  $('.select-group').removeClass('select-on');
});

$('.select-group').on('click', 'li', function () {
  var parent = $(this).parents('.select-group');
  var text = parent.find('.text-label');
  var input = parent.find('input');
  var html = $(this).html();
  var val = $(this).attr('data-value');
  text.html(html);
  input.val(val);
});


//回到顶部
var windowHeight = $(window).height();
$(window).on('scroll', function () {
  if ($(this).scrollTop() > windowHeight) {
    $('.page-backtop').addClass('backtop-show')
  } else {
    $('.page-backtop').removeClass('backtop-show')
  }
});

$('.page-backtop').on('click', function () {
  $('html,body').animate({
    scrollTop: 0
  }, 300)
})


//获取元素距离顶部的距离
function gerSectionTop(elem, arr) {
  var imgSrc = [];
  var imgs = [];
  var c = 0;
  $('img').each(function (i, el) {
    imgSrc.push($(el).attr('src'));
  });
  for (var i = 0; i < imgSrc.length; i++) {
    imgs[i] = new Image();
    imgs[i].src = imgSrc[i];
    imgs[i].onload = function () {
      c++
      if (c == imgSrc.length) {
        $(elem).each(function (i, el) {
          var top = $(el).offset().top;
          arr.push(top);
        })
      }
    }
  }
}


//菜单控制
$('.nav-list').on('click', 'li', function (e) {
  stopBubble(e);
  $(this).toggleClass('on').siblings().removeClass('on');
  $(this).find('.nav-drop').slideToggle(300);
  $(this).siblings().find('.nav-drop').slideUp(300);
});
$('.menu-btn').on('click', function () {
  $('.nav').addClass('nav-show')
});
$('.nav-close').on('click', function () {
  $('.nav').removeClass('nav-show')
})



//搜索框控制
$('.hd-search').on('click', function (e) {
  stopBubble(e);
  $('.search-group').slideToggle();
});

$('.search-group').on('click', function (e) {
  stopBubble(e);
})

$('body').on('click', function () {
  $('.nav-drop').slideUp();
  $('.nav-list li').removeClass('on')
})

//监听回车提交表单
document.onkeyup = function (e) {
  var e = event || window.event;
  if (e && e.keyCode == 13 && $('.search-group input').is(':focus')) {
    $('.search-group form').submit()
  }
}



//设置视频高度
function setVideoSize(elem) {
  function setSzie() {
    var w = $(window).width();
    if ($(window).width() <= 768) {
      $(elem).height(w * 1080 / 1920)
    }
  }
  setSzie();
  $(window).resize(function () {
    setSzie();
  })
}




//******  2020319新增  ******/
//获取手机验证码
$('.getCode').each(function (i, el) {
  var box = $(el);
  var btn = box.find('.getCodeBtn');
  box.timer = null;
  box.judge = true;
  box.count = 60;
  btn.on('click', function () {
    if (box.judge) {
      box.judge = false;
      btn.addClass('on-send');
      btn.html(box.count + 's后可重发');
      box.timer = setInterval(function () {
        box.count--;
        btn.html(box.count + 's后可重发');
        if (box.count == 0) {
          clearInterval(box.timer);
          box.timer = null;
          box.count = 60;
          box.judge = true;
          btn.removeClass('on-send');
          btn.html('获取验证码');
        }
      }, 1000);
    }
  })
});


//登录注册弹窗控制
$('.user-login').on('click',function(){
  $('.login-box').show();
  $('.login-popup').fadeIn();
});

$('.to-register').on('click',function(){
  $('.login-box').hide();
  $('.register-box').fadeIn();
});

$('.fast-login').on('click',function(){
  $('.login-box').fadeIn();
  $('.register-box').hide();
});

$('.popup-close').on('click',function(){
  $('.popup,.user-box').fadeOut();
})