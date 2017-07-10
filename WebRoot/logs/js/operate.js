$(function(){
	var d = new Date();
	var dd= formatDate(d,"yyyy-MM-dd");
	var d1 = new Date(d);
	d1.setDate(d.getDate()-3);	
	$('#J-x1').val(formatDate(d1,"yyyy-MM-dd"));
	$('#J-x2').val(dd);
	
	var d3 = new Date(d);
	d3.setDate(d3.getDate()+1);	
	getlog(formatDate(d1,"yyyy-MM-dd"),formatDate(d3,"yyyy-MM-dd"));
	$('.btn-primary').click(function(){
		var date1 = $('#J-x1').val();	
		var date2 = $('#J-x2').val();
		var date22 =new Date(date2 );
		date22.setDate(date22.getDate()+1);	
		date22= formatDate(date22,"yyyy-MM-dd");
		getlog(date1,date22);
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

function getlog(date1,date2){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "getAllLogs.do",
		   data: "date1="+date1+"&date2="+date2,
		   success: function(result){
			   $('.loading').hide();
			   if(result=="error"){
					$("#loadmore").html("加载失败.");
				}else if(result=="fail"){
					$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>");
				}else if(result=="refused"){
					$("#loadmore").html("权限不够,无法获取");
				}else{
					$("#loadmore").hide();
					var arr=JSON.parse(result);
					$('#total').html(arr.length)
					var obj;
					var html;
					for(var i=0;i<arr.length;i++){
						obj=arr[i];				
						html += "<tr><td>"+Number(i+1)+"</td>"+
								"<td>"+obj.job_no+"</td>" +
								"<td>"+obj.name+"</td>" +
								"<td>"+obj.house_id+"</td>" +
								"<td>"+obj.address+"</td>" +
								"<td>"+obj.type+"</td>" +
								"<td>"+obj.content+"</td>" +
								"<td>"+obj.date+"</td>" +
								"</tr>"
					}				
				    $(".m10 tbody").html("");
					$(".m10 tbody").append(html);
				}	
		   }
	});
}