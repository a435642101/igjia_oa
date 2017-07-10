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
			$(".nav_top").append("<span lang='"+href+"' style='cursor:pointer;'><i class='close'></i>"+context+"</span>");
			
		}
		
		$(".nav_top span").each(function(){
			$(".nav_top span").css({"color":"#333","background":"linear-gradient(to top, #efefef 0%, #d6d4d4 100%)","border":"1px solid #aaa","z-index":"10"});
			var src = $(this).attr("lang");
			if(src==url){
				$(this).css({"color":"#333","background":"#FFF","border":"1px solid #FFF","z-index":"11"});
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
		$(this).css({"color":"#333","background":"#FFF","border":"1px solid #FFF","z-index":"11"}).siblings("span").css({"color":"#333","background":"linear-gradient(to top, #efefef 0%, #d6d4d4 100%)","border":"1px solid #aaa","z-index":"10"});
		$(".mpart iframe").each(function(){
			var src = $(this).attr("src");
			if(src==url){
				$(this).show();
			}else{
				$(this).hide();
			}
		});
	});
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
				$(".nav_top span:eq("+(a-1)+")").css({"color":"#333","background":"#FFF","border":"1px solid #FFF","z-index":"11"});
				$("#mpart iframe:eq("+(a-1)+")").show();
			}else{
				$(".nav_top span:eq("+(a+1)+")").css({"color":"#333","background":"#FFF","border":"1px solid #FFF","z-index":"11"});
				$("#mpart iframe:eq("+(a+1)+")").show();
			}
			$(this).parents("span").remove();
			$("#mpart iframe:eq("+(a)+")").remove();
		}else{
			$(this).parents("span").remove();
			$("#mpart iframe:eq("+(a)+")").remove();
		}
	});
});
$(function(){
	
	$("table").on("click","tr",function(){
		var href = $(this).attr("_href");
		var context=$(this).attr("lang");
		var is = false;
		//判断是否存在
		$("#mpart iframe", window.parent.document).each(function(){
			var src = $(this).attr("src");
			if(src == href){
			  is = true;
			  return false;
			}
		});
		
		if(!is==true){
			$("#nav_top", window.parent.document).append("<span lang='"+href+"' style='cursor:pointer;color:#aaa;'><i class='close'></i>"+context+"</span>");
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
			$("#nav_top span", window.parent.document).css({"color":"#333","background":"linear-gradient(to top, #efefef 0%, #d6d4d4 100%)","border":"1px solid #aaa","z-index":"10"});
			var src = $(this).attr("lang");
			if(src==href){
				$(this).css({"color":"#333","background":"#FFF","border":"1px solid #FFF","z-index":"11"});
				return false;
			}
		});
	});
});
