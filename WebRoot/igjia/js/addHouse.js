
var num =0;
var page = 1;
var flag=true;

//获取租客信息
$(function(){
    getAdmin();
	getDistrict();
	$(".lang").hide();
	$(".lang1").show();
	$('.loading').hide();
	$('.property').hide();
	adminContact();

	$(".next").click(function(){
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
		var r =encodeURI(encodeURI("否"));
		var s =encodeURI(encodeURI($('.pay_date').val()));
		var t =encodeURI(encodeURI($('.salesman').val()));
		var u =encodeURI(encodeURI($('.region_manager').val()));
		var v =encodeURI(encodeURI($('.totalcost').val()));
		var w =encodeURI(encodeURI($('.paymethod').val()));
		var x =encodeURI(encodeURI($('.deposit').val()));
		var y =encodeURI(encodeURI($('.overdue_payment').val()));
		var z =encodeURI(encodeURI($('.remark').val()));
		var aa =encodeURI(encodeURI($('.house_provider').val()));
		var bb =encodeURI(encodeURI($('.room_num').val()));
		var cc =encodeURI(encodeURI($('.state').val()));
		var dd =encodeURI(encodeURI($('.city').val()));
		var ee =encodeURI(encodeURI($('.job_no').val()));
		var ff =encodeURI(encodeURI($('.business_area').val()));
		//新增 16.12.8
		var gg=encodeURI(encodeURI($('.vacancy_date').val()));
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
		
		if(w=='other'){
			w=$('#othervalue').val();
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
		if($('.contract_no').val().length <= 20 && $('.contract_no').val().length > 5){
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
		if($('.house_provider').val().length > 0 && $('.house_provider').val().length <50){
			$('.house_provider').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.house_provider').siblings("span").text("长度1-50").css("color","red");
			$('.house_provider').css("border-color","red");
		}
		if($('.city').siblings("span").text()=="输入正确" && $('.estate').siblings("span").text()=="输入正确" && $('.address').siblings("span").text()=="输入正确" && $('.area').siblings("span").text()=="输入正确" && 
		$('.contract_no').siblings("span").text()=="输入正确"  && $('.house_provider').siblings("span").text()=="输入正确" && $('.room_num').siblings("span").text()=="输入正确" &&
		$('.contract_date').siblings("span").text()=="输入正确" && $('.contract_startdate').siblings("span").text()=="输入正确" && $('.contract_enddate').siblings("span").text()=="输入正确" && $('.pay_date').siblings("span").text()=="输入正确"
		&& $('.fangdong_name').siblings("span").text()=="输入正确" && $('.fangdong_telephone').siblings("span").text()=="输入正确" && $('.fangdong_idcard').siblings("span").text()=="输入正确"
		&& $('.shoukuanren_name').siblings("span").text()=="输入正确" && $('.shoukuanren_telephone').siblings("span").text()=="输入正确" && $('.shoukuanren_kaihuhang').siblings("span").text()=="输入正确" && $('.shoukuanren_account').siblings("span").text()=="输入正确"
		&& $('.provider_money').siblings("span").text()=="输入正确"){
			$('.houseinfo').hide();
			$('.property').show();
		}	
	})
	$(".prev").click(function(){
		$('.houseinfo').show();
		$('.property').hide();
	})
	$(".add").click(function(){
		$('.loading').show();		//防止连续点击
		setTimeout(function(){
			$('.loading').hide();
		}, 100);
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
		var r =encodeURI(encodeURI("否"));
		var s =encodeURI(encodeURI($('.pay_date').val()));
		var t =encodeURI(encodeURI($('.salesman').val()));
		var u =encodeURI(encodeURI($('.region_manager').val()));
		var v =encodeURI(encodeURI($('.totalcost').val()));
		var w =encodeURI(encodeURI($('.paymethod').val()));
		if(w=='other'){
			w=$('#othervalue').val();
		}	
		var x =encodeURI(encodeURI($('.deposit').val()));
		var y =encodeURI(encodeURI($('.overdue_payment').val()));
		var z =encodeURI(encodeURI($('.remark').val()));
		var aa =encodeURI(encodeURI($('.house_provider').val()));
		var bb =encodeURI(encodeURI($('.room_num').val()));
		var cc =encodeURI(encodeURI($('.state').val()));
		var dd =encodeURI(encodeURI($('.city').val()));
		var ee =encodeURI(encodeURI($('.job_no').val()));
		var ff =encodeURI(encodeURI($('.business_area').val()));
		//新增 16.12.8
		var gg=encodeURI(encodeURI($('.vacancy_date').val()));
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
		
		if($('.water_account').val().length > 0 && $('.water_account').val().length <20){
			$('.water_account').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.water_account').siblings("span").text("长度1-20").css("color","red");
			$('.water_account').css("border-color","red");
		}
		if($('.elec_account').val().length > 0 && $('.elec_account').val().length <20){
			$('.elec_account').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.elec_account').siblings("span").text("长度1-20").css("color","red");
			$('.elec_account').css("border-color","red");
		}
		if($('.gas_account').val().length > 0 && $('.gas_account').val().length <20){
			$('.gas_account').siblings("span").text("输入正确").css("color","green");
		}else{
			$('.gas_account').siblings("span").text("长度1-20").css("color","red");
			$('.gas_account').css("border-color","red");
		}
		
		if($('.water_account').siblings("span").text()=="输入正确" && $('.elec_account').siblings("span").text()=="输入正确" && $('.gas_account').siblings("span").text()=="输入正确"){
			if(bb<=8){
				for(var iii=0;iii<bb;iii++){				
					e =encodeURI(encodeURI($('.address').val()+"-"+$('.room'+Number(iii+1)).val()));
					z =encodeURI(encodeURI($('.remark'+Number(iii+1)).val()));
					oo=encodeURI(encodeURI($('.room_area'+Number(iii+1)).val()));
					pp=encodeURI(encodeURI($('.room_chaoxiang'+Number(iii+1)).val()));
					qq=encodeURI(encodeURI($('.room_tese'+Number(iii+1)).val()));
					rr=encodeURI(encodeURI($('.room_yuqichufangjia'+Number(iii+1)).val()));
					add(c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,
							water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
							now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
							cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application);
				}		
			}else{
				alert('房间超过最多8间!!!');
			}		
		}	
		
					
	});
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
})

function add(c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,pp,qq,rr,ss,tt,
		water_account,last_water_degree,now_water_degree,water_unitprice,elec_account,last_elec_degree_day,last_elec_degree_night,now_elec_degree_day,
		now_elec_degree_night,elec_unitprice_day,elec_unitprice_night,gas_account,last_gas_degree,now_gas_degree,gas_unitprice,cableTV,cableTV_account,
		cableTV_date,cableTV_money,cleaning_price,totalmoney,phone,decoration,property_remark,application){
	setTimeout(function(){
		$('.loading').show();		//与防止连续点击延时对应
		$.ajax({
			   type: "POST",
			   url: "addHouse.do",
			   data: "district="+c
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
			   	+"&job_no="+ee
			   	+"&business_area="+ff
			   	+"&vacancy_date="+gg
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
				+"&application="+application,
			//   	async:false,
			   success: function(result){
					num++;
					if(result=="error"){
						alert(decodeURI(decodeURI(e))+"添加异常");
					}else if(result=="fail"){
						if(num==room_num){
							alert("请先去登录");
						}					
					}else if(result=="insertfail"){
						alert(decodeURI(decodeURI(e))+"添加失败");
					}else if(result=="refused"){
						alert("权限不够");
					}else if(result=="propertyinsertfail"){
						alert("物业配置添加失败，联系管理员");
					}else if(result=="propertyerror"){
						alert("物业配置添加异常，联系管理员");
					}else if(result=="success"){
						var room_num = $('.room_num').val();					
						alert(decodeURI(decodeURI(e))+"添加成功");
						if(num==bb){
							$('.loading').hide();
//							createhouseorder(e,h,i,j,k,l,m,n,o,p,q,s,w,kk,ll,mm,nn,tt);
							window.location.href="house.html";
						}					
					}
			   }
		});
	},100);	
}
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



$(function(){
	//监听几室输入框变化
	$('.firstyear_monthrent').bind('input propertychange', function() { 
		$('.overdue_payment').val(parseInt($('.firstyear_monthrent').val())*0.01);
		$('.provider_money').val(parseInt($('.firstyear_monthrent').val())*0.35);
	});
	$('.house_type1').bind('input propertychange', function() {
	    $('.room_num').val($('.house_type1').val());
	});
	$('.room_num,.house_type1').bind('input propertychange', function() {  
	    var num1 = $('.room_num').val();
	    var html="";
	      $("table tr.fangjian").each(function(){
	        var lang = $(this).attr("lang");
	        if(lang <= num1){
	          $(this).show();
	        }else{
	          $(this).hide();
	        }
	      });
	}); 
	
	//监听有线电视有无
	$(".cableTV").change(function(){
		var tv=$(".cableTV").val();
		if("有"==tv){
			$('.cabletvdetail').show();
		}else{
			$('.cabletvdetail').hide();
		}
	});
	
//	//监听家电复选框
//	$("input[name='application']").change(function(){
//		if($(this).is(':checked')){
//				var html = "<span>"+$(this).val()+"</span>"+
//	                		"<span>数量</span><input class='thisnumber' type=\"number\" value=\"1\" style=\"width:30px;position:relative;top:5px;\"/>"+
//	                		"<span>型号</span><input class='thismodel' type=\"text\" value=\"无\" style=\"width:100px;position:relative;top:5px;\"/>"+
//	                		"<span>备注</span><input class=\"thisremark\" type=\"text\" value=\"无\" style=\"width:150px;position:relative;top:5px;\"/>";
//	                		$(this).siblings("span").remove();
//	                		$(this).after(html);
//		}else{
//			$(this).siblings("span,input").remove();
//			$(this).after("<span>"+$(this).val()+"</span>");
//		}
//	});	
	
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
	});
	//监听收房管家
	$('.salesman').bind('input propertychange', function() { 
		var guanjia =$(this).val();		
		$('.job_no>option').each(function(){
		    if($(this).html()==guanjia){
		    	$(".job_no")[0].value=$(this).val();
		    }
		})
	});
});

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
               getAdmin()
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
				$(".job_no").val(json.job_no);
				$(".salesman").val(json.name);
				$(".district")[0].value = json.district;
				$(".business_area").val(json.business_area);
				adminContact1();
			}
		}
	})
}

function adminContact1(){
	$.ajax({
		type: "GET",
		url: "adminContact.do",
		data: "",
		success: function(result){
			var arr=JSON.parse(result);
			var obj;
			var district = $(".district").val();
			for(var i=0;i<arr.length;i++){
				obj=arr[i];
				if(district == obj.district && obj.position =="区域经理"){
					$(".region_manager").val(obj.name);
					break;
				}
			}

		}
	});
}
