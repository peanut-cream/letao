/**
 * Created by 伍 on 2018/1/18.
 */
$(function(){
  $(".btn_vcode").on("click",function(){
    var $this=$(this);
    $this.prop("disabled",true).addClass("disabled").text("发送中...");
    $.ajax({
      type:"get",
      url:"/user/vCode",
      success:function(info){
        console.log(info.vCode);
        var count=5;
        var time=setInterval(function(){
          count--;
          $this.text(count+"再次发送");
          if(count==0){
            clearInterval(time);
            $this.prop("disabled",false).removeClass("disabled").text("再次发送");
          }
        },1000)
      }
    })
  })

//  注册验证
  $(".btn_register").on("click",function(e){
    e.preventDefault();
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repassword = $("[name='repassword']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();

    if(!username){
      mui.toast("请输入用户名");
      return false;
    }

    if(!password){
      mui.toast("请输入密码");
      return false;
    }

    if(repassword != password){
      mui.toast("两次输入的密码不一致");
      return false;
    }

    if(!mobile){
      mui.toast("请输入手机号");
      return false;
    }

    if(!/^1[34578]\d{9}$/.test(mobile)){
      mui.toast("手机号码格式不对");
      return false;
    }

    if(!vCode){
      mui.toast("请输入手机验证码");
      return false;
    }
    $.ajax({
      type:"post",
      url:"/user/register",
      data:$("form").serialize(),
      success:function (info) {
        if(info.error === 403){
          mui.toast(info.message);
        }

        if(info.success){
          mui.toast("恭喜你，注册成功了，一秒后跳转到登录页");
          setTimeout(function () {
            location.href = "login.html";
          }, 1000);
        }
      }
    });



  })
});