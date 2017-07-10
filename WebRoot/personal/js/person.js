$(function(){
	var job_no = getUrl("job_no");
	getStaffinfo(job_no);
	// getpagehq();
	//getStaff(job_no);
});

var page = 1;

function color(job_no){
	var col = new Array('#f6b55e','#b38979','#f2725e','#4da9ea','#15c395','#f6b55e','#b38979','#f2725e','#4da9ea','#15c395');
	if(!isNaN(job_no)){
		return col[job_no];
	}else{
		return "#f6b55e";
	}
	
}

function getUrl(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
var r = window.location.search.substr(1).match(reg);  //匹配目标参数
if (r!=null) return unescape(r[2]); return null; //返回参数值
} 


//获取个人信息
function getStaffinfo(job_no){
	$.ajax({
	       type: "GET",
	       url: "/getStaff.do",
	       data: "job_no="+job_no,
	       success: function(result){
	 
				if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else if(result=="refused"){
					
				}else{
					var arr=JSON.parse(result);
					if(arr.code=="2"){
						alert("参数异常");
					}else{
						var obj=arr.msg;
						var html="";
						//头像
						var job =obj.job_no.substring(obj.job_no.length-1,obj.job_no.length);
						var na = obj.name.substring(obj.name.length-2,obj.name.length);
//						var sex = obj.idcard.substring(obj.idcard.length-2,obj.idcard.length-1);
					
						$(".picimg div").css("background-color",color(job));
						$(".picimg div").text(na);
						$(".tit-nk > div > span > span:eq(0)").text("姓名："+obj.name);
//						$(".tit-nk > div > span > span:eq(1)").text((sex='1')?"性别：男":"性别：女");
						$(".tit-nk > div > span > span:eq(1)").text("工号："+obj.job_no);
						$(".tit-nk > div > span > span:eq(2)").text("职位："+obj.position);
//						$(".tit-nk > div > span > span:eq(6)").text("手机号："+obj.telephone);
//						$(".tit-nk > div > span > span:eq(7)").text("微信号："+obj.vxin);
//						$(".tit-nk > div > span > span:eq(8)").text("现住地址:："+obj.address);
						$("#depart").val(obj.department);
						$("#dist").val(obj.district);
						$("#positi").val(obj.position);
						  
						getDistrict(obj.department);
						getuGroup(obj.department,obj.district);
						
						
						if(obj.district=="hq" && obj.department=="KHFWZX"){
							$("title span").text("待量房源");
							$(".hq").show();
							getpagehq();
							getpagehq2();
						}else if(obj.district=="kf" && obj.department=="KHFWZX"){
							getpagerear();
							$("title span").text("待维修订单");
							$(".kf").show();
						}else if(obj.position=="区域经理" && obj.department=="YGJZL"){
							getStaffByDD(obj.district,obj.department);
							getallquyu(obj.job_no);
							$("title span").text("个人房源");
							$(".quyu").show();
						}else if(obj.position!="区域经理" && obj.department=="YGJZL"){
							getallhouse(obj.job_no);
							$("title span").text("个人房源");
							$(".guanjia").show();
						}else{
							$("title span").text("");
						}
					}
				}
	       }
	  });
}


$(function(){
	
});

//获取部门
function getDistrict(department){
	$.ajax({
	       type: "GET",
	       url: "/getAllDept.do",
	       data: "",
	       success: function(result){
	    	   if(result=="error"){
	    		    window.top.document.location.href='../login.html';
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj="";
					var html="0";
					for ( var i = 0; i < arr.length; i++) {
						obj=arr[i];
						if(department==obj.department){
							$(".tit-nk > div > span > span:eq(3)").text("部门："+obj.name);
							html="0";
							return false;
						}else{
							html="1";
						}
					}
					if(html = "1"){
						$(".tit-nk > div > span > span:eq(3)").text("组别：无");
					}
				}
	       }
	  });
}


//获取分组
function getuGroup(department,district){
	$.ajax({
	       type: "GET",
	       url: "/getGroupByDept.do",
	       async:false,
	       data: "department="+department,
	       success: function(result){
	    	   if(result=='fail'){
	    		   window.top.document.location.href='../login.html';
	    	   }else{
		    	    var arr=JSON.parse(result);
					var obj;
					var group = "0";
					for (var i = 0; i < arr.group.length; i++) {
						obj=arr.group[i];
						if(district==obj.district_id){
							$(".tit-nk > div > span > span:eq(4)").text("组别："+obj.district);
							group="0";
							return false;
						}else{
							group="1";
						}
						
					}
					if(group = "1"){
						$(".tit-nk > div > span > span:eq(4)").text("组别：无");
					}
					
	    	   }
	       }
	  });
}

function getallrent(){
	var job_no = getUrl("job_no");
	var department = $("#depart").val();
	var district = $("#dist").val();
	var position = $("#positi").val();
	if(district=="hq" && department=="KHFWZX"){
		getpagehq1();
	}else if(district=="kf" && department=="KHFWZX"){
		getpagerear2();
	}else if(position=="区域经理" && department=="YGJZL"){
		var job_no1 = $(".quyu .allyg .title span").attr("lang");
		getallquyu1(job_no1);
	}else if(position!="区域经理" && department=="YGJZL"){
		
		getallhouse2(job_no);
	}else{
		$("title span").text("");
	}
}

//初始化分页
var page = 1;
//----------客服----------客服----------客服----------客服----------客服----------客服----------

// 初始化页面
function getpagerear(){
    $.ajax({
        type : 'GET',
        url : '/getAllRepair.do',
        data: "page="+page+"&num=10", //要发送的数据
        // dataType : 'JOSN',
        async : false,
        success : function(data){
            var arr=JSON.parse(data);
            if(arr.code == 1){
                // alert("初始化页面请求成功！");                     
                var html = "";
                for ( var i = 0; i < arr.msg.length; i++) {
					var obj = arr.msg[i];
					html+="<tr>" +
							"<td>"+obj.date+"</td>" +
							"<td>"+obj.renter+"</td>" +
							"<td>"+obj.telephone+"</td>" +
							"<td>"+obj.address+"</td>" +
							"<td>"+obj.yuyue_date+"</td>" +
							"<td>"+obj.descrip+"</td>" +
							"<td><img widht='50' height='50' src='"+obj.picture+"' alt=''></td>" +
							"<td>"+obj.state+"</td>" +
							"<td>"+obj.remark+"</td>" +
						  "</tr>";
				}
                
                if(html==""){
					html="<tr><td colspan='9'>暂无数据</td></tr>";
				}
                
                $(".kf .table tbody").html(html);
                
                //分页代码 
                $('#maxnum').val(arr.total);
                var maxnum = $('#maxnum').val();
                $('#total').html(maxnum);
                maxnum = parseInt(maxnum);
                maxnum = Math.ceil(maxnum/10.0);
                $('.pageTest').page({
                    leng:maxnum,//分页总数
                    activeClass: 'activP' , //active 类样式定义
                });
                $(".kf .table tbody img").click(function(){
                	var url = $(this).attr("src");
                	window.open(url);
                });
            }else if(arr.code == 2){
                alert("页面初始化失败！");
            }
        }
    });
};

// 分页
function getpagerear2(){	
    var page = $('.activP').text();
    $.ajax({
        type : 'GET',
        url : '/getAllRepair.do',
        data: "page="+page+"&num=10", //要发送的数据
        // dataType : 'JOSN',
        async : false,
        success : function(data){
            var arr=JSON.parse(data);
            if(arr.code == 1){
            	var html="";
            	for ( var i = 0; i < arr.msg.length; i++) {
					var obj = arr.msg[i];
					html+="<tr>" +
							"<td>"+obj.date+"</td>" +
							"<td>"+obj.renter+"</td>" +
							"<td>"+obj.telephone+"</td>" +
							"<td>"+obj.address+"</td>" +
							"<td>"+obj.yuyue_date+"</td>" +
							"<td>"+obj.descrip+"</td>" +
							"<td><img widht='50' height='50'  onclick='javascript:window.open("+obj.picture+")' src='"+obj.picture+"' alt=''></td>" +
							"<td>"+obj.state+"</td>" +
							"<td>"+obj.remark+"</td>" +
						  "</tr>";
				}
            	
            	$(".kf .table tbody").html(html);
            	$(".kf .table tbody img").click(function(){
                	var url = $(this).attr("src");
                	window.open(url);
                });
            }else if(arr.code == 2){
                alert("（分页）参数错误！");
            }
        }
    });
};

//----------管家----------管家----------管家----------管家----------管家----------管家----------
function getallhouse(job_no){
	$('.loading').show();
	$(".center_right_detail_list_page").css("display","block");
	$.ajax({
		   type: "GET",
		   url: "/getPersonHouse.do",
		   data: "job_no="+job_no+"&page="+page+"&num=10",
		   success: function(result){
			   
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				//	$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>").show();
				}else{
					var arr=JSON.parse(result);
					console.log(arr)
					var obj="";
					var html="";
					for(var i=0;i<arr.msg.length;i++){
						obj=arr.msg[i];
						html += "<tr lang=\"houseiframe\"  ><td width='6%'>"+obj.house_id+"</td>"+
								"<td width='10%'>"+obj.contract_no+"</td>" +
								"<td width='10%'>"+obj.district+"</td>" +
								"<td width='28%'>"+obj.address+"</td>" +
								"<td width='18%'>"+obj.date+"</td>"+																
								"<td width='15%'>"+obj.state+"</td>" +
								"</tr>";
					}
					if(html==""){
						html="<tr><td colspan='7'>暂无数据</td></tr>";
					}
					$('#maxnum').val(arr.total);
					var maxnum = $('#maxnum').val();
					$('#total').html(maxnum);
						maxnum = parseInt(maxnum);
						maxnum = Math.ceil(maxnum/10);
						$('.pageTest').page({
							leng:maxnum,//分页总数
							activeClass: 'activP' , //active 类样式定义
						})
					$(".guanjia .table tbody").html(html);
					
				}	
		   }
	});
}

function getallhouse2(job_no){
	$('.loading').show();
	var page = $('.guanjia .activP').text();
	$(".center_right_detail_list_page").css("display","block");
	$.ajax({
		   type: "GET",
		   url: "/getPersonHouse.do",
		   data: "job_no="+job_no+"&page="+page+"&num=10",
		   success: function(result){
				$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj="";
					var html="";
					for(var i=0;i<arr.msg.length;i++){
						obj=arr.msg[i];
						html += "<tr lang=\"houseiframe\"  ><td>"+obj.house_id+"</td>"+
									"<td width='8%'>"+obj.contract_no+"</td>" +
									"<td width='8%'>"+obj.district+"</td>" +
									"<td width='28%'>"+obj.address+"</td>" +
									"<td width='18%'>"+obj.date+"</td>"+																
									"<td width='15%'>"+obj.state+"</td>" +							
								"</tr>";
					}
					$(".guanjia .table tbody").html(html);
				}	
		   }
	});
}

//---------勤----------后勤----------后勤----------后勤----------后勤----------后勤----------

//初始页面
function getpagehq(){
	$.ajax({
		   type: "GET",
		   url: "/getAllRear.do",
		   data: "page="+page+"&num="+10+"&district=&address=",
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
						var obj="";
						var html="";
						for(var i=0;i<arr.msg.length;i++){
							obj=arr.msg[i];
							var begin_date = obj.begin_date;
							var finish_date = obj.finish_date;		
							var now1 = new Date(begin_date);
							var now2 = new Date(finish_date);
							var duration = (now2-now1)/(24*60*60*1000);
							html += "<tr lang='"+obj.contract_no+"'><td>"+obj.house_id+"</td>" +
									"<td>"+obj.district+"</td>" +
									"<td>"+obj.business_area+"</td>" +
									"<td>"+obj.estate+"</td>" +
									"<td>"+obj.address+"</td>" +	
									"<td>"+duration+"天</td>" +
									"<td>"+obj.type+"</td>" +							
									"<td>"+obj.job_no+"</td>" +
									"</tr>";
						}		
						if(html==""){
							html="<tr><td colspan='8'>暂无数据</td></tr>";
						}
						$('#maxnum').val(arr.total);
						var maxnum = $('#maxnum').val();				
						$('#total').html(maxnum);
						maxnum = parseInt(maxnum);
						maxnum = Math.ceil(maxnum/10.0);
							$('.pageTest').page({
								leng:maxnum,//分页总数
								activeClass: 'activP' , //active 类样式定义

							});
						
						$(".hq .hq1 tbody").html(html);
					}
				}
		   }
	});
}

function getpagehq1(){
	var page = $('.activP').text();
	$.ajax({
		   type: "GET",
		   url: "/getAllRear.do",
		   data: "page="+page+"&num="+10+"&district=&address=",
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
						var obj="";
						var html="";
						
						for(var i=0;i<arr.msg.length;i++){
							obj=arr.msg[i];
							var begin_date = obj.begin_date;
							var finish_date = obj.finish_date;		
							var now1 = new Date(begin_date);
							var now2 = new Date(finish_date);
							var duration = (now2-now1)/(24*60*60*1000);
							html += "<tr lang='"+obj.contract_no+"'><td>"+obj.house_id+"</td>" +
									"<td>"+obj.district+"</td>" +
									"<td>"+obj.business_area+"</td>" +
									"<td>"+obj.estate+"</td>" +
									"<td>"+obj.address+"</td>" +	
									"<td>"+duration+"天</td>" +
									"<td>"+obj.type+"</td>" +							
									"<td>"+obj.job_no+"</td>" +
									"</tr>";
						}		
						$(".hq .hq1 tbody").html(html);
					}
				}
		   }
	});
}


//退租房源
function getpagehq2(){
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
						var obj="";
						var html="";
						for(var i=0;i<arr.msg.length;i++){
							obj=arr.msg[i];
							var vacancydate = "";
							html += "<tr><td>"+obj.house_id+"</td>"+
							"<td>"+obj.district+"</td>" +
							"<td>"+obj.business_area+"</td>" +
							"<td>"+obj.estate+"</td>" +
							"<td>"+obj.address+"</td>" +
							"<td>"+obj.house_type+"</td>" +
							"<td>"+obj.room_area+"</td>" +
							"<td><a lang='"+obj.house_id+"' lang1='"+obj.district+"'  class='find''>确认退租</a></td>"+
							"</tr>";
						}
						if(html==""){
							html="<tr><td colspan='8'>暂无数据</td></tr>";
						}
						$(".hq .hq2 tbody").html(html);
						
					}
				}
		   }
	});
}

//----------区域----------区域----------区域----------区域----------区域----------区域----------

//获取分组下所有员工
function getStaffByDD(district_id,department){
	$.ajax({
	       type: "GET",
	       url: "/getStaffByDD.do",
	       data: "district_id="+encodeURI(encodeURI(district_id))+"&department="+encodeURI(encodeURI(department)),
	       success: function(result){
	    	   if(result=="error"){
	    		    window.top.document.location.href='../login.html';
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj="";
					var html="";
					for (var i = 0; i < arr.msg.length; i++) {
						obj=arr.msg[i];
						var na = obj.name.substring(obj.name.length-2,obj.name.length);
						var job =obj.job_no.substring(obj.job_no.length-1,obj.job_no.length);
						html += "<li class='' lang='"+obj.job_no+"' style='cursor:pointer;'>"+
								 "<div class='pigim'>"+
								 "	<div style='background-color:"+color(job)+";'>"+na+"</div>"+
								 "</div>"+
								 "<div class='naim'>"+
								 "	<div>"+obj.name+"</div>"+
								 "	<div>"+obj.district+"</div>"+
								 "</div>"+
							   "</li>";
					}
					$(".ygcon ul").html(html);
					
					$(".quyu .allyg .ygcon li").click(function(){
						var job_no = $(this).attr("lang");
						$(".quyu .allyg .title span").attr("lang",job_no);
						getallquyu(job_no);					
					});
				}
	       }
	  });
}



function getallquyu(job_no){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "/getPersonHouse.do",
		   data: "job_no="+job_no+"&page="+page+"&num=10",
		   success: function(result){
			   $(".quyu .table tbody").html("");
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				//	$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>").show();
				}else{
					var arr=JSON.parse(result);
					console.log(arr)
					var obj="";
					var html="";
					for(var i=0;i<arr.msg.length;i++){
						obj=arr.msg[i];
						html += "<tr lang=\"houseiframe\"><td width='6%'>"+obj.house_id+"</td>"+
								"<td width='10%'>"+obj.contract_no+"</td>" +
								"<td width='10%'>"+obj.district+"</td>" +
								"<td width='28%'>"+obj.address+"</td>" +
								"<td width='18%'>"+obj.date+"</td>"+																
								"<td width='15%'>"+obj.state+"</td>" +
								"</tr>";
					}
					if(html==""){
						html="<tr><td colspan='7'>暂无数据</td></tr>";
					}
					$('#maxnum').val(arr.total);
					var maxnum = $('#maxnum').val();
					$('#total').html(maxnum);
						maxnum = parseInt(maxnum);
						maxnum = Math.ceil(maxnum/10);
						$('.pageTest').page({
							leng:maxnum,//分页总数
							activeClass: 'activP' , //active 类样式定义
						})
					$(".quyu .table tbody").html(html);
					$('.loading').hide();
				}	
		   }
	});
}

function getallquyu1(job_no){
	$('.loading').show();
	var page = $('.quyu .activP').text();
	$(".center_right_detail_list_page").css("display","block");
	$.ajax({
		   type: "GET",
		   url: "/getPersonHouse.do",
		   data: "job_no="+job_no+"&page="+page+"&num=10",
		   success: function(result){
				
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj="";
					var html="";
					for(var i=0;i<arr.msg.length;i++){
						obj=arr.msg[i];
						html += "<tr lang=\"houseiframe\"  ><td width='6%'>"+obj.house_id+"</td>"+
									"<td width='8%'>"+obj.contract_no+"</td>" +
									"<td width='8%'>"+obj.district+"</td>" +
									"<td width='28%'>"+obj.address+"</td>" +
									"<td width='18%'>"+obj.date+"</td>"+																
									"<td width='15%'>"+obj.state+"</td>" +						
								"</tr>";
					}
					
					$(".quyu .table tbody").html(html);
					$('.loading').hide();
				}	
		   }
	});
}
