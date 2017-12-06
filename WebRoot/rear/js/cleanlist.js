// JavaScript Documentvar page = 1;
$(function(){
	var d = new Date();
	var d2 = new Date(d);
	d2.setDate(d.getDate()+1);	
	d2= formatDate(d2,"yyyy/MM/dd");
	$('#J-x1').val(d2)
	getcleanlist(d2);
	
	$('.btn-primary').click(function(){
		var date = $('#J-x1').val();
		getcleanlist(date);
	})
	
	$('.daochu').click(function(){
		var date = $('#J-x1').val();
		exportExcel(date);
	});
	$("input[name=all]").click(function(){
		var a = true;
		if($(this).prop("checked")==true){
			$("input[name=a]").attr("checked",true);
		}else{
			$("input[name=a]").attr("checked",false);
		}

	});

	$("button.allFinishClean").click(function(){
		if(confirm("短期内")){
			var ids = new Array();
			$("input[name=a]").each(function(){
				if($(this).prop("checked") == true){
					ids.push($(this).attr("lang"));
				}
			});
			$.ajax({
				type:"POST",
				url: "/addCleanDate.do",
				data:JSON.stringify({"ids":ids}),
				contentType: "application/json;charset=utf-8",
				success:function(result){
					if(result=="fail"){
						window.top.document.location.href='../login.html';
					}else if(result=="refused"){
						alert("权限不足");
					}else{
						var obj=JSON.parse(result);
						if(obj.msg == "success"){
							for(var i = 0;i<obj.ids.length;i++){
								$(".checked"+obj.ids[i]).html("<input type='checkbox' name = 'b' lang='"+obj.id+"' disabled='disabled' />");
								$(".finishdate"+obj.ids[i]).html("<button onclick='finishClean("+obj.id+")' disabled='disabled' style='background-color:#aaa;'>保洁完成</button>");
								$(".cleandate"+obj.ids[i]).html(obj.clean_date);
							}
							alert("修改成功");
						}else{
							alert('修改失败');
						}
					}
				}
			})
		}
	})
	//隐藏div
	$('body').click(function(e) {
		var target = $(e.target);
		if(!target.is('.getCDTK') && !target.is('.record')) {
			$(".getCDTK").hide();
		}
	});
});




function  exportExcel(date1){
	$('.loading').show();
	    $.ajax({  
	        type : "get",    
	        url: "/getCleanlist.do?date="+date1,
	        data : "",
	        success :function(result) {
	        $('.loading').hide();
	        	if(result=='fail'){
	        		window.top.document.location.href='../login.html';
	        	}else if(result=='[]'){
	        		alert('没有数据');
	        	}else{
	        		var result=JSON.parse(result);             
	                var option={}; 
	                var title={"district":"所属区域","business_area":"商圈","address":"地址","job_no":"管家","renter_name":"租客","renter_telephone":"租客电话","contract_startdate":"首次保洁日期"};
	                result.unshift(title);
	                option.data=result;
	                option.fileName=date1+"保洁列表";
	                option.filter=['district','business_area','address','job_no','renter_name','renter_telephone','contract_startdate'];
	                var toExcel=new ExportJsonExcel(option);
	                toExcel.saveExcel();
	        	}
	            
	        },
	        error: function(error){
	             alert(error);
	        }
	    });  
	}

//初始页面
function getcleanlist(date){
	$('.loading').show();
	$.ajax({
		   type: "GET",
		   url: "/getCleanlist.do?date="+date,
		   data: "",
		   success: function(result){
			   $(".loading").hide();
				if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					$(".table_detail tbody").html("");
					var arr=JSON.parse(result);
					var obj;
					var html;
					for(var i=0;i<arr.length;i++){
						obj=arr[i];
						var now = new Date();
						var now1 = new Date(obj.clean_date);
						var clean_date = "<button onclick='finishClean("+obj.id+")'>保洁完成</button>";
						var checked = "<input type='checkbox' name = 'a' lang='"+obj.id+"' />";
						if(parseInt(now-now1)/(60*60*1000*24)<=1){
							clean_date = "<button onclick='finishClean("+obj.id+")' disabled='disabled' style='background-color:#aaa;'>保洁完成</button>";
							checked = "<input type='checkbox' name = 'b' lang='"+obj.id+"' disabled='disabled' />";
						}
						var remark1 = "<input style='width:80px;display: none;' onblur='updateRemark(this)' value='"+obj.remark+"' lang='"+obj.cleandate_id+"'/>";
						if(obj.cleandate_id!=0){
							remark1 = "<input style='width:80px;display: block;' onblur='updateRemark(this)' value='"+obj.remark+"' lang='"+obj.cleandate_id+"'/>";
						}
						html = "<tr>" +
								"<td class='checked"+obj.id+"'>"+checked+"</td>" +
								"<td>"+obj.district+"</td>" +
								"<td>"+obj.business_area+"</td>" +
								"<td class='address'>"+obj.address+"</td>" +
								"<td>"+obj.job_no+"</td>" +
								"<td>"+obj.renter_name+"</td>" +
								"<td>"+obj.renter_telephone+"</td>" +	
								"<td class='startdate'><input style='width:80px;' value='"+obj.contract_startdate+"' id='"+obj.house_id+"'/></td>" +
								"<td>"+date+"</td>" +
								"<td class='finishdate"+obj.id+"'>"+clean_date+"</td>" +
								"<td class='cleandate"+obj.id+"'>"+obj.clean_date+"</td>" +
								"<td class='remark remark"+obj.id+"'>"+remark1+"</td>" +
								"<td width=\"50\"><button onclick='updatedate(this)' style='cursor:pointer;'>保存</button><br/><a class='record' onclick='getCleanDate("+obj.id+")'>保洁记录</a></td>"+
								"</tr>";
						$(".table_detail tbody").append(html);
						laydate({
							elem: '#'+obj.house_id,							
						});
					}
					$("input[name=a]").click(function(){
						var a = true;
						$("input[name=a]").each(function(){
							if($(this).prop("checked") == false){
								a = false;
							}
						});
						if(a == false){
							$("input[name=all]").attr("checked",false);
						}else{
							$("input[name=all]").attr("checked",true);
						}

					});
					$("#total").text(arr.length);
				}
		   }
	});
}

function getCleanDate(id){
	$(".getCDTK").show();
	$.ajax({
		type: "GET",
		url: "/getCleanDate.do?clean_id="+id,
		data: "",
		success: function(result){
			if(result=="fail"){
				window.top.document.location.href='../login.html';
			}else{
				$(".table_detail1 tbody").html("");
				var arr=JSON.parse(result);
				var obj;
				var html;
				for(var i=0;i<arr.length;i++){
					obj=arr[i];
					html = "<tr>" +
						"<td>"+obj.clean_date+"</td>" +
						"<td>"+obj.status+"</td>" +
						"<td>"+obj.create_name+"</td>" +
						"<td>"+obj.remark+"</td>" +
						"</tr>";
					$(".table_detail1 tbody").append(html);
				}
			}
		}
	});
}

function finishClean(id){
	$.ajax({
		type:"POST",
		url: "/addCleanDate.do",
		data:JSON.stringify({"ids":[id]}),
		contentType: "application/json;charset=utf-8",
		success:function(result){
			if(result=="fail"){
				window.top.document.location.href='../login.html';
			}else if(result=="refused"){
				alert("权限不足");
			}else{
				var obj=JSON.parse(result);
				if(obj.msg == "success"){
					for(var i = 0;i<obj.ids.length;i++){
						$(".checked"+obj.ids[i]).html("<input type='checkbox' name = 'b' lang='"+obj.id+"' disabled='disabled' />");
						$(".finishdate"+obj.ids[i]).html("<button onclick='finishClean("+obj.id+")' disabled='disabled' style='background-color:#aaa;'>保洁完成</button>");
						$(".cleandate"+obj.ids[i]).html(obj.clean_date);
					}
					alert("修改成功");
				}else{
					alert('修改失败');
				}
			}
		}
	})
}

function updatedate(param){
	var date = $(param).parent().siblings(".startdate").children("input").val();
	var address = $(param).parent().siblings(".address").html();
	$.ajax({
		type:"get",
		 url: "/updatecleandate.do?date="+date+"&address="+encodeURI(encodeURI(address)),		  
		 success: function(result){
			if(result=="fail"){
				window.top.document.location.href='../login.html';
			}else{
				var obj=JSON.parse(result);
				if(obj.code){
					alert('修改成功');
				}else{
					alert('修改失败');
				}
			}
		 }
	})
}

function updateRemark(param){
	var remark = $(param).val();
	var cleandate_id = $(param).attr("lang");
	$(param).attr("disabled","disabled");
	$.ajax({
		type:"get",
		url: "/updateRemark.do?cleandate_id="+cleandate_id+"&remark="+encodeURI(encodeURI(remark)),
		success: function(result){
			if(result=="fail"){
				window.top.document.location.href='../login.html';
			}else if(result=="refused"){
				alert("权限不足");
			}else{
				if(result=="success"){
					alert("修改成功");
					$(param).removeAttr("disabled");
				}else{
					alert("修改失败");
					$(param).removeAttr("disabled");
				}
			}
		}
	})
	return false;
}

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