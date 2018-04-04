var page = 1;
var flag=true;


//获取租客信息
$(function(){
	getDistrict();
	seachrent();	
	adminContact();
	getproperty();
	getOperateLogs()
	getrent();
	$('#showproperty').click(function(){
		$('.property').animate({top:"0px"});
		$('.loadingbackground').show();
	})
	$('#propertyclose,.loadingbackground').click(function(){
		$('.property').animate({top:"-150%"});
		$('.loadingbackground').hide();
	})
	
	$(".bj a").click(function(){
		$(this).parents(".bj").siblings(".word_grey").children("input").removeAttr("readonly");
		$(this).parents(".bj").siblings(".word_grey").children("input").focus();
	})
	
	$('.state').bind('input propertychange', function() {  
		var state = $(this).val();
		if(state == "已解约"){
			$(".break_date").show();
		}else{
			$(".break_date").hide();
		}
	});
	$('.baletu_down').click(function(){		//巴乐兔下架
		$('.loading').show();
		var house_id = $(".house_id").val();
		var district = encodeURI(encodeURI($('.district').val()));
		$.ajax({
			   type: "GET",
			   url: "/downHouse.do",
			   data: "house_id="+house_id+"&district="+district,
			   success: function(result){
					$('.loading').hide();
					if(result=='下架成功'){
						alert(result);
						$('.baletu_down').hide();
					}else{
						alert("下架失败");
					}
			   }
		});
	})
	
	$('.baletu').click(function(){			//巴乐兔发布
		var state = $(".state").val();
		if(state=='空置中'){
			$('.loading').show();
			var estate =encodeURI(encodeURI($('.estate').val()));
			var address =encodeURI(encodeURI($('.address').val()));
			var tp1 = $('.house_type1').val();
			var tp2 = $('.house_type2').val();
			var tp3 = $('.house_type3').val();
			var tp4 = $('.house_type4').val();
			var tp5 = $('.house_type5').val();
			var housetype =encodeURI(encodeURI(tp1+"室"+tp2+"厅"+tp3+"卫"+tp4+"厨"+tp5+"阳台"));
			var area =encodeURI(encodeURI($('.area').val()));
			var room_num =encodeURI(encodeURI($('.room_num').val()));
			var business_area =encodeURI(encodeURI($('.business_area').val()));
			var fangdong_name=encodeURI(encodeURI($('.fangdong_name').val()));
			var fangdong_telephone=encodeURI(encodeURI($('.fangdong_telephone').val()));
			var room_area=encodeURI(encodeURI($('.room_area').val()));
			var room_yuqichufangjia=encodeURI(encodeURI($('.room_yuqichufangjia').val()));
			var house_id = encodeURI(encodeURI($(".house_id").val()));
			var district = encodeURI(encodeURI($('.district').val()));
			$.ajax({
				   type: "GET",
				   url: "/releaseHouse.do",
				   data: "house_id="+house_id
				   	+"&estate="+estate
				   	+"&address="+address
				   	+"&house_type="+housetype
				   	+"&area="+area
				   	+"&room_num="+room_num
				   	+"&business_area="+business_area
				   	+"&fangdong_name="+fangdong_name
				   	+"&fangdong_telephone="+fangdong_telephone
				   	+"&room_area="+room_area
				   	+"&district="+district
				   	+"&room_yuqichufangjia="+room_yuqichufangjia,
				   success: function(result){
						$('.loading').hide();
						if(result=='发布成功'){
							alert(result);
							$('.baletu_down').show();
							$('.baletu_down').text("已上架，点击下架");
						}else if(result=='refused'){
							alert("权限不够");
						}else{
							alert("发布失败,注意查看地址格式是否规范(应包含弄,号,室，-)");
						}
				   }
			});
		}else{
			alert('该房间不是空置中，无法发布');
		}
		
	})
	
	$(".update").click(function(){
		var a = encodeURI(encodeURI($(".house_id").val()));
//		var b =encodeURI(encodeURI($('.region').val()));		//小区域
		var c =encodeURI(encodeURI($('.district').val()));	//大区域 东南西北
		var d =encodeURI(encodeURI($('.estate').val()));
		var e =encodeURI(encodeURI($('.address').val()));
		var tp1 = $('.house_type1').val();
		var tp2 = $('.house_type2').val();
		var tp3 = $('.house_type3').val();
		var tp4 = $('.house_type4').val();
		var tp5 = $('.house_type5').val();
		var f =encodeURI(encodeURI(tp1+"室"+tp2+"厅"+tp3+"卫"+tp4+"厨"+tp5+"阳台"));
		var g =encodeURI(encodeURI($('.area').val()));
		var h =encodeURI(encodeURI($('.contract_no').val()));
		var i =encodeURI(encodeURI($('.contract_date').val()));
		var j =encodeURI(encodeURI($('.contract_startdate').val()));
		var k =encodeURI(encodeURI($('.contract_enddate').val()));
		var l =encodeURI(encodeURI($('.contract_month').val()));
		var m =encodeURI(encodeURI($('.firstyear_monthrent').val()));
		var n =encodeURI(encodeURI($('.secondyear_monthrent').val()));	
		var o =encodeURI(encodeURI($('.thirdyear_monthrent').val()));
		var p =encodeURI(encodeURI($('.fourthyear_monthrent').val()));
		var q =encodeURI(encodeURI($('.fifthyear_monthrent').val()));
		var r =encodeURI(encodeURI($('.pay_nextyear').val()));
		var s =encodeURI(encodeURI($('.pay_date').val()));
		var t =encodeURI(encodeURI($('.salesman').val()));
		
		if(t=='other'){
			t=encodeURI(encodeURI($('#othersalesman').val()));
		}
		
		var u =encodeURI(encodeURI($('.region_manager').val()));
		var v =encodeURI(encodeURI($('.totalcost').val()));
		var w =encodeURI(encodeURI($('.paymethod').val()));
		if(w=='other'){
			w=encodeURI(encodeURI($('#othervalue').val()));
		}
		var x =encodeURI(encodeURI($('.deposit').val()));
		var y =encodeURI(encodeURI($('.overdue_payment').val()));
		var z =encodeURI(encodeURI($('.remark').val()));
		var aa =encodeURI(encodeURI($('.house_provider').val()));
		var bb =encodeURI(encodeURI($('.room_num').val()));
		var cc =encodeURI(encodeURI($('.state').val()));
		var dd =encodeURI(encodeURI($('.city').val()));
		var ff =encodeURI(encodeURI($('.date').val()));
		var gg =encodeURI(encodeURI($('.business_area').val()));
		//新增 16.12.8
	
		
		var hh=encodeURI(encodeURI($('.fangdong_name').val()));
		var ii=encodeURI(encodeURI($('.fangdong_telephone').val()));
		var jj=encodeURI(encodeURI($('.fangdong_idcard').val()));
		var kk=encodeURI(encodeURI($('.shoukuanren_name').val()));
		var ll=encodeURI(encodeURI($('.shoukuanren_telephone').val()));
		var mm=encodeURI(encodeURI($('.shoukuanren_kaihuhang').val()));
		var nn=encodeURI(encodeURI($('.shoukuanren_account').val()));
		
		var oo=encodeURI(encodeURI($('.room_area').val()));
		var pp=encodeURI(encodeURI($('.room_chaoxiang').val()));
		var qq=encodeURI(encodeURI($('.room_tese').val()));
		var rr=encodeURI(encodeURI($('.room_yuqichufangjia').val()));
		var ss=encodeURI(encodeURI($('.provider_money').val()));
		
		var tt=encodeURI(encodeURI($('.sixthyear_monthrent').val()));
		
		var job_no=encodeURI(encodeURI($('.job_no').val()));
		
		
		
		//物业交割数据
		var water_account = encodeURI(encodeURI($('.water_account').val()));
		var last_water_degree = encodeURI(encodeURI($('.last_water_degree').val()));
		var now_water_degree = encodeURI(encodeURI($('.now_water_degree').val()));
		var water_unitprice = encodeURI(encodeURI($('.water_unitprice').val()));
		var elec_account = encodeURI(encodeURI($('.elec_account').val()));
		var last_elec_degree_day = encodeURI(encodeURI($('.last_elec_degree_day').val()));
		var last_elec_degree_night = encodeURI(encodeURI($('.last_elec_degree_night').val()));
		var now_elec_degree_day = encodeURI(encodeURI($('.now_elec_degree_day').val()));
		var now_elec_degree_night = encodeURI(encodeURI($('.now_elec_degree_night').val()));
		var elec_unitprice_day = encodeURI(encodeURI($('.elec_unitprice_day').val()));
		var elec_unitprice_night = encodeURI(encodeURI($('.elec_unitprice_night').val()));
		var gas_account = encodeURI(encodeURI($('.gas_account').val()));
		var last_gas_degree = encodeURI(encodeURI($('.last_gas_degree').val()));
		var now_gas_degree = encodeURI(encodeURI($('.now_gas_degree').val()));
		var gas_unitprice = encodeURI(encodeURI($('.gas_unitprice').val()));
		var cableTV = encodeURI(encodeURI($('.cableTV').val()));
		var cableTV_account = encodeURI(encodeURI($('.cableTV_account').val()));
		var cableTV_date = encodeURI(encodeURI($('.cableTV_date').val()));
		var cableTV_money = encodeURI(encodeURI($('.cableTV_money').val()));
		var cleaning_price = encodeURI(encodeURI($('.cleaning_price').val()));
		var totalmoney = encodeURI(encodeURI($('.totalmoney').val()));
		var phone = encodeURI(encodeURI($('.phone').val()));
		var decoration = encodeURI(encodeURI($('.decoration').val()));
		var property_remark = encodeURI(encodeURI($('.property_remark').val()));
		var application = encodeURI(encodeURI(fun()));
		
		
		if($('.house_id').val().length <= 30 && $('.house_id').val().length > 0){
			$('.house_id').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.house_id').siblings("span").text("长度1-30").css("color","red");
			$('.house_id').css("border-color","red");
		}
		if($('.provider_money').val().length <= 10 && $('.provider_money').val().length > 0){
			$('.provider_money').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.provider_money').siblings("span").text("长度1-10").css("color","red");
			$('.provider_money').css("border-color","red");
		}
		if($('.business_area').val().length <= 30 && $('.business_area').val().length > 0){
			$('.business_area').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.business_area').siblings("span").text("长度1-30").css("color","red");
			$('.business_area').css("border-color","red");
		}
		if($('.room_num').val().length <= 6 && $('.room_num').val().length > 0){
			$('.room_num').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.room_num').siblings("span").text("长度1-6").css("color","red");
			$('.room_num').css("border-color","red");
		}
		if($('.house_provider').val().length <= 20 && $('.house_provider').val().length > 0){
			$('.house_provider').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.house_provider').siblings("span").text("长度1-20").css("color","red");
			$('.house_provider').css("border-color","red");
		}
		if($('.contract_no').val().length <= 20 && $('.contract_no').val().length > 0){
			$('.contract_no').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.contract_no').siblings("span").text("长度1-20").css("color","red");
			$('.contract_no').css("border-color","red");
		}
		if($('.area').val().length <= 10 && $('.area').val().length > 0){
			$('.area').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.area').siblings("span").text("长度1-10").css("color","red");
			$('.area').css("border-color","red");
		}
		if($('.address').val().length <= 50 && $('.address').val().length > 0){
			$('.address').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.address').siblings("span").text("长度1-50").css("color","red");
			$('.address').css("border-color","red");
		}
		if($('.estate').val().length <= 30 && $('.estate').val().length > 0){
			$('.estate').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.estate').siblings("span").text("长度1-30").css("color","red");
			$('.estate').css("border-color","red");
		}
		if($('.city').val().length <= 20 && $('.city').val().length > 0){
			$('.city').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.city').siblings("span").text("长度1-20").css("color","red");
			$('.city').css("border-color","red");
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
		if($('.pay_date').val().length > 0){
			$('.pay_date').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.pay_date').siblings("span").text("请选择日期").css("color","red");
			$('.pay_date').css("border-color","red");
		}
		//新增
		if($('.fangdong_name').val().length > 0 && $('.fangdong_name').val().length <50){
			$('.fangdong_name').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.fangdong_name').siblings("span").text("长度1-50").css("color","red");
			$('.fangdong_name').css("border-color","red");
		}
		if($('.fangdong_telephone').val().length > 0 && $('.fangdong_telephone').val().length <30){
			$('.fangdong_telephone').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.fangdong_telephone').siblings("span").text("长度1-30").css("color","red");
			$('.fangdong_telephone').css("border-color","red");
		}
		if($('.fangdong_idcard').val().length > 0 && $('.fangdong_idcard').val().length <20){
			$('.fangdong_idcard').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.fangdong_idcard').siblings("span").text("长度1-20").css("color","red");
			$('.fangdong_idcard').css("border-color","red");
		}
		if($('.shoukuanren_name').val().length > 0 && $('.shoukuanren_name').val().length <50){
			$('.shoukuanren_name').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.shoukuanren_name').siblings("span").text("长度1-50").css("color","red");
			$('.shoukuanren_name').css("border-color","red");
		}
		if($('.shoukuanren_telephone').val().length > 0 && $('.shoukuanren_telephone').val().length <30){
			$('.shoukuanren_telephone').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.shoukuanren_telephone').siblings("span").text("长度1-30").css("color","red");
			$('.shoukuanren_telephone').css("border-color","red");
		}
		if($('.shoukuanren_kaihuhang').val().length > 0 && $('.shoukuanren_kaihuhang').val().length <100){
			$('.shoukuanren_kaihuhang').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.shoukuanren_kaihuhang').siblings("span").text("长度1-100").css("color","red");
			$('.shoukuanren_kaihuhang').css("border-color","red");
		}
		if($('.shoukuanren_account').val().length > 0 && $('.shoukuanren_account').val().length <50){
			$('.shoukuanren_account').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.shoukuanren_account').siblings("span").text("长度1-50").css("color","red");
			$('.shoukuanren_account').css("border-color","red");
		}
		if($('.city').siblings("span").text()=="输入正确" && $('.estate').siblings("span").text()=="输入正确" && $('.address').siblings("span").text()=="输入正确" && $('.area').siblings("span").text()=="输入正确" && 
				$('.contract_no').siblings("span").text()=="输入正确"  && $('.house_provider').siblings("span").text()=="输入正确"  &&
				$('.contract_date').siblings("span").text()=="输入正确" && $('.contract_startdate').siblings("span").text()=="输入正确" && $('.contract_enddate').siblings("span").text()=="输入正确" && $('.pay_date').siblings("span").text()=="输入正确"
				&& $('.fangdong_name').siblings("span").text()=="输入正确" && $('.fangdong_telephone').siblings("span").text()=="输入正确" && $('.fangdong_idcard').siblings("span").text()=="输入正确"
				&& $('.shoukuanren_name').siblings("span").text()=="输入正确" && $('.shoukuanren_telephone').siblings("span").text()=="输入正确" && $('.shoukuanren_kaihuhang').siblings("span").text()=="输入正确" && $('.shoukuanren_account').siblings("span").text()=="输入正确"){		
			if($('.state').val()=='已解约'){
				r = $(".break_date").val(); //次年支付13个月字段修改为解约日期
				if($(".break_date").val().length > 0){
					if(confirm("确认是否解约")){
						getrenthouse(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
								now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
								cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application,job_no);						
						}	
				}else{
					alert("请输入解约时间");
				}
			}else if($('.state').val()=='已到期'){
				getrenthouse(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
					now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
					cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application,job_no);						
			}else{
				update(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
					now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
					cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application,job_no);
			}
				}
		
	})
	$(".city").blur(function(){
		var dd = $(".city").val();
		$(this).siblings("span").css("display","none");
		if(dd.length <= 20 &&dd.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-20").css("color","red");
			$(this).css("border-color","red");
		}
	});
	$(".city").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	
	$(".business_area").blur(function(){
		var ddd = $(".business_area").val();
		$(this).siblings("span").css("display","none");
		if(ddd.length <= 30 &&ddd.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-30").css("color","red");
			$(this).css("border-color","red");
		}
	});
	$(".business_area").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".estate").blur(function(){
		var d = $(".estate").val();
		$(this).siblings("span").css("display","none");
		if(d.length <= 30 && d.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-30").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".estate").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".address").blur(function(){
		var e = $(".address").val();
		$(this).siblings("span").css("display","none");
		if(e.length <= 50 && e.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-50").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".address").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".area").blur(function(){
		var g = $(".area").val();
		$(this).siblings("span").css("display","none");
		if(g.length <= 10 && g.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-10").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".area").focus(function(){
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
	$(".house_provider").blur(function(){
		var aa = $(".house_provider").val();
		$(this).siblings("span").css("display","none");
		if(aa.length <= 20 && aa.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-20").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".house_provider").focus(function(){
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
	
	//新增
	$(".fangdong_name").blur(function(){
		var bb = $(".fangdong_name").val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 50 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-50").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".fangdong_name").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".fangdong_telephone").blur(function(){
		var bb = $(".fangdong_telephone").val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 30 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-30").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".fangdong_telephone").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".fangdong_idcard").blur(function(){
		var bb = $(".fangdong_idcard").val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 20 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-20").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".fangdong_idcard").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".shoukuanren_name").blur(function(){
		var bb = $(".shoukuanren_name").val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 50 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-50").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".shoukuanren_name").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".shoukuanren_telephone").blur(function(){
		var bb = $(".shoukuanren_telephone").val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 30 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-30").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".shoukuanren_telephone").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".shoukuanren_kaihuhang").blur(function(){
		var bb = $(".shoukuanren_kaihuhang").val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 100 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-100").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".shoukuanren_kaihuhang").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	$(".shoukuanren_account").blur(function(){
		var bb = $(".shoukuanren_account").val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 50 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-50").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".shoukuanren_account").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
	});
	
	
	//物业交割
	$(".water_account,.elec_account,.gas_account").blur(function(){
		var bb = $(this).val();
		$(this).siblings("span").css("display","none");
		if(bb.length <= 20 && bb.length > 0){
			$(this).siblings("span").text("输入正确").css("color","green");
			$(this).css("border-color","#000");
		}else{
			$(this).siblings("span").text("长度1-20").css("color","red");
			$(this).css("border-color","red");
		}
		
	});
	$(".water_account,.elec_account,.gas_account").focus(function(){
		if($(this).siblings("span").text()!=""){$(this).siblings("span").css("display","table-row");};
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
		var checkValue1=$(".salesman").val();
		if(checkValue1=='other'){
			$('#othersalesman').show();
		}else{
			$('#othersalesman').hide();
		}
	});
	//监听金额输入变化以计算共计扣款
	$('.last_water_degree,.now_water_degree,.water_unitprice,.last_elec_degree_day,.last_elec_degree_night,.now_elec_degree_day,.now_elec_degree_night,.elec_unitprice_day,.elec_unitprice_night,.last_gas_degree,.now_gas_degree,.gas_unitprice,.cleaning_price').change(function(){
		var last_water_degree = $('.last_water_degree').val();
		var now_water_degree = $('.now_water_degree').val();
		var water_unitprice = $('.water_unitprice').val();
		var last_elec_degree_day = $('.last_elec_degree_day').val();
		var last_elec_degree_night = $('.last_elec_degree_night').val();
		var now_elec_degree_day = $('.now_elec_degree_day').val();
		var now_elec_degree_night = $('.now_elec_degree_night').val();
		var elec_unitprice_day = $('.elec_unitprice_day').val();
		var elec_unitprice_night = $('.elec_unitprice_night').val();
		var last_gas_degree = $('.last_gas_degree').val();
		var now_gas_degree = $('.now_gas_degree').val();
		var gas_unitprice = $('.gas_unitprice').val();
		var cleaning_price = $('.cleaning_price').val();
		
		var gas = eval(gas_unitprice*(now_gas_degree-last_gas_degree));
		var water = eval(water_unitprice*(now_water_degree-last_water_degree));
		var elecday = eval(elec_unitprice_day*(now_elec_degree_day-last_elec_degree_day));
		var elecnight = eval(elec_unitprice_night*(now_elec_degree_night-last_elec_degree_night));
		var total =parseFloat(gas)+parseFloat(water)+parseFloat(elecday)+parseFloat(elecnight)+parseFloat(cleaning_price)+"";
		if(total.indexOf('.')>=0){
			total = total.substr(0,total.indexOf('.')+2);
		}		
		$('.totalmoney').val(total);
	})
})

function update(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
		now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
		cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application,job_no){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "putHouse.do",
		   data: "house_id="+a
		   	+"&district="+c
		   	+"&estate="+d
		   	+"&address="+e
		   	+"&house_type="+f
		   	+"&area="+g
		   	+"&contract_no="+h
		   	+"&contract_date="+i
		   	+"&contract_startdate="+j
		   	+"&contract_enddate="+k
		   	+"&contract_month="+l
		   	+"&firstyear_monthrent="+m
		   	+"&secondyear_monthrent="+n
		   	+"&thirdyear_monthrent="+o
		   	+"&fourthyear_monthrent="+p
		   	+"&fifthyear_monthrent="+q
		   	+"&pay_nextyear="+r
		   	+"&pay_date="+s
		   	+"&salesman="+t
		   	+"&region_manager="+u
		   	+"&totalcost="+v
		   	+"&paymethod="+w
		   	+"&deposit="+x
		   	+"&overdue_payment="+y
		   	+"&remark="+z
		   	+"&house_provider="+aa
		   	+"&room_num="+bb
		   	+"&state="+cc
		   	+"&city="+dd
		   	+"&business_area="+gg
		   	+"&fangdong_name="+hh
		   	+"&fangdong_telephone="+ii
		   	+"&fangdong_idcard="+jj
		   	+"&shoukuanren_name="+kk
		   	+"&shoukuanren_telephone="+ll
		   	+"&shoukuanren_kaihuhang="+mm
		   	+"&shoukuanren_account="+nn
		   	+"&room_area="+oo
		   	+"&room_chaoxiang="+pp
		   	+"&room_tese="+qq
		   	+"&room_yuqichufangjia="+rr
			+"&provider_money="+ss
			+"&sixthyear_monthrent="+tt
			+"&water_account="+water_account
			+"&last_water_degree="+last_water_degree
			+"&now_water_degree="+now_water_degree
			+"&water_unitprice="+water_unitprice
			+"&water_unitprice="+water_unitprice
			+"&elec_account="+elec_account
			+"&last_elec_degree_day="+last_elec_degree_day
			+"&last_elec_degree_night="+last_elec_degree_night
			+"&now_elec_degree_day="+now_elec_degree_day
			+"&now_elec_degree_night="+now_elec_degree_night
			+"&elec_unitprice_day="+elec_unitprice_day
			+"&elec_unitprice_night="+elec_unitprice_night
			+"&gas_account="+gas_account
			+"&last_gas_degree="+last_gas_degree
			+"&now_gas_degree="+now_gas_degree
			+"&gas_unitprice="+gas_unitprice
			+"&cableTV="+cableTV
			+"&cableTV_account="+cableTV_account
			+"&cableTV_date="+cableTV_date
			+"&cableTV_money="+cableTV_money
			+"&cleaning_price="+cleaning_price
			+"&totalmoney="+totalmoney
			+"&phone="+phone
			+"&decoration="+decoration
			+"&property_remark="+property_remark
			+"&application="+application
			+"&job_no="+job_no,
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
				}else if(result=="propertyerror"){
					alert("房源数据修改成功,物业配置修改异常");
				}else if(result=="propertyupdatefail"){
					alert("房源数据修改成功,物业配置修改失败");
				}else{
					alert("修改成功");
				}
		   }
	});
}

function seachrent(){
	var house_id = GetQueryString("house_id");
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "Onehouse.do",
		   data: "house_id="+house_id,
		   success: function(result){
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var obj = eval('(' + result + ')');
					var html;
					$(".house_id").val(obj.house_id);
					$(".job_no").val(obj.job_no);
					$(".date").val(obj.date);
					$('.region').val(obj.region);	//小区域
					$('.district').val(obj.district);	//大区域 东南西北
					$('.estate').val(obj.estate);
					$('.address').val(obj.address);
					$('.house_type').val(obj.house_type);
					var pt =obj.house_type;
					var pt1 = pt.substring(0,1);
					var pt2 = pt.substring(pt.indexOf("厅")-1,pt.indexOf("厅"));
					var pt3 = pt.substring(pt.indexOf("卫")-1,pt.indexOf("卫"));
					var pt4 = pt.substring(pt.indexOf("厨")-1,pt.indexOf("厨"));
					var pt5 = pt.substring(pt.indexOf("阳")-1,pt.indexOf("阳"));
					
					
					$('.house_type1').val(int1(pt1==""?0:pt1));
					$('.house_type2').val(int1(pt2==""?0:pt2));
					$('.house_type3').val(int1(pt3==""?0:pt3));
					$('.house_type4').val(int1(pt4==""?0:pt4));
					$('.house_type5').val(int1(pt5==""?0:pt5));
					
					$('.area').val(obj.area);
					$('.contract_no').val(obj.contract_no);
					$('.contract_date').val(obj.contract_date);
					$('.contract_startdate').val(obj.contract_startdate);
					$('.contract_enddate').val(obj.contract_enddate);
					$('.contract_month').val(obj.contract_month);
					$('.firstyear_monthrent').val(obj.firstyear_monthrent);
					$('.secondyear_monthrent').val(obj.secondyear_monthrent);	
					$('.thirdyear_monthrent').val(obj.thirdyear_monthrent);
					$('.fourthyear_monthrent').val(obj.fourthyear_monthrent);
					$('.fifthyear_monthrent').val(obj.fifthyear_monthrent);
					$('.sixthyear_monthrent').val(obj.sixthyear_monthrent);
					$('.pay_nextyear')[0].value=obj.pay_nextyear;
					$('.pay_date').val(obj.pay_date);
				
					$('.salesman')[0].value=obj.name;
					$('.region_manager').val(obj.region_manager);
					$('.totalcost').val(obj.totalcost);
					$('.paymethod')[0].value=obj.paymethod;
					$('.deposit').val(obj.deposit);
					$('.overdue_payment').val(obj.overdue_payment);
					$('.remark').val(obj.remark);
					$('.house_provider').val(obj.house_provider);
					$('.room_num').val(obj.room_num);
					$('.city').val(obj.city);
					$('.state').val(obj.state);
					$('.business_area').val(obj.business_area);
					//
					
					$('.fangdong_name').val(obj.fangdong_name);
					$('.fangdong_telephone').val(obj.fangdong_telephone);
					$('.fangdong_idcard').val(obj.fangdong_idcard);
					$('.shoukuanren_name').val(obj.shoukuanren_name);
					$('.shoukuanren_telephone').val(obj.shoukuanren_telephone);
					$('.shoukuanren_kaihuhang').val(obj.shoukuanren_kaihuhang);
					$('.shoukuanren_account').val(obj.shoukuanren_account);
					
					$('.room_name').val(obj.address.substring(obj.address.indexOf("-")+1,obj.address.length));
					$('.room_area').val(obj.room_area);
					$('.room_chaoxiang').val(obj.room_chaoxiang);
					$('.room_tese').val(obj.room_tese);
					$('.room_yuqichufangjia').val(obj.room_yuqichufangjia);
					$('.provider_money').val(obj.provider_money);
					
					if($(".paymethod").val()==null){
						$(".paymethod")[0].value="other";					
						$('#othervalue').val(obj.paymethod).show();
					}
					if($(".salesman").val()==null){
						$(".salesman")[0].value="other";					
						$('#othersalesman').val(obj.name).show();
					}
					 var bltstate = obj.region;
						if(bltstate=='Y'){
							$('.baletu_down').show();
							$('.baletu_down').text("已上架，点击下架");
						}else{
							$('.baletu_down').hide();
						}
					getAdmin();
				}	
		   }
	});
}

function int1(a){
	switch(a)
	{
		case "一":
			a=1;
			break;
		case "二":
			a=2;
			break;
		case "两":
			a=2;
			break;
		case "三":
			a=3;
			break;
		case "四":
			a=4;
			break;
		case "五":
			a=5;
			break;
		case "六":
			a=5;
			break;
		case "七":
			a=5;
			break;
		case "八":
			a=5;
			break;
	}
	return a;
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

function getrenthouse(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
		now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
		cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application,job_no){
	$('.loading').show();
	$.ajax({
	       type: "GET",
	       url: "Onerent.do",
	       async: true,
	       data: "house_id="+a,
	       success: function(result){
				$('.loading').hide();
				if("zero"==result){
					update(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
							now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
							cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application,job_no);			//出房中没有该房出租记录
				}else{
					var obj = eval('(' + result + ')');
			       		if(obj.state=='出租中'){		       			
			       			if(confirm("出房中尚有该房源出租记录，确认该房源已解约没,确认则同时修改出房记录为无效")){	//该房子在出租中
			       				updaterent(a,encodeURI(encodeURI("已失效")));		//修改出房状态为无效
			       				update(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
										now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
										cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application,job_no);		       				
			       			} 	
			       		}else{
			       			update(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
									now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
									cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application,job_no);			//该房子出租过，但已无效
			       		}		       	
				}	       			    
	       }
	  });
}

function updaterent(houseid,state){
	$.ajax({
		   type: "GET",
		   url: "putRent.do",
		   async: false,
		   data: "house_id="+houseid		   	
		   	+"&state="+state,
		   success: function(result){				
				if(result=="error"){
					alert("修改出房记录状态异常");
				}else if(result=="updatefail"){
					alert("修改出房记录状态失败");
				}
		   }
	});
}

function getproperty(){				//设置物业配置（水电煤，家电配置）
	var houseid = GetQueryString("house_id");
	$.ajax({
		   type: "GET",
		   url: "getproperty.do",
		   data: "house_id="+houseid,
		   success: function(result){	
			   var obj = eval('(' + result + ')');
			  
				$('#water_account').val(obj.water_account);
				$('#now_water_degree').val(obj.now_water_degree);
				$('#last_water_degree').val(obj.last_water_degree)
//				$('#shuibiao td:nth-child(4)').val(Number(obj.now_water_degree-obj.last_water_degree));
				$('#water_unitprice').val(obj.water_unitprice);
//				$('#shuibiao td:nth-child(6)').val(Number(obj.now_water_degree-obj.last_water_degree)*Number(obj.water_unitprice));
				$('#elec_account').val(obj.elec_account);
				$('#now_elec_degree_day').val(obj.now_elec_degree_day);
				$('#now_elec_degree_night').val(obj.now_elec_degree_night);
				$('#last_elec_degree_day').val(obj.last_elec_degree_day);
				$('#last_elec_degree_night').val(obj.last_elec_degree_night);
//				$('#dianbiao td:nth-child(4) span:nth-child(1)').val(Number(obj.now_elec_degree_day-obj.last_elec_degree_day));
//				$('#dianbiao td:nth-child(4) span:nth-child(3)').val(Number(obj.now_elec_degree_night-obj.last_elec_degree_night));
				$('#elec_unitprice_day').val(obj.elec_unitprice_day);
				$('#elec_unitprice_night').val(obj.elec_unitprice_night);
//				$('#dianbiao td:nth-child(6) span:nth-child(1)').val(Number(obj.now_elec_degree_day-obj.last_elec_degree_day)*Number(obj.elec_unitprice_day));
//				$('#dianbiao td:nth-child(6) span:nth-child(3)').val(Number(obj.now_elec_degree_night-obj.last_elec_degree_night)*Number(obj.elec_unitprice_night));
				$('#gas_account').val(obj.gas_account);
				$('#now_gas_degree').val(obj.now_gas_degree);
				$('#last_gas_degree').val(obj.last_gas_degree)
//				$('#meiqibiao td:nth-child(4)').val(Number(obj.now_gas_degree-obj.last_gas_degree));
				$('#gas_unitprice').val(obj.gas_unitprice);
//				$('#meiqibiao td:nth-child(6)').val(Number(obj.now_gas_degree-obj.last_gas_degree)*Number(obj.gas_unitprice));
				$('#cableTV_account').val(obj.cableTV_account);
				$('#cableTV')[0].value=obj.cableTV;
				$('.cableTV_date').val(obj.cableTV_date);
				$('#cableTV_money').val(obj.cableTV_money);
				$('#totalmoney').val(obj.total_money);
				$('#decoration')[0].value=obj.decoration;
				$('#property_remark').val(obj.remark);
				$('#phone').val(obj.phone);
				$('#cleaning_price').val(obj.cleaning_price);
				
				
				
				var application =JSON.parse(obj.application);	
					var page_application = $('.goods1 input[name=application]');
						for(var k=0;k<page_application.length;k++){
					    	for(var i=0;i<application.length;i++){
					    		var appobj1 = application[i];
								var name = appobj1.name;
								if($(page_application[k]).val() == name){	
									$(page_application[k]).attr("checked",true);
						    		addgoods1($(page_application[k]),appobj1.number,appobj1.model,appobj1.remark);
						    		continue;
						    	} 	
					    	}	
					    };	
					   
					    var page_application2 = $('.goods2 input[name=application]');
						for(var k=0;k<page_application2.length;k++){
							
					    	for(var i=0;i<application.length;i++){
					    		var appobj1 = application[i];
								var name = appobj1.name;
								
								if($(page_application2[k]).val() == name){	
									
									$(page_application2[k]).attr("checked",true);
						    		addgoods2($(page_application2[k]),appobj1.number,appobj1.model,appobj1.remark);
						    	} 	
					    	}				    	
					    };		
		   }
	});
}

function addgoods1(e,number,model,remark){
	$(e).parent().next().append("数量：<input type='number' value='"+number+"' class='thisnumber' id='thisnumber'  />");
	$(e).parent().next().next().append("型号：<input type='text' class='thismodel' id='thismodel' value='"+model+"'/>");
	$(e).parent().next().next().next().append("备注：<input type='text' class='thisremark' id='thisremark' value='"+remark+"'/>");
}
function addgoods2(e,number,model,remark){
	$(e).parent().next().append("数量：<input type='number' value='"+number+"' class='thisnumber' id='thisnumber'  />");
	$(e).parent().next().next().append("交付：<select class='thismodel'><option value='是'>是</option><option value='否'>否</option></select>");
	$(e).parent().next().next().next().append("备注：<input type='text' class='thisremark' id='thisremark' value='"+remark+"'/>");
	$(e).parent().next().next().children(".thismodel")[0].value=model;
}


//截取参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function getrent(){
	$.ajax({
	       type: "GET",
	       url: "Onerent.do",
	       async: true,
	       data: "house_id="+GetQueryString("house_id"),
	       success: function(result){
				if("zero"!=result){
					var obj = eval('(' + result + ')');	
					$(".find").attr("_href","rentDetail.html?contract_no="+obj.contract_no)
				}	       			    
	       }
	  });
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

//获取家电的数据（json数组格式）
function fun(){
	var jsonarray=[];
    obj = document.getElementsByName("application");
    
    for(k in obj){
        if(obj[k].checked){
        	var arr={
                "name" : $(obj[k]).val(),
                "number" : $(obj[k]).parent().next().children(".thisnumber").val(),//$(obj[k]).siblings(".thisnumber").val(),
                "model" : $(obj[k]).parent().next().next().children(".thismodel").val(),//$(obj[k]).siblings(".thismodel").val(),
                "remark" :$(obj[k]).parent().next().next().next().children(".thisremark").val(),// $(obj[k]).siblings(".thisremark").val()
            } ;
        	jsonarray.push(arr);
        }        	
    };
    var jsonarr = JSON.stringify(jsonarray);
    return jsonarr;
}

function getOperateLogs(){
	var house_id = GetQueryString("house_id");
	$.ajax({
		   type: "GET",
		   url: "/getLogs.do",
		   data: "house_id="+house_id+"&type="+encodeURI(encodeURI("收房")),
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
					var telephone = $('.shoukuanren_telephone').val();
					var newt = telephone.substring(0,3)+"****"+telephone.substring(7,telephone.length)
					$('.shoukuanren_telephone').val(newt)
					var fangdong_telephone = $('.fangdong_telephone').val();
					var newt1 = fangdong_telephone.substring(0,3)+"****"+fangdong_telephone.substring(7,telephone.length)
					$('.fangdong_telephone').val(newt1)
				}
				if(department=="YGJPA"){			//平安账号
					var telephone = $('.shoukuanren_telephone').val();
					var newt = telephone.substring(0,3)+"****"+telephone.substring(7,telephone.length)
					$('.shoukuanren_telephone').val(newt)
					
					var fangdong_telephone = $('.fangdong_telephone').val();
					var newt1 = fangdong_telephone.substring(0,3)+"****"+fangdong_telephone.substring(7,telephone.length)
					$('.fangdong_telephone').val(newt1)
					$('.firstyear_monthrent').val("0000");
					$('.secondyear_monthrent').val("0000");
					$('.thirdyear_monthrent').val("0000");
					$('.fourthyear_monthrent').val("0000");
					$('.fifthyear_monthrent').val("0000");
					$('.sixthyear_monthrent').val("0000");
				}
			}			
		}
	})
}