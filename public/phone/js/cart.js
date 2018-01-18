/**
 * Created by 伍 on 2018/1/18.
 */
$(function(){
  //下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        callback:function(){
          //模拟请求时间为1秒
          $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function(info){
              //console.log(info);
              if(info.error==400){
                location.href="login.html?URL="+location.href;
              }

              $(".mui-table-view").html(template("temp",{list:info}));
              setTimeout(function(){
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              },1000)
            }
          });


        }
      }
    }
  });
  //点击计算总和
  $(".le_main").on("change",".ck",function(){
    var total=0;
    $(":checked").each(function(){
      total+=$(this).data("num")*$(this).data("price");
      console.log(total);
    })
    $(".le_total .total").text(total.toFixed(2))
  })
//  删除
  $(".mui-table-view").on("tap", ".btn_delete", function () {
    var id = $(this).data("id");
    mui.confirm("您是否要移除该商品？","温馨提示",["否","是"],function(e){
      if(e.index==1){
      //  确认删除
        $.ajax({
          type:"get",
          url:"/cart/deleteCart",
          data:{id:[id]},
          success:function(info){
            //console.log(info);
            if(info.success){
            //  调用下拉刷新
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  });
//  修改
  $(".mui-table-view").on("tap", ".btn_edit", function () {
    var data=this.dataset;
    var html=template("temp2",data);
    html=html.replace(/\n/g,"");
    mui.confirm(html,"编辑商品",["否","是"],function(e){
      if(e.index==1){
        var id = data.id;
        var num = $(".mui-numbox-input").val();
        var size = $(".lt_edit_size span.now").text();
        $.ajax({
          type:"post",
          url:"/cart/updateCart",
          data:{
            id:id,
            num:num,
            size:size
          },
          success:function(info){
            if(info.success){
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
  });
});