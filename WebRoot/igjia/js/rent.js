var page = 1;

//分页获取租客信息
$(function(){
	getDistrict();
	
	var keyword = getUrl("keyword");
	var district = getUrl("district");
	var state = getUrl("state");
	var paymethod = getUrl("paymethod");
	var contract_start1 = getUrl("contract_start1");
	var contract_start2 = getUrl("contract_start2");
	var contract_end1 = getUrl("contract_end1");
	var contract_end2 = getUrl("contract_end2");
	var dis = getUrl("dis");
	var sis = getUrl("sis");
	
	if(paymethod=="" || paymethod==null){
		paymethod=encodeURI(encodeURI("全部"));
	}
	var district1 = decodeURI(district).split(",");
	var state1 = decodeURI(state).split(",");
	if(dis=="1"){
		$("input[name=district]").each(function(){
			for ( var i = 0; i < district1.length; i++) {
				if($(this).val()==district1[i]){
					$(this).siblings("span").removeClass("act");
					$(this).prop("checked",true);
				}
			}
		});
	}
	if(sis=="1"){
		$("input[name=state]").each(function(){
			for ( var i = 0; i < state1.length; i++) {
				if($(this).val()==state1[i]){
					$(this).siblings("span").removeClass("act");
					$(this).prop("checked",true);
				}
			}
		});
	}
	
	$(".rentername").val(decodeURI(decodeURI(keyword)));
	$(".paymethod")[0].value=decodeURI(decodeURI(paymethod));
	
	if(keyword=="" && decodeURI(decodeURI(paymethod))=="全部" && sis=="0" && dis=="0" &&contract_start1==""&&contract_start2==""&&contract_end1==""&&contract_end2==""){
		  
//		$('.contract_start1').val("1999/01/01");
//		$('.contract_start2').val("2099/12/31");
//		$('.contract_end1').val("1999/01/01");
//		$('.contract_end2').val("2099/12/31");
		getallrent1();
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
		
		var state3 = new Array;
		var district3 =  new Array;
		
		var sis = 0;
		var dis = 0;
		
		if($("input[name='state']:checked").length==0){
			$("input[name='state']").each(function(){
				state3.push($(this).val());
			});
			sis = 0;
		}else{
			$("input[name='state']:checked").each(function(){
				state3.push($(this).val());
			});
			sis = 1; 
		}
		if($("input[name='district']:checked").length==0){
			$("input[name='district']").each(function(){
				district3.push($(this).val());
			});
			dis = 0;
		}else{
			$("input[name='district']:checked").each(function(){
				district3.push($(this).val());
			});
			dis = 1;
		}
		state3 = encodeURI(encodeURI(state3));
		district3 = encodeURI(encodeURI(district3));
		var keyword3 = encodeURI(encodeURI($('#rentername').val()));
		var paymethod3 = encodeURI(encodeURI($("select[name='paymethod']").val()));
		
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
		
		getseachrent(keyword3,district3,state3,paymethod3,contract_start13,contract_start23,contract_end13,contract_end23);
	} 
});	

function getallrent(){
	 
	var state = new Array;
	var district =  new Array;
	
	var sis = 0;
	var dis = 0;
	
	if($("input[name='state']:checked").length==0){
		$("input[name='state']").each(function(){
			state.push($(this).val());
		});
		sis = 0;
	}else{
		$("input[name='state']:checked").each(function(){
			state.push($(this).val());
		});
		sis = 1; 
	}
	if($("input[name='district']:checked").length==0){
		$("input[name='district']").each(function(){
			district.push($(this).val());
		});
		dis = 0;
	}else{
		$("input[name='district']:checked").each(function(){
			district.push($(this).val());
		});
		dis = 1;
	}
	state = encodeURI(encodeURI(state));
	district = encodeURI(encodeURI(district));
	var keyword = encodeURI(encodeURI($('#rentername').val()));
	var paymethod = encodeURI(encodeURI($("select[name='paymethod']").val()));
	
	var contract_start1 = $('.contract_start1').val();
	var contract_start2 = $('.contract_start2').val();
	var contract_end1 = $('.contract_end1').val();
	var contract_end2 = $('.contract_end2').val();
	
	if(contract_start2!=''){
		var dates2 =new Date(contract_start2 );
		dates2.setDate(dates2.getDate());
		contract_start2= formatDate(dates2,"yyyy/MM/dd");
	}
	if(contract_end2!=''){
		var datee2 =new Date(contract_end2 );
		datee2.setDate(datee2.getDate());	
		contract_end2= formatDate(datee2,"yyyy/MM/dd");
	}	
	
	if(keyword=="" && decodeURI(decodeURI(paymethod))=="全部" && sis=="0" && dis=="0" &&contract_start1==""&&contract_start2==""&&contract_end1==""&&contract_end2==""){
		
//		$('.contract_start1').val("1999/01/01");
//		$('.contract_start2').val("2099/12/31");
//		$('.contract_end1').val("1999/01/01");
//		$('.contract_end2').val("2099/12/31");
		getpagerent();
	}else{
		$('.contract_start1').val(contract_start1);
		$('.contract_start2').val(contract_start2);
		$('.contract_end1').val(contract_end1);
		$('.contract_end2').val(contract_end2);
		getseachrent1(keyword,district,state,paymethod,contract_start1,contract_start2,contract_end1,contract_end2);
	} 
	
}
	


$(function(){
	$('.btn-primary').click(function(){
		var state = new Array;
		var district =  new Array;
		
		var sis = 0;
		var dis = 0;
		
		if($("input[name='state']:checked").length==0){
			$("input[name='state']").each(function(){
				state.push($(this).val());
			});
			sis = 0;
		}else{
			$("input[name='state']:checked").each(function(){
				state.push($(this).val());
			});
			sis = 1; 
		}
		if($("input[name='district']:checked").length==0){
			$("input[name='district']").each(function(){
				district.push($(this).val());
			});
			dis = 0;
		}else{
			$("input[name='district']:checked").each(function(){
				district.push($(this).val());
			});
			dis = 1;
		}
		state = encodeURI(encodeURI(state));
		district = encodeURI(encodeURI(district));
		var keyword = encodeURI(encodeURI($('#rentername').val()));
		var paymethod = encodeURI(encodeURI($("select[name='paymethod']").val()));
		
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
		location.href="rent.html?keyword="+keyword+"&district="+district+"&state="+state+"&paymethod="+paymethod+"&contract_start1="+contract_start1+"&contract_start2="+contract_start2+"&contract_end1="+contract_end1+"&contract_end2="+contract_end2+"&sis="+sis+"&dis="+dis;
//		if($('#rentername').val()=="" && $("select[name='paymethod']").val()=="全部" && $("input[name='state']:checked").length==0 && $("input[name='district']:checked").length==0 ){
//			getallrent1();
//		}else{		
//			getseachrent(keyword,district,state,paymethod,contract_start1,contract_start2,contract_end1,contract_end2);
//			
//		}
    	
	});
	
	$(function(){
		$(".find").on("click","a",function(){
			if($(this).children("input").is(':checked')==false){
				$(this).children("span").removeClass("act");
				$(this).children("input").prop("checked",true);
			}else{
				$(this).children("span").addClass("act");
				$(this).children("input").prop("checked",false);
			}
			
		})
		$(".find").on("click",".distotal,.statotal",function(){
			if($(this).children("input").is(':checked')==true){
				$(this).siblings("a").children("span").removeClass("act");
				$(this).siblings("a").children("input").prop("checked",true);
			}else{
				$(this).siblings("a").children("span").addClass("act");
				$(this).siblings("a").children("input").prop("checked",false);
			}
		});
	});	

});
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
function getpagerent(){
	var page = $('.activP').text();
	$.ajax({
		   type: "GET",
		   url: "pagerent.do",
		   data: "page="+page,
		   success: function(result){
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					$("#loadmore").hide();
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
						
						html += "<tr lang=\"rentiframe\"  _href='rentDetail.html?contract_no="+obj.contract_no+"'><td>"+obj.house_id+"</td>" +
								"<td>"+obj.address+"</td>" +
								"<td>"+obj.job_no+"</td>" +
								"<td>"+obj.name+"</td>" +
								"<td>"+obj.renter_name+"</td>" +
								
								"<td>"+obj.state+"</td>" +							
								"<td>"+obj.district+"</td>" +							
								"<td class='remark' title='"+obj.remark+"'>"+obj.remark.substring(0, 10)+"</td>" +
								"<td>"+obj.contract_month+"</td>" +
								"<td>"+obj.paymethod+"</td>" +
								"<td>"+obj.firstyear_monthrent+"</td>" +
								"<td>"+obj.contract_startdate+"</td>" +
								"<td>"+obj.date+"</td>" +
								
								"<td><a lang=\"rentiframe\" class='find' _href='rentDetail.html?contract_no="+obj.contract_no+"'>查看详情</a></td>"
								"</tr>"
					}				
				    $(".table_detail tbody").html("");
					$(".table_detail tbody").append(html);
					
					table("thead");
					
					$('.remark').poshytip();
					
				}
		   }
	});
}


function getallrent1(){
	$.ajax({
		   type: "GET",
		   url: "Allrent.do",
		   data: "page="+page,
		   success: function(result){
			
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					$("#loadmore").hide();
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
						html += "<tr lang=\"rentiframe\" _href='rentDetail.html?contract_no="+obj.contract_no+"'><td width='8%'>"+obj.house_id+"</td>" +
							"<td width='20%'>"+obj.address+"</td>" +
							"<td width='6%'>"+obj.job_no+"</td>" +
							"<td width='6%'>"+obj.name+"</td>" +
							"<td width='6%'>"+obj.renter_name+"</td>" +
							
							"<td width='6%'>"+obj.state+"</td>" +							
							"<td width='6%'>"+obj.district+"</td>" +							
							"<td width='6%' class='remark' title='"+obj.remark+"'>"+obj.remark.substring(0, 10)+"</td>" +
							"<td width='6%'>"+obj.contract_month+"</td>" +
							"<td width='5%'>"+obj.paymethod+"</td>" +
							"<td width='5%'>"+obj.firstyear_monthrent+"</td>" +
							"<td width='8%'>"+obj.contract_startdate+"</td>" +
							"<td width='6%'>"+obj.date+"</td>" +
							
							"<td width='6%'><a lang=\"rentiframe\" class='find' _href='rentDetail.html?contract_no="+obj.contract_no+"'>查看详情</a></td>"
							"</tr>"
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
					$('.remark').poshytip();
					
				}	
		   }
	});
}

function getseachrent(keyword,district,state,paymethod,contract_start1,contract_start2,contract_end1,contract_end2){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "rent.do",
		   data: "page="+page+"&num="+15+"&keyword="+keyword+"&district="+district+"&state="+state+"&paymethod="+paymethod+"&contract_start1="+contract_start1+"&contract_start2="+contract_start2+"&contract_end1="+contract_end1+"&contract_end2="+contract_end2,
		   success: function(result){
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					$("#loadmore").hide();
					var arr=JSON.parse(result);
					if(arr.msg.length==0){
						$("thead").css({"display":"table-header-group","width":"auto"});
					}else{
						$("thead").css({"display":"block","width":"auto"});
					}
					$('#total').html(arr.total);
					var obj;
					var html;
					var house_id="";
					var address="";
					var job_no="";
					var salesman = "";
					var renter_name="";
				
					var state="";
					var district="";
					var remark="";
					var contract_month="";
					var contract_date="";
					var date="";
					for(var i=0;i<arr.msg.length;i++){
						obj=arr.msg[i];
						if(keyword!=""){
							house_id = obj.house_id.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							address = obj.address.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							job_no = obj.job_no.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							salesman = obj.name.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							renter_name = obj.renter_name.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							
							state = obj.state.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							district = obj.district.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							remark = obj.remark.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							contract_month = obj.contract_month.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							contract_startdate = obj.contract_startdate.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							date = obj.date.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
						}else{
							house_id = obj.house_id;
							address = obj.address;
							job_no = obj.job_no;
							salesman = obj.name;
							renter_name = obj.renter_name;
							
							state = obj.state;
							district = obj.district;
							remark = obj.remark;
							contract_month = obj.contract_month;
							contract_startdate = obj.contract_startdate;
							date = obj.date;
						}
						
						html += "<tr lang=\"rentiframe\" _href='rentDetail.html?contract_no="+obj.contract_no+"'><td width='8%'>"+house_id+"</td>" +
							"<td width='20%'>"+address+"</td>" +
							"<td width='6%'>"+job_no+"</td>" +
							"<td width='6%'>"+salesman+"</td>" +
							"<td width='6%'>"+renter_name+"</td>" +
							
							"<td width='6%'>"+state+"</td>" +							
							"<td width='6%'>"+district+"</td>" +							
							"<td width='6%' class='remark' title='"+obj.remark+"'>"+remark.substring(0, 10)+"</td>" +
							"<td width='6%'>"+contract_month+"</td>" +
							"<td width='5%'>"+obj.paymethod+"</td>" +
							"<td width='5%'>"+obj.firstyear_monthrent+"</td>" +
							"<td width='8%'>"+contract_startdate+"</td>" +
							"<td width='6%'>"+date+"</td>" +
							
							"<td width='6%'><a lang=\"rentiframe\" class='find' _href='rentDetail.html?contract_no="+obj.contract_no+"'>查看详情</a></td>"
							"</tr>"
					}					
//					if($('#rentername').val()!="tr" &&$('#rentername').val()!="td" && str.indexOf($('#rentername').val())!=1){
//				    	html = html.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
//				    }
					
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
					
					$('.remark').poshytip();
					table("table");
					
				}	
		   }
	});
}

function getseachrent1(keyword,district,state,paymethod,contract_start1,contract_start2,contract_end1,contract_end2){
	var page = $('.activP').text();
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "rent.do",
		   data: "page="+page+"&num="+15+"&keyword="+keyword+"&district="+district+"&state="+state+"&paymethod="+paymethod+"&contract_start1="+contract_start1+"&contract_start2="+contract_start2+"&contract_end1="+contract_end1+"&contract_end2="+contract_end2,
		   success: function(result){
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					$("#loadmore").hide();
					var arr=JSON.parse(result);
					if(arr.msg.length==0){
						$("thead").css({"display":"table-header-group","width":"auto"});
					}else{
						$("thead").css({"display":"block","width":"auto"});
					}
					$('#total').html(arr.total);
					var obj;
					var html;
					var house_id="";
					var address="";
					var job_no="";
					var salesman = "";
					var renter_name="";
				
					var state="";
					var district="";
					var remark="";
					var contract_month="";
					var contract_date="";
					var date="";
					for(var i=0;i<arr.msg.length;i++){
						obj=arr.msg[i];
						if(keyword!=""){
							house_id = obj.house_id.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							address = obj.address.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							job_no = obj.job_no.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							salesman = obj.name.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							renter_name = obj.renter_name.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							
							state = obj.state.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							district = obj.district.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							remark = obj.remark.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							contract_month = obj.contract_month.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							contract_startdate = obj.contract_startdate.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
							date = obj.date.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
						}else{
							house_id = obj.house_id;
							address = obj.address;
							job_no = obj.job_no;
							salesman = obj.name;
							renter_name = obj.renter_name;
							
							state = obj.state;
							district = obj.district;
							remark = obj.remark;
							contract_month = obj.contract_month;
							contract_startdate = obj.contract_startdate;
							date = obj.date;
						}
						html += "<tr lang=\"rentiframe\" _href='rentDetail.html?contract_no="+obj.contract_no+"'><td>"+house_id+"</td>" +
							"<td>"+address+"</td>" +
							"<td>"+job_no+"</td>" +
							"<td>"+salesman+"</td>" +
							"<td>"+renter_name+"</td>" +
							
							"<td>"+state+"</td>" +							
							"<td>"+district+"</td>" +							
							"<td class='remark' title='"+obj.remark+"'>"+remark.substring(0, 10)+"</td>" +
							"<td>"+contract_month+"</td>" +
							"<td>"+obj.paymethod+"</td>" +
							"<td>"+obj.firstyear_monthrent+"</td>" +
							"<td>"+contract_startdate+"</td>" +
							"<td>"+date+"</td>" +
							
							"<td><a lang=\"rentiframe\" class='find' _href='rentDetail.html?contract_no="+obj.contract_no+"'>查看详情</a></td>"
							"</tr>"
					}					
//					if($('#rentername').val()!="tr" &&$('#rentername').val()!="td" && str.indexOf($('#rentername').val())!=1){
//				    	html = html.split($('#rentername').val()).join("<span style='color:red'>"+$('#rentername').val()+"</span>");
//				    }
				    $(".table_detail tbody").html("");
					$(".table_detail tbody").append(html);
					
					$('.remark').poshytip();
					table("thead");
					
				}	
		   }
	});
}

function table(t){
	 $(".table").children("thead").find("th").each(function(){
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