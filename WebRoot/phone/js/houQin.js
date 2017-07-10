

$(document).ready(function(){

// ----------------------------后勤查询----------------------------开始
	// 获取所有区域，渲染到下拉列表中去
 	$.ajax({
 		type : 'GET',
 		url : CONFIG['url']+'getAllDistrict.do',
 		async : true,
 		success : function(data){
 			var quYuArr = JSON.parse(data);
 			for(var i in quYuArr){
 				$("#hqQuYu").append('<option value="'+quYuArr[i].district+'">'+quYuArr[i].district+'</option>');
 			}
 		},
 	});
// ----------------------------后勤查询----------------------------结束


});

