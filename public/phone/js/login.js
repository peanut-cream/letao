/**
 * Created by 伍 on 2018/1/18.
 */
$(function(){
$(".btn-confirm").on("click",function(e){
  e.preventDefault();
  var name=$("[name='username']").val();
  var password=$("[name='password']").val();
  if(name.trim()==""){
    mui.toast("请输入用户名");
    return;
  }
  if(password.length==0){
    mui.toast("请输入密码");
    return;
  }
  $.ajax({
    type:"post",
    url:"/user/login",
    data:$(".mui-input-group").serialize(),
    success:function(info){
      //console.log(info);
      if(info.error){
        mui.toast(info.message);
      }
      if(info.success){
        var search=location.search;
        //console.log(search);
        if(search.indexOf("URL")!=-1){
        //  存在
          var url=search.replace("?URL=","");
          location.href=url;
        }else{
          location.href="user.html";
        }
      }
    }
  })

})
});