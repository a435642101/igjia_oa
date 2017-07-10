$(function () {
//1本周2本月3上月4空置5过免租期空置6入房7本周8本月9上月10出房
	//总计
	//总计
	$.ajax({
		type: "GET",
		url: "gettotalstatistics.do",
		data: "",
		success: function(result){
			if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>").show();
				}else{
					var arr=JSON.parse(result);
					var a= 1;
					for(var key in arr){
						var browsers = [];
						var count="";
						var name="";
						for(var key1 in arr[key]){
							count = arr[key];
							count = parseInt(count[key1]);
							name = key1;
							browsers.push([name, count]); 
						}
						$('#container'+a).highcharts({
					        title: {
					            text: key
					        },
					        tooltip: {
					            pointFormat: '<b>{point.percentage:.1f}%</b>'
					        },
					        credits: {
								enabled:false
							},
							exporting: {
								enabled:false
							},
							chart: {
				                type: 'column',
				                backgroundColor: 'rgba(0,0,0,0)'
				            },
					        plotOptions: {
					            pie: {
					                allowPointSelect: true,
					                cursor: 'pointer',
					                dataLabels: {
					                    enabled: true,
					                     formatter: function() {  
						                        if (this.percentage > 0)  
						                            return this.percentage.toFixed(0) + ' %'; //这里进行判断（看这里）  
						                    },
					                    style: {
					                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',  
					                    },
					                    connectorColor: 'silver'
					                },
					                showInLegend: true
					            }
					        },
						       legend: {  
						            layout: 'vertical',  
						            labelFormatter: function () {  
						                return this.name +this.y+'套';//在名称后面追加数据  
						            }  
						        },  
					        colors:[
						           '#fa735c',
						           '#717bc8',
						           '#56cefc',
						           '#8ece70',
						           '#fdb667',
						    ],
						    series: [{
						       	name: '间数',
	                   			type: 'pie',
						        data: browsers
							}]
				  		});
						
				  		
				  		 a++;
						
					}
				}		
		}
	});

	
	
	//区域切换
	$(".mod11 .navbo ul li").click(function(){
		var count123 = $(this).attr("lang");
		$("."+count123).siblings(".count").hide();
		$("."+count123).show();
		$(this).addClass("ac1");
		$(this).siblings("li").removeClass("ac1");
		var region = $(this).text();
		if(count123=="count1"){
			
		}else{
		$.ajax({
			type: "GET",
			url: "getdistricttotalstatistics.do",
			data: "district="+encodeURI(encodeURI(region)),
			success: function(result){
				if(result=="error"){
					$("#loadmore").html("加载失败").show();
				}else if(result=="fail"){
					$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>").show();
				}else{
					var arr=JSON.parse(result);
					var a= 1;
					var html =	"<div style='width:100%;height:32px;'>"+
										"<select name='' class='dateone' style='margin-left:90%; margin-top:10px;'>"+
											"<option value='vacancy'>空置</option>"+
											"<option value='week' >本周</option>"+
											"<option value='month' >本月</option>"+
											"<option value='lastmonth'>上月</option>"+
											"<option value='total'>总计</option>"+
										"</select>"+
									"</div>"+
									"<div style='height:500px; width:100%; display:none;' class='vacancy now'>"+
										"<div id='"+count123+"4' class='left' style='width:68%; height:250px;'></div>"+
										"<div id='"+count123+"5' class='left' style='width:68%; height:250px;'></div>"+
									"</div>"+
									"<div style='height:500px; width:100%; display:none;' class='week now'>"+
										"<div id='"+count123+"1' class='left' style='width:68%; height:250px;'></div>"+
										"<div id='"+count123+"7' class='left' style='width:68%; height:250px;'></div>"+
									"</div>"+
									"<div style='height:500px; width:100%; display:none;' class='month now'>"+
										"<div id='"+count123+"2' class='left' style='width:68%; height:250px;'></div>"+
										"<div id='"+count123+"8' class='left' style='width:68%; height:250px;'></div>"+
									"</div>"+
									"<div style='height:500px; width:100%; display:none;' class='lastmonth now'>"+
										"<div id='"+count123+"3' class='left' style='width:68%; height:250px;'></div>"+
										"<div id='"+count123+"9' class='left' style='width:68%; height:250px;'></div>"+
									"</div>"+
									"<div style='height:500px; width:100%; display:none;' class='total now'>"+
										"<div id='"+count123+"6' class='left' style='width:68%; height:250px;'></div>"+					
										"<div id='"+count123+"10' class='left' style='width:68%; height:250px;'></div>"+					
									"</div>";
					$("."+count123).html("");
					$("."+count123).append(html);
					for(var key in arr){
						var browsers = [];
						var bro = [];
						var count="";
						var name="";
						for(var key1 in arr[key]){
							count = arr[key];
							count = parseInt(count[key1]);
							name = key1;
							browsers.push([count]); 
							bro.push(name);
							
						}
							var render = count123+a;
							var chart = new Highcharts.Chart({
						        chart: {
						            renderTo: render,
						            type: 'column',
						            margin: 75,
						            options3d: {
						                enabled: true,
						                alpha: 150,
						                beta: 150,
						                depth: 100,
						                viewDistance: 100
						            }
						        },
						        credits: {
								          enabled:false
								},
								exporting: {
								            enabled:false
								},
						        xAxis: {
						            categories: bro,
						            crosshair: true
						        },
						        
						        title: {
						            text: key
						        },
						        plotOptions: {
						            column: {
						                depth: 100
						            }
						        },
						        plotOptions: {
				                    series: {
				                        borderWidth: 0,
				                        dataLabels: {
				                            enabled: true,
				                            format: '{point.y:.0f}'
				                        }
				                    }
				                },
						        series: [{
						        	name: '间数',
	                   				colorByPoint: true,
						            data: browsers
						        }]
						    });
							
					  		 a++;
						}
						//date
						$("."+count123+" .vacancy").show();
						$(".count .dateone").change(function(){
							var dateone = $(this).val();
							$("."+dateone).siblings(".now").hide();
							$("."+dateone).show();
							
							//$("."+dateone).siblings(".now").css("visibility","hidden");
							//$("."+dateone).css("visibility","visible");
						});
					}		
			}
		});
		}
	})
	$.ajax({
		type: "GET",
		url: "getdistricttotalstatistics.do",
		data: "district="+encodeURI(encodeURI("全部")),
		success: function(result){
			if(result=="error"){
				$("#loadmore").html("加载失败").show();
			}else if(result=="fail"){
				$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>").show();
			}else{
				var arr=JSON.parse(result);
				var rent = arr.本月出房;
				var house = arr.本月入房;
				
				var html="";
				var html1="";
				for(var key in rent){
					html1+="<tr><td style='min-width:43px'></td><td>"+key+"</td><td>"+rent[key]+"</td></tr>";
					
				}
				for(var key in house){
					html+="<tr><td style='min-width:43px'></td><td>"+key+"</td><td>"+house[key]+"</td></tr>";
					
				}
				
				$(".mod231ul tbody").append(html);
				$(".mod232ul tbody").append(html1);
				
				var t = $(".mod231ul").DataTable({
					"aaSorting": [[ 2, "desc" ]],//默认第几个排序
					"bStateSave": false,//状态保存
					"aoColumnDefs": [
					  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
					  {"orderable":false,"aTargets":[1]}// 制定列不参与排序
					]
				});
				t.on('order.dt search.dt', function () {
			        t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
			            cell.innerHTML = "第"+parseInt(i+1)+"名";
			        } );
			    } ).draw();
				var y = $(".mod232ul").DataTable({
					"aaSorting": [[ 2, "desc" ]],//默认第几个排序
					"bStateSave": false,//状态保存
					"aoColumnDefs": [
					  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
					  {"orderable":false,"aTargets":[1]}// 制定列不参与排序
					]
				});
			    y.on('order.dt search.dt', function () {
			        y.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
			            cell.innerHTML = "第"+parseInt(i+1)+"名";
			        } );
			    } ).draw();
				$('table th').unbind("click");
			}		
		}
	});


	
	//最新入房
	$.ajax({
		type: "GET",
		url: "/pagehouse.do",
		data: "page=1",
		success: function(result){
			if(result=="error"){
				$("#loadmore").html("加载失败").show();
			}else if(result=="fail"){
				$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>").show();
			}else{
				var arr=JSON.parse(result);
				var html="";
				for ( var i = 0; i < arr.length; i++) {
					html+="<li>管家："+arr[i].job_no+"新入了一套编号为"+arr[i].house_id+"的房源</li>";
				}
				$(".mod21ul").prepend(html);
			}		
		}
	});
	
	//最新出房
	$.ajax({
		type: "GET",
		url: "pagerent.do",
		data: "page=1",
		success: function(result){
			if(result=="error"){
				$("#loadmore").html("加载失败").show();
			}else if(result=="fail"){
				$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>").show();
			}else{
				var arr=JSON.parse(result);
				
				var html="";
				for ( var i = 0; i < arr.length; i++) {
					html+="<li>管家："+arr[i].job_no+"新出了一套编号为"+arr[i].house_id+"的房源</li>";
				}
				$(".mod22ul").prepend(html);
			}		
		}
	});
});

function AutoTop(obj,por){
	  jQuery(obj).find(por).stop().animate({
	    marginTop:"-18px"
	  },500,function(){
	    jQuery(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
	  });
	}



	$(document).ready(function(){
	  var a=setInterval('AutoTop(".mod21",".mod21ul")',2000);
	  
	  $(".mod21").hover(function(){
	    clearInterval(a);
	  },function(){
	    a=setInterval('AutoTop(".mod21",".mod21ul")',2000);
	    
	  });
	  var b=setInterval('AutoTop(".mod22",".mod22ul")',2000);
	  
	  $(".mod22").hover(function(){
	    clearInterval(b);
	  },function(){
	    b=setInterval('AutoTop(".mod22",".mod22ul")',2000);
	    
	  });
	});
	$(function(){
		$(".count1 a").click(function(){
			var a = "."+$(this).attr("lang");
			$(".count1 "+a).siblings(".fac").hide();
			$(".count1 "+a).show();
			$(".count1 .shade").show();
		});
		$(".count1 .fac .close").click(function(){
			$(".count1 .shade").hide();
			$(this).parents(".fac").hide();
		});
	});
	$(document).bind("click",function(e){ 
		var target = $(e.target);
		if(target.closest(".count1 .fac,.count1 a").length == 0){ 
			$(".count1 .fac").hide(); 
			$(".count1 .shade").hide();
		}
	});

$(document).ready(		
		function() {			
			$('#mapclose').click(function(){
				$('#mapshow').hide();
			});
			$('#mapbutton').click(function(){
				$('#mapshow').show();
				var a = $('#mapshow iframe').attr("src");
				if(a==""){
					openurl("BaiduMap.html");
				}else{
					$('#mapshow').show();
				}
			});
		});
function openurl(url) {
	var rframe = document.getElementById("mapshowiframe");
	rframe.src = url;
}