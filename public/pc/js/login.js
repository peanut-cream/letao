/**
 * Created by 伍 on 2018/1/11.
 */
$(function(){
  //表单初始化，并配置提示信息
  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"用户名长度必须在6到12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  });
  //表单重置，隐藏所有错误
  $("[type='reset']").on("click",function(){
    $("form").data('bootstrapValidator').resetForm();
  });
  //提交成功,触发事件
  $("form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("form").serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="index.html";
        };
        if(info.error==1000){
          $("form").data('bootstrapValidator').updateStatus("username","INVALID","callback" );
        }
        if(info.error==1001){
          $("form").data('bootstrapValidator').updateStatus("password","INVALID","callback" );
        }
      }
    })
  })
});