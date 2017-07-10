
$(function(){
	getDistrict();
	$(".lang").hide();
	$(".lang1").show();
	$('.property').hide();
	
	adminContact();
	$('.loading').hide();
	
	$('.next').click(function(){
		if($('.house_id').val().length <= 15 && $('.house_id').val().length > 0){
			$('.house_id').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.house_id').siblings("span").text("输入错误").css("color","red");
			$('.house_id').css("border-color","red");
		}
		
		if($('.provider_money').val().length <= 10 && $('.provider_money').val().length > 0){
			$('.provider_money').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.provider_money').siblings("span").text("长度1-10").css("color","red");
			$('.provider_money').css("border-color","red");
		}
		if($('.room_num').val().length <= 6 && $('.room_num').val().length > 0){
			$('.room_num').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.room_num').siblings("span").text("长度1-6").css("color","red");
			$('.room_num').css("border-color","red");
		}
		if($('.remark').val().length <= 200 && $('.remark').val().length > 0){
			$('.remark').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.remark').siblings("span").text("长度1-200").css("color","red");
			$('.remark').css("border-color","red");
		}
		if($('.contract_no').val().length <= 20 && $('.contract_no').val().length > 5){
			$('.contract_no').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.contract_no').siblings("span").text("长度1-20").css("color","red");
			$('.contract_no').css("border-color","red");
		}
		if($('.renter_idcard').val().length <= 30 && $('.renter_idcard').val().length > 0){
			$('.renter_idcard').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.renter_idcard').siblings("span").text("长度1-40").css("color","red");
			$('.renter_idcard').css("border-color","red");
		}
		if($('.renter_telephone').val().length <= 11 && $('.renter_telephone').val().length > 0){
			$('.renter_telephone').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.renter_telephone').siblings("span").text("长度1-11").css("color","red");
			$('.renter_telephone').css("border-color","red");
		}
		if($('.renter_name').val().length <= 50 && $('.renter_name').val().length > 0){
			$('.renter_name').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.renter_name').siblings("span").text("长度1-50").css("color","red");
			$('.renter_name').css("border-color","red");
		}
		if($('.service_provider').val().length <= 30 && $('.service_provider').val().length > 0){
			$('.service_provider').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.service_provider').siblings("span").text("长度1-20").css("color","red");
			$('.service_provider').css("border-color","red");
		}
		if($('.contract_date').val().length > 0){
			$('.contract_date').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.contract_date').siblings("span").text("请选择日期").css("color","red");
			$('.contract_date').css("border-color","red");
		}
		if($('.contract_startdate').val().length > 0){
			$('.contract_startdate').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.contract_startdate').siblings("span").text("请选择日期").css("color","red");
			$('.contract_startdate').css("border-color","red");
		}
		if($('.contract_enddate').val().length > 0){
			$('.contract_enddate').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.contract_enddate').siblings("span").text("请选择日期").css("color","red");
			$('.contract_enddate').css("border-color","red");
		}
		if($('.payrent_time').val().length > 0 && $('.payrent_time').val().length < 30){
			$('.payrent_time').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.payrent_time').siblings("span").text("请选择日期").css("color","red");
			$('.payrent_time').css("border-color","red");
		}
		if($('.remark').val().indexOf("租了么")>= 0 ){			
			if($('.paymethod').val()!='租了么'){
				$('.paymethod').siblings("span").text("确认付款方式为租了么!").css("color","red");
				$('.paymethod').css("border-color","red");
				return;
			}else{
				$('.paymethod').siblings("span").text("");
			}
		}
		if($('.house_id').siblings("span").text()=="输入正确" &&$('.remark').siblings("span").text()=="输入正确" && $('.contract_no').siblings("span").text()=="输入正确" && $('.renter_idcard').siblings("span").text()=="输入正确" && 
				$('.renter_telephone').siblings("span").text()=="输入正确" && $('.renter_name').siblings("span").text()=="输入正确" && $('.service_provider').siblings("span").text()=="输入正确" &&
				$('.contract_date').siblings("span").text()=="输入正确" && $('.contract_startdate').siblings("span").text()=="输入正确" && $('.contract_enddate').siblings("span").text()=="输入正确"){
			$('.rentinfo').hide();
			$('.property').show();
		}
		
	});
	$(".prev").click(function(){
		$('.rentinfo').show();
		$('.property').hide();
	});
	
	$('.app_region>span').click(function(){
		var value = $(this).html();
		if(value=='+'){
			$(this).siblings('div').show();
			$(this).html('-');
		}else{
			$(this).siblings('div').hide();
			$(this).html('+');
		}		
	});
	
	
	$(".insert").click(function(){
		$('.loading').show();		//防止连续点击
		setTimeout(function(){
			$('.loading').hide();
		},100);
		
		var a = encodeURI(encodeURI($(".house_id").val()));
		var b = encodeURI(encodeURI($(".contract_no").val()));
		var c = encodeURI(encodeURI($(".salesman").val()));
		var d = encodeURI(encodeURI($(".region_manager").val()));
		var e = encodeURI(encodeURI($(".service_provider").val()));
		var f = encodeURI(encodeURI($(".renter_name").val()));
		var g = encodeURI(encodeURI($(".renter_telephone").val()));
		var h = encodeURI(encodeURI($(".renter_idcard").val()));
		var i = encodeURI(encodeURI($(".contract_date").val()));
		var j = encodeURI(encodeURI($(".contract_startdate").val()));
		var k = encodeURI(encodeURI($(".contract_enddate").val()));
		var l = encodeURI(encodeURI($(".contract_month").val()));
		var m = encodeURI(encodeURI($(".firstyear_monthrent").val()));
		var n = encodeURI(encodeURI($(".secondyear_monthrent").val()));
		var o = encodeURI(encodeURI($(".thirdyear_monthrent").val()));
		var p = encodeURI(encodeURI($(".fourthyear_monthrent").val()));
		var q = encodeURI(encodeURI($(".fifthyear_monthrent").val()));
		var r = encodeURI(encodeURI($(".firststage_rent").val()));
		var s = encodeURI(encodeURI($(".payrent_time").val()));
		var t = encodeURI(encodeURI($(".paymethod").val()));
		if(t=='other'){
			t=$('#othervalue').val();
		}
		var u = encodeURI(encodeURI($(".deposit").val()));
		var v = encodeURI(encodeURI($(".monthpay_provider").val()));
		var w ="";//encodeURI(encodeURI($(".monthpay_state").val()));
		var x = encodeURI(encodeURI($(".remark").val()));
		var y = encodeURI(encodeURI($(".job_no").val()));
		var z = encodeURI(encodeURI($(".room_num").val()));
		var aa = encodeURI(encodeURI($(".state").val()));
		var bb = encodeURI(encodeURI($(".district").val()));
		var cc = encodeURI(encodeURI($(".date").val()));
		var dd = encodeURI(encodeURI($(".address").val()));
		var ee = encodeURI(encodeURI($(".provider_money").val())); 
		var ff = 0;
		
		var now_water_degree = encodeURI(encodeURI($('.now_water_degree').val()));
		var now_elec_degree_day = encodeURI(encodeURI($('.now_elec_degree_day').val()));
		var now_elec_degree_night = encodeURI(encodeURI($('.now_elec_degree_night').val()));
		var now_gas_degree = encodeURI(encodeURI($('.now_gas_degree').val()));
		var application = encodeURI(encodeURI(fun()));
		var keyinfo = encodeURI(encodeURI(yaoshixinxi()));
		
		getrentcontract(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo);		
	});

	
	$(".renter_name").blur(function(){
		var dd = $(".renter_name").val();
		$(this).siblings("span").css("display","none");
		if(dd.length <= 50 && dd.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-50").css("color","red");
			$(this).css("border-color","red");
		}
	});
	$(".renter_name").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".service_provider").blur(function(){
		var dd = $(".service_provider").val();
		$(this).siblings("span").css("display","none");
		if(dd.length <= 20 && dd.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-20").css("color","red");
			$(this).css("border-color","red");
		}
	});
	$(".service_provider").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".renter_telephone").blur(function(){
		var d = $(".renter_telephone").val();
		$(this).siblings("span").css("display","none");
		if(d.length <= 11 && d.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-11").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".renter_telephone").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".renter_idcard").blur(function(){
		var e = $(".renter_idcard").val();
		$(this).siblings("span").css("display","none");
		if(e.length <= 40 && e.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-40").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".renter_idcard").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".contract_no").blur(function(){
		var h = $(".contract_no").val();
		$(this).siblings("span").css("display","none");
		if(h.length <= 20 && h.length > 5){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-20").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".contract_no").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".remark").blur(function(){
		var z = $(".remark").val();
		$(this).siblings("span").css("display","none");
		if(z.length <= 200 && z.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-200").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".remark").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".room_num").blur(function(){
		var bb = $(".room_num").val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 6 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-6").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".room_num").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	
	$(".contract_date").bind('input propertychange', function() {
		
	});
	$(".contract_date").blur(function(){
		var a = $(this).val();
	});
	$(".contract_date").focus(function(){
		
	});
	
	$(".paymethod").change(function(){
		var checkValue=$(".paymethod").val();
		if(checkValue=='other'){
			$('#othervalue').show();
		}else{
			$('#othervalue').hide();
		}
	});	
});

//查看有无录入记录
function getrentcontract(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo){
	$.ajax({
	       type: "GET",
	       url: "Onerent.do",
	       async: true,
	       data: "contract_no="+b,
	       success: function(result){
				$('.loading').hide();
				if(result=='fail'){
					alert('请先去登录');
				}else if(result=='zero'){
					getrenthouse(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo);
		       	}else{
		       		alert("该出房合同编号已经录入过，请注意查看合同编号是否输入正确");
		       	}		    
	       }
	  });
}

function getrenthouse(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo){
	$('.loading').show();
	$.ajax({
	       type: "GET",
	       url: "Onerent.do",
	       async: true,
	       data: "house_id="+a,
	       success: function(result){
				$('.loading').hide();
				if(result=='fail'){
					alert('请先去登录');
				}else if(result=='zero'){
		       		insert(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo);			//出房中没有该房出租记录
		       	}else{
		       		var obj = eval('(' + result + ')');
		       		if(obj.state=='出租中'){
		       			alert("该房源还有出租中的租客记录，无法添加"); 	
		       		}else{
		       			insert(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo);			//该房子出租过，但已无效
		       		}
		       	}		    
	       }
	  });
}

//function updaterent(a,state,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo){
//	$.ajax({
//		   type: "GET",
//		   url: "putRent.do",
//		   async: false,
//		   data: "house_id="+a		   	
//		   	+"&state="+state,
//		   success: function(result){
//				if(result=="error"){
//					alert("修改出房记录状态异常,添加失败");
//				}else if(result=="fail"){
//					alert("请先去登录");
//				}else if(result=="updatefail"){
//					alert("修改出房记录状态失败,添加失败");
//				}else if(result=="success"){
//					insert(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo);
//				}
//		   }
//	});
//}
$(function(){
	$(".district").bind("change",function(){
		var district = $(".district").val();
		request(district);
	});
	
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

function request(district){
	$('#djxz').html('加载中...');
	$.ajax({
		type: "GET",
		url: "house.do",
		data: "district="+encodeURI(encodeURI(district))+"&state="+encodeURI(encodeURI("空置中"))+"&contract_start1=&contract_start2=&contract_end1=&contract_end2=",
		success: function(result){
			if(result=='fail'){
				$('#djxz').html('未登录');
			}else{
				$('#djxz').html('点击选择');
				var arr=JSON.parse(result);
				$(".ssul").html("");
				for(var i=0;i<arr.length;i++){
			    	obj=arr[i];
			    	$(".ssul").append("<li lang='"+obj.house_id+"' lang1='"+obj.job_no+"'>"+obj.address+"</li>");
				} 
				
				$(".ssul li").click(function(){
					var sscx = $(this).text();
					var sscxlang = $(this).attr("lang");
					$(".house_id").val(sscxlang);
					$(".xzyx").text(sscx);
					$(".address").val(sscx);
					var a = $(this).attr("lang1");
					$('.job_no>option').each(function(){
					    if($(this).html()==a){
					    	$(".job_no")[0].value=$(this).val();
					    }
					})
					
					$(".sswk").css("display","none");
				});
			}	
			
		}
	});
}

function insert(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo){	
	setTimeout(function(){
		$('.loading').show();		//与防止连续点击延时对应
	},100);
	$.ajax({
		   type: "POST",
		   url: "addRent.do",
		   data: "house_id="+a
		   	+"&contract_no="+b
		   	+"&salesman="+c
		   	+"&region_manager="+d
		   	+"&service_provider="+e
		   	+"&renter_name="+f
		   	+"&renter_telephone="+g
		   	+"&renter_idcard="+h
		   	+"&contract_date="+i
		   	+"&contract_startdate="+j
		   	+"&contract_enddate="+k
		   	+"&contract_month="+l
		   	+"&firstyear_monthrent="+m
		   	+"&secondyear_monthrent="+n
		   	+"&thirdyear_monthrent="+o
		   	+"&fourthyear_monthrent="+p
		   	+"&fifthyear_monthrent="+q
		   	+"&firststage_rent="+r
		   	+"&payrent_time="+s
		   	+"&paymethod="+t
		   	+"&deposit="+u
		   	+"&monthpay_provider="+v
		   	+"&monthpay_state="+w
		   	+"&remark="+x
		   	+"&job_no="+y
		   	+"&room_num="+z
		   	+"&state="+aa
		   	+"&district="+bb
		   	+"&address="+dd
		   	+"&date="+cc
		   	+"&provider_money="+ee
		   	+"&sixthyear_monthrent="+ff
		   	+"&now_water_degree="+now_water_degree
		   	+"&now_elec_degree_day="+now_elec_degree_day
		   	+"&now_elec_degree_night="+now_elec_degree_night
		   	+"&now_gas_degree="+now_gas_degree
		   	+"&application="+application
		   	+"&keyinfo="+keyinfo,
		   success: function(result){
				$('.loading').hide();
				if(result=="error"){
					alert("操作异常");
				}else if(result=="fail"){
					alert("请先去登录");
				}else if(result=="refused"){
					alert("权限不够");
				}else if(result=="addfail"){
					alert("添加失败");
				}else if(result=="propertyinsertfail"){
					alert("出房信息添加成功,物业配置添加失败，联系管理员");
				}else if(result=="propertyerror"){
					alert("出房信息添加成功,物业配置添加异常，联系管理员");
				}else{
//					updatehouserent(a); 改到后台生效
					alert("添加成功");					
					window.location.href="rent.html";
				}
		   }
	});
}

//function updatehouserent(a){
//	$('.loading').show();
//	$.ajax({
//		   type: "GET",
//		   url: "putHouse.do",
//		   async:false,
//		   data: "house_id="+a			   
//		   	+"&state="+encodeURI(encodeURI("已出租")),
//		   success: function(result){
//				$('.loading').hide();
//				if(result=="error"){
//					alert("房源状态更新为已出租失败，请手动前往更新");
//				}else if(result=="updatefail"){
//					alert("房源状态更新为已出租失败，请手动前往更新");
//				}
//		   }
//	});	
//}

function adminContact(){
	  $.ajax({
	       type: "GET",
	       url: "adminContact.do",
	       data: "",
	       success: function(result){
	        var arr=JSON.parse(result);          
	        var obj;
	        var html="";
	        var html1="";
	        for(var i=0;i<arr.length;i++){
	          obj=arr[i];
	          if(obj.position=='商圈经理'|| obj.district=='宝山西区'){
	        	  html += "<option value='"+obj.name+"'>"+obj.name+"</option>";
		          html1 += "<option value='"+obj.job_no+"'>"+obj.name+"</option>"; 
	          }
	        }  
	        $(".job_no").append(html1);
	        $(".salesman").append(html);
	        $(".salesman").bind("change",function(){
	          var salesman = $(this).val();
	          var district;
	          for(var i=0;i<arr.length;i++){
	            obj=arr[i];
	            if(salesman == obj.name){
	              district = obj.district;
	            }
	          }
	          for(var i=0;i<arr.length;i++){
	            obj=arr[i];
	            if(district == obj.district && obj.position =="区域经理"){
	              $(".region_manager").val(obj.name);
	              break;
	            }
	            if(obj.name=="吴显节"){
	              $(".region_manager").val("吴显节");
	            }
	          }
	          
	        });
	       }
	  });
	}


//监听几室输入框变化
$(function(){
	$('.firstyear_monthrent').bind('input propertychange', function() { 
		$('.provider_money').val(parseInt($('.firstyear_monthrent').val())*0.35);
		$('.deposit').val(parseInt($('.firstyear_monthrent').val()));
	});
	
	
	$('.firststage_rent,.firstyear_monthrent,.contract_month').bind('input propertychange', function() { 
		$('.monthpay_provider').val(parseInt($('.firststage_rent').val())+parseInt($('.firstyear_monthrent').val()));
		$('.payrent_time').val(parseInt($('.contract_month').val())*parseInt($('.monthpay_provider').val()));
	});
	
//	
//	//监听家电复选框
//	$("input[name='application']").change(function(){
//		if($(this).is(':checked')){
//				var html = "<span>"+$(this).val().substring($(this).val().indexOf("-")+1)+"</span>"+
//	                		"<span>数量</span><input class='thisnumber' type=\"number\" value=\"1\" style=\"width:30px;position:relative;top:5px;\"/>"+
//	                		"<span>型号</span><input class='thismodel' type=\"text\" value=\"无\" style=\"width:100px;position:relative;top:5px;\"/>"+
//	                		"<span>备注</span><input class=\"thisremark\" type=\"text\" value=\"无\" style=\"width:150px;position:relative;top:5px;\"/>";
//	                		$(this).siblings("span").remove();
//	                		$(this).after(html);
//		}else{
//			$(this).siblings("span,input").remove();
//			$(this).after("<span>"+$(this).val().substring($(this).val().indexOf("-")+1)+"</span>");
//		}
//	});	
//	
//	//监听钥匙凭证信息复选框
//	$("input[name='yaoshixinxi']").change(function(){
//		if($(this).is(':checked')){
//				var html = "<span>"+$(this).val().substring($(this).val().indexOf("-")+1)+"</span>"+
//	                		"<span>数量</span><input class='thisnumber' type=\"number\" value=\"1\" style=\"width:30px;position:relative;top:5px;\"/>"+
//	                		"<span>使用状态</span><select class='thismodel' style=\"width:100px;position:relative;top:5px;\"><option>正常</option><option>丢失</option><option>损坏</option></select>"+
//	                		"<span>备注</span><input class=\"thisremark\" type=\"text\" value=\"无\" style=\"width:150px;position:relative;top:5px;\"/>";
//	                		$(this).siblings("span").remove();
//	                		$(this).after(html);
//		}else{
//			$(this).siblings("span,input,select").remove();
//			$(this).after("<span>"+$(this).val().substring($(this).val().indexOf("-")+1)+"</span>");
//		}
//	});
	
	
});  

//获取家电的数据（json数组格式）
function fun(){
	var jsonarray=[];
    obj = document.getElementsByName("application");
    for(k in obj){
        if(obj[k].checked){
        	var arr={
        			"region" : $(obj[k]).val().substring(0,$(obj[k]).val().indexOf("-")),
                    "name" : $(obj[k]).val().substring($(obj[k]).val().indexOf("-")+1),
                    "number" : $(obj[k]).parent().next().children('.thisnumber').val(),//$(obj[k]).siblings(".thisnumber").val(),
                    "model" : $(obj[k]).parent().next().next().children('.thismodel').val(),//$(obj[k]).siblings(".thismodel").val(),
                    "remark" : $(obj[k]).parent().next().next().next().children('.thisremark').val(),//$(obj[k]).siblings(".thisremark").val()
            } ;
        	jsonarray.push(arr);
        }        	
    };
    var jsonarr = JSON.stringify(jsonarray);
    return jsonarr;
}

//获取家电的数据（json数组格式）
function yaoshixinxi(){
	var jsonarray=[];
    obj = document.getElementsByName("yaoshixinxi");
    for(k in obj){
        if(obj[k].checked){
        	var arr={
                "name" : $(obj[k]).val(),
                "number" :$(obj[k]).parents("td").siblings().children('.thisnumber').val(),// $(obj[k]).siblings(".thisnumber").val(),
                "state" : $(obj[k]).parents("td").siblings().children('.thismodel').val(),//$(obj[k]).siblings(".thismodel").val(),
                "remark" : $(obj[k]).parents("td").siblings().children('.thisremark').val(),//$(obj[k]).siblings(".thisremark").val()
            } ;
        	jsonarray.push(arr);
        }
    };
    var jsonarr = JSON.stringify(jsonarray);
    return jsonarr;
}

function getDistrict(){
	$.ajax({
	       type: "GET",
	       url: "/getAllDistrict.do",
	       data: "",
	       success: function(result){
	    	   var arr=JSON.parse(result);          
		        var obj;
		        var html="";
		        for(var i=0;i<arr.length;i++){
		          obj=arr[i];
		          html += "<option value='"+obj.district+"'>"+obj.district+"</option>";
		        }
		        $('.district').append(html);
		        request($('.district').val());
	       }
			
	  });
}