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
  var vlue=getvalue("key");
  $(".search-text").val(vlue);


  function render(){
    var data={};
    data.page=1;
    data.pageSize=100;
    var $this=$(".le-sort a.now");
    if($this.length>0){
      var key=$this.data("type");
      var value=$this.find("span").hasClass("fa-angle-down")?"2":"1";
      data[key]=value;
    }

    data.proName=$(".search-text").val();
    console.log(data);
    $(".le_product").html( "<div class='loading'></div>");
    setTimeout(function(){
      $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:data,
        success:function(info){
          //console.log(info);
          $(".le_product").html(template("temp",info));
        }
      })
    },1000);

  }
  render();
//  点击搜索
  $(".btn-search").on("click",function(){
    render();
  });
  //排序
  $(".le-sort .a").on("click",function(){
    if($(this).hasClass("now")){
      $(this).find("span").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    }else{
      $(this).addClass("now").siblings().removeClass("now");
      $(".a").find("span").addClass("fa-angle-down").removeClass("fa-angle-up");
    }
      render();
  })


});