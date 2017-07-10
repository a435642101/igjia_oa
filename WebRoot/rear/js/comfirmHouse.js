// JavaScript Document
var page = 1;
$(function(){
	getpagerear();
	
	$("table").on("click",".find",function(){
		var house_id = $(this).attr("lang");
		var district = encodeURI(encodeURI($(this).attr("lang1")));
		if(confirm("是否确认退租")){
			ComfirmRentBack(district,house_id);
		}else{
			return false;
		}	
	});
	
});



//初始页面
function getpagerear(){
	$.ajax({
		   type: "GET",
		   url: "/getRentBack.do",
		   data: "",
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
							var vacancydate = "";
							if(obj.state!="已解约" && obj.state!="已出租" && obj.state!="已到期"){
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
							html += "<tr><td>"+obj.house_id+"</td>"+
							"<td>"+obj.district+"</td>" +
							"<td>"+obj.business_area+"</td>" +
							"<td>"+obj.estate+"</td>" +
							"<td>"+obj.address+"</td>" +
							"<td>"+obj.house_type+"</td>" +
							"<td>"+obj.room_area+"</td>" +
							"<td>"+obj.room_tese+"</td>" +
							"<td>"+obj.room_yuqichufangjia+"</td>" +
							"<td>"+vacancydate+"</td>"+
							"<td>"+firstornot+"</td>"+
							"<td>"+obj.job_no+"</td>"+																
							"<td>"+obj.state+"</td>" +								
							"<td>"+obj.contract_startdate+"</td>"+		
				//			"<td>"+obj.remark+"</td>" +
							"<td><a lang='"+obj.house_id+"' lang1='"+obj.district+"'  class='find''>确认退租</a></td>"+
							"</tr>";
						}		
						$("#total").text(arr.total);
					    $(".table_detail tbody").html("");
						$(".table_detail tbody").html(html);
						
					}
				}
		   }
	});
}

function ComfirmRentBack(district,house_id){
	$.ajax({
		   type: "GET",
		   url: "/ComfirmRentBack.do",
		   data: "district="+district+"&house_id="+house_id,
		   success: function(result){
			   if(result=="fail"){
				   window.top.document.location.href='../login.html';
			   }else{
				   var arr=JSON.parse(result);
				   if(arr.code=="2"){
					   alert("该房源不在配置中");
				   }else if(arr.code=="3"){
					   alert("参数错误");
				   }else if(arr.code=="4"){
					   alert("修改异常");
				   }else{
					   getpagerear();
					   alert("修改成功");
				   }
			   }
		   }
	});
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
