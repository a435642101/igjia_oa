//水电煤添加
function addShare(address,renter_name,renter_telephone,elec_money,gas_money,water_money,total_money,period,remark){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "/finance/addSharePc.do",
		   data: "address="+address+"&renter_name="+renter_name+"&renter_telephone="+renter_telephone+"&period="+period+"&elec_money="+elec_money+"&gas_money="+gas_money+"&water_money="+water_money+"&total_money="+total_money+"&remark="+remark,
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


//获取区域信息
function getDistrict(){
	$.ajax({
	       type: "GET",
	       url: "/getAllDistrict.do",
	       data: "",
	       async:false,
	       success: function(result){
	    	   var arr=JSON.parse(result);
		       var obj;
		       var html="";
		       for(var i=arr.length-1;i>=0;i--){
		         obj=arr[i];
		         html += "<option value='"+obj.district+"'>"+obj.district+"</option>";
		       }
		       $('.district').append(html);
	       }
	});
	request($(".district").val());
}
//获取区域内房源
function request(district){
	$('#djxz').val('加载中...');
	$.ajax({
		type: "GET",
		url: "/igjia/rent.do",
		data: "district="+encodeURI(encodeURI(district))+"&state="+encodeURI(encodeURI("出租中"))+"&paymethod="+encodeURI(encodeURI("全部"))+"&contract_start1=&contract_start2=&contract_end1=&contract_end2=",
		success: function(result){
			if(result=='fail'){
				$('#djxz').val('未登录');
			}else{
				var arr=JSON.parse(result);
				$('#djxz').val('点击选择');
				$(".ssul").html("");
				for(var i=0;i<arr.length;i++){
			    	obj=arr[i];
			    	$(".ssul").append("<li lang='"+obj.house_id+"' lang1='"+obj.renter_name+"' lang2='"+obj.renter_telephone+"'>"+obj.address+"</li>");
				} 
				$(".ssul li").click(function(){
					var sscx = $(this).text();
					var sscxlang = $(this).attr("lang");
					var renter_name = $(this).attr("lang1");
					var renter_telephone = $(this).attr("lang2");
					$(".xzyx").text(sscx);
					$(".address").val(sscx);
					$(".renter_name").val(renter_name);
					$(".renter_telephone").val(renter_telephone);
					$(".sswk").css("display","none");
				});
			}	
			
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
function getUrl(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r!=null) return unescape(r[2]); return null; //返回参数值
} 

//
$(function(){
	$(".sscx").bind('input propertychange', function() {
		var sscx = $(this).val();
		var ssul = $(".ssul li").length;
		$(".ssul li").css("display","none");
		$(".muy").css("display","none");
		$(".ssul").css("display","block");
		$(".ssul li").each(function(){
			var sss = $(this).text();
			if(sss.indexOf(sscx)>=0){
				$(this).css("display","block");
			}
		});
	}); 
	var orderid = getUrl("orderid");
	getDistrict();
	$(".district").on("change",function(){
		var district = $(this).val();
		request(district);
	});
	//显示地址栏
	$(".xzyx").click(function(){		
		$(".sswk").css("display","block");
	});
	//点击空白处地址关闭
	$(document).bind("click",function(e){ 
		var target = $(e.target); 	
		if(target.closest(".colj31").length == 0){ 
			$(".sswk").hide(); 
		}
	});
	//计算总价
	$(".elec_money").on("input propertychange",function(){
		var gas_money = $(".gas_money").val();
		var water_money = $(".water_money").val();
		var elec_money = $(this).val();
		var other = accSum(gas_money,water_money);
		if(elec_money==""){
			$(this).val(0);
		}
		$(".total_money").val(accSum(other,elec_money));
	});
	$(".gas_money").on("input propertychange",function(){
		var elec_money = $(".elec_money").val();
		var water_money = $(".water_money").val();
		var gas_money = $(this).val();
		var other = accSum(elec_money,water_money);
		if(gas_money==""){
			$(this).val(0);
		}
		$(".total_money").val(accSum(other,gas_money));
	});
	$(".water_money").on("input propertychange",function(){
		var elec_money = $(".elec_money").val();
		var gas_money =$(".gas_money").val();
		var water_money = $(this).val();
		var other = accSum(elec_money,gas_money);
		if(water_money==""){
			$(this).val(0);
		}
		$(".total_money").val(accSum(other,water_money));
	});
	
	//点击录入
	$("button.addShare").click(function(){
		var address = encodeURI(encodeURI($(".address").val()));
		var renter_name = encodeURI(encodeURI($(".renter_name").val()));
		var renter_telephone = encodeURI(encodeURI($(".renter_telephone").val()));
		var elec_money =$(".elec_money").val();
		var gas_money = $(".gas_money").val();
		var water_money = $(".water_money").val();
		var total_money = $(".total_money").val();
		var period = encodeURI(encodeURI($(".period").val()));
		var remark = encodeURI(encodeURI($(".remark").val()));
		if(address=="" || address=="加载中..."){
			alert("请选择地址");
		}else{
			addShare(address,renter_name,renter_telephone,elec_money,gas_money,water_money,total_money,period,remark);
		}
		
	});
});
