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
$('.select-group').on('click',function(e){
  stopBubble(e);
  $('.select-group').not(this).removeClass('select-on');
  $(this).toggleClass('select-on');
});

$('body').on('click',function(){
  $('.select-group').removeClass('select-on');
});

$('.select-group').on('click','li',function(){
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
$(window).on('scroll',function(){
  if($(this).scrollTop()>windowHeight){
    $('.page-backtop').addClass('backtop-show')
  }else{
    $('.page-backtop').removeClass('backtop-show')
  }
});

$('.page-backtop').on('click',function(){
  $('html,body').animate({
    scrollTop: 0
  },300)
})