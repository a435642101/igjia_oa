$.fn.paging = function(pag){
	pag = $.extend({
		classt:null
	}, pag || {});
	var cls = pag.classt;
	$(cls+" .table tbody").on("mouseover","tr",function(){
		var index = $(this).index();
		$(this).children("td").css("border-bottom","1px solid #ee6b41");
		$(cls+" table tr:eq("+(index)+")").children("td").css("border-bottom","1px solid #ee6b41");
		$(this).css("border-right","1px solid #ee6b41").children("td:eq(0)").css("border-left","1px solid #ee6b41");	
		$(this).children("td:last").css("border-right","1px solid #ee6b41");
		if(index==0){
			$(cls+" table thead tr th").css("border-bottom","1px solid #ee6b41");
		}
	});
	$(cls+" .table tbody").on("mouseout","tr",function(){
		var index = $(this).index();
		$(this).children("td").css("border-bottom","1px solid #ddd");
		$(cls+" table tr:eq("+(index)+")").children("td").css("border-bottom","1px solid #ddd");
		$(this).children("td:last").css("border-right","1px solid #ddd");
		$(this).css("border-right","1px solid #ddd").children("td:eq(0)").css("border-left","1px solid #eee");
		if(index==0){
			$(cls+" table thead tr th").css("border-bottom","1px solid #eee");
		}
	});
};