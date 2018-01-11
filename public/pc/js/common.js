/**
 * Created by 伍 on 2018/1/11.
 */
;(function(){
//  二级菜单动画
$(".category").on("click",function(){
  $(".second-ul").slideToggle();
});
  $(".icon-menu").on("click",function(){
    $(".le_aside").toggleClass("now");
    $(".le_main").toggleClass("now");
  });
  $(".icon-loginout").on("click",function(){
    //$.ajax({
    //  type:"get",
    //  url:"/employee/employeeLogout",
    //  success:function(info){
    //    //console.log(info);
    //    if(info.success){
    //      location.href="login.html";
    //    }
    //  }
    //})
  });
})();
