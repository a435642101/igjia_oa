
//分页获取租客信息
$(function(){	
	var d = new Date();
	var dd= formatDate(d,"yyyy-MM-dd");
	$('#J-x1').val(dd);
	var d2 = new Date(d);
	d2.setDate(d.getDate()+7);	
	d2= formatDate(d2,"yyyy-MM-dd");
	$('#J-x2').val(d2);
	gettodayrent(dd,d2,"全部","");
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
$(function(){
	$('.btn-primary').click(function(){
		$('#quanxuan').html("全选");
		var date1 = $('#J-x1').val();
		var date2 = $('#J-x2').val();
		var state = $('.state').val();
		var name = $('.name').val();
		gettodayrent(date1,date2,state,name);
	})
	$('#quanxuan').click(function(){
		if($('#quanxuan').html()=='全选'){
			$('table input').attr('checked','true');
			$('#quanxuan').html("取消")
		}else{
			$('table input').removeAttr("checked")
			$('#quanxuan').html("全选")
		}
		
	})
	$('#send').click(function(){
		 if(confirm("确认发送")){
			 fun();
		 }
	})
	$('#shixiao').click(function(){
		 if(confirm("确认失效")){
			 plshixiao();
		 }
	})
	$('.point').hover(function(){
		var html ="<div class='data'><span style=\"color:#000;\">发送短信内容：</span>您好，尊敬的壹管家用户，您的租金于xxx后到期，本期租金为：xxx元，请及时交款。/r/n1.银行账户：310066852018800007612，开户名：上海壹火网络科技有限公司，开户行：交通银行三门路支行/r/n2.企业支付宝ygy_sh@qq.com，名称：上海壹火网络科技有限公司。/r/n3.微信支付，关注微信公众号“壹管家社区”进行交租。您还可以关注我们微信公众号“壹管家社区”打好房款后直接截图发布在公众号，里面还有精彩活动哦！</div>"
		$('.point').after(html);
	},function(){
		$('.data').hide();
	})
})

function fun(){
    obj = document.getElementsByName("checkbox[]");
    for(k in obj){
        if(obj[k].checked){
        	var id =  obj[k].value;
        	var telephone = $('#'+id+" td:nth-child(4)").html();
        	var money = $('#'+id+" td:nth-child(6)").html();
        	var name = $('#'+id+" td:nth-child(3)").html();
        	var date = $('#'+id+" td:nth-child(5)").html();
        	sendmsg(telephone,money,name,id,date)
        }        	
    }
}

function plshixiao(){
    obj = document.getElementsByName("checkbox[]");
    if($("input[name='checkbox[]']:checked").length>36){
    	alert("批量失效一次最多36条");
    }else{
    	for(k in obj){
            if(obj[k].checked){
            	var id =  obj[k].value;
            	plchangestate(id);
            }        	
        }
    }   
}

function gettodayrent(date1,date2,state,name){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "getRentOrder.do",
		   data: "date1="+date1+"&date2="+date2+"&state="+encodeURI(encodeURI(state))+"&name="+encodeURI(encodeURI(name)),
		   success: function(result){
			$('.loading').hide();
				if(result=="error"){
					$("#loadmore").html("加载失败.");
				}else if(result=="fail"){
					$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>");
				}else if(result=="refused"){
					$("#loadmore").html("权限不够,无法获取");
				}else{
					$("#loadmore").html("加载成功");
					var arr=JSON.parse(result);		
					$('#total').html(arr.length);
					var obj;
					var html;
					$(".m10 tbody").html("");
					var yishoukuan = 0;
					var daifukuan = 0;
					var yifukuan = 0;
					for(var i=0;i<arr.length;i++){
						obj=arr[i];
						if(obj.state=="待付款"){
							daifukuan += Number(obj.money);	
						}else if(obj.state=="已收款"){
							yishoukuan += Number(obj.money);	
						}else if(obj.state=="已付款"){
							yifukuan += Number(obj.money);	
						}
							
						html = "<tr id='"+obj.orderid+"'>" +
									"<td>"+obj.orderid+"</td>" +
									"<td>"+obj.address+"</td>" +
									"<td>"+obj.name+"</td>" +
									"<td>"+obj.telephone+"</td>" +
									"<td>"+obj.period+"</td>" +
									"<td>"+obj.money+"</td>" +
									"<td>"+obj.remark+"</td>" +
									"<td>"+obj.mode+"</td>" +
									"<td>" +
										"<select onchange=\"changestate('"+obj.orderid+"','state"+i+"')\" style='width:70px;' class='state"+i+"'+>"+						              		
						              		"<option value=\"已收款\">已收款</option>"+	
						              		"<option value=\"待付款\">待付款</option>"+
						              		"<option value=\"已付款\">已付款</option>"+
						              		"<option value=\"已失效\">已失效</option>"+
						              	"</select>"+
						            "</td>" +
									"<td>" +
									"<a lang='rentiframe' _href=\"RentDetail.html?orderid="+obj.orderid+"\" class='find' style='margin-right:1em;'>编辑</a>"+
										"<input name='checkbox[]' type=\"checkbox\" value=\""+obj.orderid+"\"/><div class=\"result\"></div>" +
									"</td>" +
								"</tr>";	
									$(".m10 tbody").append(html);
									$(".state"+i)[0].value=obj.state;
					}		
					$("#daifukuan").text(daifukuan);
					$("#yishoukuan").text(yishoukuan);
					$("#yifukuan").text(yifukuan);
				}	
		   }
	});
}

function sendmsg(telephone,money,name,id,date){
	var text = $("#"+id+" td div").html();
	if(text=="发送成功") return;
	$("#"+id+" td div").html("发送中...");
	$.ajax({
		   type: "GET",
		   url: "sendmsg.do",
		   data: "telephone="+telephone+"&money="+money+"&name="+encodeURI(encodeURI(name))+"&date="+date,
		   success: function(result){
				if(result=="success"){
					$("#"+id+" td div").html("发送成功");
					$("#"+id+" td div").css("cursor","default").css("color","green");
				}else{
					$("#"+id+" td div").html(result);
				}
		   }
	});
}

function changestate(orderid,statei){
	var state = $('.'+statei).val();
	if(confirm("是否确认更改为"+state)){					
		$.ajax({
			   type: "GET",
			   url: "updaterentOrder.do",
			   data: "orderid="+orderid+"&state="+encodeURI(encodeURI(state)),
			   success: function(result){
				$('.loading').hide();
					if(result=="error"){
						alert('修改失败')
					}else if(result=="fail"){
						alert('未登录');
					}else if(result=="refused"){
						alert('权限不够');
					}else{
						$("."+statei)[0].value=state;
						
					}
			   }
		});
	}		
}

function plchangestate(orderid){		
		$.ajax({
			   type: "GET",
			   url: "updaterentOrder.do",
			   data: "orderid="+orderid+"&state="+encodeURI(encodeURI("已失效")),
			   success: function(result){
				$('.loading').hide();
					if(result=="error"){
						$("#"+orderid+" td div").html('修改失败');
					}else if(result=="fail"){
						$("#"+orderid+" td div").html('未登录');
					}else if(result=="refused"){
						$("#"+orderid+" td div").html('权限不够');
					}else{
						$("#"+orderid+" select")[0].value="已失效";
						
					}
			   }
		});		
}
