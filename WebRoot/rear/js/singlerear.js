$(function(){
	adminContact();
	getStaffByDD();
	//区域
	getDistrict();
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
						"<td><input type='text' class='danjia' /></td>"+
						"<td><input type='text' class='shuliang' /></td>"+
						"<td><input type='text' class='yingfu' /></td>"+
						"<td><input type='text' /></td>"+
					"</tr>";
		var html1 = "<tr>"+
						"<td></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' class='danjia' /></td>"+
						"<td><input type='text' class='shuliang' /></td>"+
						"<td><input type='text' class='yingfu' /></td>"+
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
						"<td><input type='text' class='danjia' /></td>"+
						"<td><input type='text' class='shuliang' /></td>"+
						"<td><input type='text' class='yingfu' /></td>"+
						"<td><input type='text' /></td>"+
					"</tr>";
		var html1 = "<tr>"+
						"<td></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' class='danjia' /></td>"+
						"<td><input type='text' class='shuliang' /></td>"+
						"<td><input type='text' class='yingfu' /></td>"+
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
	
	getOneRear();
	
});

//截取参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
//获取所有管家
function adminContact(){
	  $.ajax({
	       type: "GET",
	       url: "../igjia/adminContact.do",
	       async:false,
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
//详情
function getOneRear(){
	var contract_no = GetQueryString("contract_no");
	$.ajax({
		   type: "GET",
		   url: "/getOneRear.do",
		   async:false,
		   data: "contract_no="+contract_no,
		   success: function(result){
			   if(result!="fail"){
				   var arr=JSON.parse(result);
				   //alert(JSON.stringify(arr.goods));
				   var kitable = 0;
				   var kitr = 0;
				   var kitable1 = 0;
				   var kitr1 = 0;
				   
				   var halltable = 0;
				   var halltr = 0;
				   var halltable1 = 0;
				   var halltr1 = 0;
				   
				   var shtable = 0;
				   var shtr = 0;
				   var shtable1 = 0;
				   var shtr1 = 0;
				   //alert(CC2PY("装修明细"));
				   $("#djxz").text(arr.rear.address);
				   $("#contract_no").val(arr.rear.contract_no);
				   $("#district")[0].value=arr.rear.district;
				   $("#business_area").val(arr.rear.business_area);
				   $("#estate").val(arr.rear.estate);
				   $("#djxz").text(arr.rear.address);
				   $("#djxz").attr("title",arr.rear.address);
				   $(".address").val(arr.rear.address);
				   $("#type").val(arr.rear.type);
				   $("#job_no")[0].value=arr.rear.job_no;
				   
				   $("#rear")[0].value=arr.rear.rear;
				   $("#decorate_team").val(arr.rear.decorate_team);
				   $("#decorate_telephone").val(arr.rear.decorate_telephone);
				   $(".measure_date").val(arr.rear.measure_date);
				   $(".begin_date").val(arr.rear.begin_date);
				   $(".finish_date").val(arr.rear.finish_date);
				   $(".date").val(arr.rear.date);
				   $("#furniture_supplier").val(arr.rear.furniture_supplier);
				   $("#furniture_telephone").val(arr.rear.furniture_telephone);
				   $("#appliance_supplier").val(arr.rear.appliance_supplier);
				   $("#appliance_telephone").val(arr.rear.appliance_telephone);
				   $(".furniture_startdate").val(arr.rear.furniture_startdate);
				   $(".furniture_reachdate").val(arr.rear.furniture_reachdate);
				   $(".appliance_startdate").val(arr.rear.appliance_startdate);
				   $(".appliance_reachdate").val(arr.rear.appliance_reachdate);
				   
				   $("#decorate_handle").val(arr.rear.decorate_handle);
				   $("#decorate_outofpocket").val(arr.rear.decorate_outofpocket);
				   $("#decorate_remark").val(arr.rear.decorate_remark);
				   $("#furniture_handle").val(arr.rear.furniture_handle);
				   $("#furniture_outofpocket").val(arr.rear.furniture_outofpocket);
				   $("#furniture_remark").val(arr.rear.furniture_remark);
				   $("#appliance_handle").val(arr.rear.appliance_handle);
				   $("#appliance_outofpocket").val(arr.rear.appliance_outofpocket);
				   $("#appliance_remark").val(arr.rear.appliance_remark);
				   $("#handle").val(arr.rear.handle);
				   $("#out_of_pocket").val(arr.rear.out_of_pocket);
				   var begin_date = arr.rear.begin_date;
				   var finish_date = arr.rear.finish_date;		
				   var now1 = new Date(begin_date);
				   var now2 = new Date(finish_date);
				   var duration = (now2-now1)/(24*60*60*1000);
				   $(".duration").val(duration+"天");
				   var houseid = arr.rear.house_id.split(",");
				   var house_id="";
				   var httm="";
				   for ( var i = 0; i < houseid.length; i++) {
					  house_id += "<input type='text' name='house_id" + i
						+ 1 + "' class='house_id" + i + 1
						+ "' id='house_id" + i + 1
						+ "' value='" + houseid[i] + "' />";
					  
					  httm += "<div class='houtit houtit2 bedroom bedroom"+String.fromCharCode(i + 65)+" woshi"+String.fromCharCode(i + 65)+"' lang='woshi"+String.fromCharCode(i + 65)+"'><div class='roomimg'><img src='images/woshi.png' /><span>卧室"
						+ String.fromCharCode(i + 65)
						+ "</span></div>"
						+ "	<div class='furniture jiajumingxi tableleft '>"
						+ "	<div>家具明细</div>"
						+ "	<table class='table' width='600' border='0'>"
						+ "			<tr>"
						+ "				<th></th>"
						+ "				<th>项目</th>"
						+ "				<th>型号\规格</th>"
						+ "				<th>单价</th>"
						+ "				<th>数量</th>"
						+ "				<th>应付</th>"
						+ "				<th>备注</th>"
						+ "			</tr>"
						+ "	</table>"
						+ "	<table class='table' width='600' border='0'>"
						+ "			<tr>"
						+ "				<th></th>"
						+ "				<th>项目</th>"
						+ "				<th>型号\规格</th>"
						+ "				<th>单价</th>"
						+ "				<th>数量</th>"
						+ "				<th>应付</th>"
						+ "				<th>备注</th>"
						+ "			</tr>"
						+ "	</table>"
						+ "	<div class='fitotal'>共计：<span>0</span>元</div>"
						+ "	</div>"
						+ "	<div class='appliance tableleft jiadianmingxi'>"
						+ "		<div>家电明细</div>"
						+ "		<table class='table' width='600' border='0'>"
						+ "				<tr>"
						+ "					<th></th>"
						+ "					<th>项目</th>"
						+ "					<th>型号\规格</th>"
						+ "					<th>单价</th>"
						+ "					<th>数量</th>"
						+ "					<th>应付</th>"
						+ "					<th>备注</th>"
						+ "				</tr>"
						+ "		</table>"
						+ "		<table class='table' width='600' border='0'>"
						+ "		<tr>"
						+ "			<th></th>"
						+ "			<th>项目</th>"
						+ "			<th>型号\规格</th>"
						+ "			<th>单价</th>"
						+ "			<th>数量</th>"
						+ "			<th>应付</th>"
						+ "			<th>备注</th>"
						+ "		</tr>"
						+ "</table>"
						+ "<div class='fitotal'>共计：<span>0</span>元</div>"
						+ "</div></div>";
				   }
				   
				   
				   $(".fitment").append(httm);
				   $(".a label").html(house_id);
				   
				   for ( var i = 0; i < arr.goods.length; i++) {
					   var obj = arr.goods[i];
					   $(".houtit").each(function(){
						   var ccpy = $(this).attr("lang");  
						   if(CC2PY(obj.region)!="zhuangxiu"){
							   if(CC2PY(obj.region)==ccpy){
								   var ccp1 = "."+CC2PY(obj.region);
								   var ccp2 = "."+CC2PY(obj.type);
								   var tr1 = $(ccp1+" "+ccp2+" table:eq(0) tr").length;
								   var tr2 = $(ccp1+" "+ccp2+" table:eq(1) tr").length;
								   if(tr1>tr2){
									   $(ccp1+" "+ccp2+" table:eq(1)").append("<tr><td></td>"+
												"<td><input type='text' value='"+obj.name+"' /></td>"+
												"<td><input type='text' value='"+obj.model+"' /></td>"+
												"<td><input type='text' value='"+obj.uniteprice+"' class='danjia' /></td>"+
												"<td><input type='text' value='"+obj.number+"' class='shuliang' /></td>"+
												"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
												"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   }else if(tr1==tr2){
									   $(ccp1+" "+ccp2+" table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
												"<td><input type='text' value='"+obj.name+"' /></td>"+
												"<td><input type='text' value='"+obj.model+"' /></td>"+
												"<td><input type='text' value='"+obj.uniteprice+"' class='danjia' /></td>"+
												"<td><input type='text' value='"+obj.number+"' class='shuliang' /></td>"+
												"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
												"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   }
							   }
						   }else{
							   if(CC2PY(obj.region)==ccpy){
								   var ccp1 = "."+CC2PY(obj.region);
								   var ccp2 = "."+CC2PY(obj.type);
								   var tr1 = $(ccp1+" "+ccp2+" table:eq(0) tr").length;
								   var tr2 = $(ccp1+" "+ccp2+" table:eq(1) tr").length;
								   if(tr1>tr2){
									   $(ccp1+" "+ccp2+" table:eq(1)").append("<tr><td></td>"+
												"<td><input type='text' value='"+obj.name+"' /></td>"+
												"<td><input type='text' value='"+obj.uniteprice+"' class='danjia' /></td>"+
												"<td><input type='text' value='"+obj.number+"' class='shuliang' /></td>"+
												"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
												"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   }else if(tr1==tr2){
									   $(ccp1+" "+ccp2+" table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
												"<td><input type='text' value='"+obj.name+"' /></td>"+
												"<td><input type='text' value='"+obj.uniteprice+"' class='danjia' /></td>"+
												"<td><input type='text' value='"+obj.number+"' class='shuliang' /></td>"+
												"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
												"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   }
							   }
						   }
					   });
				   }
				   
				   $(".houtit2 table").each(function(){
					   var tr = $(this).find("tr").length;
					   var index = $(this).index();
					   if(index==1){
						   if(tr==1){
							   $(this).append("<tr>"+
										"<td class='jia'><img src='images/jia.png' /></td>"+
										"<td><input type='text' /></td>"+
										"<td><input type='text' /></td>"+
										"<td><input type='text' class='danjia' /></td>"+
										"<td><input type='text' class='shuliang' /></td>"+
										"<td><input type='text' class='yingfu' /></td>"+
										"<td><input type='text' /></td>"+
									"</tr>");
						   }
					   }else if(index==2){
						   if(tr==1){
							   $(this).append("<tr>"+
										"<td class='jia'></td>"+
										"<td><input type='text' /></td>"+
										"<td><input type='text' /></td>"+
										"<td><input type='text' class='danjia' /></td>"+
										"<td><input type='text' class='shuliang' /></td>"+
										"<td><input type='text' class='yingfu' /></td>"+
										"<td><input type='text' /></td>"+
									"</tr>");
						   }
					   } 
				   });
				   $(".houtit1 table").each(function(){
					   var tr = $(this).find("tr").length;
					   var index = $(this).index();
					   if(index==1){
						   if(tr==1){
							   $(this).append("<tr>"+
										"<td class='jia'><img src='images/jia.png' /></td>"+
										"<td><input type='text' /></td>"+
										"<td><input type='text' class='danjia' /></td>"+
										"<td><input type='text' class='shuliang' /></td>"+
										"<td><input type='text' class='yingfu' /></td>"+
										"<td><input type='text' /></td>"+
									"</tr>");
						   }
					   }else if(index==2){
						   if(tr==1){
							   $(this).append("<tr>"+
										"<td class='jia'></td>"+
										"<td><input type='text' /></td>"+
										"<td><input type='text' class='danjia' /></td>"+
										"<td><input type='text' class='shuliang' /></td>"+
										"<td><input type='text' class='yingfu' /></td>"+
										"<td><input type='text' /></td>"+
									"</tr>");
						   }
					   } 
				   });
				   
				   $(".houtit table").each(function(){
					   var index = $(this).index();
					   if(index==1){
						   var tr = $(this).find("tr").length;
						   if(tr>2){
							  // var a = $(this).find("tr:lt(3)").html();
							   $(this).find("tr").each(function(){
								  var ind = $(this).index();
								  if(ind<(tr-1) && ind>=1){
									  $(this).find("td:eq(0)").attr("class","jian");
									  $(this).find("td:eq(0)").html("<img src='images/jian.png'>");
								  }
							   });
						   }
					   }
				   });
				   $(".houtit .tableleft").each(function(){
					 var index1 = $(this).find("table:eq(0) tr").length;
					 var index2 = $(this).find("table:eq(1) tr").length;
					 if(index2<index1){
						 $(this).find("table:eq(1)").append("<tr>"+
										"<td class='jia'></td>"+
										"<td><input type='text' /></td>"+
										"<td><input type='text' /></td>"+
										"<td><input type='text' class='danjia' /></td>"+
										"<td><input type='text' class='shuliang' /></td>"+
										"<td><input type='text' class='yingfu' /></td>"+
										"<td><input type='text' /></td>"+
									"</tr>");
					 }
				   });
				   $(".tableleft").each(function() {
						var total = 0;
						$(this).find(".yingfu").each(function() {
							total += Number($(this).val());
						});
						
						$(this).children(".fitotal").find("span").text(total);
					});
				  
			   }
		   }
	});
}

//区域
function getDistrict() {
	$.ajax({
		type : "GET",
		 async:false,
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
	
	$
			.ajax({
				type : "GET",
				url : "../igjia/house.do",
				data : "district="
						+ encodeURI(encodeURI(district))
						+ "&state="
						+ encodeURI(encodeURI("配置中"))
						+ "&contract_start1=&contract_start2=&contract_end1=&contract_end2=",
				success : function(result) {
					if (result == 'fail') {
						$('#djxz').html('未登录');
					} else {
						
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
							});
							$(".sswk").css("display", "none");

						});
					}

				}
			});
}
//添加卧室
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
							var html1 = "";
							for ( var i = 0; i < arr.msg.length; i++) {
								obj = arr.msg[i];

								html += "<input type='text' name='house_id" + i
										+ 1 + "' class='house_id" + i + 1
										+ "' id='house_id" + i + 1
										+ "' value='" + obj.house_id + "' />";
								html1 += "<div class='houtit houtit2 bedroom bedroom"+String.fromCharCode(i + 65)+"'><div class='roomimg'><img src='images/woshi.png' /><span>卧室"
										+ String.fromCharCode(i + 65)
										+ "</span></div>"
										+ "	<div class='furniture tableleft'>"
										+ "	<div>家具明细</div>"
										+ "	<table class='table' width='600' border='0'>"
										+ "			<tr>"
										+ "				<th></th>"
										+ "				<th>项目</th>"
										+ "				<th>型号\规格</th>"
										+ "				<th>单价</th>"
										+ "				<th>数量</th>"
										+ "				<th>应付</th>"
										+ "				<th>备注</th>"
										+ "			</tr>"
										+ "			<tr>"
										+ "				<td class='jia'><img src='images/jia.png' /></td>"
										+ "				<td><input type='text' /></td>"
										+ "				<td><input type='text' /></td>"
										+ "				<td><input type='text' class='danjia' /></td>"
										+ "				<td><input type='text' class='shuliang' /></td>"
										+ "				<td><input type='text' class='yingfu' /></td>"
										+ "				<td><input type='text' /></td>"
										+ "			</tr>				"
										+ "	</table>"
										+ "	<table class='table' width='600' border='0'>"
										+ "			<tr>"
										+ "				<th></th>"
										+ "				<th>项目</th>"
										+ "				<th>型号\规格</th>"
										+ "				<th>单价</th>"
										+ "				<th>数量</th>"
										+ "				<th>应付</th>"
										+ "				<th>备注</th>"
										+ "			</tr>"
										+ "			<tr>"
										+ "				<td></td>"
										+ "				<td><input type='text' /></td>"
										+ "				<td><input type='text' /></td>"
										+ "				<td><input type='text' class='danjia' /></td>"
										+ "				<td><input type='text' class='shuliang' /></td>"
										+ "				<td><input type='text' class='yingfu' /></td>"
										+ "				<td><input type='text' /></td>"
										+ "			</tr>"
										+ "	</table>"
										+ "	<div class='fitotal'>共计：<span>0</span>元</div>"
										+ "	</div>"
										+ "	<div class='appliance tableleft'>"
										+ "		<div>家电明细</div>"
										+ "		<table class='table' width='600' border='0'>"
										+ "				<tr>"
										+ "					<th></th>"
										+ "					<th>项目</th>"
										+ "					<th>型号\规格</th>"
										+ "					<th>单价</th>"
										+ "					<th>数量</th>"
										+ "					<th>应付</th>"
										+ "					<th>备注</th>"
										+ "				</tr>"
										+ "				<tr>"
										+ "					<td class='jia'><img src='images/jia.png' /></td>"
										+ "					<td><input type='text' /></td>"
										+ "					<td><input type='text' /></td>"
										+ "					<td><input type='text' class='danjia' /></td>"
										+ "					<td><input type='text' class='shuliang' /></td>"
										+ "					<td><input type='text' class='yingfu' /></td>"
										+ "					<td><input type='text' /></td>"
										+ "				</tr>"
										+ "		</table>"
										+ "		<table class='table' width='600' border='0'>"
										+ "		<tr>"
										+ "			<th></th>"
										+ "			<th>项目</th>"
										+ "			<th>型号\规格</th>"
										+ "			<th>单价</th>"
										+ "			<th>数量</th>"
										+ "			<th>应付</th>"
										+ "			<th>备注</th>"
										+ "		</tr>"
										+ "		<tr>"
										+ "			<td></td>"
										+ "			<td><input type='text' /></td>"
										+ "			<td><input type='text' /></td>"
										+ "			<td><input type='text' class='danjia' /></td>"
										+ "			<td><input type='text' class='shuliang' /></td>"
										+ "			<td><input type='text' class='yingfu' /></td>"
										+ "			<td><input type='text' /></td>"
										+ "		</tr>"
										+ "</table>"
										+ "<div class='fitotal'>共计：<span>0</span>元</div>"
										+ "</div></div>";
							}
						}
						$(".a label").html("");
						$(".a label").html(html);
						$(".bedroom").remove();;
						$(".fitment").append(html1);

					}

				}
			});
}
//加载
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
	//价格统计
//	$(".fitment").on("input propertychange",".yingfu",function() {
//		var total = 0;
//		$(this).parents(".tableleft").find(".yingfu").each(function() {
//			total += Number($(this).val());
//		});
//		$(this).parents(".tableleft").children(".fitotal").children(
//			"span").html(total);
//
//		var appliance_handle = 0;
//		var furniture_handle = 0;
//		var decorate_handle = 0;
//
//		$(".tableleft").each(function() {
//			var tdiv = $(this).children("div:first").text();
//
//			if (tdiv == "家具明细") {
//				furniture_handle += Number($(this).children(
//						".fitotal").children("span").text());
//			} else if (tdiv == "家电明细") {
//				appliance_handle += Number($(this).children(
//						".fitotal").children("span").text());
//			} else {
//				decorate_handle += Number($(this).children(
//							".fitotal").children("span").text());
//			}
//		});
//		$("#furniture_handle").val(furniture_handle);
//		$("#appliance_handle").val(appliance_handle);
//		$("#decorate_handle").val(decorate_handle);
//
//		$("#handle").val(furniture_handle + appliance_handle + decorate_handle);
//	});
	$(".fitment").on("input propertychange",".danjia",function() {
		var shuliang = $(this).parents("td").siblings("td").children(".shuliang").val();;
		if(shuliang==""){
			shuliang = 1;
		}
		var danjia = $(this).val();
		
		$(this).parents("td").siblings("td").children(".yingfu").val(Number(danjia)*Number(shuliang));
		
		var total = 0;
		$(this).parents(".tableleft").find(".yingfu").each(function() {
			total += Number($(this).val());
		});
		$(this).parents(".tableleft").children(".fitotal").children(
			"span").html(total);
		
		var appliance_handle = 0;
		var furniture_handle = 0;
		var decorate_handle = 0;

		$(".tableleft").each(function() {
			var tdiv = $(this).children("div:first").text();

			if (tdiv == "家具明细") {
				furniture_handle += Number($(this).children(
						".fitotal").children("span").text());
			} else if (tdiv == "家电明细") {
				appliance_handle += Number($(this).children(
						".fitotal").children("span").text());
			} else {
				decorate_handle += Number($(this).children(
							".fitotal").children("span").text());
			}
		});
		$("#furniture_handle").val(furniture_handle);
		$("#appliance_handle").val(appliance_handle);
		$("#decorate_handle").val(decorate_handle);

		$("#handle").val(furniture_handle + appliance_handle + decorate_handle);
		
	});
	$(".fitment").on("input propertychange",".shuliang",function() {
		var danjia = $(this).parents("td").siblings("td").children(".danjia").val();;
		if(danjia==""){
			danjia = 1;
		}
		var shuliang = $(this).val();
		
		$(this).parents("td").siblings("td").children(".yingfu").val(Number(danjia)*Number(shuliang));
		
		var total = 0;
		$(this).parents(".tableleft").find(".yingfu").each(function() {
			
			total += Number($(this).val());
		});
		$(this).parents(".tableleft").children(".fitotal").children(
			"span").html(total);
		
		var appliance_handle = 0;
		var furniture_handle = 0;
		var decorate_handle = 0;

		$(".tableleft").each(function() {
			var tdiv = $(this).children("div:first").text();

			if (tdiv == "家具明细") {
				furniture_handle += Number($(this).children(
						".fitotal").children("span").text());
			} else if (tdiv == "家电明细") {
				appliance_handle += Number($(this).children(
						".fitotal").children("span").text());
			} else {
				decorate_handle += Number($(this).children(
							".fitotal").children("span").text());
			}
		});
		$("#furniture_handle").val(furniture_handle);
		$("#appliance_handle").val(appliance_handle);
		$("#decorate_handle").val(decorate_handle);

		$("#handle").val(furniture_handle + appliance_handle + decorate_handle);
	});
	

	$("#appliance_outofpocket").on("input propertychange",
			function() {
				var appliance_outofpocket = $("#appliance_outofpocket").val();
				var furniture_outofpocket = $("#furniture_outofpocket").val();
				var decorate_outofpocket = $("#decorate_outofpocket").val();
				$("#out_of_pocket").val(
						Number(appliance_outofpocket)
								+ Number(furniture_outofpocket)
								+ Number(decorate_outofpocket));
			});
	$("#furniture_outofpocket").on("input propertychange",
			function() {
				var appliance_outofpocket = $("#appliance_outofpocket").val();
				var furniture_outofpocket = $("#furniture_outofpocket").val();
				var decorate_outofpocket = $("#decorate_outofpocket").val();
				$("#out_of_pocket").val(
						Number(appliance_outofpocket)
								+ Number(furniture_outofpocket)
								+ Number(decorate_outofpocket));
			});
	$("#decorate_outofpocket").on("input propertychange",
			function() {
				var appliance_outofpocket = $("#appliance_outofpocket").val();
				var furniture_outofpocket = $("#furniture_outofpocket").val();
				var decorate_outofpocket = $("#decorate_outofpocket").val();
				$("#out_of_pocket").val(
						Number(appliance_outofpocket)
								+ Number(furniture_outofpocket)
								+ Number(decorate_outofpocket));
			});
	
	//fitotal
	
	
});
