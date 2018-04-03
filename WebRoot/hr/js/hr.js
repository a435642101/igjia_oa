$(function(){
	getDistrict();
});
//获取部门
function getDistrict(){
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
					var obj;
					var html="";
					var selectval="";
					for ( var i = 0; i < arr.length; i++) {
						obj=arr[i];
						html += "<li _href='"+obj.department+"' lang='"+obj.name+"'><div class='left' style='margin-left:20px;'>" +
							 		"<div style='margin-top:20px;'>"+obj.name+"</div>" +
							 		"<div style='color:#999999;'>"+obj.num+"人</div>" +
						 		"</div>" +
						 		"<div class='right icimg'><img src='images/untitled/anxiao.png' class='xuanduo' /></div>" +
						 		"<ul class='hand'>" +
							 		"<li><span class='f1' lang='"+obj.department+"' _class='add'>添加分组</span></li>" +
							 		"<li><span class='f2' lang='"+obj.department+"' _class='update' _name='"+obj.name+"'>重命名部门</span></li>" +
							 		"<li><span class='f3' onClick=\"deleteDept('"+obj.department+"')\">删除部门</span></li>" +
							 		"<li><span class='f4' lang='"+obj.department+"'>添加人员</span></li>" +
						 		"</ul></li>";
						selectval +="<option value='"+obj.department+"'>"+obj.name+"</option>";
					}
					
					$(".lfpart1").siblings(".lfpart").hide();
					$(".lfpart1").show();
					$(".lfpart1 .archi").html("");
					$("select[name=department]").html("");
					$("select[name=department]").append(selectval);
					$(".lfpart1 .archi").append(html);
				}
	       }
	  });
}



//获取分组
function getGroup(department,district){ 
	$.ajax({
	       type: "GET",
	       url: "/getGroupByDept.do",
	       data: "department="+department,
	       success: function(result){
	    	   var arr=JSON.parse(result);
	    	   if(result=="error"){
	    		    window.top.document.location.href='../login.html';
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj;
					var html="";
					$(".lfpart2").siblings(".lfpart").hide();
					$(".lfpart2").show();
					var group = "<option value=''>无</option>";
					for (var i = 0; i < arr.group.length; i++) {
						obj=arr.group[i];
						html += "<li class='grf' _href='"+obj.department+"' lang='"+obj.district_id+"'><div class='left' style='margin-left:20px;'>" +
							 		"<div style='margin-top:20px;' class='objdistrict'>"+obj.district+"</div>" +
							 		"<div style='color:#999999;'>"+obj.num+"人</div>" +
						 		"</div>" +
						 		"<div class='right icimg'><img src='images/untitled/anxiao.png' class='xuanduo' /></div>" +
						 		"<ul class='hand'>" +
							 		"<li><span class='f2' onClick=\"deleteDeptGroup('"+obj.department+"','"+obj.district_id+"','"+district+"')\">删除该组</span></li>" +
							 		"<li><span class='f3' lang='"+obj.department+"' _href='"+obj.district_id+"'>添加人员</span></li>" +
						 		"</ul></li>";
						group +="<option value='"+obj.district_id+"'>"+obj.district+"</option>";
								
					}
					
					for (var i = 0; i < arr.staff.length; i++) {
						obj=arr.staff[i];
						html += "<li class='namef' _href='"+obj.job_no+"'>" +
									"<div class='picimg left'>" +
										"<img src='images/untitled/tou.png' />" +
									"</div>" +
									"<div class='left' style='margin-left:20px;'>" +
										"<div style='margin-top:20px; color:#666666;'>"+obj.name+"</div>" +
										"<div style='color:#999999;'>"+obj.position+"</div>" +
									"</div>" +
								"</li>";
					}
					$(".bumen").text(district);
					$(".bumen").attr("_href",department);
					$(".lfpart3 select[name=district]").html("");
					$(".lfpart3 select[name=district]").append(group);
					$(".lfpart2 .archi").html("");
					$(".lfpart2 .archi").append(html);
				}
	       }
	  });
}

//获取员工
function getStaffByDD(district_id,department,district){
	$.ajax({
	       type: "GET",
	       url: "/getStaffByDD.do",
	       data: "district_id="+district_id+"&department="+department,
	       success: function(result){
	    	   var arr=JSON.parse(result);
	    	   if(result=="error"){
	    		    window.top.document.location.href='../login.html';
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj;
					var html="";
					$(".lfpart6").siblings(".lfpart").hide();
					$(".lfpart6").show();
					
					for (var i = 0; i < arr.msg.length; i++) {
						obj=arr.msg[i];
						html += "<li _href='"+obj.job_no+"'>" +
									"<div class='picimg left'>" +
										"<img src='images/untitled/tou.png' />" +
									"</div>" +
									"<div class='left' style='margin-left:20px;'>" +
										"<div style='margin-top:20px; color:#666666;' class='objname'>"+obj.name+"</div>" +
										"<div style='color:#999999;'>"+obj.position+"</div>" +
									"</div>" +
								"</li>";
					}
					
					$(".fenzu").text(district);
					$("a.fenzu").attr("_href",district_id);
					$("a.bumen").attr("_href",department);
					$(".lfpart6 .archi").html("");
					$(".lfpart6 .archi").append(html);
				}
	       }
	  });
}

//获取员工详情
function getStaff(job_no){
	$.ajax({
	       type: "GET",
	       url: "/getStaff.do",
	       data: "job_no="+job_no,
	       success: function(result){
	    	   	if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					if(arr.code=="2"){
						alert("参数异常");
					}else{						
						var obj=arr.msg;
						if(obj==null){
							alert("工号不存在");
						}else{
							var html="";
							$(".lfpart3").siblings(".lfpart").hide();
							$(".lfpart3").show();
							$("#name3").text(obj.name);
							$("#department").text($(".lfpart3 .bumen").text());
							$(".position").text(obj.position);
							$("#phone").text(obj.telephone);
							$("#job_no").text(obj.job_no);
							$("#state").text(obj.state);
							$("a.fenzu").attr("_href", obj.district);
							$("a.bumen").attr("_href", obj.department);
							
							findDistrict(obj.department);
							findGroup(obj.department,obj.district);
						}
						
					}
				}
	       }
	  });
}
//房源详情
//function getStaffHouse(job_no){
//	$.ajax({
//	       type: "GET",
//	       url: "/getStaffHouse.do",
//	       data: "job_no="+job_no,
//	       success: function(result){
//	    	   	if(result=="fail"){
//					window.top.document.location.href='../login.html';
//	    	   	}else if(result=="refused"){
//					$(".lfpart3 .body").remove();
//				}else{
//					var arr=JSON.parse(result);
//					if(arr.code=="2"){
//						alert("没有房源");
//					}else if(arr.code=="3"){
//						alert("非业务部人员");	
//					}else{						
//						var obj;
//						var html="";
//						for (var i = 0; i < arr.msg.length; i++) {
//							obj = arr.msg[i];
//							html +="<tr>" +
//									"<td><input type='checkbox' checked='checked' /></td>" +
//									"<td>"+obj.house_id+"</td>" +									
//									"<td>"+obj.address+"</td>" +
//									"<td>"+obj.room_yuqichufangjia+"</td>" +
//									"<td>"+obj.state+"</td>" +
//									"</tr>"
//						}
//						
//						$(".lfpart3 table tbody").append(html);
//					}
//				}
//	       }
//	  });
//}
//房源转让
function getStaffHouse(job_no){
	$(".lfpart3 .houseinfo table tbody").html("");
	$(".loading").show();
	$.ajax({
	       type: "GET",
	       url: "/getStaffHouse.do",
	       data: "job_no="+job_no,
	       success: function(result){
	    	   	if(result=="fail"){
					window.top.document.location.href='../login.html';
	    	   	}else if(result=="refused"){
					$(".lfpart3 .body").hide();
				}else{
					$(".lfpart3 .body").show();
					var arr=JSON.parse(result);
					if(arr.code=="2"){
						$(".lfpart3 .houseinfo .ishyw").text("该员工名下无任何房源");
						$(".lfpart3 .houseinfo .houseget").hide();
						$(".lfpart3 .houseinfo table tbody").html("");
					}else if(arr.code=="3"){
						$(".lfpart3 .houseinfo .ishyw").text("非业务部人员");
						$(".lfpart3 .houseinfo .houseget").hide();
						$(".lfpart3 .houseinfo table tbody").html("");
					}else{				
					
						var obj;
						var html="";
						for (var i = 0; i < arr.msg.length; i++) {
							obj = arr.msg[i];
							html +="<tr>" +
									"<td><input type='checkbox' checked='checked' value='"+obj.house_id+"' /></td>" +
									"<td>"+obj.house_id+"</td>" +									
									"<td>"+obj.address+"</td>" +
									"<td>"+obj.room_yuqichufangjia+"</td>" +
									"<td>"+obj.state+"</td>" +
									"</tr>"
						}
						$(".lfpart3 .houseinfo .houseget").show();
						$(".lfpart3 .houseinfo .ishyw").text("");
						$(".lfpart3 .houseinfo table tbody").html(html);
						$('.table-sort').dataTable({
							"aaSorting": [[ 4, "desc" ]],//默认第几个排序
							"bStateSave": false,//状态保存
							"bPaginate":false,
							"bDestroy":true,
							"bRetrieve": true,
							"aoColumnDefs": [
							  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
							  {"orderable":false,"aTargets":[0,1,2]}// 制定列不参与排序
							]
						});
						
					}
					$('.loading').hide();
					
				}
	       }
	  });
}

function getStaffinfo(job_no){
	$.ajax({
	       type: "GET",
	       url: "/getStaffinfo.do",
	       data: "job_no="+job_no,
	       success: function(result){
				if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else if(result=="refused"){
					$(".lfpart3 .body").hide();
				}else{
					$(".lfpart3 .body").show();
					var arr=JSON.parse(result);
					if(arr.code=="2"){
						alert("参数异常");
					}else{
						var obj=arr.msg;
						var html="";
						$(".lfpart3 input[name=name]").val(obj.name);
						$(".lfpart3 select[name=department]")[0].value=obj.department;
						$(".lfpart3 input[name=position]").val(obj.position);
						$(".lfpart3 input[name=permission]").val(obj.permission);
						$(".lfpart3 input[name=idcard]").val(obj.idcard);
						$(".lfpart3 input[name=origo]").val(obj.origo);
						$(".lfpart3 input[name=social_security]").val(obj.social_security);
						$(".lfpart3 input[name=email]").val(obj.email);
						$(".lfpart3 input[name=emergency_contactname]").val(obj.emergency_contactname);
						$(".lfpart3 input[name=job_no]").val(obj.job_no);
						$(".lfpart3 select[name=district]")[0].value=obj.district;
						$(".lfpart3 input[name=business_area]").val(obj.business_area);
						$(".lfpart3 select[name=state]")[0].value=obj.state;
						$(".lfpart3 input[name=telephone]").val(obj.telephone);
						$(".lfpart3 input[name=address]").val(obj.address);
						$(".lfpart3 input[name=prfunds]").val(obj.prfunds);
						$(".lfpart3 input[name=vxin]").val(obj.vxin);
						$(".lfpart3 input[name=emergency_contacttelephone]").val(obj.emergency_contacttelephone);
					}
				}
	       }
	  });
}

//添加部门
function addDept(name){
	$('.loading').show();
	$.ajax({
	       type: "GET",
	       url: "/addDept.do",
	       data: "name="+name,
	       success: function(result){
	    	   var obj=JSON.parse(result);
	    	   if(obj.code=="2"){
	    		    alert("参数错误 请重新输入");
				}else if(obj.code=="3"){
					$(".handle").show();
					setTimeout(function () { 
			        $(".handle1").fadeOut(4000);
			   		 }, 1000);
				}else{
					$(".popup").hide(1000);
					$(".handle").show();
					setTimeout(function () { 
			        $(".handle").fadeOut(4000);
			   		 },1000);
					getDistrict();
				}
	    	   $('.loading').hide();
	    	   
	       }
	  });
}

//修改部门名
function putDept(name,department){
	$(".loading").show();
	$.ajax({
	       type: "GET",
	       url: "/updateDept.do",
	       data: "name="+name+"&department="+department,
	       success: function(result){
	    	   var obj=JSON.parse(result);
	    	   if(obj.code=="2"){
	    		    alert("参数错误 请重新输入");
				}else if(obj.code=="3"){
					$(".handle").show();
					setTimeout(function () { 
			        $(".handle1").fadeOut(4000);
			   		 }, 1000);
				}else{
					$(".popup").hide(1000);
					$(".handle").show();
					setTimeout(function () { 
			        $(".handle").fadeOut(4000);
			   		 }, 1000);
					
					getDistrict();
					
				}
	    	   $(".loading").hide();
	    	   
	       }
	  });
}

//修改分组名
function putGroup(department,district_id,district){
	$(".loading").show();
	$.ajax({
	       type: "GET",
	       url: "/updateDeptGroup.do",
	       data: "department="+department+"&district_id="+district_id+"&district="+district,
	       success: function(result){
	    	   var obj=JSON.parse(result);
	    	   if(obj.code=="2"){
	    		    alert("参数错误 请重新输入");
				}else if(obj.code=="3"){
					$(".handle").show();
					setTimeout(function () { 
			        $(".handle1").fadeOut(4000);
			   		 }, 1000);
				}else if(obj.code=="4"){
					alert("业务部不可更改组名");
				}else{
					$(".popup").hide(1000);
					$(".handle").show();
					setTimeout(function () { 
			        $(".handle").fadeOut(4000);
			   		 }, 1000);
					
					getDistrict();
					
				}
	    	   $(".loading").hide();
	    	   
	       }
	  });
}
//删除部门
function deleteDept(department){
	if(window.confirm('你确定要删除该部门吗？')){
		$.ajax({
		       type: "GET",
		       url: "/deleteDept.do",
		       data: "department="+department,
		       success: function(result){
		    	   if(result=='fail'){
		    		   window.top.document.location.href='../login.html';
		    	   }else{
		    		   var obj=JSON.parse(result);
			    	   if(obj.code=="2"){
			    		    alert("参数错误 请稍后再试");
						}else if(obj.code=="3"){
							$(".handle1").show();
							setTimeout(function () { 
					        $(".handle1").fadeOut(4000);
					   		 }, 1000);
						}else if(obj.code=="4"){
							alert("部门下还有员工 ,请先移除再进行操作");
						}else{
							$(".popup").hide(1000);
							$(".handle").show();
							setTimeout(function () { 
					        $(".handle").fadeOut(4000);
					   		 }, 1000);
							getDistrict();
						}
		    	   }
		       }
		  });
        return true;
     }else{
        return false;
    }
	
}
//删除分组
function deleteDeptGroup(department,district_id,district){
	if(window.confirm('你确定要删除该分组吗？')){
		$.ajax({
		       type: "GET",
		       url: "/deleteDeptGroup.do",
		       data: "department="+department+"&district_id="+encodeURI(encodeURI(district_id)),
		       success: function(result){
		    	   if(result=='fail'){
		    		   window.top.document.location.href='../login.html';
		    	   }else{
		    		   var obj=JSON.parse(result);
			    	   if(obj.code=="2"){
			    		    alert("参数错误 请稍后再试");
						}else if(obj.code=="3"){
							$(".handle1").show();
							setTimeout(function () { 
					        $(".handle1").fadeOut(4000);
					   		 }, 1000);
						}else if(obj.code=="4"){
							alert("部门下还有员工 ,请先移除再进行操作");
						}else{
							$(".popup").hide(1000);
							$(".handle").show();
							setTimeout(function () { 
					        $(".handle").fadeOut(4000);
					   		 }, 1000);
							getGroup(department,district);
						}
		    	   }
		       }
		  });
        return true;
     }else{
        return false;
    }
	
}

//添加分组
function addGroup(department,district){
	$(".loading").show();
	$.ajax({
	       type: "GET",
	       url: "/addGroup.do",
	       data: "department="+department+"&district="+district,
	       success: function(result){
	    	   var obj=JSON.parse(result);
	    	   if(obj.code=="2"){
	    		    alert("参数错误 请重新输入");
				}else if(obj.code=="3"){
					$(".handle").show();
					setTimeout(function () { 
			        $(".handle1").fadeOut(4000);
			   		 }, 1000);
				}else{
					$(".popupgrop").hide(1000);
					$(".handle").show();
					setTimeout(function () { 
			        $(".handle").fadeOut(4000);
			   		 }, 1000);
				}
	    	   $(".loading").hide();
	       }
	  });
}

$(function(){
	$("a.gongsi").click(function(){
		getDistrict();
	});
	$("a.bumen").click(function(){
		var department = encodeURI(encodeURI($(this).attr("_href")));
		var district = $(this).text();
		getGroup(department,district); 
	});
	$("a.fenzu").click(function(){
		var district_id = encodeURI(encodeURI($(this).attr("_href")));
		var department = encodeURI(encodeURI($("a.bumen").attr("_href")));
		var district = $(this).text();
		getStaffByDD(district_id,department,district);
	});
	//员工查找
	$(".findsta > a").click(function(){
		$(".lfpart4").siblings(".lfpart").hide();
		$(".findstaff .archid,.lfpart4 .archi,.popup1,.popup").hide();
		$(".lfpart4,.findstaff").show();
		$(".lfpart4 input").val("");
		$(".lfpart4 select")[0].value="1";
		$(".lfpart4 .restypea select").attr("placeholder","请输入姓名");
		$(".lfpart4 .restypea span").text("输入姓名");
	});
	
	$(".lfpart4 .archi li").click(function(){
		$(".lfpart3").siblings(".lfpart").hide();
		$(".lfpart3").show();
	});
	
	
	//架构
	$(".lfnav .archi li").click(function(){
		getDistrict();
		$(".lfpart1").siblings(".lfpart").hide();
		$(".lfpart1").show();
		$(".popup1").hide();
		$(".popup").hide();
		$(".popupgrop").hide();
	});
	//添加
	$(".lfnav .archi li ul.hand li span.f1").click(function(){
		$(".popup").show();
		$(".popup button").attr("class","add");
		$(".popup input").val("");
		$(".popup button").text("确认添加");
	});
	$(".lfpart1 .archi").on("click","li ul.hand li span.f1",function(){
		var lang = $(this).attr("lang");
		$(".popupgrop button").attr("lang",lang);
		$(".popupgrop").show();
	});
	$(".lfpart1 .archi").on("click","li ul.hand li span.f2",function(){
		var lang = $(this).attr("lang");
		$(".popup").show();
		$(".popup button").attr("class","update");
		$(".popup button").attr("lang",lang);
		$(".popup input").val($(this).attr("_name"));
		$(".popup button").text("确认修改");
	});
	$(".lfpart1 .archi").on("click","li ul.hand li span.f4",function(){
		var department = $(this).attr("lang");
		$(".lfpart5").siblings(".lfpart").hide();
		$(".lfpart5").show();
		getuGroup(department,".lfpart5");
		$(".lfpart5 select[name=department]")[0].value=department;
	});
	$(".lfpart2 .archi").on("click","li ul.hand li span.f3",function(){
		var department = $(this).attr("lang");
		var district_id = $(this).attr("_href");
		$(".lfpart5").siblings(".lfpart").hide();
		$(".lfpart5").show();
		$(".lfpart5 select[name=department]")[0].value=department;
		getuGroup(department,".lfpart5");
		
		$(".lfpart5 select[name=district]")[0].value=district_id;
	   
	});
	
	//部门
	$(".lfpart1").on("click",".archi li",function(){
		var department = encodeURI(encodeURI($(this).attr("_href")));
		var district = $(this).attr("lang");
		getGroup(department,district);
	});
	//部门信息
	$(".lfpart2").on("click",".archi li.grf",function(){
		var district_id = encodeURI(encodeURI($(this).attr("lang")));
		var department= encodeURI(encodeURI($(this).attr("_href")));
		var district = $(this).children("div").children(".objdistrict").text();
		getStaffByDD(district_id,department,district);
	});
	$(".lfpart2").on("click",".archi li.namef",function(){
		var job_no = encodeURI(encodeURI($(this).attr("_href")));
		$(".jiankuohao").text("");
		$(".lfpart3 .bhead li:first").addClass("act");
		$(".lfpart3 .bhead li:first").siblings("li").removeClass("act");
		$(".lfpart3 .infodeta").css("display","block");
		$(".lfpart3 .infodeta").siblings("div").css("display","none");
		getStaff(job_no);
		getStaffinfo(job_no);
		
	});
	$(".lfpart6").on("click",".archi li",function(){
		var job_no = encodeURI(encodeURI($(this).attr("_href")));
		$(".jiankuohao").text(">");
		$(".lfpart3 .bhead li:first").addClass("act");
		$(".lfpart3 .bhead li:first").siblings("li").removeClass("act");
		$(".lfpart3 .infodeta").css("display","block");
		$(".lfpart3 .infodeta").siblings("div").css("display","none");
		getStaff(job_no);
		getStaffinfo(job_no);
		
	});
	
	//详细信息
	$(".lfpart3 .body > .bhead > li:eq(1)").click(function(){
		var job_no = encodeURI(encodeURI($("#job_no").text()));
		getStaffHouse(job_no);
	});
	
	$(".body > .bhead > li").click(function(){
		var a = $(this).attr("lang");
		$("."+a).siblings("div").hide();
		$("."+a).show();
		if(a!="houseinfo"){
			$(".popup1").hide();
		}
		
	});
	$(".houseget").click(function(){
		$(".popup1").show();
	});
	
	$(".nav > ul > li .rench").hover(function(){
		$(this).siblings(".toujiao").show();
		$(this).parents("li").siblings("li").children(".toujiao").hide();
	});
	$(".mnav > ul > li").hover(function(){
		$(this).addClass("act");
		$(this).siblings("li").removeClass("act");
	});
	
	function stopDefault(e) {
        //阻止默认浏览器动作(W3C)
        if (e && e.preventDefault)
            e.preventDefault();
        //IE中阻止函数器默认动作的方式
        else
            window.event.returnValue = false;
        return false;
    }
	$(".archi li ul.hand li span,.archi li ul.hand li").click(function(e){
		e = e || window.event;
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	});
	$(".archi").on("click"," li ul.hand li span,li ul.hand li",function(e){
		e = e || window.event;
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	});
	$(".archi").on("click","li .xuanduo",function(e){
		e = e || window.event;
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}	
		$(".hand").hide();
		$(this).parents(".icimg").siblings(".hand").show();
	});
	$(".archi").on("mouseover",".xuanduo",function(){
		$(this).attr("src","images/untitled/xuanduo.png");
	})
	$(".archi").on("mouseout",".xuanduo",function(){
		$(this).attr("src","images/untitled/anxiao.png");
	})
	$(document).bind("click",function(e){ 
		var target = $(e.target);
		if(target.closest(".hand,.xuanduo").length == 0){ 
			$(".hand").hide(); 
		}
	});
	$(".popup img.close").click(function(){
		$(".popup").hide();
	});
	$(".popupgrop img.close").click(function(){
		$(".popupgrop").hide();
	});
	$(".popup1 img.close").click(function(){
		$(".popup1").hide();
		
	});
	//添加部门
	$(".popup").on("click","button.add",function(){
		var name = encodeURI(encodeURI($('.popup input[name=name]').val()));
		if(name!=""){
			addDept(name);
		}else{
			alert("请输入部门名");
		}
		
	});
	$(".popup").on("click","button.update",function(){
		var name = encodeURI(encodeURI($('.popup input[name=name]').val()));
		var lang = $(this).attr("lang");
		if(name!=""){
			putDept(name,lang);
		}else{
			alert("请输入部门名");
		}
		
	});
	$(".popupgrop button").click(function(){
		var department = encodeURI(encodeURI($(this).attr("lang")));
		var district = encodeURI(encodeURI($('.popupgrop input[name=district]').val()));
		if(district!=""){
			addGroup(department,district);
		}else{
			alert("请输入分组名");
		}
		
	});
	$(".body .infodeta button.houseget").click(function(){
		$(".popup1").show();
	});
	$(".body .bhead li").click(function(){
		$(this).attr("lang");
		$(this).addClass("act");
		$(this).siblings("li").removeClass("act");
	});
});
function add(name,department,position,idcard,origo,social_security,email,emergency_contactname,district,business_area,telephone,address,prfunds,vxin,emergency_contacttelephone){
	$('.loading').show();
	$.ajax({
	       type: "GET",
	       url: "/addStaff.do",
	       data: "name="+encodeURI(encodeURI(name))+
	       		 "&department="+department+
	       		 "&position="+encodeURI(encodeURI(position))+
	       		 "&idcard="+idcard+
	       		 "&origo="+encodeURI(encodeURI(origo))+
	       		 "&social_security="+social_security+
	       		 "&email="+email+
	       		 "&emergency_contactname="+encodeURI(encodeURI(emergency_contactname))+
	       		 "&district="+encodeURI(encodeURI(district))+
		   		 "&business_area="+encodeURI(encodeURI(business_area))+
	       		 "&telephone="+telephone+
	       		 "&address="+encodeURI(encodeURI(address))+
	       		 "&prfunds="+prfunds+
	       		 "&vxin="+vxin+
	       		 "&emergency_contacttelephone="+emergency_contacttelephone,
	       success: function(result){
	    	   var obj=JSON.parse(result);
	    	   if(obj.code=="2"){
	    		    alert("添加失败");
				}else if(obj.code=="3"){
					alert("名字已存在");
				}else{
					alert("添加成功,工号是"+obj.job_no+",初始密码是:"+obj.pwd);
					var districtname = $(".lfpart5 select[name=district] option:selected").text();
					var departmentname = $(".lfpart5 select[name=department] option:selected").text();
					if(districtname=="无"){
						getGroup(department,departmentname);
					}else{
						getStaffByDD(district,department,districtname);
					}
				}
	    	   $('.loading').hide();
	       }
	});
}
function update(name,department,position,idcard,origo,social_security,email,emergency_contactname,job_no,district,business_area,state,telephone,address,prfunds,vxin,emergency_contacttelephone,password){
	$('.loading').show();
	$.ajax({
	       type: "GET",
	       url: "/updateStaff.do",
	       data: "name="+encodeURI(encodeURI(name))+
	       		 "&department="+department+
	       		 "&position="+encodeURI(encodeURI(position))+
	       		 "&idcard="+idcard+
	       		 "&origo="+encodeURI(encodeURI(origo))+
	       		 "&social_security="+social_security+
	       		 "&email="+email+
	       		 "&emergency_contactname="+encodeURI(encodeURI(emergency_contactname))+
	       		 "&job_no="+job_no+
	       		 "&district="+encodeURI(encodeURI(district))+
		   		 "&business_area="+encodeURI(encodeURI(business_area))+
	       		 "&state="+encodeURI(encodeURI(state))+
	       		 "&telephone="+telephone+
	       		 "&address="+encodeURI(encodeURI(address))+
	       		 "&prfunds="+prfunds+
	       		 "&vxin="+vxin+
	       		 "&emergency_contacttelephone="+emergency_contacttelephone+
				 "&pwd="+password,
	       success: function(result){
	    	   var obj=JSON.parse(result);
	    	   alert(obj.msg);
	    	   $('.loading').hide();
	       }
	});
}
//获取单个部门名
function findDistrict(name){
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
					var obj;
					var html="";
					var selectval="";
					for (var i = 0; i < arr.length; i++) {
						obj=arr[i];
						if(obj.department==name){
							$("a.bumen").text(obj.name);
							return false;
						}
						
					}
					
					
				}
	       }
	  });
}


//获取单个分组名
//获取分组
function findGroup(department,district_id){
	$.ajax({
	       type: "GET",
	       url: "/getGroupByDept.do",
	       data: "department="+department,
	       success: function(result){
	    	   var arr=JSON.parse(result);
	    	   if(result=="error"){
	    		    window.top.document.location.href='../login.html';
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj;
					var html="";
					var group = "<option value=''>无</option>";
					
					$("span.jiankuohao").text(">");
					if(district_id!=""){					
						for (var i = 0; i < arr.group.length; i++) {
							obj=arr.group[i];
							if(district_id==obj.district_id){
								$("a.fenzu").text(obj.district);
								return false;
							}				
						}
					}else{
						$("a.fenzu").text("");
						$("span.jiankuohao").text("");
					}
				}
	       }
	  });
}
//获取分组
function getuGroup(department,clss){
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
					var group = "<option value=''>无</option>";
					for (var i = 0; i < arr.group.length; i++) {
						obj=arr.group[i];
						group +="<option value='"+obj.district_id+"'>"+obj.district+"</option>";			
					}
					$(clss+" select[name=district]").html("");
					$(clss+" select[name=district]").append(group);
	    	   }
	       }
	  });
}

//获取业务部分组
function getAllDistrict(){
	$.ajax({
	       type: "GET",
	       url: "/getAllDistrict.do",
	       data: "",
	       success: function(result){
	    	   if(result=='fail'){
	    		   window.top.document.location.href='../login.html';
	    	   }else{
	    	    var arr=JSON.parse(result);
				var obj;
				var group = "";
				for (var i = 0; i < arr.length; i++) {
					obj=arr[i];
					group +="<option value='"+obj.district_id+"'>"+obj.district+"</option>";			
				}
				$(".popup1 select[name=district]").html("");
				$(".popup1 select[name=district]").append(group);
	    	   }
	       }
	  });
}

//批量转移房源
function transferHouse(job_no,house_id){
	$(".loading").show();
	$.ajax({
	       type: "GET",
	       url: "/transferHouse.do",
	       data: "job_no="+job_no+"&house_id="+house_id,
	       success: function(result){
	    	   if(result=='fail'){
	    		   window.top.document.location.href='../login.html';
	    	   }else if(result=='refused'){
	    		   alert("权限不够");
	    	   }else{
	    		   var arr=JSON.parse(result);
	    		   if(arr.code=="2"){
	    			  
	    		   }else if(arr.code=="3"){
	    			   alert(arr.msg);
	    		   }else{
						$(".houseinfo table input[type=checkbox]:checked").each(function(){
							$(this).parents("td").parents("tr").remove();
						})
						if($(".houseinfo table tbody").html()==""){
							$(".lfpart3 .houseinfo .ishyw").text("该员工名下无任何房源");
							$(".lfpart3 .houseinfo .houseget").hide();
						}
	    			   alert("修改成功");
	    		   }
	    	   }
	    	   $(".loading").hide();
	       }
	  });
}

$(function(){
	getAllDistrict();
	//添加初始化分组
	$(".popup1 button").click(function(){
		var id = new Array();
		$(".houseinfo table tbody input[type=checkbox]:checked").each(function(){
			var arg = $(this).val();
			id.push(arg)
		});
		var name = encodeURI(encodeURI($("input[name=popup1name]").val()));
		SearchStaff(name);
		var job_no = $("input[name=popup1name]").attr("lang");
		transferHouse(job_no,id);
	});

	//全选
	$(".lfpart3 .houseinfo table th:eq(0) input").click(function(){
		var thchecked = $(this).is(":checked");
		if(thchecked==false){
			$(this).prop("checked",false);
			$(".lfpart3 .houseinfo table td input[type=checkbox]").prop("checked",false);
		}else{
			$(this).prop("checked",true);
			$(".lfpart3 .houseinfo table td input[type=checkbox]").prop("checked",true);	
		}		
	});
	//下拉
	$(".lfpart3 select[name=department]").change(function(){
		var department = $(this).val();
		getuGroup(department,".lfpart3");
	});
	$(".lfpart5 select[name=department]").change(function(){
		var department = $(this).val();
		getuGroup(department,".lfpart5");
	});
	$(".lfpart3 .infodeta button.updatestaff").click(function(){
		var name = $(".lfpart3 input[name=name]").val();
		var department = $(".lfpart3 select[name=department]").val();
		var position = $(".lfpart3 input[name=position]").val();
		//var permission = $(".lfpart3 input[name=permission]").val();
		var idcard = $(".lfpart3 input[name=idcard]").val();
		var origo = $(".lfpart3 input[name=origo]").val();
		var social_security = $(".lfpart3 input[name=social_security]").val();
		var email = $(".lfpart3 input[name=email]").val();
		var emergency_contactname = $(".lfpart3 input[name=emergency_contactname]").val();
		
		var job_no = $(".lfpart3 input[name=job_no]").val();
		var district = $(".lfpart3 select[name=district]").val();
		var business_area = $(".lfpart3 input[name=business_area]").val();
		var state = $(".lfpart3 select[name=state]").val();
		var telephone = $(".lfpart3 input[name=telephone]").val();
		var address = $(".lfpart3 input[name=address]").val();
		var prfunds = $(".lfpart3 input[name=prfunds]").val();
		var vxin = $(".lfpart3 input[name=vxin]").val();
		var password = $(".lfpart3 input[name=password]").val();
		var emergency_contacttelephone = $(".lfpart3 input[name=emergency_contacttelephone]").val();
		var is = true;
		$(".lfpart3 input").each(function(){
			var name  = $(this).val();
			var name1 =  $(this).attr("name");
			if(name1 == "address"){
				if(name.length>50){
					$(this).css("border-color","red");
					is = false;
				}
			}else{
				if(name.length>20){
					$(this).css("border-color","red");
					is = false;
				}
			}
		})
		if(is==true){
			update(name,department,position,idcard,origo,social_security,email,emergency_contactname,job_no,district,business_area,state,telephone,address,prfunds,vxin,emergency_contacttelephone,password);
		}else{
			alert("所有数据长度最高20位,地址最高50位");
		}
	});
	
	$(".lfpart5 button.addstaff").click(function(){
		var name = $(".lfpart5 input[name=name]").val();
		var department = $(".lfpart5 select[name=department]").val();
		var position = $(".lfpart5 input[name=position]").val();
		//var permission = $(".lfpart5 input[name=permission]").val();
		var idcard = $(".lfpart5 input[name=idcard]").val();
		var origo = $(".lfpart5 input[name=origo]").val();
		var social_security = $(".lfpart5 input[name=social_security]").val();
		var email = $(".lfpart5 input[name=email]").val();
		var emergency_contactname = $(".lfpart5 input[name=emergency_contactname]").val();
		
		var district = $(".lfpart5 select[name=district]").val();
		var business_area = $(".lfpart5 input[name=business_area]").val();
		var telephone = $(".lfpart5 input[name=telephone]").val();
		var address = $(".lfpart5 input[name=address]").val();
		var prfunds = $(".lfpart5 input[name=prfunds]").val();
		var vxin = $(".lfpart5 input[name=vxin]").val();
		var emergency_contacttelephone = $(".lfpart5 input[name=emergency_contacttelephone]").val();
		var is = true;
		$(".lfpart5 input").each(function(){
			var name  = $(this).val();
			var name1 =  $(this).attr("name");
			if(name1 == "address"){
				if(name.length>50){
					$(this).css("border-color","red");
					is = false;
				}
			}else{
				if(name.length>20){
					$(this).css("border-color","red");
					is = false;
				}
			}
			
		})
		if(is==true){
			add(name,department,position,idcard,origo,social_security,email,emergency_contactname,district,business_area,telephone,address,prfunds,vxin,emergency_contacttelephone);
		}else{
			alert("所有数据长度最高20位,地址最高50位");
		}
	});
});

//获取员工
function getStaffByDD(district_id,department,district){
	$.ajax({
	       type: "GET",
	       url: "/getStaffByDD.do",
	       data: "district_id="+district_id+"&department="+department,
	       success: function(result){
	    	   var arr=JSON.parse(result);
	    	   if(result=="error"){
	    		    window.top.document.location.href='../login.html';
				}else if(result=="fail"){
					window.top.document.location.href='../login.html';
				}else{
					var arr=JSON.parse(result);
					var obj;
					var html="";
					$(".lfpart6").siblings(".lfpart").hide();
					$(".lfpart6").show();
					
					for (var i = 0; i < arr.msg.length; i++) {
						obj=arr.msg[i];
						html += "<li _href='"+obj.job_no+"'>" +
									"<div class='picimg left'>" +
										"<img src='images/untitled/tou.png' />" +
									"</div>" +
									"<div class='left' style='margin-left:20px;'>" +
										"<div style='margin-top:20px; color:#666666;' class='objname'>"+obj.name+"</div>" +
										"<div style='color:#999999;'>"+obj.position+"</div>" +
									"</div>" +
								"</li>";
					}
					
					$(".fenzu").text(district);
					$("a.fenzu").attr("_href",district_id);
					$("a.bumen").attr("_href",department);
					$(".lfpart6 .archi").html("");
					$(".lfpart6 .archi").append(html);
				}
	       }
	  });
}

$(function(){
	//切换输入姓名工号
	$(".findstaff select[name=restype]").change(function(){
		var restype = $(this).val();
		if(restype=="1"){
			$(".restypea span").text("输入姓名");
			$(".restypea input").attr("placeholder","请输入姓名");
		}else{
			$(".restypea span").text("输入工号");
			$(".restypea input").attr("placeholder","请输入工号");
		}
	});
	$(".findstaff button").click(function(){
		var restype = $(".findstaff select[name=restype]").val();
		if(restype=="1"){
			var name = encodeURI(encodeURI($(".findstaff input[name=resname]").val()));
			SearchStaff1(name);
			var job_no = $(".findstaff input[name=resname]").attr("lang");
			var is = $(".findstaff input[name=resname]").attr("_is");
			if(is=="y"){
				$(".lfpart3 .bhead li:first").addClass("act");
				$(".lfpart3 .bhead li:first").siblings("li").removeClass("act");
				$(".lfpart3 .infodeta").css("display","block");
				$(".lfpart3 .infodeta").siblings("div").css("display","none");
				getStaff(job_no);
				getStaffinfo(job_no);
				
				var district_id = $("a.fenzu").attr("_href");
				var department = $("a.bumen").attr("_href");
			}
		}else{
			$(".lfpart3 .bhead li:first").addClass("act");
			$(".lfpart3 .bhead li:first").siblings("li").removeClass("act");
			$(".lfpart3 .infodeta").css("display","block");
			$(".lfpart3 .infodeta").siblings("div").css("display","none");
			var job_no = $(".findstaff input[name=resname]").val();
			getStaff(job_no);
			getStaffinfo(job_no);
			
			
			var district_id = $("a.fenzu").attr("_href");
			var department = $("a.bumen").attr("_href");
		}
	});
});
function SearchStaff(name){
	$.ajax({
	       type: "GET",
	       url: "/SearchStaff.do",
	       async:false,
	       data: "name="+name,
	       success: function(result){
	    	   if(result=='fail'){
	    		   window.top.document.location.href='../login.html';
	    	   }else{
	    		   var arr=JSON.parse(result);
	    		   job_no = arr.msg;
	    		   if(arr.code=="2"){
	    			   alert("参数异常");
	    		   }else if(arr.code=="3"){
	    			   alert("查无此人");
	    		   }else{
	    			   $("input[name=popup1name]").attr("lang",job_no); 
	    		   }
	    	   }
	    	   
	       }
	  });
}


function SearchStaff1(name){
	$.ajax({
	       type: "GET",
	       url: "/SearchStaff.do",
	       async:false,
	       data: "name="+name,
	       success: function(result){
	    	   if(result=='fail'){
	    		   window.top.document.location.href='../login.html';
	    	   }else{
	    		   var arr=JSON.parse(result);
	    		   job_no = arr.msg;
	    		   if(arr.code=="2"){
	    			   alert("参数异常");
	    		   }else if(arr.code=="3"){
	    			   alert("查无此人");
	    			   $(".findstaff input[name=resname]").attr("_is","n"); 
	    		   }else{
	    			   $(".lfpart4 .findstaff").hide();
   					   $(".lfpart4 .archi").show();
   					   $(".findstaff input[name=resname]").attr("_is","y"); 
	    			   $(".findstaff input[name=resname]").attr("lang",job_no); 
	    		   }
	    	   }	    	   
	       }
	  });
}