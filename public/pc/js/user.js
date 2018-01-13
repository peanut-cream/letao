/**
 * Created by 伍 on 2018/1/13.
 */
$(function(){
  var page=1;
  var pageSize=5;
  render();
  function render(){
    //ajax请求
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:page,
        pageSize:5
      },
      success:function(info){
        console.log(info);
        $("tbody").html(template("temp",info));
        $("#pageP").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/pageSize),
          size:"small",
          onPageClicked:function(event, originalEvent, type,p){
            page=p;
            render();
          }
        });
      }
    })
  }
  $("tbody").on("click","button",function(){
    $("#modalmu").modal("show");
    var id=$(this).parent().data("id");
    var isdata=$(this).hasClass("btn-success")?1:0;
    $(".btn-confirm").off().on("click",function(){
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isdata
        },
        success:function(info){
          console.log(info);
          if(info.success){
            $("#modalmu").modal("hide");
            render();
          }
        }
      })
    })
  });

});