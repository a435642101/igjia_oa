
//分页获取租客信息
$(function(){	
	var d = new Date();
	var dd= formatDate(d,"yyyy-MM-dd");
	$('#J-x1').val(dd);
	var d2 = new Date(d);
	d2.setDate(d.getDate()+7);	
	d2= formatDate(d2,"yyyy-MM-dd");
	$('#J-x2').val(d2);
	getrecentorder(dd,d2,"全部","");
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
$(function(){
	$('.btn-primary').click(function(){
		$('#quanxuan').html("全选");
		var date1 = $('#J-x1').val();
		var date2 = $('#J-x2').val();
		var state = $('.state').val();
		var name = $('.name').val();
		getrecentorder(date1,date2,state,name);
	});
	
	$('#quanxuan').click(function(){
		if($('#quanxuan').html()=='全选'){
			$('table input').attr('checked','true');
			$('#quanxuan').html("取消");
		}else{
			$('table input').removeAttr("checked");
			$('#quanxuan').html("全选");
		}		
	});
	
	$('#shixiao').click(function(){
		 if(confirm("确认失效")){
			 plshixiao();
		 }
	});
	
	
});

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

function plchangestate(orderid){		
	$.ajax({
		   type: "GET",
		   url: "updatehouseOrder.do",
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

function getrecentorder(date1,date2,state,name){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "getHouseOrder.do",
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
					var daijiesuan = 0;
					var yijiesuan = 0;
					for(var i=0;i<arr.length;i++){
						obj=arr[i];	
						if(obj.state=="待结算"){
							daijiesuan += Number(obj.money);		
						}else if(obj.state=="已结算"){
							yijiesuan += Number(obj.money);		
						}
										
						html = "<tr id='"+obj.orderid+"'>" +
									"<td>"+obj.orderid+"</td>" +
									"<td>"+obj.contract_no+"</td>" +
									"<td>"+obj.address+"</td>" +
									"<td>"+obj.shoukuanren_name+"</td>" +
									"<td>"+obj.shoukuanren_telephone+"</td>" +
									"<td>"+obj.period+"</td>" +
									"<td>"+obj.money+"</td>" +
									"<td>"+obj.remark+"</td>" +
									"<td>" +
										"<select onchange=\"changestate('"+obj.orderid+"','state"+i+"')\" style='width:70px;' class='state"+i+"'+>"+						              		
						              		"<option value=\"已结算\">已结算</option>"+	
						              		"<option value=\"待结算\">待结算</option>"+						              		
						              		"<option value=\"已失效\">已失效</option>"+
						              	"</select>"+
						            "</td>" +
									"<td>" +
									"<a lang='houseiframe' _href=\"HouseDetail.html?orderid="+obj.orderid+"\"  class='find' style='margin-right:1em;'>编辑</a>"+
									"<input name='checkbox[]' type=\"checkbox\" value=\""+obj.orderid+"\"/><div class=\"result\"></div>" +
									"</td>" +
								"</tr>";	
									$(".m10 tbody").append(html);
									$(".state"+i)[0].value=obj.state;
					}
					$("#daijiesuan").text(daijiesuan);
					$("#yijiesuan").text(yijiesuan);
				}	
		   }
	});
}

function changestate(orderid,statei){
	var state = $('.'+statei).val();
	if(confirm("是否确认更改为"+state)){					
		$.ajax({
			   type: "GET",
			   url: "updatehouseOrder.do",
			   data: "orderid="+orderid+"&state="+encodeURI(encodeURI(state)),
			   success: function(result){
				$('.loading').hide();
					if(result=="error"){
						alert('修改失败');
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
