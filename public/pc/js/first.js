/**
 * Created by 伍 on 2018/1/13.
 */
$(function(){
  var page=1;
  var pageSize=5;
  render();
  //分页渲染
  function render(){
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      type:"get",
      data:{
        pageSize:pageSize,
        page:page
      },
      success:function(info){
        console.log(info);
        $("tbody").html(template("temp",info));
        $("#pageP").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/pageSize),
          size:"small",
          onPageClicked:function(event, originalEvent, type,p) {
            page = p;
            render();
          }
        });
      }
    })
  };

  $(".btn-add").on("click",function(){
    $("#category-modal").modal("show");
  });
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      }
    }
  });
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();

    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          $("#form").data('bootstrapValidator').resetForm(true);
          $("#category-modal").modal("hide");
          page=1;
          render();
        }
      }
    })
  });
});