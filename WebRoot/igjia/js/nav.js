$(function(){
	$(".mnav ul li").click(function(){
		$(this).addClass("act").siblings("li").removeClass("act");
		var url = $(this).attr("lang");
		var is = false;
		$(".mpart iframe").each(function(){
			var src = $(this).attr("src");
			if(src==url){
				is = true;	
				return false;
			}
		});
		
		if(is==true){
			
		}else{
			$(".mpart").append("<iframe src='"+url+"' frameborder='0' height='100%' width='100%' scrolling='no'></iframe>");
			var href = $(this).attr("lang");
			var context = $(this).text();
			$(".nav_top").append("<span lang='"+href+"' style='cursor:pointer;'>"+context+"<i class='cer'></i><i class='close'></i></span>");
			
		}
		
		$(".nav_top span").each(function(){
			$(".nav_top span").css({"color":"#3E3E3E","background":"url(../images/house/jiazaian02.png)","z-index":"10"}).children(".cer").css({"color":"#3E3E3E","background":"url(../images/house/02.png)"});
			var src = $(this).attr("lang");
			if(src==url){
				$(this).css({"color":"#FFF","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#FFF","background":"url(../images/house/01.png)"});
				return false;
			}
		});
		$(".mpart iframe").each(function(){
			var src = $(this).attr("src");
			if(src==url){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		
		//....
	});
	$(".nav_top").on("click","span",function(){
		var url = $(this).attr("lang");
		$(this).css({"color":"#FFF","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).siblings("span").css({"color":"#3E3E3E","background":"url(../images/house/jiazaian02.png)","z-index":"10"});
		$(this).children(".cer").css({"color":"#3E3E3E","background":"url(../images/house/01.png)"});
		$(this).siblings("span").children(".cer").css({"color":"#3E3E3E","background":"url(../images/house/02.png)"});
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
		var a = $(this).parents("span").index();
		var size = $(".mpart iframe").size();
		var zindex = $(this).parents("span").css("z-index");
		if(zindex==11){
			if((a+1)==size && size>0){
				$(".nav_top span:eq("+(a-1)+")").css({"color":"#FFF","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#FFF","background":"url(../images/house/01.png)"});
				$("#mpart iframe:eq("+(a-1)+")").show();
			}else{
				$(".nav_top span:eq("+(a+1)+")").css({"color":"#FFF","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#FFF","background":"url(../images/house/01.png)"});
				$("#mpart iframe:eq("+(a+1)+")").show();
			}
			$(this).parents("span").remove();
			$("#mpart iframe:eq("+(a)+")").remove();
		}else{
			$(this).parents("span").remove();
			$("#mpart iframe:eq("+(a)+")").remove();
		}
	})
});
$(function(){
	$("table").on("click","td a.find",function(){
		var href = $(this).attr("_href");
		var context=href.substring(href.indexOf("=")+1,href.length)+"详情";
		var is = false;
		$("#mpart iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src == href){
			  is = true;
			  return false;
			}
		})
		if(!is==true){
			$("#nav_top", window.parent.document).append("<span lang='"+href+"' style='cursor:pointer;color:#aaa;'>"+context+"<i class='cer'></i><i class='close'></i></span>");
			$("#mpart", window.parent.document).append("<iframe src='"+href+"' frameborder='0' style='display:none;' height='100%' width='100%' scrolling='no'></iframe>");
		}
		$("#mpart iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src==href){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		$("#nav_top span", window.parent.document).each(function(){
			$("#nav_top span", window.parent.document).css({"color":"#3E3E3E","background":"url(../images/house/jiazaian02.png)","z-index":"10"}).children(".cer").css({"color":"#3E3E3E","background":"url(../images/house/02.png)"});
			var src = $(this).attr("lang");
			if(src==href){
				$(this).css({"color":"#FFF","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#FFF","background":"url(../images/house/01.png)"});
				return false;
			}
		});
	});
	
	
//出房详情跳出来标签页	
	$(".addrent,.addhouse").on("click",".find",function(){
		var href = $(this).attr("_href");
		if(href==""){
			alert("没有出租中的出房记录");return;
		}
		var context=href.substring(href.indexOf("=")+1,href.length)+"详情";
		var is = false;
		$("#mpart iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src == href){
			  is = true;
			  return false;
			}
		})
		if(!is==true){
			$("#nav_top", window.parent.document).append("<span lang='"+href+"' style='cursor:pointer;color:#aaa;'>"+context+"<i class='cer'></i><i class='close'></i></span>");
			$("#mpart", window.parent.document).append("<iframe src='"+href+"' frameborder='0' style='display:none;' height='100%' width='100%' scrolling='no'></iframe>");
		}
		$("#mpart iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src==href){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		$("#nav_top span", window.parent.document).each(function(){
			$("#nav_top span", window.parent.document).css({"color":"#3E3E3E","background":"url(../images/house/jiazaian02.png)","z-index":"10"}).children(".cer").css({"color":"#3E3E3E","background":"url(../images/house/02.png)"});
			var src = $(this).attr("lang");
			if(src==href){
				$(this).css({"color":"#FFF","background":"url(../images/house/jiazaian01.png)","z-index":"11"}).children(".cer").css({"color":"#FFF","background":"url(../images/house/01.png)"});
				return false;
			}
		});
	});
});
