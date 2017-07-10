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
	
	var district = getUrl("district");
	var address = getUrl("address");
	
	if(address!=null){
		$("input[name=rentername]").val(decodeURI(address));
	}
	
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
		location.href="rear2.html?district="+district+"&address="+address;
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
  };
  format || (format = "yyyy-MM-dd hh:mm:ss");
  return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
} 
//初始页面
function getpagerear1(){
	var district = encodeURI(encodeURI($("input[type=radio]:checked").val()));
	var address = $(".rentername").val();
	if(district=="undefined"){
		district="";
	}
	$.ajax({
		   type: "GET",
		   url: "/getAllNewRear.do",
		   data: "page="+page+"&num="+15+"&district="+district+"&address="+address,
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
							var now2 = formatDate(new Date(),"yyyy/MM/dd");
							now2 = new Date(now2);
							var duration = (now2-now1)/(24*60*60*1000);
							
							
							html += "<tr lang='"+obj.contract_no+"' _href='singlerear.html?contract_no="+obj.contract_no+"'><td>"+obj.house_id+"</td>" +
									"<td>"+obj.district+"</td>" +
									"<td>"+obj.business_area+"</td>" +
									"<td>"+obj.estate+"</td>" +
									"<td>"+obj.address+"</td>" +	
									"<td>"+duration+"天</td>" +
									"<td>"+obj.measure_date+"</td>" +
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
	var address = $(".rentername").val();
	if(district=="undefined"){
		district="";
	}
	var page = $('.activP').text();
	$.ajax({
		   type: "GET",
		   url: "/getAllNewRear.do",
		   data: "page="+page+"&num="+15+"&district="+district+"&address="+address,
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
							var now2 = formatDate(new Date(),"yyyy/MM/dd");
							now2 = new Date(now2);
							var duration = (now2-now1)/(24*60*60*1000);
							html += "<tr lang='"+obj.contract_no+"' _href='singlerear.html?contract_no="+obj.contract_no+"'><td>"+obj.house_id+"</td>" +
									"<td>"+obj.district+"</td>" +
									"<td>"+obj.business_area+"</td>" +
									"<td>"+obj.estate+"</td>" +
									"<td>"+obj.address+"</td>" +	
									"<td>"+duration+"天</td>" +
									"<td>"+obj.measure_date+"</td>" +
									"<td>"+obj.type+"</td>" +							
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