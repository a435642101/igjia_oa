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
	})	
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
	                var title={"district":"所属区域","address":"地址","job_no":"管家","renter_name":"租客","renter_telephone":"租客电话","contract_startdate":"首次保洁日期"};
	                result.unshift(title);
	                option.data=result;
	                option.fileName=date1+"保洁列表";
	                option.filter=['district','address','job_no','renter_name','renter_telephone','contract_startdate'];
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
						html = "<tr><td>"+obj.district+"</td>" +
								"<td class='address'>"+obj.address+"</td>" +
								"<td>"+obj.job_no+"</td>" +
								"<td>"+obj.renter_name+"</td>" +
								"<td>"+obj.renter_telephone+"</td>" +	
								"<td class='startdate'><input style='width:80px;' value='"+obj.contract_startdate+"' id='"+obj.house_id+"'/></td>" +
								"<td>"+date+"</td>" +
								"<td width=\"50\"><button onclick='updatedate(this)' style='cursor:pointer;'>保存</button></td>"+
								"</tr>";
						$(".table_detail tbody").append(html);
						laydate({
							elem: '#'+obj.house_id,							
						});
					}		
					$("#total").text(arr.length);
				}
		   }
	});
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