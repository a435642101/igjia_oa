$(function(){
	$(".mnav ul li").click(function(){
		var href = "."+$(this).attr("_href");
		var lang = "."+$(this).attr("lang");
		$("#mpart "+lang).show().siblings("div").hide();
		$("#nav_top "+lang).show().siblings("div").hide();
		$(this).siblings("li").removeClass("act");
		$(this).addClass("act");
		$("#mpart "+lang+" iframe:eq(0)").show().siblings("iframe").hide();
		$("#nav_top "+lang+" span").css({"color":"#000","background":"url(../images/house/jiazaian02.png)","z-index":"10"}).children(".cer").css({"color":"#000","background":"url(../images/house/02.png)"});
		//....
	});
	$(".nav_top").on("click","span",function(){
		var url = $(this).attr("lang");
		$(this).css({"color":"#000","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).siblings("span").css({"color":"#000","background":"url(../images/house/jiazaian02.png)","z-index":"10"});
		$(this).children(".cer").css({"color":"#000","background":"url(../images/house/01.png)"});
		$(this).siblings("span").children(".cer").css({"color":"#000","background":"url(../images/house/02.png)"});
		$(".mpart iframe").each(function(){
			var src = $(this).attr("src");
			if(src==url){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	})
	$(".nav_top").on("click","span .close",function(e){
		e = e || window.event;
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}	
		var url = $(this).attr("lang");
		var lang = $(this).parents("span").parents("div").attr("class");
		var a = $(this).parents("span").index();
		var size = $(".mpart ."+lang+" iframe").size();
		var zindex = $(this).parents("span").css("z-index");
		if(zindex==11){
			if((a+1)==(size-1) && size>0){
				$(".nav_top ."+lang+" span:eq("+(a-1)+")").css({"color":"#000","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#000","background":"url(../images/house/01.png)"});
				$("#mpart ."+lang+" iframe:eq("+(a)+")").show();
			}else{
				$(".nav_top ."+lang+" span:eq("+(a+1)+")").css({"color":"#000","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#000","background":"url(../images/house/01.png)"});
				$("#mpart ."+lang+" iframe:eq("+(a+2)+")").show();
			}
			$(this).parents("span").remove();
			$("#mpart ."+lang+" iframe:eq("+(a+1)+")").remove();
		}else{
			$(this).parents("span").remove();
			$("#mpart ."+lang+" iframe:eq("+(a+1)+")").remove();
		}
	})
});
$(function(){
	$(".table_detail").on("click","td a.find,tr",function(){
		var href = $(this).attr("_href");
		var lang = $(this).attr("lang");
		var context=href.substring(href.indexOf("=")+1,href.length)+"详情";
		var is = false;
		$("#mpart ."+lang+" iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src == href){
			  is = true;
			  return false;
			}
		})
		if(!is==true){
			$("#nav_top ."+lang, window.parent.document).append("<span lang='"+href+"' style='cursor:pointer;color:#000;'>"+context+"<i class='cer'></i><i class='close'></i></span>");
			$("#mpart ."+lang, window.parent.document).append("<iframe src='"+href+"' frameborder='0' style='display:none;' height='100%' width='100%' scrolling='no'></iframe>");
		}
		$("#mpart ."+lang+" iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src==href){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		$("#nav_top ."+lang+" span", window.parent.document).each(function(){
			$("#nav_top ."+lang+" span", window.parent.document).css({"color":"#000","background":"url(../images/house/jiazaian02.png)","z-index":"10"}).children(".cer").css({"color":"#000","background":"url(../images/house/02.png)"});
			var src = $(this).attr("lang");
			if(src==href){
				$(this).css({"color":"#000","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#000","background":"url(../images/house/01.png)"});
				return false;
			}
		});
	});
	
	
//出房详情跳出来标签页	
	$(".addrent,.addhouse").on("click",".find",function(){
	
		var href = $(this).attr("_href");
		var lang = $(this).attr("lang");
		
		if(href==""){
			alert("没有出租中的出房记录");return;
		}
		var context=href.substring(href.indexOf("=")+1,href.length)+"详情";
		var is = false;
		$("#mpart ."+lang+" iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src == href){
			  is = true;
			  return false;
			}
		})
		if(!is==true){
			$("#nav_top ."+lang, window.parent.document).append("<span lang='"+href+"' style='cursor:pointer;color:#000;'>"+context+"<i class='cer'></i><i class='close'></i></span>");
			$("#mpart ."+lang, window.parent.document).append("<iframe src='"+href+"' frameborder='0' style='display:none;' height='100%' width='100%' scrolling='no'></iframe>");
		}
		$("#mpart ."+lang+" iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src==href){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		$("#nav_top ."+lang+" span", window.parent.document).each(function(){
			$("#nav_top ."+lang+" span", window.parent.document).css({"color":"#000","background":"url(../images/house/jiazaian02.png)","z-index":"10"}).children(".cer").css({"color":"#000","background":"url(../images/house/02.png)"});
			var src = $(this).attr("lang");
			if(src==href){
				$(this).css({"color":"#000","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#000","background":"url(../images/house/01.png)"});
				return false;
			}
		});
		$("#nav_top ."+lang, window.parent.document).show().siblings("div").hide();
		$("#mpart ."+lang, window.parent.document).show().siblings("div").hide();
	});
});
