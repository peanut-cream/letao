/**
 * Created by 伍 on 2018/1/15.
 */
;(function(){

  mui(".mui-scroll-wrapper").scroll({
    indicators:false,//关闭滚动条
  });
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });



})();