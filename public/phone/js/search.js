/**
 * Created by 伍 on 2018/1/16.
 */
$(function(){

//根据数据渲染
  function render(){
    var arr=JSON.parse(localStorage.getItem("le_history"))||[];
    $(".le-history").html(template("temp",{list:arr}))
  }
  render();

  //在localStorage中添加数据

  $(".btn-search").click(function(){
    var arr=JSON.parse(localStorage.getItem("le_history"))||[];
    var text=$(".search-text").val();
    $(".search-text").val("");
    var index=arr.indexOf(text.trim());

    if(text.trim().length==0){
      return;
    }
    if(index!=-1){
      arr.splice(index,1);
    }
    if(arr.length>=10){
      arr.pop();
    }

    arr.unshift(text);
    localStorage.setItem("le_history",JSON.stringify(arr));
    location.href="searchList.html?key="+text.trim();
    render();
  });
//  清除单条数据
  $(".le-history").on("click",".span-del",function(){
    mui.confirm("您是否要删除该条记录？","温馨提示",["否","是"],function(e){
      if(e.index==1){
        var index=$(this).data("index");
        var arr=JSON.parse(localStorage.getItem("le_history"));
        arr.splice(index,1);
        localStorage.setItem("le_history",JSON.stringify(arr));
        render();
      }
    })

  })
// 清除全部数据
  $(".le-history").on("click",".btn_empty",function(){
   mui.confirm("您是否要删除全部记录？","温馨提示",["否","是"],function(e){
     if(e.index==1){
       var arr=[];
       localStorage.setItem("le_history",JSON.stringify(arr));
       render();
     }
   })
  })

});