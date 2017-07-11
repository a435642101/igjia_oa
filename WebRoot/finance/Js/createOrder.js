$(function(){  	
	getDistrict();
	
	$(".btn").click(function(){
		
		var house_id = $(".house_id").val();
		var contract_startdate = $(".contract_startdate").val();
		var contract_no = $(".contract_no").val();
		var address = encodeURI(encodeURI($(".address").val()));
		if($('.type').val()=="出房"){	
			var contract_month = $("#rentorder .contract_month").val();
			var firstyear_monthrent = $("#rentorder .firstyear_monthrent").val();
			var secondyear_monthrent = $("#rentorder .secondyear_monthrent").val();
			var thirdyear_monthrent = $("#rentorder .thirdyear_monthrent").val();
			var fourthyear_monthrent = $("#rentorder .fourthyear_monthrent").val()	;	
			var fifthyear_monthrent = $("#rentorder .fifthyear_monthrent").val();
			var firststage_rent = $("#rentorder .firststage_rent").val();
			var deposit = $("#rentorder .deposit").val();
			var paymethod = encodeURI(encodeURI($("#rentorder .paymethod").val()));			
			var renter_name = encodeURI(encodeURI($("#rentorder .renter_name").val()));
			var remark = encodeURI(encodeURI($("#rentorder .remark").val()));
			var renter_telephone = $("#rentorder .renter_telephone").val();
			if(house_id==""){
				alert("房源ID为空");
				return;
			}else if(!IsDate(contract_startdate)){
				alert("日期格式错误");
				return;
			}else if(!IsNumber(contract_month)){
				alert("合同期限错误");
			}
			$('.loading').show();
			$.ajax({
				type: "GET",
				url: "/createRentOrder.do",
				data: "houseId="+house_id+"&contract_startdate="+contract_startdate
						+"&contractMonth="+contract_month
						+"&firstyear_monthrent="+firstyear_monthrent
						+"&secondyear_monthrent="+secondyear_monthrent
						+"&thirdyear_monthrent="+thirdyear_monthrent
						+"&fourthyear_monthrent="+fourthyear_monthrent
						+"&fifthyear_monthrent="+fifthyear_monthrent
						+"&firststage_rent="+firststage_rent
						+"&deposit="+deposit
						+"&paymethod="+paymethod
						+"&address="+address
						+"&contract_no="+contract_no
						+"&renter_name="+renter_name
						+"&remark="+remark
						+"&renterTelephone="+renter_telephone,
				success: function(result){
					$('.loading').hide();
					alert(result)
				}
			});
		}else{
			var shoukuanren_name = encodeURI(encodeURI($("#houseorder .shoukuanren_name").val()));
			var shoukuanren_telephone = $("#houseorder .shoukuanren_telephone").val();
			var shoukuanren_kaihuhang = encodeURI(encodeURI($("#houseorder .shoukuanren_kaihuhang").val()));
			var shoukuanren_account = $("#houseorder .shoukuanren_account").val()
			var contract_startdate = $("#houseorder .contract_startdate").val();
			var pay_date = $("#houseorder .pay_date").val();
			var contract_enddate = $("#houseorder .contract_enddate").val();
			var contract_month = $("#houseorder .contract_month").val();
			var firstyear_monthrent = $("#houseorder .firstyear_monthrent").val();
			var secondyear_monthrent = $("#houseorder .secondyear_monthrent").val();
			var thirdyear_monthrent = $("#houseorder .thirdyear_monthrent").val();
			var fourthyear_monthrent = $("#houseorder .fourthyear_monthrent").val();
			var fifthyear_monthrent = $("#houseorder .fifthyear_monthrent").val();
			var sixthyear_monthrent = $("#houseorder .sixthyear_monthrent").val();
			var paymethod = encodeURI(encodeURI($("#houseorder .paymethod").val()));
			var deposit = $("#houseorder .deposit").val();	
			if(house_id==""){
				alert("房源ID为空");
				return;
			}else if(!IsDate(contract_startdate)){
				alert("日期格式错误");
				return;
			}else if(!IsNumber(contract_month)){
				alert("合同期限错误");
			}
			$('.loading').show();
		$.ajax({
			type: "GET",
			url: "/createhouseorder.do",
			data: "address="+address		   	
			   	+"&contract_no="+contract_no
			   	+"&contract_startdate="+contract_startdate
			   	+"&contract_enddate="+contract_enddate
			   	+"&contract_month="+contract_month
			   	+"&firstyear_monthrent="+firstyear_monthrent
			   	+"&secondyear_monthrent="+secondyear_monthrent
			   	+"&thirdyear_monthrent="+thirdyear_monthrent
			   	+"&fourthyear_monthrent="+fourthyear_monthrent
			   	+"&fifthyear_monthrent="+fifthyear_monthrent
			   	+"&sixthyear_monthrent="+sixthyear_monthrent
			   	+"&pay_date="+pay_date	   	
			   	+"&paymethod="+paymethod
			   	+"&shoukuanren_name="+shoukuanren_name
			   	+"&shoukuanren_telephone="+shoukuanren_telephone
			   	+"&shoukuanren_kaihuhang="+shoukuanren_kaihuhang
			   	+"&shoukuanren_account="+shoukuanren_account,
			success: function(result){
				$('.loading').hide();
				alert(result)
			}
		});
		}
		
		
})
	
		
	$(".xzyx").click(function(){		
		$(".sswk").css("display","block");
	});
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
	
	
	
	$(document).bind("click",function(e){ 
		var target = $(e.target); 	
		if(target.closest(".colj31").length == 0){ 
			$(".sswk").hide(); 
		}
	});
});

$(".district,.type").bind("change",function(){
	if($('.type').val()=="出房"){	
		$('#houseorder').hide();
		$('#rentorder').show();
	}else{
		$('#rentorder').hide();
		$('#houseorder').show();
	}
		var district = $(".district").val();
		request(district);
		$('#rentorder input,#houseorder input').val("");
	});



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

function request(district1){
	$('#djxz').val('加载中...');
	if($('.type').val()=="出房"){	
		var state = new Array;
    	state.push("出租中");
		var district =  new Array;
		district.push(district1);
		state = encodeURI(encodeURI(state));
		district = encodeURI(encodeURI(district));
		var paymethod = encodeURI(encodeURI("全部"));
		$.ajax({
			type: "GET",
			url: "../igjia/selectrentorder.do",
			data: "district="+district,
			async:true,
			success: function(result){
				$('.loading').hide();
				if(result=='fail'){
					$('#djxz').val('未登录');
				}else{
					$('#djxz').val('点击选择');
					var arr=JSON.parse(result);
					$(".ssul").html("");
					for(var i=0;i<arr.length;i++){
				    	obj=arr[i];
				    	var arr11=JSON.stringify(obj);
				    	$(".ssul").append("<li lang='"+arr11+"'>"+obj.address+"</li>");
					} 
					
					$(".ssul li").click(function(){
						var obj = JSON.parse($(this).attr("lang"));
							$(".house_id").val(obj.house_id);
							$(".contract_no").val(obj.contract_no);					
							$("#rentorder .renter_name").val(obj.renter_name);
							$("#rentorder .renter_telephone").val(obj.renter_telephone);
							$("#rentorder .contract_startdate").val(obj.contract_startdate);
							$("#rentorder .contract_enddate").val(obj.contract_enddate);
							$("#rentorder .contract_month").val(obj.contract_month);
							$("#rentorder .firstyear_monthrent").val(obj.firstyear_monthrent);
							$("#rentorder .secondyear_monthrent").val(obj.secondyear_monthrent);
							$("#rentorder .thirdyear_monthrent").val(obj.thirdyear_monthrent);
							$("#rentorder .fourthyear_monthrent").val(obj.fourthyear_monthrent);
							$("#rentorder .fifthyear_monthrent").val(obj.fifthyear_monthrent);
							$("#rentorder .firststage_rent").val(obj.firststage_rent);
							$("#rentorder .paymethod")[0].value=obj.paymethod;
							$("#rentorder .deposit").val(obj.deposit);						
						$("#djxz").val($(this).text());
						$(".sswk").css("display","none");
					});
				}	
				
			}
		});
	}else if($('.type').val()=="收房"){
		$.ajax({
			type: "GET",
			url: "../igjia/selecthouseorder.do",
			data: "district="+encodeURI(encodeURI(district1)),
			success: function(result){
				$('.loading').hide();
				if(result=='fail'){
					$('#djxz').val('未登录');
				}else{
					$('#djxz').val('点击选择');
					var arr=JSON.parse(result);
					$(".ssul").html("");
					for(var i=0;i<arr.length;i++){
				    	obj=arr[i];
				    	var arr11=JSON.stringify(obj);
				    	$(".ssul").append("<li lang='"+arr11+"'>"+obj.address+"</li>");
					} 
					
					$(".ssul li").click(function(){
						var obj = JSON.parse($(this).attr("lang"));
						$(".house_id").val(obj.house_id);
						$(".contract_no").val(obj.contract_no);					
							$("#houseorder .shoukuanren_name").val(obj.shoukuanren_name);
							$("#houseorder .shoukuanren_telephone").val(obj.shoukuanren_telephone);
							$("#houseorder .shoukuanren_kaihuhang").val(obj.shoukuanren_kaihuhang);
							$("#houseorder .shoukuanren_account").val(obj.shoukuanren_account);
							$("#houseorder .contract_startdate").val(obj.contract_startdate);
							$("#houseorder .pay_date").val(obj.pay_date);
							$("#houseorder .contract_enddate").val(obj.contract_enddate);
							$("#houseorder .contract_month").val(obj.contract_month);
							$("#houseorder .firstyear_monthrent").val(obj.firstyear_monthrent);
							$("#houseorder .secondyear_monthrent").val(obj.secondyear_monthrent);
							$("#houseorder .thirdyear_monthrent").val(obj.thirdyear_monthrent);
							$("#houseorder .fourthyear_monthrent").val(obj.fourthyear_monthrent);
							$("#houseorder .fifthyear_monthrent").val(obj.fifthyear_monthrent);
							$("#houseorder .sixthyear_monthrent").val(obj.sixthyear_monthrent);
							$("#houseorder .paymethod")[0].value=obj.paymethod;
							$("#houseorder .deposit").val(obj.deposit);	
							$("#houseorder .remark").val(obj.remark);		
						$("#djxz").val($(this).text());
						$(".sswk").css("display","none");
					});
				}	
				
			}
		});
	}
}

function IsDate(num){// 日期范围：1700-01-01 ----2099-01-01 　
	var regexp = /^([1][7-9][0-9][0-9]|[2][0][0-9][0-9])(\/)([0][1-9]|[1][0-2])(\/)([0-2][0-9]|[3][0-1])$/;
	return regexp.test(num);
}

function IsNumber(num){
	var regexp = /^\+?[1-9][0-9]*$/;
	return regexp.test(num);	
}