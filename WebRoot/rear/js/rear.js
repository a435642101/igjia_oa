// JavaScript Document
var page = 1;


function getUrl(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r!=null) return unescape(r[2]); return null; //返回参数值
} 

$(function(){
	getDistrict();
	getStaffByDD()
	
	var district = getUrl("district");
	var address = getUrl("address");
	var finish_date = getUrl("finish_date");
	var finish_date2 = getUrl("finish_date2");
	var start_date = getUrl("start_date");
	var start_date2 = getUrl("start_date2");
	var rear = getUrl("rear");
	
	$("#finish_date").val(finish_date);
	$("#finish_date2").val(finish_date2);
	$("#start_date").val(start_date);
	$("#start_date2").val(start_date2);
	$('.rear')[0].value=rear;
	
	$("input[name=rentername]").val(decodeURI(address));
	$(".district a").each(function(){
		if($(this).children("input[name=district]").val()==decodeURI(district)){
			$(this).children("input[name=district]").prop("checked",true);
			$(this).children("span").removeClass("act");
		}
	});
	
	getpagerear1();
	
	
	$(".btn").click(function(){
		var district = encodeURI(encodeURI($("input[type=radio]:checked").val()));
		var address = encodeURI(encodeURI($(".rentername").val()));
		var finish_date =$(".finish_date").val();
		var finish_date2 =$(".finish_date2").val();
		var start_date =$(".start_date").val();
		var start_date2 =$(".start_date2").val();
		var rear =$(".rear").val();
		if(rear==null) rear='';
		location.href="rear.html?district="+district+"&address="+address+"&finish_date="+finish_date+"&finish_date2="+finish_date2+"&start_date="+start_date+"&start_date2="+start_date2+"&rear="+rear;
	});
});

function getallrent(){
	getpagerear4();
}


$(function(){
	$(".find").on("click","a",function(){
		if($(this).children("input").is(':checked')==false){
			$(this).children("span").removeClass("act");
			$(this).children("input").prop("checked",true);
			$(this).siblings("a").children("span").addClass("act");
		}else{
			$(this).children("span").addClass("act");
			$(this).children("input").prop("checked",false);
		}
	});
});	


//初始页面
function getpagerear1(){
	var district = encodeURI(encodeURI($("input[type=radio]:checked").val()));
	var address =  encodeURI(encodeURI($(".rentername").val()));
	var finish_date = $(".finish_date").val();
	var finish_date2 = $(".finish_date2").val();
	var start_date = $(".start_date").val();
	var start_date2 = $(".start_date2").val();
	var rear =$(".rear").val();
	if(rear==null) rear='';
	if(district=="undefined"){
		district="";
	}
	$.ajax({
		   type: "GET",
		   url: "/getAllRear.do",
		   data: "page="+page+"&num="+15+"&district="+district+"&address="+address+"&finish_date="+finish_date+"&finish_date2="+finish_date2+"&start_date="+start_date+"&start_date2="+start_date2+"&rear="+rear,
		   success: function(result){
				if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					if(arr.code=="2"){
						$("#loadmore").html("加载失败").show();
					}else if(arr.code=="3"){
						$("#loadmore").html("加载失败").show();
					}else{
						$("#loadmore").hide();
						var obj;
						var html;
						for(var i=0;i<arr.msg.length;i++){
							obj=arr.msg[i];
							var begin_date = obj.begin_date;
							var finish_date = obj.finish_date;		
							var now1 = new Date(begin_date);
							var now2 = new Date(finish_date);
							var duration = (now2-now1)/(24*60*60*1000);
							
							
							html += "<tr lang='"+obj.contract_no+"' _href='singlerear.html?contract_no="+obj.contract_no+"'><td>"+obj.house_id+"</td>" +
									"<td>"+obj.district+"</td>" +
									"<td>"+obj.business_area+"</td>" +
									"<td>"+obj.estate+"</td>" +
									"<td>"+obj.address+"</td>" +	
									"<td>"+duration+"天</td>" +
									"<td>"+obj.type+"</td>" +							
									"<td>"+obj.job_no+"</td>" +
									"</tr>";
						}		
						$('#maxnum').val(arr.total);
						var maxnum = $('#maxnum').val();				
						$('#total').html(maxnum);
						maxnum = parseInt(maxnum);
						maxnum = Math.ceil(maxnum/15.0);
							$('.pageTest').page({
								leng:maxnum,//分页总数
								activeClass: 'activP' , //active 类样式定义

							});
						$("#total").text(arr.total);
					    $(".table_detail tbody").html("");
						$(".table_detail tbody").html(html);
						tbody();
					}
				}
		   }
	});
}

function getpagerear4(){
	var district = encodeURI(encodeURI($("input[type=radio]:checked").val()));
	var address =  encodeURI(encodeURI($(".rentername").val()));
	var finish_date = $(".finish_date").val();
	var finish_date2 = $(".finish_date2").val();
	var start_date = $(".start_date").val();
	var start_date2 = $(".start_date2").val();
	var rear =$(".rear").val();
	if(rear==null) rear='';
	if(district=="undefined"){
		district="";
	}
	var page = $('.activP').text();
	$.ajax({
		   type: "GET",
		   url: "/getAllRear.do",
		   data: "page="+page+"&num="+15+"&district="+district+"&address="+address+"&finish_date="+finish_date+"&finish_date2="+finish_date2+"&start_date="+start_date+"&start_date2="+start_date2+"&rear="+rear,
		   success: function(result){
				if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					if(arr.code=="2"){
						$("#loadmore").html("加载失败").show();
					}else if(arr.code=="3"){
						$("#loadmore").html("加载失败").show();
					}else{
						$("#loadmore").hide();
						var obj;
						var html;
						for(var i=0;i<arr.msg.length;i++){
							obj=arr.msg[i];
							var begin_date = obj.begin_date;
							var finish_date = obj.finish_date;		
							var now1 = new Date(begin_date);
							var now2 = new Date(finish_date);
							var duration = (now2-now1)/(24*60*60*1000);
							
							html += "<tr lang='"+obj.contract_no+"' _href='singlerear.html?contract_no="+obj.contract_no+"'><td>"+obj.house_id+"</td>" +
									"<td>"+obj.district+"</td>" +
									"<td>"+obj.business_area+"</td>" +
									"<td>"+obj.estate+"</td>" +
									"<td>"+obj.address+"</td>" +	
									"<td>"+duration+"天</td>" +
									"<td>"+obj.type+"</td>"+							
									"<td>"+obj.job_no+"</td>" +
									"</tr>";
						}		
						$("#total").text(arr.total);
					    $(".table_detail tbody").html("");
						$(".table_detail tbody").html(html);
						tbody();
					}
				}
		   }
	});
}

function tbody(){
	 $("table").children("thead").find("th").each(function(){
		var idx = $(this).index();
		var td = $(this).closest("table").children("tbody").children("tr:first").children("td,th").eq(idx);
		$(this).width() > td.width() ? td.width($(this).width()) : $(this).width(td.width());
	});
}

//详情页面
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
		         html += "<a><span class='act'></span ><input  type=\"radio\"  name=\"district\" value=\""+obj.district+"\" />"+obj.district+"</a>";
		        }  
		        $('.district').append(html);
	       }
	  });
}

//获取所有后勤人员);
function getStaffByDD(){
	  $.ajax({
	       type: "GET",
	       url: "/getStaffByDD.do",
	       async:false,
	       data: "department=KHFWZX&district_id=hq",
	       success: function(result){
	    	  
	    	   var arr=JSON.parse(result);       
	    	   var obj;
	    	   var html="";
	    	   var html1="";
	    	   for(var i=0;i<arr.msg.length;i++){
	    		   obj=arr.msg[i];
	    		   html += "<option value='"+obj.job_no+"'>"+obj.name+"</option>";
	    	   }  
	    	   $("#rear").append(html);
	       }
	  });
}