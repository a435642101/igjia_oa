$(function(){
	//表格js
	$("table").on("click","tr td.jian",function(){	
		var index = $(this).parents("tr").index();
		$(this).parents(".tableleft").find("table:last tr:eq("+index+")").remove();
		$(this).parents(".tableleft").find("table:first tr:eq("+index+")").remove();
		//$(this).parents("tr").remove();
	});
	$(".houtit table").on("click","tr td.jia",function(){
		$(this).attr("class","jian");
		$(this).children("img").attr("src","images/jian.png");
		var html = "<tr>"+
						"<td class='jia'><img src='images/jia.png' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
					"</tr>";
		var html1 = "<tr>"+
						"<td></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
						"<td><input type='text' /></td>"+
					"</tr>";
		$(this).parents("tr").parents("table").append(html);
		$(this).parents("tr").parents("table").siblings("table").append(html1);
	});
	
	$("table").on("mouseover","tr",function(){
		var index = $(this).index();
		$(this).siblings("tr:eq("+(index-1)+")").addClass("act");	
	});
	$("table").on("mouseout","tr",function(){
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

function getOneRear(){
	var contract_no = GetQueryString("contract_no");
	$.ajax({
		   type: "GET",
		   url: "/yhTech/getOneRear.do",
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
				   
				   
				   for ( var i = 0; i < arr.goods.length; i++) {
					   var obj = arr.goods[i];
					   if(obj.region=="客厅"){
						   if(obj.type==="家具明细"){
							   if(halltable==0){
								   if(halltr==0){
									   $(".hall .furniture table:eq(0) tr:eq(1)").remove();
									   halltr=1;
								   }
								   $(".hall .furniture table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
										"<td><input type='text' value='"+obj.name+"' /></td>"+
										"<td><input type='text' value='"+obj.model+"' /></td>"+
										"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
										"<td><input type='text' value='"+obj.number+"' /></td>"+
										"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
										"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   halltable = 1;
							   }else{
								   if(halltr==1){
									   $(".hall .furniture table:eq(1) tr:eq(1)").remove();
									   halltr=2;
								   }
								   
								   $(".hall .furniture table:eq(1)").append("<tr><td></td>"+
											"<td><input type='text' value='"+obj.name+"' /></td>"+
											"<td><input type='text' value='"+obj.model+"' /></td>"+
											"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
											"<td><input type='text' value='"+obj.number+"' /></td>"+
											"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
											"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   halltable = 0;
							   }
						   }else if(obj.type==="家电明细"){
							   if(halltable1==0){
								   if(halltr1==0){
									   $(".hall .appliance table:eq(0) tr:eq(1)").remove();
									   halltr1=1;
								   }
								   $(".hall .appliance table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
										"<td><input type='text' value='"+obj.name+"' /></td>"+
										"<td><input type='text' value='"+obj.model+"' /></td>"+
										"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
										"<td><input type='text' value='"+obj.number+"' /></td>"+
										"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
										"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   halltable1 = 1;
							   }else{
								   if(halltr1==1){
									   $(".hall .appliance table:eq(1) tr:eq(1)").remove();
									   halltr1=2;
								   }
								   
								   $(".hall .appliance table:eq(1)").append("<tr><td></td>"+
											"<td><input type='text' value='"+obj.name+"' /></td>"+
											"<td><input type='text' value='"+obj.model+"' /></td>"+
											"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
											"<td><input type='text' value='"+obj.number+"' /></td>"+
											"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
											"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   halltable1 = 0;
							   }
						   }
						   
					   }else if(obj.region=="厨房"){
						   if(obj.type==="家具明细"){
							   if(kitable==0){
								   if(kitr==0){
									   $(".kitchen .furniture table:eq(0) tr:eq(1)").remove();
									   kitr=1;
								   }
								   $(".kitchen .furniture table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
										"<td><input type='text' value='"+obj.name+"' /></td>"+
										"<td><input type='text' value='"+obj.model+"' /></td>"+
										"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
										"<td><input type='text' value='"+obj.number+"' /></td>"+
										"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
										"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   kitable = 1;
							   }else{
								   if(kitr==1){
									   $(".kitchen .furniture table:eq(1) tr:eq(1)").remove();
									   kitr=2;
								   }
								   
								   $(".kitchen .furniture table:eq(1)").append("<tr><td></td>"+
											"<td><input type='text' value='"+obj.name+"' /></td>"+
											"<td><input type='text' value='"+obj.model+"' /></td>"+
											"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
											"<td><input type='text' value='"+obj.number+"' /></td>"+
											"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
											"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   kitable = 0;
							   }
						   }else if(obj.type==="家电明细"){
							   if(kitable1==0){
								   if(kitr1==0){
									   $(".kitchen .appliance table:eq(0) tr:eq(1)").remove();
									   kitr1=1;
								   }
								   $(".kitchen .appliance table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
										"<td><input type='text' value='"+obj.name+"' /></td>"+
										"<td><input type='text' value='"+obj.model+"' /></td>"+
										"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
										"<td><input type='text' value='"+obj.number+"' /></td>"+
										"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
										"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   kitable1 = 1;
							   }else{
								   if(kitr1==1){
									   $(".kitchen .appliance table:eq(1) tr:eq(1)").remove();
									   kitr1=2;
								   }
								   
								   $(".kitchen .appliance table:eq(1)").append("<tr><td></td>"+
											"<td><input type='text' value='"+obj.name+"' /></td>"+
											"<td><input type='text' value='"+obj.model+"' /></td>"+
											"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
											"<td><input type='text' value='"+obj.number+"' /></td>"+
											"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
											"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   kitable1 = 0;
							   }
						   }
					   }else if(obj.region=="公共浴室"){
						   if(obj.type==="家具明细"){
							   if(shtable==0){
								   if(shtr==0){
									   $(".shower .furniture table:eq(0) tr:eq(1)").remove();
									   shtr=1;
								   }
								   $(".shower .furniture table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
										"<td><input type='text' value='"+obj.name+"' /></td>"+
										"<td><input type='text' value='"+obj.model+"' /></td>"+
										"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
										"<td><input type='text' value='"+obj.number+"' /></td>"+
										"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
										"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   shtable = 1;
							   }else{
								   if(shtr==1){
									   $(".shower .furniture table:eq(1) tr:eq(1)").remove();
									   shtr=2;
								   }
								   
								   $(".shower .furniture table:eq(1)").append("<tr><td></td>"+
											"<td><input type='text' value='"+obj.name+"' /></td>"+
											"<td><input type='text' value='"+obj.model+"' /></td>"+
											"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
											"<td><input type='text' value='"+obj.number+"' /></td>"+
											"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
											"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   shtable = 0;
							   }
						   }else if(obj.type=="家电明细"){
							   if(shtable1==0){
								   if(shtr1==0){
									   $(".shower .appliance table:eq(0) tr:eq(1)").remove();
									   shtr1=1;
								   }
								   $(".shower .appliance table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
										"<td><input type='text' value='"+obj.name+"' /></td>"+
										"<td><input type='text' value='"+obj.model+"' /></td>"+
										"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
										"<td><input type='text' value='"+obj.number+"' /></td>"+
										"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
										"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   shtable1 = 1;
							   }else{
								   if(shtr1==1){
									   $(".shower .appliance table:eq(1) tr:eq(1)").remove();
									   shtr1=2;
								   }
								   
								   $(".shower .appliance table:eq(1)").append("<tr><td></td>"+
											"<td><input type='text' value='"+obj.name+"' /></td>"+
											"<td><input type='text' value='"+obj.model+"' /></td>"+
											"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
											"<td><input type='text' value='"+obj.number+"' /></td>"+
											"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
											"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
								   shtable1 = 0;
							   }
						   }
					   }else if(obj.region=="装修明细"){
						   if(shtable1==0){
							   if(shtr1==0){
								   $(".fitmm .renovation table:eq(0) tr:eq(1)").remove();
								   shtr1=1;
							   }
							   $(".fitmm .renovation table:eq(0)").append("<tr><td class='jia'><img src='images/jia.png' /></td>"+
									"<td><input type='text' value='"+obj.name+"' /></td>"+
									"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
									"<td><input type='text' value='"+obj.number+"' /></td>"+
									"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
									"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
							   shtable1 = 1;
						   }else{
							   if(shtr1==1){
								   $(".fitmm .renovation table:eq(1) tr:eq(1)").remove();
								   shtr1=2;
							   }
							   
							   $(".fitmm .renovation table:eq(1)").append("<tr><td></td>"+
										"<td><input type='text' value='"+obj.name+"' /></td>"+
										"<td><input type='text' value='"+obj.uniteprice+"' /></td>"+
										"<td><input type='text' value='"+obj.number+"' /></td>"+
										"<td><input type='text' value='"+obj.handle+"' class='yingfu' /></td>"+
										"<td><input type='text' value='"+obj.remark+"' /></td></tr>");
							   shtable1 = 0;
						   }
					   }else{
						   
					   }
				   }
			   }
		   }
	});
}








//////



//JavaScript Document
$(function() {
	getDistrict();
	$("button")
			.click(
					function() {
						var contract_no = $("#contract_no").val();
						var house_id = $("#house_id").val();
						var district = encodeURI(encodeURI($('#district').val()));
						var business_area = encodeURI(encodeURI($(
								'#business_area').val()));
						var estate = encodeURI(encodeURI($('#estate').val()));
						var address = encodeURI(encodeURI($('#address').val()));
						var type = encodeURI(encodeURI($('#type').val()));
						var measure_date = $("#measure_date").val();
						var begin_date = $("#begin_date").val();
						var finish_date = $("#finish_date").val();
						var job_no = $("#job_no").val();
						var rear = $("#rear").val();
						var decorate_team = encodeURI(encodeURI($(
								'#decorate_team').val()));
						var decorate_telephone = $("#decorate_telephone").val();
						var decorate_handle = $("#decorate_handle").val();
						var decorate_outofpocket = $("#decorate_outofpocket")
								.val();
						var decorate_remark = encodeURI(encodeURI($(
								'#decorate_remark').val()));
						var furniture_supplier = encodeURI(encodeURI($(
								'#furniture_supplier').val()));
						var furniture_telephone = $("#furniture_telephone")
								.val();
						var furniture_handle = $("#furniture_handle").val();
						var furniture_outofpocket = $("#furniture_outofpocket")
								.val();
						var furniture_remark = encodeURI(encodeURI($(
								'#furniture_remark').val()));
						var furniture_startdate = $("#furniture_startdate")
								.val();
						var furniture_reachdate = $("#furniture_reachdate")
								.val();
						var appliance_supplier = encodeURI(encodeURI($(
								'#appliance_supplier').val()));
						var appliance_telephone = $("#appliance_telephone")
								.val();
						var appliance_remark = encodeURI(encodeURI($(
								'#appliance_remark').val()));
						var appliance_startdate = $("#appliance_startdate")
								.val();
						var appliance_reachdate = $("#appliance_reachdate")
								.val();
						var appliance_handle = $("#appliance_handle").val();
						var appliance_outofpocket = $("#appliance_outofpocket")
								.val();
						var handle = $("#handle").val();
						var out_of_pocket = $("#out_of_pocket").val();
						var goods = "";
						$(".houtit")
								.each(
										function() {
											var region = $(this).children(
													"div.roomimg").children(
													"span").text();
											var contract_no = $("#contract_no")
													.val();
											$(this)
													.children(".tableleft")
													.each(
															function() {
																var type = $(
																		this)
																		.children(
																				"div:first")
																		.text();
																$(this)
																		.find(
																				"table")
																		.each(
																				function() {
																					$(
																							this)
																							.find(
																									"tr:gt(0)")
																							.each(
																									function() {
																										if (type != "装修明细") {
																											var name = $(
																													this)
																													.children(
																															"td:eq(1)")
																													.children(
																															"input")
																													.val();
																											var model = $(
																													this)
																													.children(
																															"td:eq(2)")
																													.children(
																															"input")
																													.val();
																											var uniteprice = $(
																													this)
																													.children(
																															"td:eq(3)")
																													.children(
																															"input")
																													.val();
																											var number = $(
																													this)
																													.children(
																															"td:eq(4)")
																													.children(
																															"input")
																													.val();
																											var handle = $(
																													this)
																													.children(
																															"td:eq(5)")
																													.children(
																															"input")
																													.val();
																											var remark = $(
																													this)
																													.children(
																															"td:eq(6)")
																													.children(
																															"input")
																													.val();
																											if (name == ""
																													&& model == ""
																													&& uniteprice == ""
																													&& number == ""
																													&& handle == ""
																													&& remark == "") {
																											} else {
																												if (goods == "") {
																													goods += "{"
																															+ "\"contract_no\":\""
																															+ contract_no
																															+ "\","
																															+ "\"region\":\""
																															+ region
																															+ "\","
																															+ "\"type\":\""
																															+ type
																															+ "\","
																															+ "\"name\":\""
																															+ name
																															+ "\","
																															+ "\"model\":\""
																															+ model
																															+ "\","
																															+ "\"uniteprice\":\""
																															+ uniteprice
																															+ "\","
																															+ "\"number\":\""
																															+ number
																															+ "\","
																															+ "\"handle\":\""
																															+ handle
																															+ "\","
																															+ "\"remark\":\""
																															+ remark
																															+ "\""
																															+ "}";
																												} else {
																													goods += ",{"
																															+ "\"contract_no\":\""
																															+ contract_no
																															+ "\","
																															+ "\"region\":\""
																															+ region
																															+ "\","
																															+ "\"type\":\""
																															+ type
																															+ "\","
																															+ "\"name\":\""
																															+ name
																															+ "\","
																															+ "\"model\":\""
																															+ model
																															+ "\","
																															+ "\"uniteprice\":\""
																															+ uniteprice
																															+ "\","
																															+ "\"number\":\""
																															+ number
																															+ "\","
																															+ "\"handle\":\""
																															+ handle
																															+ "\","
																															+ "\"remark\":\""
																															+ remark
																															+ "\""
																															+ "}";
																												}
																											}
																										} else {
																											var name = $(
																													this)
																													.children(
																															"td:eq(1)")
																													.children(
																															"input")
																													.val();
																											var uniteprice = $(
																													this)
																													.children(
																															"td:eq(2)")
																													.children(
																															"input")
																													.val();
																											var number = $(
																													this)
																													.children(
																															"td:eq(3)")
																													.children(
																															"input")
																													.val();
																											var handle = $(
																													this)
																													.children(
																															"td:eq(4)")
																													.children(
																															"input")
																													.val();
																											var remark = $(
																													this)
																													.children(
																															"td:eq(5)")
																													.children(
																															"input")
																													.val();
																											if (name == ""
																													&& uniteprice == ""
																													&& number == ""
																													&& handle == ""
																													&& remark == "") {
																											} else {
																												if (goods == "") {
																													goods += "{"
																															+ "\"contract_no\":\""
																															+ contract_no
																															+ "\","
																															+ "\"region\":\""
																															+ region
																															+ "\","
																															+ "\"type\":\""
																															+ type
																															+ "\","
																															+ "\"name\":\""
																															+ name
																															+ "\","
																															+ "\"model\":\"\","
																															+ "\"uniteprice\":\""
																															+ uniteprice
																															+ "\","
																															+ "\"number\":\""
																															+ number
																															+ "\","
																															+ "\"handle\":\""
																															+ handle
																															+ "\","
																															+ "\"remark\":\""
																															+ remark
																															+ "\""
																															+ "}";
																												} else {
																													goods += ",{"
																															+ "\"contract_no\":\""
																															+ contract_no
																															+ "\","
																															+ "\"region\":\""
																															+ region
																															+ "\","
																															+ "\"type\":\""
																															+ type
																															+ "\","
																															+ "\"name\":\""
																															+ name
																															+ "\","
																															+ "\"model\":\"\","
																															+ "\"uniteprice\":\""
																															+ uniteprice
																															+ "\","
																															+ "\"number\":\""
																															+ number
																															+ "\","
																															+ "\"handle\":\""
																															+ handle
																															+ "\","
																															+ "\"remark\":\""
																															+ remark
																															+ "\""
																															+ "}";
																												}
																											}
																										}

																									});
																				});

															});
										});
						add(contract_no, house_id, district, business_area,
								estate, address, type, measure_date,
								begin_date, finish_date, job_no, rear,
								decorate_team, decorate_telephone,
								decorate_handle, decorate_outofpocket,
								decorate_remark, furniture_supplier,
								furniture_telephone, furniture_handle,
								furniture_outofpocket, furniture_remark,
								furniture_startdate, furniture_reachdate,
								appliance_supplier, appliance_telephone,
								appliance_remark, appliance_startdate,
								appliance_reachdate, appliance_handle,
								appliance_outofpocket, handle, out_of_pocket,
								goods);
					});
	$(".tableleft").each(function() {
		var total = 0;
		$(this).find(".yingfu").each(function() {
			total += Number($(this).val());
		});
		$(this).children(".fitotal").children("span").html(total);
	});
	$(".fitment").on("blur",".yingfu",
			function() {
				var total = 0;
				$(this).parents(".tableleft").find(".yingfu").each(function() {
					total += Number($(this).val());
				});
				$(this).parents(".tableleft").children(".fitotal").children(
						"span").html(total);

				var appliance_handle = 0;
				var furniture_handle = 0;
				var decorate_handle = 0;

				$(".tableleft").each(
						function() {
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

				$("#handle").val(
						furniture_handle + appliance_handle + decorate_handle);
			});

	$("#appliance_outofpocket").blur(
			function() {
				var appliance_outofpocket = $("#appliance_outofpocket").val();
				var furniture_outofpocket = $("#furniture_outofpocket").val();
				var decorate_outofpocket = $("#decorate_outofpocket").val();
				$("#out_of_pocket").val(
						Number(appliance_outofpocket)
								+ Number(furniture_outofpocket)
								+ Number(decorate_outofpocket));
			});
	$("#furniture_outofpocket").blur(
			function() {
				var appliance_outofpocket = $("#appliance_outofpocket").val();
				var furniture_outofpocket = $("#furniture_outofpocket").val();
				var decorate_outofpocket = $("#decorate_outofpocket").val();
				$("#out_of_pocket").val(
						Number(appliance_outofpocket)
								+ Number(furniture_outofpocket)
								+ Number(decorate_outofpocket));
			});
	$("#decorate_outofpocket").blur(
			function() {
				var appliance_outofpocket = $("#appliance_outofpocket").val();
				var furniture_outofpocket = $("#furniture_outofpocket").val();
				var decorate_outofpocket = $("#decorate_outofpocket").val();
				$("#out_of_pocket").val(
						Number(appliance_outofpocket)
								+ Number(furniture_outofpocket)
								+ Number(decorate_outofpocket));
			});
});
function add(contract_no, house_id, district, business_area, estate, address,
		type, measure_date, begin_date, finish_date, job_no, rear,
		decorate_team, decorate_telephone, decorate_handle,
		decorate_outofpocket, decorate_remark, furniture_supplier,
		furniture_telephone, furniture_handle, furniture_outofpocket,
		furniture_remark, furniture_startdate, furniture_reachdate,
		appliance_supplier, appliance_telephone, appliance_remark,
		appliance_startdate, appliance_reachdate, appliance_handle,
		appliance_outofpocket, handle, out_of_pocket, goods) {
	$.ajax({
		type : "GET",
		url : "/yhTech/addRear.do",
		data : "contract_no=" + contract_no + "&house_id=" + house_id
				+ "&district=" + district + "&business_area=" + business_area
				+ "&estate=" + estate + "&address=" + address + "&type=" + type
				+ "&measure_date=" + measure_date + "&begin_date=" + begin_date
				+ "&finish_date=" + finish_date + "&job_no=" + job_no
				+ "&rear=" + rear + "&decorate_team=" + decorate_team
				+ "&decorate_telephone=" + decorate_telephone
				+ "&decorate_handle=" + decorate_handle
				+ "&decorate_outofpocket=" + decorate_outofpocket
				+ "&decorate_remark=" + decorate_remark
				+ "&furniture_supplier=" + furniture_supplier
				+ "&furniture_telephone=" + furniture_telephone
				+ "&furniture_handle=" + furniture_handle
				+ "&furniture_outofpocket=" + furniture_outofpocket
				+ "&furniture_remark=" + furniture_remark
				+ "&furniture_startdate=" + furniture_startdate
				+ "&furniture_reachdate=" + furniture_reachdate
				+ "&appliance_supplier=" + appliance_supplier
				+ "&appliance_telephone=" + appliance_telephone
				+ "&appliance_remark=" + appliance_remark
				+ "&appliance_startdate=" + appliance_startdate
				+ "&appliance_reachdate=" + appliance_reachdate
				+ "&appliance_handle=" + appliance_handle
				+ "&appliance_outofpocket=" + appliance_outofpocket
				+ "&handle=" + handle + "&out_of_pocket=" + out_of_pocket
				+ "&goods=" + encodeURI("[" + goods + "]"),
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
});

function getDistrict() {
	$.ajax({
		type : "GET",
		url : "/yhTech/getAllDistrict.do",
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

function request(district) {
	$('#djxz').html('加载中...');
	$
			.ajax({
				type : "GET",
				url : "/yhTech/igjia/house.do",
				data : "district="
						+ encodeURI(encodeURI(district))
						+ "&state="
						+ encodeURI(encodeURI("空置中"))
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

function getHouseByContractNo(district, contract_no) {
	$
			.ajax({
				type : "GET",
				url : "/yhTech/getHouseByContractNo.do",
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
								html1 += "<div class='roomimg'><img src='images/woshi.png' /><span>卧室"+String.fromCharCode(i+65)+"</span></div>"
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
										+ "				<td><input type='text' /></td>"
										+ "				<td><input type='text' /></td>"
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
										+ "				<td><input type='text' /></td>"
										+ "				<td><input type='text' /></td>"
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
										+ "					<td><input type='text' /></td>"
										+ "					<td><input type='text' /></td>"
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
										+ "			<td><input type='text' /></td>"
										+ "			<td><input type='text' /></td>"
										+ "			<td><input type='text' class='yingfu' /></td>"
										+ "			<td><input type='text' /></td>"
										+ "		</tr>"
										+ "</table>"
										+ "<div class='fitotal'>共计：<span>0</span>元</div>"
										+ "</div>";
							}
						}
						$(".a label").html("");
						$(".a label").html(html);
						$(".bedroom").html("");
						$(".bedroom").html(html1);

					}

				}
			});
}

// $("button").click(function(){
// var a = $("#contract_no").val();
// var b = $("#house_id").val();
// var c = encodeURI(encodeURI($('#district').val()));
// var d = encodeURI(encodeURI($('#business_area').val()));
// var e = encodeURI(encodeURI($('#estate').val()));
// var f = encodeURI(encodeURI($('#address').val()));
// var g = encodeURI(encodeURI($('#type').val()));
// var h = $("#measure_date").val();
// var i = $("#begin_date").val();
// var j = $("#finish_date").val();
// var k = $("#job_no").val();
// var l = $("#rear").val();
// var m = encodeURI(encodeURI($('#decorate_team').val()));
// var n = $("#decorate_telephone").val();
// var o = $("#decorate_handle").val();
// var p = $("#decorate_outofpocket").val();
// var q = encodeURI(encodeURI($('#decorate_remark').val()));
// var r = encodeURI(encodeURI($('#furniture_supplier').val()));
// var s = $("#furniture_telephone").val();
// var t = $("#furniture_handle").val();
// var u = $("#furniture_outofpocket").val();
// var v = encodeURI(encodeURI($('#furniture_remark').val()));
// var w = $("#furniture_startdate").val();
// var x = $("#furniture_reachdate").val();
// var y = encodeURI(encodeURI($('#appliance_supplier').val()));
// var z = $("#appliance_telephone").val();
// var aa = encodeURI(encodeURI($('#appliance_remark').val()));
// var ab = $("#appliance_startdate").val();
// var ac = $("#appliance_reachdate").val();
// var ad = $("#appliance_handle").val();
// var ae = $("#appliance_outofpocket").val();
// var af = $("#handle").val();
// var ag = $("#out_of_pocket").val();
//	
// add(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ab,ac,ad,ae,af,ag);
// });
// function
// add(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ab,ac,ad,ae,af,ag){
// $.ajax({
// type: "GET",
// url: "pagehouse.do",
// data: "contract_no="+a+
// "&house_id="+b+
// "&district="+c+
// "&business_area="+d+
// "&estate="+e+
// "&address="+f+
// "&type="+g+
// "&measure_date="+h+
// "&begin_date="+i+
// "&finish_date="+j+
// "&job_no="+k+
// "&rear="+l+
// "&decorate_team="+m+
// "&decorate_telephone="+n+
// "&decorate_handle="+o+
// "&decorate_outofpocket="+p+
// "&decorate_remark="+q+
// "&furniture_supplier="+r+
// "&furniture_telephone="+s+
// "&furniture_handle="+t+
// "&furniture_outofpocket="+u+
// "&furniture_remark="+v+
// "&furniture_startdate="+w+
// "&furniture_reachdate="+x+
// "&appliance_supplier="+y+
// "&appliance_telephone="+z+
// "&appliance_remark="+aa+
// "&appliance_startdate="+ab+
// "&appliance_reachdate="+ac+
// "&appliance_handle="+ad+
// "&appliance_outofpocket="+ae+
// "&handle="+af+
// "&out_of_pocket="+ag,
// success: function(result){
// }
// })
// }
