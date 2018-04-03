var page = 1;

//分页获取租客信息
$(function(){
	getDistrict();
	
	var address = getUrl("address");
	var district = getUrl("district");
	var state = getUrl("state");
	var contract_start1 = getUrl("contract_start1");
	var contract_start2 = getUrl("contract_start2");
	var contract_end1 = getUrl("contract_end1");
	var contract_end2 = getUrl("contract_end2");
	
	var district1 = decodeURI(district);
	var state1 = decodeURI(state);
		$("input[name=district]").each(function() {
			if($(this).val()==district1){
				$(this).siblings("span").removeClass("act");
				$(this).prop("checked",true);
			}
		});
		$("input[name=state]").each(function(){
			if($(this).val()==state1){
				$(this).siblings("span").removeClass("act");
				$(this).prop("checked",true);
			}
		});
	$(".address").val(decodeURI(decodeURI(address)));
	if(""==decodeURI(decodeURI(district))){
		district = encodeURI(encodeURI("全部"));
	}
	if(""==decodeURI(decodeURI(state))){
		state = encodeURI(encodeURI("全部"));
	}
	
	if(address=="" && decodeURI(decodeURI(district))=="全部" && decodeURI(decodeURI(state))=="全部" &&contract_start1==""&&contract_start2==""&&contract_end1==""&&contract_end2==""){
//		$('.contract_start1').val("1999/01/01");
//		$('.contract_start2').val("2099/12/31");
//		$('.contract_end1').val("1999/01/01");
//		$('.contract_end2').val("2099/12/31");
		getallhouse();
	}else{
		if(contract_start2!=''){
			var dates2 =new Date(contract_start2 );
			dates2.setDate(dates2.getDate()-1);	
			contract_start2= formatDate(dates2,"yyyy/MM/dd");
		}
		if(contract_end2!=''){
			var datee2 =new Date(contract_end2 );
			datee2.setDate(datee2.getDate()-1);	
			contract_end2= formatDate(datee2,"yyyy/MM/dd");
		}	
		$('.contract_start1').val(contract_start1);
		$('.contract_start2').val(contract_start2);
		$('.contract_end1').val(contract_end1);
		$('.contract_end2').val(contract_end2);
		var state3 = encodeURI(getUrl("state"));
		var district3 = encodeURI(getUrl("district"));
		
		if(""==decodeURI(decodeURI(district3))){
			district3 = encodeURI(encodeURI("全部"));
		}
		if(""==decodeURI(decodeURI(state3))){
			state3 = encodeURI(encodeURI("全部"));
		}
		var address3 = encodeURI(encodeURI($('#address').val()));
		var contract_start13 = $('.contract_start1').val();
		var contract_start23 = $('.contract_start2').val();
		var contract_end13 = $('.contract_end1').val();
		var contract_end23 = $('.contract_end2').val();
		
		if(contract_start23!=''){
			var dates2 =new Date(contract_start23 );
			dates2.setDate(dates2.getDate()+1);	
			contract_start23= formatDate(dates2,"yyyy/MM/dd");
		}
		if(contract_end23!=''){
			var datee2 =new Date(contract_end23 );
			datee2.setDate(datee2.getDate()+1);	
			contract_end23= formatDate(datee2,"yyyy/MM/dd");
		}	
		
		getseachhouse(address3,district3,state3,contract_start13,contract_start23,contract_end13,contract_end23);
	} 
});	

function getallrent(){
	var address = encodeURI(encodeURI($('#address').val()));
	var contract_start1 = $('.contract_start1').val();
	var contract_start2 = $('.contract_start2').val();
	var contract_end1 = $('.contract_end1').val();
	var contract_end2 = $('.contract_end2').val();
	var state = encodeURI(getUrl("state"));
	var district = encodeURI(getUrl("district"));
	
	if(""==decodeURI(decodeURI(district))){
		district = encodeURI(encodeURI("全部"));
	}
	if(""==decodeURI(decodeURI(state))){
		state = encodeURI(encodeURI("全部"));
	}
	if(contract_start2!=''){
		var dates2 =new Date(contract_start2 );
		dates2.setDate(dates2.getDate()+1);	
		contract_start2= formatDate(dates2,"yyyy/MM/dd");
	}
	if(contract_end2!=''){
		var datee2 =new Date(contract_end2 );
		datee2.setDate(datee2.getDate()+1);	
		contract_end2= formatDate(datee2,"yyyy/MM/dd");
	}		
	
	if(address=="" && decodeURI(decodeURI(district))=="全部" && decodeURI(decodeURI(state))=="全部" &&contract_start1==""&&contract_start2==""&&contract_end1==""&&contract_end2==""){
//		$('.contract_start1').val("1999/01/01");
//		$('.contract_start2').val("2099/12/31");
//		$('.contract_end1').val("1999/01/01");
//		$('.contract_end2').val("2099/12/31");
		getpagehouse();
	}else{
		getseachhouse1(address,district,state,contract_start1,contract_start2,contract_end1,contract_end2);
	}
}


$(function(){
	$('.btn-primary').click(function(){
		var address = encodeURI(encodeURI($('#address').val()));
		var state = new Array;
		var district =  new Array;
		
		if($("input[name='state']:checked").length==0){
			state.push("");
		}else{
			$("input[name='state']:checked").each(function(){
				state.push($(this).val());
			});
		}
		if($("input[name='district']:checked").length==0){
			district.push("");
		}else{
			$("input[name='district']:checked").each(function(){
				district.push($(this).val());
			});
		}
		state = encodeURI(encodeURI(state));
		district = encodeURI(encodeURI(district));
		
		var contract_start1 = $('.contract_start1').val();
		var contract_start2 = $('.contract_start2').val();
		var contract_end1 = $('.contract_end1').val();
		var contract_end2 = $('.contract_end2').val();
		
		if(contract_start2!=''){
			var dates2 =new Date(contract_start2 );
			dates2.setDate(dates2.getDate()+1);	
			contract_start2= formatDate(dates2,"yyyy/MM/dd");
		}
		if(contract_end2!=''){
			var datee2 =new Date(contract_end2 );
			datee2.setDate(datee2.getDate()+1);	
			contract_end2= formatDate(datee2,"yyyy/MM/dd");
		}		
		
		location.href="house.html?district="+district+"&state="+state+"&address="+address+"&contract_start1="+contract_start1+"&contract_start2="+contract_start2+"&contract_end1="+contract_end1+"&contract_end2="+contract_end2;
		
		
//		if($('#address').val()=="" && $('#district').val()=="全部" && $('#state').val()=="全部" &&contract_start1==""&&contract_start2==""&&contract_end1==""&&contract_end2==""){
//			getallhouse();
//		}else{
//			getseachhouse(address,district,state,contract_start1,contract_start2,contract_end1,contract_end2);
//		}   	
	})
	$('#address').keyup(function(event){
         if(event.keyCode == 13)    
         {
        	 var address = encodeURI(encodeURI($('#address').val()));
     		var state = new Array;
     		var district =  new Array;
     		
     		if($("input[name='state']:checked").length==0){
     			state.push("");
     		}else{
     			$("input[name='state']:checked").each(function(){
     				state.push($(this).val());
     			});
     		}
     		if($("input[name='district']:checked").length==0){
     			district.push("");
     		}else{
     			$("input[name='district']:checked").each(function(){
     				district.push($(this).val());
     			});
     		}
     		state = encodeURI(encodeURI(state));
     		district = encodeURI(encodeURI(district));
     		
     		var contract_start1 = $('.contract_start1').val();
     		var contract_start2 = $('.contract_start2').val();
     		var contract_end1 = $('.contract_end1').val();
     		var contract_end2 = $('.contract_end2').val();
     		
     		if(contract_start2!=''){
     			var dates2 =new Date(contract_start2 );
     			dates2.setDate(dates2.getDate()+1);	
     			contract_start2= formatDate(dates2,"yyyy/MM/dd");
     		}
     		if(contract_end2!=''){
     			var datee2 =new Date(contract_end2 );
     			datee2.setDate(datee2.getDate()+1);	
     			contract_end2= formatDate(datee2,"yyyy/MM/dd");
     		}		
     		
     		location.href="house.html?district="+district+"&state="+state+"&address="+address+"&contract_start1="+contract_start1+"&contract_start2="+contract_start2+"&contract_end1="+contract_end1+"&contract_end2="+contract_end2;
     		
         }
     });
	var time1 = new Date("2016-11-26");
	diy_time(time1);
})
//格式化日期,
function formatDate(date,format){
  var paddNum = function(num){
    num += "";
    return num.replace(/^(\d)$/,"0$1");
  }
  //指定格式字符
  var cfg = {
     yyyy : date.getFullYear() //年 : 4位
    ,yy : date.getFullYear().toString().substring(2)//年 : 2位
    ,M  : date.getMonth() + 1  //月 : 如果1位的时候不补0
    ,MM : paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
    ,d  : date.getDate()   //日 : 如果1位的时候不补0
    ,dd : paddNum(date.getDate())//日 : 如果1位的时候补0
    ,hh : date.getHours()  //时
    ,mm : date.getMinutes() //分
    ,ss : date.getSeconds() //秒
  }
  format || (format = "yyyy-MM-dd hh:mm:ss");
  return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
} 
function diy_time(time1){
    time1 = Date.parse(new Date(time1));
    time2 = Date.parse(new Date());
    if(time1>time2){
    	return "0";    	
    }else{
    	return time3 = Math.abs(parseInt((time2 - time1)/1000/3600/24));
    	
    }    
}

$(function(){
	$(".find").on("click","a",function(){
		
		if($(this).children("input").is(':checked')==false){
			$(this).children("span").removeClass("act");
			$(this).children("input").prop("checked",true);
			$(this).siblings("a").children("span").addClass("act");
			$(this).siblings("a").children("input").prop("checked",false);
		}else{
			$(this).children("span").addClass("act");
			$(this).children("input").prop("checked",false);
		}
		
	})

});	
function getpagehouse(){
	var page = $('.activP').text();
	$.ajax({
		   type: "GET",
		   url: "pagehouse.do",
		   data: "page="+page,
		   success: function(result){
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj;
					var html;
					if(arr.length==0){
						$("thead").css({"display":"table-header-group","width":"auto"});
					}else{
						$("thead").css({"display":"block","width":"auto"});
					}
					for(var i=0;i<arr.length;i++){
						obj=arr[i];				
						var vacancydate = "";
						var firstornot="";
						
						if(obj.state!="已解约" && obj.state!="已到期"){
							if(obj.vacancy_date!="" && obj.vacancy_date!=null){
								var time1 = new Date(obj.vacancy_date);
								vacancydate = diy_time(time1)
								firstornot="否";
							}else{
								var time1 = new Date(obj.contract_startdate);
								vacancydate = diy_time(time1);
								firstornot="是";
							}
						}else{
							vacancydate="无";
							var firstornot="";
						}
						//计算配置结束开始空置天数
						var finishdate ="";
						if(obj.state=="空置中"){
							if(obj.vacancy_date!="" && obj.vacancy_date!=null){
								finishdate="无";
							}else{
								var time1 = new Date(obj.finish_date);
								finishdate = diy_time(time1);
							}
						}else{
							finishdate="无";
						}
						
						html += "<tr lang=\"houseiframe\" _href='houseDetail.html?house_id="+obj.house_id+"'><td>"+obj.house_id+"</td>"+
								"<td>"+obj.district+"</td>" +
								"<td>"+obj.business_area+"</td>" +
								"<td>"+obj.estate+"</td>" +
								"<td>"+obj.address+"</td>" +
								"<td>"+obj.house_type+"</td>" +
								"<td>"+obj.room_area+"</td>" +
								"<td>"+obj.room_tese+"</td>" +
								"<td>"+obj.room_yuqichufangjia+"</td>" +
								"<td>"+vacancydate+"</td>"+
								"<td>"+finishdate+"</td>"+
								"<td>"+firstornot+"</td>"+
								"<td>"+obj.job_no+"</td>"+																
								"<td>"+obj.state+"</td>" +								
								"<td>"+obj.contract_startdate+"</td>"+		
					//			"<td>"+obj.remark+"</td>" +
								"<td><a lang=\"houseiframe\"  class='find' _href='houseDetail.html?house_id="+obj.house_id+"'>查看详情</a></td>"+
								"</tr>"
					}				
				    $(".table_detail tbody").html("");
					$(".table_detail tbody").append(html);
					table("thead");
				}	
		   }
	});
}


function getallhouse(){
	$('.loading').show();
	$(".center_right_detail_list_page").css("display","block");
	$.ajax({
		   type: "GET",
		   url: "Allhouse.do",
		   data: "page="+page,
		   success: function(result){
			
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				//	$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>").show();
				}else{
					var arr=JSON.parse(result);
					if(arr.length==0){
						$("thead").css({"display":"table-header-group","width":"auto"});
					}else{
						$("thead").css({"display":"block","width":"auto"});
					}
					var obj;
					var html;
					for(var i=0;i<arr.length-1;i++){
						obj=arr[i];
						var vacancydate = "";
						if(obj.state!="已解约" && obj.state!="已到期"){
							if(obj.vacancy_date!="" && obj.vacancy_date!=null){
								var time1 = new Date(obj.vacancy_date);
								vacancydate = diy_time(time1)
								firstornot="否";
							}else{
								var time1 = new Date(obj.contract_startdate);
								vacancydate = diy_time(time1);
								firstornot="是";
							}
						}else{
							vacancydate="无";
							var firstornot="";
						}
						//计算配置结束开始空置天数
						var finishdate ="";
						if(obj.state=="空置中"){
							if(obj.vacancy_date!="" && obj.vacancy_date!=null){
								finishdate="无";
							}else{
								var time1 = new Date(obj.finish_date);
								finishdate = diy_time(time1);
							}
						}else{
							finishdate="无";
						}
						
						html += "<tr lang=\"houseiframe\"  _href='houseDetail.html?house_id="+obj.house_id+"'><td width='6%'>"+obj.house_id+"</td>"+
								"<td width='7%'>"+obj.district+"</td>" +
								"<td width='4%'>"+obj.business_area+"</td>" +
								"<td width='6%'>"+obj.estate+"</td>" +
								"<td width='10%'>"+obj.address+"</td>" +
								"<td width='6%'>"+obj.house_type+"</td>" +
								"<td width='5%'>"+obj.room_area+"</td>" +
								"<td width='6%'>"+obj.room_tese+"</td>" +
								"<td width='5%'>"+obj.room_yuqichufangjia+"</td>" +
								"<td width='5%'>"+vacancydate+"</td>"+
								"<td width='10%'>"+finishdate+"</td>"+
								"<td width='8%'>"+firstornot+"</td>"+
								"<td width='6%'>"+obj.job_no+"</td>"+																
								"<td width='5%'>"+obj.state+"</td>" +								
								"<td width='6%'>"+obj.contract_startdate+"</td>"+		
					//			"<td>"+obj.remark+"</td>" +
								"<td width='4%'><a lang=\"houseiframe\"  class='find' _href='houseDetail.html?house_id="+obj.house_id+"'>查看详情</a></td>"+
								"</tr>";
					}
					$('#maxnum').val(arr[arr.length-1].maxnum);
					var maxnum = $('#maxnum').val();
					$('#total').html(maxnum);
						maxnum = parseInt(maxnum);
						maxnum = Math.ceil(maxnum/15.0);
						$('.pageTest').page({
							leng:maxnum,//分页总数
							activeClass: 'activP' , //active 类样式定义
						})
				    $(".table_detail tbody").html("");
					$(".table_detail tbody").append(html);
					table("table");
					
				}	
		   }
	});
}


//条件查询初始化
function getseachhouse(address1,district,state,contract_start1,contract_start2,contract_end1,contract_end2){
	$('.loading').show();	
	$.ajax({
		   type: "GET",
		   url: "house.do",
		   data: "page="+page+"&num="+15+"&district="+district+"&state="+state+"&address="+address1+"&contract_start1="+contract_start1+"&contract_start2="+contract_start2+"&contract_end1="+contract_end1+"&contract_end2="+contract_end2,
		   success: function(result){ 
			//$(".center_right_detail_list_page").css("display","none");
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					if(arr.msg.length==0){
						$("thead").css({"display":"table-header-group","width":"auto"});
					}else{
						$("thead").css({"display":"block","width":"auto"});
					}
					$('#total').html(arr.length);
					var obj;
					var html="";
					var house_id="";
					var business_area="";
					var address="";
					var estate="";
					var job_no="";
					var state="";
					var district="";
					var remark="";
					var contract_startdate="";
					var date="";
					var vacancydate="";
					var firstornot="";
					var room_area;
					var room_tese;
					for(var i=0;i<arr.msg.length;i++){
						obj=arr.msg[i];
						if(address1!=""){
							house_id = obj.house_id.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							business_area = obj.business_area.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							estate = obj.estate.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");		
							address=obj.address.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							job_no=obj.job_no.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							house_type=obj.house_type.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							state=obj.state.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							district=obj.district.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							remark=obj.remark.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							contract_startdate=obj.contract_startdate.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							room_area=obj.room_area.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							room_tese=obj.room_tese.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
						}else{
							house_id = obj.house_id;
							business_area = obj.business_area;
							estate = obj.estate;		
							address=obj.address;
							job_no=obj.job_no;
							house_type=obj.house_type;
							state=obj.state;
							district=obj.district;
							remark=obj.remark;
							contract_startdate=obj.contract_startdate;
							room_area=obj.room_area;
							room_tese=obj.room_tese;
						}
						if(obj.state!="已解约" && obj.state!="已到期"){
							if(obj.vacancy_date!="" && obj.vacancy_date!=null){
								var time1 = new Date(obj.vacancy_date);
								vacancydate = diy_time(time1)
								firstornot="否";
							}else{
								var time1 = new Date(obj.contract_startdate);
								vacancydate = diy_time(time1);
								firstornot="是";
							}
						}else{
							vacancydate="无";
						}
						
						//计算配置结束开始空置天数
						var finishdate ="";
						if(obj.state=="空置中"){
							if(obj.vacancy_date!="" && obj.vacancy_date!=null){
								finishdate="无";
							}else{
								var time1 = new Date(obj.finish_date);
								finishdate = diy_time(time1);
							}
						}else{
							finishdate="无";
						}
						
						html += "<tr lang=\"houseiframe\"  _href='houseDetail.html?house_id="+obj.house_id+"'><td width='6%'>"+house_id+"</td>"+
									"<td width='7%'>"+district+"</td>" +
									"<td width='4%'>"+business_area+"</td>" +
									"<td width='6%'>"+estate+"</td>" +
									"<td width='10%'>"+address+"</td>" +
									"<td width='6%'>"+house_type+"</td>" +
									"<td width='5%'>"+room_area+"</td>" +
									"<td width='6%'>"+room_tese+"</td>" +
									"<td width='5%'>"+obj.room_yuqichufangjia+"</td>" +
									"<td width='5%'>"+vacancydate+"</td>"+
									"<td width='10%'>"+finishdate+"</td>"+
									"<td width='8%'>"+firstornot+"</td>"+
									"<td width='6%'>"+job_no+"</td>"+																
									"<td width='5%'>"+state+"</td>" +								
									"<td width='6%'>"+contract_startdate+"</td>"+		
						//			"<td>"+obj.remark+"</td>" +
									"<td width='4%'><a lang=\"houseiframe\"  class='find' _href='houseDetail.html?house_id="+obj.house_id+"'>查看详情</a></td>"+
								"</tr>"				
					}					

					
					$('#maxnum').val(arr.total);
					var maxnum = $('#maxnum').val();				
					$('#total').html(maxnum);
					maxnum = parseInt(maxnum);
					maxnum = Math.ceil(maxnum/15.0);
						$('.pageTest').page({
							leng:maxnum,//分页总数
							activeClass: 'activP' , //active 类样式定义
						})
					
					
				    $(".table_detail tbody").html("");				   				   
					$(".table_detail tbody").append(html);
					table("table");
				}	
		   }
	});
}

//分页
function getseachhouse1(address1,district,state,contract_start1,contract_start2,contract_end1,contract_end2){
	var page = $('.activP').text();
	$('.loading').show();	
	$.ajax({
		   type: "GET",
		   url: "house.do",
		   data: "page="+page+"&num="+15+"&district="+district+"&state="+state+"&address="+address1+"&contract_start1="+contract_start1+"&contract_start2="+contract_start2+"&contract_end1="+contract_end1+"&contract_end2="+contract_end2,
		   success: function(result){
			//$(".center_right_detail_list_page").css("display","none");
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{					
					var arr=JSON.parse(result);
					if(arr.msg.length==0){
						$("thead").css({"display":"table-header-group","width":"auto"});
					}else{
						$("thead").css({"display":"block","width":"auto"});
					}
					$('#total').html(arr.length);
					var obj;
					var html="";
					var house_id="";
					var business_area="";
					var address="";
					var estate="";
					var job_no="";
					var state="";
					var district="";
					var remark="";
					var contract_startdate="";
					var date="";
					var vacancydate="";
					var firstornot="";
					var room_area;
					var room_tese;
					for(var i=0;i<arr.msg.length;i++){
						obj=arr.msg[i];
						
						if(address1!=""){
							house_id = obj.house_id.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							business_area = obj.business_area.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							estate = obj.estate.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");		
							address=obj.address.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							job_no=obj.job_no.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							house_type=obj.house_type.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							state=obj.state.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							district=obj.district.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							remark=obj.remark.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							contract_startdate=obj.contract_startdate.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							room_area=obj.room_area.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
							room_tese=obj.room_tese.split($('#address').val()).join("<span style='color:red'>"+$('#address').val()+"</span>");
						}else{
							house_id = obj.house_id;
							business_area = obj.business_area;
							estate = obj.estate;		
							address=obj.address;
							job_no=obj.job_no;
							house_type=obj.house_type;
							state=obj.state;
							district=obj.district;
							remark=obj.remark;
							contract_startdate=obj.contract_startdate;
							room_area=obj.room_area;
							room_tese=obj.room_tese;
						}
						
						if(obj.state!="已解约" && obj.state!="已到期"){
							if(obj.vacancy_date!="" && obj.vacancy_date!=null){
								var time1 = new Date(obj.vacancy_date);
								vacancydate = diy_time(time1)
								firstornot="否";
							}else{
								var time1 = new Date(obj.contract_startdate);
								vacancydate = diy_time(time1);
								firstornot="是";
							}
						}else{
							vacancydate="无";
						}
						//计算配置结束开始空置天数
						var finishdate ="";
						if(obj.state=="空置中"){
							if(obj.vacancy_date!="" && obj.vacancy_date!=null){
								finishdate="无";
							}else{
								var time1 = new Date(obj.finish_date);
								finishdate = diy_time(time1);
							}
						}else{
							finishdate="无";
						}
						
						html += "<tr lang=\"houseiframe\"  _href='houseDetail.html?house_id="+obj.house_id+"'><td>"+house_id+"</td>"+									
									"<td>"+district+"</td>" +
									"<td>"+business_area+"</td>" +
									"<td>"+estate+"</td>" +
									"<td>"+address+"</td>" +
									"<td>"+house_type+"</td>" +
									"<td>"+room_area+"</td>" +
									"<td>"+room_tese+"</td>" +
									"<td>"+obj.room_yuqichufangjia+"</td>" +
									"<td>"+vacancydate+"</td>"+
									"<td>"+finishdate+"</td>"+
									"<td>"+firstornot+"</td>"+
									"<td>"+job_no+"</td>"+																
									"<td>"+state+"</td>" +								
									"<td>"+contract_startdate+"</td>"+		
						//			"<td>"+remark+"</td>" +													
									"<td><a lang=\"houseiframe\"  class='find' _href='houseDetail.html?house_id="+obj.house_id+"'>查看详情</a></td>"+
								"</tr>";				
					}					
					
				    $(".table_detail tbody").html("");				   				   
					$(".table_detail tbody").append(html);
					table("thead");
				}	
		   }
	});
}

function table(t){
	 $("table").children("thead").find("th").each(function(){
		var idx = $(this).index();
		var td = $(this).closest("table").children("tbody").children("tr:first").children("td").eq(idx);
		if(t=="table"){
			
			$(this).width() > td.width() ? td.width($(this).width()) : $(this).width(td.width());
		}else if(t=="thead"){
			
			td.width($(this).width());
		}else{
			$(this).width(td.width());
		}
		
	});
}

function getUrl(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r!=null) return unescape(r[2]); return null; //返回参数值
} 

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

		        for(var i=0;i<arr.length;i++){
		          obj=arr[i];
		         html += "<a><span class='act'></span ><input  type=\"checkbox\"  name=\"district\" value=\""+obj.district+"\" />"+obj.district+"</a>";
		        }  
		        
		        $('.district').append(html);
	       }
	  });
}