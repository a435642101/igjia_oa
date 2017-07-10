

$(function(){

    var stop = true;//声明变量，关于上拉加载
    var page = 1;//声明变量，关于上拉加载
    var pageMX = 1;//声明变量，关于上拉加载
	var staffID = '';//声明员工编号

	// 退出登录
    $("#tuiChu").on('click',function(){
        $.ajax({
            type: 'GET',
            url : CONFIG['url']+'destroy.do',
            success:function(data){
                if(data=="success"){
                    window.location.href="signIn.html";
                }
            },
            error:function(jqXHR){}
        });
    });

	// 配置房源与名下房源的切换
	$("#userHead1 span").on('click',function(){
		var eqS=$(this).index();
		$(this).attr('data','true').siblings().attr('data','false');
		$(this).addClass('selectColor').siblings().removeClass('selectColor');
		$("#contBox .userStyleBox").eq(eqS).stop(true,true).slideDown(300).siblings('.userStyleBox').stop(true,true).slideUp(300);
		stop = true;
	});

	// 初始化配置房源
	function peiZhiFY(){
		var zhuBie = encodeURI(encodeURI($("#zuBie i").html()));
		$.ajax({
			type: 'GET',
			url: CONFIG['url']+'getPersonAllRear.do',
			data: 'job_no='+staffID+'&district='+zhuBie+'&page='+page+'&num='+15,
			success:function(resultPZ){
	        	var peiZhiFYObj=JSON.parse(resultPZ);
	        	console.log(peiZhiFYObj);
	        	var peiZhiFYHtml = '';
	        	if(peiZhiFYObj.code==1&&peiZhiFYObj.total>0){
            		var pzMsg= peiZhiFYObj.msg;
	        		for(var i=0;i<pzMsg.length;i++){//渲染页面
		        		var beginDate=(new Date(pzMsg[i].begin_date)).getTime();//配置开始日期毫秒数
		        		var finishDate=(new Date(pzMsg[i].finish_date)).getTime();//配置结束日期毫秒数
	            		var dayPZ=Math.ceil((finishDate-beginDate)/(24*60*60*1000));//配置时长
	            		$(".PZSC").html(dayPZ);
	            		peiZhiFYHtml += '<ul class="inforItem fs28"><li class="clearfix"><span>时间：</span><span>'+pzMsg[i].date+'</span></li><li class="clearfix"><span>管家：</span><span>'+pzMsg[i].job_no+'</span></li><li class="clearfix"><span>后勤：</span><span>'+pzMsg[i].rear+'</span></li><li class="clearfix"><span>房屋地址：</span><span class="wid">'+pzMsg[i].address+'</span></li><li class="clearfix"><span>配置中时长：</span><span class="TCfa0000 PZSC">'+dayPZ+'</span></li></ul>';
	        		}
	        		$("#userPZFY").html(peiZhiFYHtml);
	        	}else if(peiZhiFYObj.code==1&&peiZhiFYObj.total==0){//查询结果0条记录
	        		$("#userPZFYBox").html('<div class="noInfor fs28 textCe"><img src="images/zanwu.png" alt=""><span>暂无</span></div>');
	        	}else if(peiZhiFYObj.code==2||peiZhiFYObj.code==3){//参数异常或错误
	        		$("#userPZFYBox").html('<div class="noInfor fs28 textCe"><img src="images/ .png" alt=""><span>参数异常</span></div>');
	        	}else if(peiZhiFYObj.code==4){//不是业务部和后勤部
	        		$("#userPZFYBox").html('<div class="noInfor fs28 textCe"><img src="images/zanwu.png" alt=""><span>暂无信息</span></div>');
	        	}else if(peiZhiFYObj=="fail"){//未登录、跳转到登录页面
					window.location.href="signIn.html";
				}
				paging();//上拉加载
			},
			error:function(jqXHR){}
		})
	};

	// 初始化名下房源
	function mingXiaFY(){
		$.ajax({
			type: 'GET',
			url: CONFIG['url']+'getPersonHouse.do',
			data:'job_no='+staffID+'&page='+pageMX+'&num='+15,
			success:function(resultMX){
				var mxObj=JSON.parse(resultMX);
				var mxHtml = '';
				if(mxObj.code==1&&mxObj.total>1){
					var mxMsg= mxObj.msg;
					for(var j=0;j<mxMsg.length;j++){//渲染页面
	            		mxHtml += '<a href="userDetails.html?house_id='+mxMsg[j].house_id+'&state='+encodeURI(encodeURI(mxMsg[j].state))+'"><ul class="inforItem fs28"><li class="clearfix"><span>房源ID：</span><span>'+mxMsg[j].house_id+'</span></li><li class="clearfix"><span>操作时间：</span><span>'+mxMsg[j].date+'</span></li><li class="clearfix"><span>房屋状态：</span><span>'+mxMsg[j].state+'</span></li><li class="clearfix"><span>房源区域：</span><span class="wid">'+mxMsg[j].district+'</span></li><li class="clearfix"><span>房源地址：</span><span class="TCfa0000">'+mxMsg[j].address+'</span></li></ul></a>';
	        		}
	        		$("#userMXFY").html(mxHtml);
				}else if(mxObj.code==1&&mxObj.total==0){//查询结果0条记录
	        		$("#userMXFYBox").html('<div class="noInfor fs28 textCe"><img src="images/zanwu.png" alt=""><span>暂无</span></div>');
	        	}else if(mxObj=="fail"){//未登录、跳转到登录页
					window.location.href="signIn.html";
				}else if(mxObj=="refused"){//没有访问权限
	        		$("#userMXFYBox").html('<div class="noInfor fs28 textCe"><img src="images/zanwu.png" alt=""><span>你没有访问权限</span></div>');
	        	}else if(mxObj.code==2){//暂无信息
	        		$("#userMXFYBox").html('<div class="noInfor fs28 textCe"><img src="images/zanwu.png" alt=""><span>暂无</span></div>');
	        	}else if(mxObj.code==3){//不是业务部的
	        		$("#userMXFYBox").html('<div class="noInfor fs28 textCe"><img src="images/zanwu.png" alt=""><span>你不是业务部的</span></div>');
	        	}
	        	paging();//上拉加载
			},
			error:function(jqXHR){}
		})
	};

	//上拉加载时，配置房源，调用函数
	function peiZhiJZ(){
		$("#svrollJiaZai a img").css({'display':'block'});
		var zhuBie = encodeURI(encodeURI($("#zuBie i").html()));
		$.ajax({
			type: 'GET',
			url: CONFIG['url']+'getPersonAllRear.do',
			data: 'job_no='+staffID+'&district='+zhuBie+'&page='+page+'&num='+15,
			success:function(resultPZ){
				stop = true;
	        	var peiZhiFYObj=JSON.parse(resultPZ);
	        	var peiZhiFYHtml = '';
	        	if(peiZhiFYObj.code==1){
            		var pzMsg= peiZhiFYObj.msg;
	        		for(var i=0;i<pzMsg.length;i++){//渲染页面
		        		var beginDate=(new Date(pzMsg[i].begin_date)).getTime();//配置开始日期毫秒数
		        		var finishDate=(new Date(pzMsg[i].finish_date)).getTime();//配置结束日期毫秒数
	            		var dayPZ=Math.ceil((finishDate-beginDate)/(24*60*60*1000));//配置时长
	            		$(".PZSC").html(dayPZ);
	            		peiZhiFYHtml += '<ul class="inforItem fs28"><li class="clearfix"><span>时间：</span><span>'+pzMsg[i].date+'</span></li><li class="clearfix"><span>管家：</span><span>'+pzMsg[i].job_no+'</span></li><li class="clearfix"><span>后勤：</span><span>'+pzMsg[i].rear+'</span></li><li class="clearfix"><span>房屋地址：</span><span class="wid">'+pzMsg[i].address+'</span></li><li class="clearfix"><span>配置中时长：</span><span class="TCfa0000 PZSC">'+dayPZ+'</span></li></ul>';
	        		}
	        		$("#userPZFY").append(peiZhiFYHtml);//渲染页面
	        		if(peiZhiFYObj.msg.length<15){
		    			$("#svrollJiaZai").html('<span style="padding-bottom:0.15rem;">加载完毕</span>');
		    			stop = false;
		    		}
	        	}
			},
			error:function(jqXHR){}
		})
	};

	// 上拉加载时，名下房源，调用函数
	function mingXiaJZ(){
		$("#svrollJiaZai2 a img").css({'display':'block'});
		$.ajax({
			type: 'GET',
			url: CONFIG['url']+'getPersonHouse.do',
			data: 'job_no=' + staffID+'&page='+pageMX+'&num='+15,
			success:function(resultMX){
				stop = true;
				var mxObj=JSON.parse(resultMX);
				var mxHtml = '';
				if(mxObj.code==1){
					var mxMsg= mxObj.msg;
					for(var j=0;j<mxMsg.length;j++){//渲染页面
	            		mxHtml += '<a href="userDetails.html?house_id='+mxMsg[j].house_id+'&state='+encodeURI(encodeURI(mxMsg[j].state))+'"><ul class="inforItem fs28"><li class="clearfix"><span>房源ID：</span><span>'+mxMsg[j].house_id+'</span></li><li class="clearfix"><span>操作时间：</span><span>'+mxMsg[j].date+'</span></li><li class="clearfix"><span>房屋状态：</span><span>'+mxMsg[j].state+'</span></li><li class="clearfix"><span>房源区域：</span><span class="wid">'+mxMsg[j].district+'</span></li><li class="clearfix"><span>房源地址：</span><span class="TCfa0000">'+mxMsg[j].address+'</span></li></ul></a>';
	        		}
	        		$("#userMXFY").append(mxHtml);//渲染页面
	        		if(mxObj.msg.length<15){
		    			$("#svrollJiaZai2").html('<span style="padding-bottom:0.15rem;">加载完毕</span>');
		    			stop = false;
		    		}
				}
			},
			error:function(jqXHR){}
		})
	};

	//配置房源、名下房源，滑动(上拉)加载更多
	function paging(){
		var totalheight='';
	    $(window).scroll(function(){
	        totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
	        var documenHeight= $(document).height() - 20;   
	        if (documenHeight <= totalheight) {
	            if (stop == true) {
	            	stop = false;
	                if($("#userHead1 span").eq(0).attr('data') == 'true'){
	                	page++;
	                	if(page>1){
		 					peiZhiJZ();
		 				}
	                }else{
	                	pageMX++;
	                	if(pageMX>1){
		 					mingXiaJZ();
		 				}
	                }
	            }
	        }
	    })
    };

	// 返回部门、职位、组别，加载配置房源、名下房源
	$.ajax({
		type:'GET',
		url : CONFIG['url']+'admin.do',
		async: true,
		success:function(data){
			var userInforObj = JSON.parse(data);
			staffID = userInforObj.job_no;//赋值员工编号
			if(data=="fail"){
				window.location.href="signIn.html";
			}else{
				$("#portraitBox .name").html("你好，"+ userInforObj.name);
				$("#buMen i").html(userInforObj.department);
				if(userInforObj.department=="YGJZL"){
					$("#userHead1").css({'display':'block'});
					$("#userHead2").css({'display':'none'});
					peiZhiFY();//调用配置房源函数
					mingXiaFY();//调用名下房源函数
					$("#buMen i").html("业务部");
				}else if(userInforObj.department=="KHFWZX"){
					$("#userHead1").css({'display':'none'});
					$("#userHead2").css({'display':'block'});
					peiZhiFY();//调用配置房源函数
					$("#buMen i").html("后勤部");
				}else{
					$("#userHead1").css({'display':'none'});
					$("#userHead2").css({'display':'none'});
					$("#userPZFYBox").html('<div class="noInfor fs28 textCe"><img src="images/zanwu.png" alt=""><span>暂无信息</span></div>');
					if(userInforObj.department=="YGJYF"){
						$("#buMen i").html("研发部");
					}else if(userInforObj.department=="YGJHR"){
						$("#buMen i").html("人事部");
					}else if(userInforObj.department=="YGJCW"){
						$("#buMen i").html("财务部");
					}else if(userInforObj.department=="YGJ"){
						$("#buMen i").html("总经办");
					}
				}

				if(userInforObj.district==""||userInforObj.district==" "){
					$("#zuBie i").html("无");
				}else{
					$("#zuBie i").html(userInforObj.district);
				}
				$("#zhiWei i").html(userInforObj.position);
			}
		},
		error:function(jqXHR){ }
	});




	// ------------------------------配置房源详情信息、名下房源详情信息------------------------------开始
    // 获取通过url传过来的参数
    function getUrl(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return unescape(r[2]); return null; //返回参数值
    } 
    var houseState=decodeURI(decodeURI(getUrl('state')));

    // 收房，房源信息
  	$.ajax({
 		type:'GET',
 		url: CONFIG['url']+'phoneGJ/pOnehouse.do',
 		data : "house_id="+getUrl('house_id'),
 		async:true,
 		success:function(data){
 			var inforArr = JSON.parse(data);//解析成json数组
            var time=(new Date()).getTime();//当前时间毫秒数
            var haoMiao=(new Date(inforArr.vacancy_date)).getTime();//合同开始日期毫秒数
            var day=Math.ceil((time-haoMiao)/(24*60*60*1000));//空置天数
            // 渲染页面
            for(var i in inforArr){
                if(inforArr[i]==''){
                    $("#SF"+i).html('无');
                }else{
                    $("#SF"+i).html(inforArr[i]);
                    if(inforArr.vacancy_date!=''){
                        $("#SFvacancy_date").html(day);
                    }
                }
            }
 		},
 	});

    // 查询合同信息
    function queryContract(){
        $.ajax({
            type: "GET",
            url: CONFIG['url']+'phoneGJ/pOnerent.do',
            async: true,
            data: "house_id="+getUrl("house_id"),
            success: function(result){
                if(result=="zero"){
                    $("#htInforNone").css({'display':'block'});
                    $("#cffyInfor").css({'display':'none'});
                }else if("zero"!=result){
                    var obj = eval('(' + result + ')');
                    // 循环渲染页面
                    for(var i in obj){
                        if(obj[i]==''){
                            $("#CF"+i).html('无');
                        }else{
                            $("#CF"+i).html(obj[i]);
                        }
                    }
                }                       
            }
        });
    };

  	// 关于是否有出房合同信息的判断
    function htInfor(){
        if(houseState!="已出租"||houseState!="出租中"){
            $("#htInforNone").css({'display':'block'});
            $("#cffyInfor").css({'display':'none'});
        }else if(houseState=="已出租"||houseState=="出租中"){
            queryContract();
        }
    }
    htInfor();
    // ------------------------------配置房源详情信息、名下房源详情信息------------------------------结束


});

