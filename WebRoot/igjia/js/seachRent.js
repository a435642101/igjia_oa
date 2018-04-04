var page = 1;
var flag=true;
//获取租客信息
$(function(){
	getDistrict();
	seachrent();
	getproperty();
	getOperateLogs();
	$(".lang").hide();
	$(".lang1").show();
	adminContact();
	
	$(".bj a").click(function(){
		$(this).parents(".bj").siblings(".word_grey").children("input").removeAttr("readonly");
		$(this).parents(".bj").siblings(".word_grey").children("input").focus();
	});
	$('.state').bind('input propertychange', function() {  
		var state = $(this).val();
		if(state == "已失效"){
			$(".vacancy_date").show();
			$(".vacancy_dates").show();
		}else{
			$(".vacancy_date").hide();
			$(".vacancy_dates").hide();
		}
	});
	$(".update").click(function(){
		var a = encodeURI(encodeURI($(".house_id").val()));
		var b = encodeURI(encodeURI($(".contract_no").val()));
		var c = encodeURI(encodeURI($(".salesman").val()));
		if(c=='other'){
			c=encodeURI(encodeURI($('#othersalesman').val()));
		}
		
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
		var w ="";// encodeURI(encodeURI($(".monthpay_state").val()));
		var x = encodeURI(encodeURI($(".remark").val()));
		var y = encodeURI(encodeURI($(".job_no").val()));
		var z = encodeURI(encodeURI($(".room_num").val()));
		var aa = encodeURI(encodeURI($(".state").val()));
		var bb = encodeURI(encodeURI($(".district").val()));
		var cc = encodeURI(encodeURI($(".date").val()));
		var dd = encodeURI(encodeURI($(".address").val()));
		var ee = encodeURI(encodeURI($(".provider_money").val())); 
		var ff = encodeURI(encodeURI($(".sixthyear_monthrent").val())); 
		
		var now_water_degree = encodeURI(encodeURI($('.now_water_degree').val()));
		var now_elec_degree_day = encodeURI(encodeURI($('.now_elec_degree_day').val()));
		var now_elec_degree_night = encodeURI(encodeURI($('.now_elec_degree_night').val()));
		var now_gas_degree = encodeURI(encodeURI($('.now_gas_degree').val()));
		var application = encodeURI(encodeURI(fun()));
		var keyinfo = encodeURI(encodeURI(yaoshixinxi()));

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
		if($('.contract_no').val().length <= 20 && $('.contract_no').val().length > 0){
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
		if("已失效"==$(".state").val()){
			if($(".vacancy_date").val().length > 0){
				if(confirm("是否确认更改出房状态为失效")){					
					update(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo);
				}	
			}else{
				alert("请输入失效时间");
			}
		}else{
			if($('.house_id').siblings("span").text()=="输入正确" &&$('.remark').siblings("span").text()=="输入正确" && $('.contract_no').siblings("span").text()=="输入正确" && $('.renter_idcard').siblings("span").text()=="输入正确" && 
					$('.renter_telephone').siblings("span").text()=="输入正确" && $('.renter_name').siblings("span").text()=="输入正确" && $('.service_provider').siblings("span").text()=="输入正确" &&
					$('.contract_date').siblings("span").text()=="输入正确" && $('.contract_startdate').siblings("span").text()=="输入正确" && $('.contract_enddate').siblings("span").text()=="输入正确"){			
					update(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo);	
			}
		}		
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
		if(h.length <= 20 && h.length > 0){
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
	$(".salesman").change(function(){
		var checkValue1=$(".paymethod").val();
		if(checkValue1=='other'){
			$('#othersalesman').show();
		}else{
			$('#othersalesman').hide();
		}
	});	
	
});

function updatehouserent(a){
		var vacancy_date = $(".vacancy_date").val();
		$('.loading').show();
		$.ajax({
			   type: "GET",
			   url: "putHouse.do",
			   async:false,
			   data: "house_id="+a			   
			   	+"&state="+encodeURI(encodeURI("配置中"))+"&vacancy_date="+vacancy_date+"&district="+encodeURI(encodeURI($(".district").val())),
			   success: function(result){
					$('.loading').hide();
					if(result=="error"){
						alert("房源状态更新为配置中失败，请手动前往更新");
					}else if(result=="updatefail"){
						alert("房源状态更新为配置中失败，请手动前往更新");
					}
			   }
		});	
}


function update(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,now_water_degree,now_elec_degree_day,now_elec_degree_night,now_gas_degree,application,keyinfo){
	$('.loading').show();
	var vacancy_date = $(".vacancy_date").val();
	$.ajax({
		   type: "post",
		   url: "putRent.do",
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
		   	+"&date="+cc
		   	+"&address="+dd
		   	+"&provider_money="+ee
		   	+"&sixthyear_monthrent="+ff
		   	+"&now_water_degree="+now_water_degree
		   	+"&now_elec_degree_day="+now_elec_degree_day
		   	+"&now_elec_degree_night="+now_elec_degree_night
		   	+"&now_gas_degree="+now_gas_degree
		   	+"&application="+application
		   	+"&keyinfo="+keyinfo
			+"&vacancy_date="+vacancy_date,
		   success: function(result){
				$('.loading').hide();
				if(result=="error"){
					alert("操作异常");
				}else if(result=="fail"){
					alert("请先去登录");
				}else if(result=="updatefail"){
					alert("修改失败");
				}else if(result=="refused"){
					alert("权限不够,无法修改");
				}else{
					if(result=="propertyupdatefail"){
						alert("出房数据修改成功，物业交割修改失败");
					}else if(result=="propertyupdateerror"){
						alert("出房数据修改成功，物业交割修改异常");
					}else{
						alert("修改成功");
					}
					// if("已失效"==$(".state").val()){
					// 	updatehouserent(a,b);
					// }
//					window.location.href="rent.html";
				}
		   }
	});
}

function seachrent(){
	var contract_no = GetQueryString("contract_no");
	$.ajax({
		   type: "GET",
		   url: "Onerent.do",
		   data: "contract_no="+contract_no,
		   success: function(result){
			$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
//					$("#loadmore").html("您还尚未登录,<a href=\"login.html\" target=\"_blank\">点击登录</a>").show();
				}else{
					var obj = eval('(' + result + ')');
						var html;
						$(".house_id").val(obj.house_id);
						$(".find").attr("_href","houseDetail.html?house_id="+obj.house_id);
						$(".contract_no").val(obj.contract_no);
						$(".salesman")[0].value=obj.name;
						$(".region_manager").val(obj.region_manager);
						$(".service_provider").val(obj.service_provider);
						$(".renter_name").val(obj.renter_name);
						$(".renter_telephone").val(obj.renter_telephone);
						$(".renter_idcard").val(obj.renter_idcard);
						$(".contract_date").val(obj.contract_date);
						$(".contract_startdate").val(obj.contract_startdate);
						$(".contract_enddate").val(obj.contract_enddate);
						$(".contract_month").val(obj.contract_month);
						$(".firstyear_monthrent").val(obj.firstyear_monthrent);
						$(".secondyear_monthrent").val(obj.secondyear_monthrent);
						$(".thirdyear_monthrent").val(obj.thirdyear_monthrent);
						$(".fourthyear_monthrent").val(obj.fourthyear_monthrent);
						$(".fifthyear_monthrent").val(obj.fifthyear_monthrent);
						$(".sixthyear_monthrent").val(obj.sixthyear_monthrent);
						$(".firststage_rent").val(obj.firststage_rent);
						$(".payrent_time").val(obj.payrent_time);
						$(".paymethod")[0].value=obj.paymethod;
						$(".deposit").val(obj.deposit);
						$(".monthpay_provider").val(obj.monthpay_provider);
						$(".monthpay_state").val(obj.monthpay_state);
						$(".remark").val(obj.remark);
						$(".job_no").val(obj.job_no);
						$(".room_num").val(obj.room_num);
						$(".state")[0].value=obj.state;
						$(".district")[0].value=obj.district;
						$('.business_area').val(obj.business_area);
						$(".date").val(obj.date);	
						$(".address").val(obj.address);
						$(".provider_money").val(obj.provider_money);
						if($(".paymethod").val()==null){
							$(".paymethod")[0].value="other";
							$('#othervalue').val(obj.paymethod).show();
						}
						if($(".salesman").val()==null){
							$(".salesman")[0].value="other";
							$('#othersalesman').val(obj.name).show();
						}		
						getAdmin();
				}	
		   }
	});
}

function adminContact(){
	  $.ajax({
	       type: "GET",
	       url: "adminContact.do",
	       async: false,
	       data: "",
	       success: function(result){
	        var arr=JSON.parse(result);          
	        var obj;
	        var html="";
	        var html1="";
	        for(var i=0;i<arr.length;i++){
	          obj=arr[i];
	          if(obj.position=='商圈经理' || obj.district=='宝山西区'){
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
	$('.firststage_rent,.firstyear_monthrent,.contract_month').bind('input propertychange', function() { 
		$('.monthpay_provider').val(parseInt($('.firststage_rent').val())+parseInt($('.firstyear_monthrent').val()));
		$('.payrent_time').val(parseInt($('.contract_month').val())*parseInt($('.monthpay_provider').val()));
	});
});

function getOperateLogs(){
	var contract_no = GetQueryString("contract_no");
	$.ajax({
		   type: "GET",
		   url: "/getLogs.do",
		   data: "contract_no="+contract_no+"&type="+encodeURI(encodeURI("出房")),
		   success: function(result){	
			   var arr=JSON.parse(result);  
			   
			   var html="";
			   for(var i=1;i<arr.length+1;i++){
			   		var obj=arr[i-1];
			   		html += "<tr><td>"+i+"</td>"+
							"<td>"+obj.job_no+"</td>"+
							"<td>"+obj.name+"</td>"+
							"<td>"+obj.content+"</td>"+
							"<td>"+obj.date+"</td></tr>";
			   }
			   $('.operatelogs tbody').append(html);
		   }
	});
	
}

function getproperty(){				//设置物业配置（水电煤，家电配置）
	var contract_no = GetQueryString("contract_no");
	$.ajax({
		   type: "GET",
		   url: "getrentproperty.do",
		   data: "contract_no="+contract_no,
		   success: function(result){	
			   var obj = eval('(' + result + ')');
			   $('#now_water_degree').val(obj.now_water_degree);
			   $('#now_gas_degree').val(obj.now_gas_degree);
			   $('#now_elec_degree_day').val(obj.now_elec_degree_day);
			   $('#now_elec_degree_night').val(obj.now_elec_degree_night);
			   
			   var html1="";
			   if(obj.application!=""){
				   var application =JSON.parse(obj.application);
				   var page_application = $('input[name=application]');
					for(var k=0;k<page_application.length;k++){
				    	for(var i=0;i<application.length;i++){
				    		var appobj1 = application[i];
							var name =appobj1.region+"-"+appobj1.name;
							if($(page_application[k]).val() == name){	
								$(page_application[k]).attr("checked",true);
					    		addgoods($(page_application[k]),appobj1.number,appobj1.model,appobj1.remark);
					    		continue;
					    	} 	
				    	}	
				    };	
			   }
			   var keyinfo =JSON.parse(obj.keyinfo);
			   var yaoshixinxi = $('input[name=yaoshixinxi]');
				for(var k=0;k<yaoshixinxi.length;k++){
			    	for(var i=0;i<keyinfo.length;i++){
			    		var appobj1 = keyinfo[i];
						var name =appobj1.name;
						if($(yaoshixinxi[k]).val() == name){	
							$(yaoshixinxi[k]).attr("checked",true);
							addkeys($(yaoshixinxi[k]),appobj1.number,appobj1.state,appobj1.remark);
				    		continue;
				    	} 	
			    	}	
			    };
		   }
	});
}
function addgoods(e,number,model,remark){
	$(e).parent().next().append("数量：<input type='number' width='100px' class='thisnumber' id='thisnumber' value='"+number+"'/>");
	$(e).parent().next().next().append("型号：<input type='text' class='thismodel' id='thismodel' value='"+model+"'/>");
	$(e).parent().next().next().next().append("备注：<input type='text' class='thisremark' id='thisremark' value='"+remark+"'/>");
}
function addkeys(e,number,model,remark){
	$(e).parent().next().append("数量：<input type='number' width='100px' class='thisnumber' id='thisnumber' value='"+number+"'/>");
	$(e).parent().next().next().append("状态：<select class='thismodel' id='thismodel' name='thismodel' ><option value='正常'>正常</option><option value='破损'>破损</option><option value='丢失'>丢失</option></select>");
	$(e).parent().next().next().next().append("备注：<input type='text' class='thisremark' id='thisremark' value='"+remark+"'/>");
	$(e).parent().next().next().children(".thismodel")[0].value=model;
}
//截取参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


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
                "number" : $(obj[k]).parent().next().children('.thisnumber').val(),//$(obj[k]).siblings(".thisnumber").val(),
                "state" : $(obj[k]).parents("td").siblings().children('.thismodel').val(),//$(obj[k]).siblings(".thismodel").val(),
                "remark" : $(obj[k]).parent().next().next().next().children('.thisremark').val(),//$(obj[k]).siblings(".thisremark").val()
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
	       async:false,
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
	       }
	  });
}

function getAdmin(){
	$.ajax({
		type:"get",
		url:"/admin.do",
		async:false,
		success:function(result){
			if(result=='fail'){			
			}else{
				var json = eval('(' + result + ')');
				var department = json.department;				
				var job_no = json.job_no;
				var name = json.name;
				var jobno1 = $('.salesman').val();
				var jobno2 = $('.job_no').val();
				var name1 = $('.region_manager').val();
				var business_area = json.business_area;
				var business_area1 = $('.business_area').val();
				var district = $('.district').val();
				var district1 = json.district;
				if(department=="YGJZL" && jobno1!=job_no && jobno2!=job_no && name!=name1 && job_no!='10007' && !(business_area==business_area1 && json.position =='商圈经理') && !(district == district1 && json.position =='区域经理')){
					var telephone = $('.renter_telephone').val();
					var newt = telephone.substring(0,3)+"****"+telephone.substring(7,telephone.length)
					$('.renter_telephone').val(newt);
				}
			}			
		}
	})
}