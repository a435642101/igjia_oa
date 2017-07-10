var page = 1;
var num = 10;
//水电煤查询初始化
function share(){
	$('.loading').show();
	var period1 = encodeURI(encodeURI($(".period1").val()));
	var period2 = encodeURI(encodeURI($(".period2").val()));
	var state = encodeURI(encodeURI($(".state").val()));
	var renter_name = encodeURI(encodeURI($(".renter_name").val()));
	$.ajax({
		   type: "GET",
		   url: "/finance/shareListPc.do",
		   data: "page="+page+"&num="+num+"&period1="+period1+"&period2="+period2+"&state="+state+"&renter_name="+renter_name,
		   success: function(result){
			   if(result=="fail"){
				   alert("未登录");
			   }else{
				   var arr=JSON.parse(result);
				   var obj="";
				   var html="";
				   $("table tbody").html("");
				   for (var i = 0; i < arr.msg.length; i++) {
					 obj = arr.msg[i];
					 html="<tr>" +
					 		"<td>"+obj.orderid+"</td>" +
					 		"<td>"+obj.address+"</td>" +
					 		"<td>"+obj.renter_name+"</td>" +
					 		"<td>"+obj.renter_telephone+"</td>" +
					 		"<td><input type='number' style='width:80%;' class='elec_money' value='"+obj.elec_money+"' /></td>" +
					 		"<td><input type='number' style='width:80%;' class='gas_money' value='"+obj.gas_money+"' /></td>" +
					 		"<td><input type='number' style='width:80%;' class='water_money' value='"+obj.water_money+"' /></td>" +
					 		"<td class='total_money'>"+obj.total_money+"</td>" +
					 		"<td>"+obj.period+"</td>" +
					 		"<td>"+obj.remark+"</td>" +
					 		"<td>" +
					 			"<select class='state"+i+"'>" +
					 				"<option value='待付款'>待付款</option>" +
					 				"<option value='已付款'>已付款</option>" +
					 				"<option value='已收款'>已收款</option>" +
					 				"<option value='已失效'>已失效</option>" +
					 			"</select>" +
					 		"</td>" +
					 		"<td>"+obj.date+"</td>" +
					 		"<td><button style='cursor:pointer;' class='pricebtn' lang='"+obj.orderid+"'>修改</button></td>" +
					 		"</tr>";
					 $(".table tbody").append(html);
					 $(".state"+i)[0].value=obj.state;
				   }
				   $("#loadmore").hide();
			   }
			   $('#maxnum').val(arr.total);
				var maxnum = $('#maxnum').val();				
				$('#total').html(maxnum);
				maxnum = parseInt(maxnum);
				maxnum = Math.ceil(maxnum/10.0);
				$(".pageTest").off("click");
					$('.pageTest').page({
						leng:maxnum,//分页总数
						activeClass: 'activP'//active 类样式定义

					});
			 
			   $('.loading').hide();
		   }
	});		
}

function share1(){
	$('.loading').show();
	var period1 = encodeURI(encodeURI($(".period1").val()));
	var period2 = encodeURI(encodeURI($(".period2").val()));
	var state = encodeURI(encodeURI($(".state").val()));
	var renter_name = encodeURI(encodeURI($(".renter_name").val()));
	var page = $("a.activP").text();
	$.ajax({
		   type: "GET",
		   url: "/finance/shareListPc.do",
		   data: "page="+page+"&num="+num+"&period1="+period1+"&period2="+period2+"&state="+state+"&renter_name="+renter_name,
		   success: function(result){
			   if(result=="fail"){
				   alert("未登录");
			   }else{
				   var arr=JSON.parse(result);
				   var obj="";
				   var html="";
				   $("table tbody").html("");
				   for (var i = 0; i < arr.msg.length; i++) {
					 obj = arr.msg[i];
					 html="<tr>" +
					 		"<td>"+obj.orderid+"</td>" +
					 		"<td>"+obj.address+"</td>" +
					 		"<td>"+obj.renter_name+"</td>" +
					 		"<td>"+obj.renter_telephone+"</td>" +
					 		"<td><input type='number' style='width:80%;' class='elec_money' value='"+obj.elec_money+"' /></td>" +
					 		"<td><input type='number' style='width:80%;' class='gas_money' value='"+obj.gas_money+"' /></td>" +
					 		"<td><input type='number' style='width:80%;' class='water_money' value='"+obj.water_money+"' /></td>" +
					 		"<td class='total_money'>"+obj.total_money+"</td>" +
					 		"<td>"+obj.period+"</td>" +
					 		"<td>"+obj.remark+"</td>" +
					 		"<td>" +
					 			"<select class='state"+i+"'>" +
					 			"<option value='待付款'>待付款</option>" +
				 				"<option value='已付款'>已付款</option>" +
				 				"<option value='已收款'>已收款</option>" +
				 				"<option value='已失效'>已失效</option>" +
					 			"</select>" +
				 			"</td>" +
					 		"<td>"+obj.date+"</td>" +
					 		"<td><button class='pricebtn' lang='"+obj.orderid+"'>修改</button></td>" +
					 		"</tr>";
					 $(".table tbody").append(html);
					 $(".state"+i)[0].value=obj.state;
				   }
			   }
			   $('.loading').hide();
		   }
	});
}
//水电煤修改
function updateShare(orderid,elec_money,gas_money,water_money,total_money,state){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "/finance/updateSharePc.do",
		   data: "orderid="+orderid+"&elec_money="+elec_money+"&gas_money="+gas_money+"&water_money="+water_money+"&total_money="+total_money+"&state="+state,
		   success: function(result){
			   if(result == "fail"){
				   alert("未登录");
			   }else{
				   var arr=JSON.parse(result);	
				   if(arr.code=="1"){
					   alert(arr.msg);
				   }else if(arr.code=="2"){
					   alert(arr.msg);
				   }else if(arr.code=="3"){
					   alert(arr.msg);
				   }
			   }
			   $('.loading').hide();
		   }
	});
}

//计算
function accMul(arg1,arg2){    
	var m=0,s1=arg1.toString(),  
	s2=arg2.toString();    
	try{m+=s1.split(".")[1].length}catch(e){}    
	try{m+=s2.split(".")[1].length}catch(e){}    
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
};
function accSum(arg1,arg2){    
	var m=0,s1=arg1.toString(),  
	s2=arg2.toString();    
	try{m+=s1.split(".")[1].length}catch(e){}    
	try{m+=s2.split(".")[1].length}catch(e){}    
	return Number(s1.replace(".",""))+Number(s2.replace(".",""))/Math.pow(10,m);
};

//
$(function(){
	share();
	$(".sharebtn").click(function(){
		share();
	});
	//计算总价
	$(".table tbody").on("input propertychange",".elec_money",function(){
		var gas_money = $(this).parents("td").siblings("td").children(".gas_money").val();
		var water_money = $(this).parents("td").siblings("td").children(".water_money").val();
		var elec_money = $(this).val();
		var other = accSum(gas_money,water_money);
		if(elec_money==""){
			$(this).val(0);
		}
		$(this).parents("td").siblings(".total_money").text(accSum(other,elec_money));
	});
	$(".table tbody").on("input propertychange",".gas_money",function(){
		var elec_money = $(this).parents("td").siblings("td").children(".elec_money").val();
		var water_money = $(this).parents("td").siblings("td").children(".water_money").val();
		var gas_money = $(this).val();
		var other = accSum(elec_money,water_money);
		if(gas_money==""){
			$(this).val(0);
		}
		$(this).parents("td").siblings(".total_money").text(accSum(other,gas_money));
	});
	$(".table tbody").on("input propertychange",".water_money",function(){
		var elec_money = $(this).parents("td").siblings("td").children(".elec_money").val();
		var gas_money = $(this).parents("td").siblings("td").children(".gas_money").val();
		var water_money = $(this).val();
		var other = accSum(elec_money,gas_money);
		if(water_money==""){
			$(this).val(0);
		}
		$(this).parents("td").siblings(".total_money").text(accSum(other,water_money));
	});
	$("table").on("click","button.pricebtn",function(){
		var orderid =  $(this).attr("lang");
		var elec_money = $(this).parents("td").siblings("td").children(".elec_money").val();
		var gas_money = $(this).parents("td").siblings("td").children(".gas_money").val();
		var water_money = $(this).parents("td").siblings("td").children(".water_money").val();
		var total_money = $(this).parents("td").siblings(".total_money").text();
		var state = encodeURI(encodeURI($(this).parents("td").siblings("td").children("select").val()));
		if(confirm("是否确认修改")){
			updateShare(orderid,elec_money,gas_money,water_money,total_money,state);
		}else{
			return false;
		}
			
		
	});
});
function getallrent(){
	share1();
}