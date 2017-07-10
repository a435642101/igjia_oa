

$(document).ready(function(){

	// var getAllDistrict = 'http://192.168.1.115/yhTech/getAllDistrict.do';

	function CSHZhuangTai(){
		if($("#cxZhiFu").val()=="全部"){
			$("#cxZhuangTai").append('<option value="全部">全部</option><option value="已出租">已出租</option><option value="空置中">空置中</option><option value="已解约">已解约</option><option value="审核中">审核中</option><option value="已到期">已到期</option><option value="配置中">配置中</option>');
		}else{
			$("#cxZhuangTai").append('<option value="全部">全部</option><option value="出租中">出租中</option><option value="审核中">审核中</option><option value="已失效">已失效</option><option value="已到期">已到期</option>');
		}
	};
	CSHZhuangTai();
	$("#cxZhiFu").change(function(){
		$("#cxZhuangTai").empty();
		if($(this).val()=="全部"){
			$("#cxZhuangTai").append('<option value="全部">全部</option><option value="已出租">已出租</option><option value="空置中">空置中</option><option value="已解约">已解约</option><option value="审核中">审核中</option><option value="已到期">已到期</option><option value="配置中">配置中</option>');
		}else{
			$("#cxZhuangTai").append('<option value="全部">全部</option><option value="出租中">出租中</option><option value="审核中">审核中</option><option value="已失效">已失效</option><option value="已到期">已到期</option>');
		}
	});


	// 获取所有区域，渲染到select中去
 	$.ajax({
 		type : 'GET',
 		url : CONFIG['url']+'getAllDistrict.do',
 		async : true,
 		success : function(data){
 			var districtArr = JSON.parse(data);
 			for(var i in districtArr){
 				$("#cxQuYu").append('<option value="'+districtArr[i].district+'">'+districtArr[i].district+'</option>');
 				$("#conditionQuYu .quyu1").append('<div class="BCf2f2f2">'+districtArr[i].district+'</div>');
 			}
 		}
 	}); 

 	// 查询，跳转页面，传递参数
 	$("#cxfySubmit").on('click',function(){
	 	var keyWord = encodeURI(encodeURI($("#keyWord").val()));//转换16进制
	 	var quYu = encodeURI(encodeURI($("#cxQuYu").val()));
	 	var cxZhuangTai = encodeURI(encodeURI($("#cxZhuangTai").val()));
	 	var guanJia = "";
	 	var cxZhiFu = encodeURI(encodeURI($("#cxZhiFu").val()));
	 	var start1 = $("#start1").val();
	 	var start2 = $("#start2").val();
	 	var end1 = $("#end1").val();
	 	var end2 = $("#end2").val();
	 	var url = 'cxfyResult.html?addr='+keyWord+'&dist='+quYu+'&stat='+cxZhuangTai+'&jobno='+guanJia+'&paymethod='+cxZhiFu+'&contractstart1='+start1+'&contractstart='+start2+'&contractend1='+end1+'&contractend2='+end2;
	 	window.location.href = url;
 	});


});

