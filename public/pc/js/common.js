/**
 * Created by 伍 on 2018/1/11.
 */
;(function(){
  //  进度条
  NProgress.configure({ showSpinner: false });
  $(window).ajaxStart(function(){
    NProgress.start();
  });
  $(window).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },1000);
  });

if(location.href.indexOf("login.html")==-1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function(info){
      if(info.error){
        location.href="login.html";
      }
    }
  })
}


//  二级菜单动画
$(".category").on("click",function(){
  $(".second-ul").slideToggle();
});
  $(".icon-menu").on("click",function(){
    $(".le_aside").toggleClass("now");
    $(".le_main").toggleClass("now");
    $(".header").toggleClass("active");
  });
  $(".icon-loginout").on("click",function(){
    $('#modal').modal("show");
  });
  $(".btn-loginout").on("click",function(){
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function(info){
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })

})();
