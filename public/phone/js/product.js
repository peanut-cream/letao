/**
 * Created by 伍 on 2018/1/16.
 */
$(function(){
  function getSearch(){
    var key=location.search;
    key=key.slice(1);
    key=decodeURI(key);
    var key=key.split("&");
    var obj={};
    for(var i= 0;i<key.length;i++){
      obj[key[i].split("=")[0]]=key[i].split("=")[1];
    }
    return obj;
  }
  function getvalue(key){
    return getSearch()[key];
  }
  var key=getvalue("key");
  //console.log(key);
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{id:key},
    success:function(info){
      //console.log(info);
      $(".le_main .mui-scroll").html(template("temp",info));
      //初始化轮播图
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //初始化数字按钮
      mui(".mui-numbox").numbox();
    //  选择size
      $(".lt_size span").on("click",function(){
        $(this).addClass("now").siblings().removeClass("now");
      })
    }
  })

//  点击加入加入购物车
  $(".btn-addcart").on("click",function(){
    var size=$(".lt_size span.now").text();
    var num=$(".mui-numbox-input").val();
    //如果没有尺码，进行提示
    if(!size){
      mui.toast("请选择商品尺码");
      return;
    }
    $.ajax({
      type:"post",
      url:"/cart/addCart",
      data:{
        productId:key,
        num:num,
        size:size
      },
      success:function(info){
        console.log(info);
        if(info.error==400){
          location.href="login.html?URL="+location.href;
        }
        if(info.success){
          location.href="cart.html";
        }
      }
    })
  })



});