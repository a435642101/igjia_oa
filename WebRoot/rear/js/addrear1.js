//JavaScript Document
$(function(){
	adminContact();
	getStaffByDD();
	
	$(".tableleft table").on("keydown","tr td",function(e){
		var tdind=$(this).index();
		var tdlen = $(this).parents("tr").children("td").length-1;
		var trind= $(this).parents("tr").index();
		var trlen = $(this).parents("tr").parents("tbody").children("tr").length-1;
		var trtable = $(this).parents(".table").index()-1;
		
		if(tdind == tdlen){
			if(e.keyCode == 9){
				var indtr =trind+trtable;
				$(this).parents("table").siblings("table").children("tbody").children("tr:eq("+indtr+")").children("td:eq(1)").children("input").focus();
			}
			if(tdind == tdlen && trind==trlen && trtable==1){
				return true;
			}else{
				return false;
			}
			
		}
	});
	
	
//	$('.tableleft table:eq(1)').on("click","tr td input",function(){
//		alert(1);
//	});
	
	$(".yingfu").attr("readonly","readonly");
	
	//表格js
	$(".fitment").on("click","table tr td.jian",function(){	
		var index = $(this).parents("tr").index();
		$(this).parents(".tableleft").find("table:last tr:eq("+index+")").remove();
		$(this).parents(".tableleft").find("table:first tr:eq("+index+")").remove();
		//$(this).parents("tr").remove();
	});
	$(".fitment").on("click",".houtit1 table tr td.jia",function(){
		$(this).attr("class","jian");
		$(this).children("img").attr("src","images/jian.png");
		var html = "<tr>"+
						"<td class='jia'><img src='images/jia.png' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' class='danjia' value='0' /></td>"+
						"<td><input type='text' class='shuliang' value='1' /></td>"+
						"<td><input type='text' class='yingfu' value='0' /></td>"+
						"<td><input type='text' /></td>"+
					"</tr>";
		var html1 = "<tr>"+
						"<td></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' class='danjia' value='0' /></td>"+
						"<td><input type='text' class='shuliang' value='1' /></td>"+
						"<td><input type='text' class='yingfu' value='0' /></td>"+
						"<td><input type='text' /></td>"+
					"</tr>";
		$(this).parents("tr").parents("table").append(html);
		$(this).parents("tr").parents("table").siblings("table").append(html1);
	});
	
	$(".fitment").on("click",".houtit2 table tr td.jia",function(){
		$(this).attr("class","jian");
		$(this).children("img").attr("src","images/jian.png");
		var html = "<tr>"+
						"<td class='jia'><img src='images/jia.png' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' class='danjia' value='0' /></td>"+
						"<td><input type='text' class='shuliang' value='1' /></td>"+
						"<td><input type='text' class='yingfu' value='0' /></td>"+
						"<td><input type='text' /></td>"+
					"</tr>";
		var html1 = "<tr>"+
						"<td></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' class='danjia' value='0' /></td>"+
						"<td><input type='text' class='shuliang' value='1' /></td>"+
						"<td><input type='text' class='yingfu' value='0' /></td>"+
						"<td><input type='text' /></td>"+
					"</tr>";
		$(this).parents("tr").parents("table").append(html);
		$(this).parents("tr").parents("table").siblings("table").append(html1);
		
		
		
	});
	
	$(".fitment").on("mouseover","table tr",function(){
		var index = $(this).index();
		$(this).siblings("tr:eq("+(index-1)+")").addClass("act");	
	});
	$(".fitment").on("mouseout","table tr",function(){
		var index = $(this).index();
		$(this).siblings("tr:eq("+(index-1)+")").removeClass("act");
	});
	
});
//计算
function accMul(arg1,arg2){    
	var m=0,s1=arg1.toString(),  
	s2=arg2.toString();    
	try{  
	m+=s1.split(".")[1].length}catch(e){}    
	try{  
	m+=s2.split(".")[1].length}catch(e){}    
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m  
	)} 

$(function() {
	getDistrict();
	$("button")
			.click(
					function() {
						var district = encodeURI(encodeURI($('#district').val()));
						var address = encodeURI(encodeURI($('.address').val().substring(0,$('.address').val().indexOf("-"))));
						var contract_no = $("#contract_no").val();
						var house_id = $("#house_id").val();
						var estate = encodeURI(encodeURI($('#estate').val()));
						var business_area = encodeURI(encodeURI($('#business_area').val()));						
						var type = encodeURI(encodeURI($('#type').val()));
						
						var measure_date = $(".measure_date").val();
						var begin_date = $(".begin_date").val();
						var job_no = $("#job_no").val();
						
						var house_id = "";
						$(".a label input[type=text]").each(function(){
							if(house_id==""){
								house_id = $(this).val();
							}else{
								house_id += ","+$(this).val();
							}
						});
						var is = true;
						$(".houseinfo input").each(function(){
							var inp = $(this).val();
							if($(this).attr("calss")=="sscx"){
								if(inp!="" && inp!=null){
								}else{
									$(this).css("border-color","red");
									is = false;
								}
							}
							
						});
						$(".fitmentinfo input").each(function(){
							var inp = $(this).val();
							if(inp!="" && inp!=null){
							}else{
								$(this).css("border-color","red");
								is = false;
							}					
						});
						
						if($("#djxz").text()!="" && $("#djxz").text()!="点击选择" && $("#djxz").text()!="加载中..."){
						}else{
							$("#djxz").css("border","1px solid red");
							is = false;
						}
						if(is==true){
							add(contract_no, house_id, district, business_area,
									estate, address, type, measure_date,
									begin_date, job_no);
						}else{
							alert("边框标红处不能为空");
						}
					});
});
	
function add(contract_no, house_id, district, business_area, estate, address,
		type, measure_date, begin_date,  job_no) {
	$.ajax({
		type : "POST",
		url : "/addNewRear.do",
		data : "contract_no=" + contract_no + "&house_id=" + house_id
				+ "&district=" + district + "&business_area=" + business_area
				+ "&estate=" + estate + "&address=" + address + "&type=" + type
				+ "&measure_date=" + measure_date + "&begin_date=" + begin_date
				+ "&job_no=" + job_no,
		success : function(result) {

			if (result == "fail") {
				window.top.document.location.href = '../login.html';
			} else {
				var arr = JSON.parse(result);
				if (arr.code == "4") {
					alert("物品添加异常");
				} else if (arr.code == "2" || arr.code == "3") {
					alert("添加失败");
				} else if (arr.code == "5") {
					alert("该房源已经配置过");
				} else {
					alert("添加成功");
				}
			}
		}
	})
}

$(function() {
	$(".district").bind("change", function() {
		var district = $(".district").val();
		request(district);
	});

	$(".xzyx").click(function() {
		$(".sswk").css("display", "block");
	});
	$(".sscx").bind('input propertychange', function() {
		var sscx = $(this).val();
		var ssul = $(".ssul li").length;
		$(".ssul li").css("display", "none");
		$(".muy").css("display", "none");
		$(".ssul").css("display", "block");
		$(".ssul li").each(function() {
			var sss = $(this).text();
			if (sss.indexOf(sscx) >= 0) {
				$(this).css("display", "block");
			}
		});
	});

	$(document).bind("click", function(e) {
		var target = $(e.target);
		if (target.closest(".colj31").length == 0) {
			$(".sswk").hide();
		}
	});
//	$(".fitment .yingfu").attr("readonly","readonly");
});
//区域
function getDistrict() {
	$.ajax({
		type : "GET",
		url : "/getAllDistrict.do",
		data : "",
		success : function(result) {
			var arr = JSON.parse(result);
			var obj;
			var html = "";
			for ( var i = 0; i < arr.length; i++) {
				obj = arr[i];
				html += "<option value='" + obj.district + "'>" + obj.district
						+ "</option>";
			}
			$('.district').append(html);
			request($('.district').val());
		}

	});
}
//房源
function request(district) {
	$('#djxz').html('加载中...');
	$.ajax({
				type : "GET",
				url : "../igjia/house2.do",
				data : "district="
						+ encodeURI(encodeURI(district))
						+ "&state="
						+ encodeURI(encodeURI("配置中"))
						+ "&contract_start1=&contract_start2=&contract_end1=&contract_end2=",
				success : function(result) {
					if (result == 'fail') {
						$('#djxz').html('未登录');
					} else {
						$('#djxz').html('点击选择');
						var arr = JSON.parse(result);
						$(".ssul").html("");
						for ( var i = 0; i < arr.length; i++) {
							obj = arr[i];
							$(".ssul").append(
									"<li lang='" + obj.district + "' lang2='"
											+ obj.contract_no + "' lang1='"
											+ obj.job_no + "'>" + obj.address
											+ "</li>");
						}
						
						$(".ssul li").click(function() {
							var sscx = $(this).text();
							var district = $(this).attr("lang");
							var contract_no = $(this).attr("lang2");
							getHouseByContractNo(district, contract_no);
							$(".contract_no").val(contract_no);
							$(".xzyx").text(sscx);
							$(".xzyx").attr("title", sscx);
							$(".address").val(sscx);
							var a = $(this).attr("lang1");
							$('.job_no>option').each(function() {
								if ($(this).html() == a) {
									$(".job_no")[0].value = $(this).val();
								}
							})
							$(".sswk").css("display", "none");

						});
					}

				}
			});
}

//获取所有管家
function adminContact(){
	  $.ajax({
	       type: "GET",
	       url: "../igjia/adminContact.do",
	       data: "",
	       success: function(result){
	    	   var arr=JSON.parse(result);          
	    	   var obj;
	    	   var html="";
	    	   var html1="";
	    	   for(var i=0;i<arr.length;i++){
	    		   obj=arr[i];
	    		   html += "<option value='"+obj.job_no+"'>"+obj.name+"</option>";
	    	   }  
	    	   $("#job_no").append(html);
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

function getHouseByContractNo(district, contract_no) {
	$.ajax({
				type : "GET",
				url : "/getHouseByContractNo.do",
				data : "district=" + encodeURI(encodeURI(district))
						+ "&contract_no=" + encodeURI(encodeURI(contract_no)),
				success : function(result) {
					
					if (result == 'fail') {
						$('#djxz').html('未登录');
					} else {
						var arr = JSON.parse(result);
						if (arr.code == "2") {
							alert("参数错误");
						} else {
							var html = "";
							$("#business_area").val(arr.msg[0].business_area);
							$("#estate").val(arr.msg[0].estate);
							$("#type").val(arr.msg[0].house_type);
							$("#job_no").val(arr.msg[0].job_no);
							
							
							
							for ( var i = 0; i < arr.msg.length; i++) {
								obj = arr.msg[i];
								html += "<input type='text' name='house_id" + i
										+ 1 + "' class='house_id" + i + 1
										+ "' id='house_id" + i + 1
										+ "' value='" + obj.house_id + "' />";								
							}
						}
						$(".a label").html("");
						$(".a label").html(html);
					}
				}
			});
}