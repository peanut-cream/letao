/**
 * Created by 伍 on 2018/1/14.
 */
$(function(){
  var page=1;
  var pageSize=5;
  var arr=[];
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        $(".item_main tbody").html(template("temp",info));
      //  分页
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
  //添加按钮点击事件
  $(".btn-add").on("click",function(){
    $("#addModal").modal("show");
    //模态框中列表动态渲染
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        $(".dropdown .dropdown-menu").html(template("ul-temp",info))
      }
    })
  });
//  点击二级分类
  $(".dropdown-menu").on("click","a",function(){
    $("#dropdownMenu1 .dropdown-text").text($(this).text());
    $("#brandId").val($(this).data("id"));
    $("#form").data('bootstrapValidator').updateStatus("brandId","VALID");
  });

//  图片上传

  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      if(arr.length>3){
        return;
      }
      console.log(data);
      arr.push(data.result);
      console.log(arr);
      $img=$("<img>");
      $img.css("width",100);
      $img.css("height",100);
      $img.css("marginRight",20);
      $img[0].src=data.result.picAddr;
      $(".img_box").append($img[0]);
      if(arr.length==3){
        $("#form").data('bootstrapValidator').updateStatus("brandLogo","VALID");
      }else{
        $("#form").data('bootstrapValidator').updateStatus("brandLogo","INVALID");
      }
    }
  });

//  表单验证
  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },

      proName: {
        validators: {
          notEmpty: {message: "请输入商品名称"}
        }
      },
      proDesc: {
        validators: {
          notEmpty: {message: "请输入商品描述"}
        }
      },
      num: {
        validators: {
          notEmpty: {message: "请输入商品库存"},
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入合法库存"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {message: "请输入商品尺码"},
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入合法的尺码,例如(32-46)"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {message: "请输入商品原价"}
        }
      },
      price: {
        validators: {
          notEmpty: {message: "请输入商品现价"}
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }

    }
  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var data=$("#form").serialize();
    data+='&picName1="'+arr[0].picName+'"&picAddr1="'+arr[0].picAddr+'"';
    data+='&picName1="'+arr[1].picName+'"&picAddr1="'+arr[1].picAddr+'"';
    data+='&picName1="'+arr[2].picName+'"&picAnddr1="'+arr[2].picAddr+'"';
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:data,
      success:function(info){
        console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          $("#form").data('bootstrapValidator').resetForm(true);
          $(".dropdown-text").text("请选择二级分类");
          $(".img_box img").remove();
          arr=[];
          page=1;
          render();
        }
      }
    })
  });

});