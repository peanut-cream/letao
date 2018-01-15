/**
 * Created by 伍 on 2018/1/15.
 */
$(function(){
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function(info){
      //console.log(info);
      $(".cate_ul").html(template("catetemp",info));
      productrender(info.rows[0].id);
    }
  });

  function productrender(id){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{id:id},
      success:function(info){
        //console.log(info);
        $(".main-right ul").html(template("product-temp",info));
        $(".main-right .mui-scroll").css("transform","translateY(0)");
        $(".main-right .mui-scroll").css("transition","all 0.5s");
      }
    })
  };
//  点击进行切换
  $(".cate_ul").on("click","li",function(){
    var id=$(this).data("id");
    //console.log(id);
    $(this).addClass("active").siblings().removeClass("active");
    productrender(id);
  });
});