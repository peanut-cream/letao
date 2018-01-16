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
  console.log(key);
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{id:key},
    success:function(info){
      //console.log(info);
      $(".le_main .mui-scroll").html(template("temp",info));
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      mui(".mui-numbox").numbox()
    }
  })
});