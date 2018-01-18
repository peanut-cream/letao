/**
 * Created by 伍 on 2018/1/18.
 */
$(function(){
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function(info){
      console.log(info);
      if(info.error=== 400){
        location.href = "login.html";
      }
      $(".userinfo").html( template("temp", info) );

    }
  });


  $(".btn_logout").on("click", function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      success: function (info) {
        if (info.success) {
          location.href = "login.html";
        }
      }
    });
  });


});