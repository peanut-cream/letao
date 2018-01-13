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
      url:"/category/querySecondCategoryPaging",
      type:"get",
      data:{
        pageSize:pageSize,
        page:page
      },
      success:function(info){
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
    $("#addModal").modal("show");
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        //console.log(info);
          $(".dropdown-menu").html(template("ul-temp",info))
      }
    })
  });
  $(".dropdown-menu").on("click","a",function(){
    var id=$(this).data("id");
    var content=$(this).text();
    $("#categoryId").val(id);
    $("#dropdownMenu1").text(content);
  });
  //上传图片
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      //console.log(data);
      $(".img_box img").attr("src",data.result.picAddr);
      $("#brandLogo").val(data.result.picAddr);
      $("form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传品牌图片"
          }
        }
      }
    }
  });
  $("#form").on('success.form.bv', function (e){
    e.preventDefault();
    //console.log($("#form").serialize());
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data: $("#form").serialize(),
      success:function(info){
      //console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          page=1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
          $(".img_box img").attr("src","img/none.png");
          $("#dropdownMenu1").text("请选择一级分类");
        }
      }
    })
  })
});