

$(document).ready(function(){

	// var adminContact = 'http://192.168.1.115/yhTech/igjia/adminContact.do';
	// var phouse = 'http://192.168.1.109/yhTech/phoneGJ/phouse.do';
    var stop = true;//关于滑动加载
    var page = 1;//关于滑动加载
  	var varData;

 	// 获取通过url传过来的参数
    function getUrl(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
	} 

	// 参数解码
	var deAddr=decodeURI(decodeURI(getUrl('addr')));
    var deDist=decodeURI(decodeURI(getUrl('dist')));
    var deState=decodeURI(decodeURI(getUrl('stat')));
    var deJobNo=decodeURI(decodeURI(getUrl('jobno')));
    var dePay=decodeURI(decodeURI(getUrl('paymethod')));
    var deStart1=decodeURI(decodeURI(getUrl('contractstart1')));
    var deStart2=decodeURI(decodeURI(getUrl('contractstart')));
    var deEnd1=decodeURI(decodeURI(getUrl('contractend1')));
    var deEnd2=decodeURI(decodeURI(getUrl('contractend2')));

    // 参数编码
	var enAddr=encodeURI(encodeURI(deAddr));
    var enDist=encodeURI(encodeURI(deDist));
    var enState=encodeURI(encodeURI(deState));
    var enJobNo=encodeURI(encodeURI(deJobNo));
    var enPay=encodeURI(encodeURI(dePay));
    var enStart1=encodeURI(encodeURI(deStart1));
    var enStart2=encodeURI(encodeURI(deStart2));
    var enEnd1=encodeURI(encodeURI(deEnd1));
    var enEnd2=encodeURI(encodeURI(deEnd2));

	//根据区域获取区域对应的管家,渲染到页面中
	var guanJiaArr = "";
 	$.ajax({
 		type:'GET',
 		url: CONFIG['url']+'igjia/adminContact.do',
 		success:function(data){
 			guanJiaArr = JSON.parse(data);
 			if(guanJiaArr=="fail"){
 				window.location.href="signIn.html";
 			}else{
	 			for(var i in guanJiaArr){
	 				if(guanJiaArr[i].district==deDist){
	 					$("#guanJia").append('<option value="'+guanJiaArr[i].job_no+'">'+guanJiaArr[i].name+'</option>');
	 				}else if(deDist=="全部"){
	 					$("#guanJia").append('<option value="'+guanJiaArr[i].job_no+'">'+guanJiaArr[i].name+'</option>');
	 				}
	 				if($("#guanJia option").eq(i).val()=="10007"){
	 					$("#guanJia option").eq(i).remove();
	 				}				
	 			}
 			}
 		},
 	});
 	

	//查询房源查询结果查询条件选中状态，
	//点击区域，显示此区域对应的管家
    $("#queryLe .quYuBox").on('click','.quyu1>div',function(){
    	$("#guanJia").empty();
    	$("#guanJia").append('<option value="">请选择管家</option>');
        $(this).removeClass('BCf2f2f2').addClass('selectedQuery');
        $(this).siblings().removeClass('selectedQuery').addClass('BCf2f2f2');
   		var thisHtml = $(this).html();
	 	$.ajax({
	 		type:'GET',
	 		url: CONFIG['url']+'igjia/adminContact.do',
	 		success:function(data){
	 			guanJiaArr = JSON.parse(data);
	 			for(var i in guanJiaArr){
	 				if(guanJiaArr[i].district==thisHtml){
	 					$("#guanJia").append('<option value="'+guanJiaArr[i].job_no+'">'+guanJiaArr[i].name+'</option>');
	 				}else if(thisHtml=="全部"){
	 					$("#guanJia").append('<option value="'+guanJiaArr[i].job_no+'">'+guanJiaArr[i].name+'</option>');
	 				}				
	 			}
	 		},
	 	});
    });
	$("#queryLe .quYuBox .quyu2>div").click(function(){
		$(this).removeClass('BCf2f2f2').addClass('selectedQuery');
		$(this).siblings().removeClass('selectedQuery').addClass('BCf2f2f2');
	});
	$("#cxfyZhuangTai .quyu2").on('click','div',function(){
		$(this).removeClass('BCf2f2f2').addClass('selectedQuery');
		$(this).siblings().removeClass('selectedQuery').addClass('BCf2f2f2');
	});

    // -------------改变支付方式的值，显示对应的房源状态
    $("#ZhiFufs").change(function(){
    	$("#cxfyZhuangTai .quyu2").empty();
	    // 根据支付方式渲染房源状态，出房状态&收房状态
	    if($(this).val()=="全部"){
	    	$("#cxfyZhuangTai .quyu2").append('<div class="BCf2f2f2">全部</div><div class="BCf2f2f2">已出租</div><div class="BCf2f2f2">空置中</div><div class="BCf2f2f2">已解约</div><div class="BCf2f2f2">审核中</div><div class="BCf2f2f2">已到期</div><div class="BCf2f2f2">配置中</div>');
	    }else{
	    	$("#cxfyZhuangTai .quyu2").append('<div class="BCf2f2f2">全部</div><div class="BCf2f2f2">出租中</div><div class="BCf2f2f2">审核中</div><div class="BCf2f2f2">已失效</div><div class="BCf2f2f2">已到期</div>');
	    }
	 	// 判定应该选中的房源状态
		for(var j=0;j<$("#cxfyZhuangTai .quyu2 div").length;j++){
	 		if( $("#cxfyZhuangTai .quyu2 div").eq(j).html() == deState ){
	 			$("#cxfyZhuangTai .quyu2 div").eq(j).addClass('selectedQuery').removeClass('BCf2f2f2').siblings().removeClass('selectedQuery').addClass('BCf2f2f2');
	 		}
	 	}
    });


    chuShiHua();
    // 根据url传递的参数初始化页面加载数据
    function chuShiHua(){
	    $.ajax({
	    	type:'GET',
	    	url: CONFIG['url']+'phoneGJ/phouse.do',
	    	data:"address="+enAddr+"&district="+enDist+"&state="+enState+"&job_no="+deJobNo+"&pay_method="+enPay+"&contract_start1="+deStart1+"&contract_start2="+deStart2+"&contract_end1="+deEnd1+"&contract_end2="+deEnd2+"&page="+page+"&num="+15,
	    	success:function(data){
	    		var queryResultArr = JSON.parse(data);
				if(queryResultArr.code==1){
			 		$("#loadingBox1").hide();
			 	}
	    		$("#resultBox header em").html(queryResultArr.total+"条");//返回结果总条目
	    		// 如果没有查询结果
	    		if(queryResultArr.total==0){
	    			$("#resultBox .resultList").append('<li style="text-align:center;font-size:0.28rem;padding: 0.8rem 0 1rem;color:#aaa;">未找到您要搜索的结果，请重新查找！</li>');
	    		}else if(queryResultArr.msg.length < 15){
	    			$("#svrollJiaZai").html('<span>加载完毕</span>');
	    		}
	    		// 渲染页面
	    		var htmlResult ="";
	    		for(var i=0;i<queryResultArr.msg.length;i++){
	    			var cxfyHouseId = queryResultArr.msg[i].house_id;
	    			var cxfyContractNo = queryResultArr.msg[i].contract_no;
	    			 htmlResult +='<li><a href="cxfyResultDetails.html?cxfyHouseId='+cxfyHouseId+'&cxfyContractNo='+cxfyContractNo+'&zhiFu='+enPay+'&zhuangTai='+enState+'"><div class="topBox clearfix fs26"><span class="quYu">区域：'+queryResultArr.msg[i].district+'</span><span class="guanJia textCe">管家：'+queryResultArr.msg[i].job_no+'</span><span class="zhuangtai textRi">房屋状态：'+queryResultArr.msg[i].state+'</span></div><p class="fs28">地址：'+queryResultArr.msg[i].address+'</p></a></li>'	 				
	 			}
	 			$("#resultBox .resultList").append(htmlResult);
			    $("#resultKeyWord").val(deAddr);
			    // 初始化区域
			 	for(var i=0;i<$("#conditionQuYu .quyu1 div").length;i++){
			 		if( $("#conditionQuYu .quyu1 div").eq(i).html() == deDist ){
			 			$("#conditionQuYu .quyu1 div").eq(i).addClass('selectedQuery').removeClass('BCf2f2f2').siblings().removeClass('selectedQuery').addClass('BCf2f2f2');
			 		}
			 	}
			 	// 初始化支付方式
			 	for(var zf=0;zf<$("#ZhiFufs option").length;zf++){
			    	if($("#ZhiFufs option").eq(zf).val()==dePay){
			    		$("#ZhiFufs option").eq(zf).attr('selected',true);
			    	}
			    }
			    // 根据支付方式渲染房源状态，出房状态&收房状态
			    if(dePay=="全部"){
			    	$("#cxfyZhuangTai .quyu2").append('<div class="BCf2f2f2">全部</div><div class="BCf2f2f2">已出租</div><div class="BCf2f2f2">空置中</div><div class="BCf2f2f2">已解约</div><div class="BCf2f2f2">审核中</div><div class="BCf2f2f2">已到期</div><div class="BCf2f2f2">配置中</div>');
			    }else{
			    	$("#cxfyZhuangTai .quyu2").append('<div class="BCf2f2f2">全部</div><div class="BCf2f2f2">出租中</div><div class="BCf2f2f2">审核中</div><div class="BCf2f2f2">已失效</div><div class="BCf2f2f2">已到期</div>');
			    }
			 	// 判定应该选中的房源状态
				for(var j=0;j<$("#cxfyZhuangTai .quyu2 div").length;j++){
			 		if( $("#cxfyZhuangTai .quyu2 div").eq(j).html() == deState ){
			 			$("#cxfyZhuangTai .quyu2 div").eq(j).addClass('selectedQuery').removeClass('BCf2f2f2').siblings().removeClass('selectedQuery').addClass('BCf2f2f2');
			 		}
			 	}
			 	// stop = true;			 	
	    	},
	    	error:function(jqXHR){
	    		$("#loadingBox1").hide();
	    		$("#resultBox .resultList").append('<li style="text-align:center;font-size:0.28rem;padding: 0.8rem 0 1rem;color:#aaa;">返回结果有误，错误代码：'+jqXHR.status+'</li>');
	    	}
	    });
    };

    // 滑动到底部时根据url传递的参数去加载数据
    function chuShiHua2(){
	    $.ajax({
	    	type:'GET',
	    	url: CONFIG['url']+'phoneGJ/phouse.do',
	    	data:"address="+enAddr+"&district="+enDist+"&state="+enState+"&job_no="+deJobNo+"&pay_method="+enPay+"&contract_start1="+deStart1+"&contract_start2="+deStart2+"&contract_end1="+deEnd1+"&contract_end2="+deEnd2+"&page="+page+"&num="+15,
	    	success:function(data){
	    		stop = true;
	    		var queryResultArr = JSON.parse(data);
				if(queryResultArr.code==1){
			 		$("#loadingBox1").hide();
			 	}
	    		$("#resultBox header em").html(queryResultArr.total+"条");//返回结果总条目
	    		// 如果没有查询结果
	    		if(queryResultArr.total==0){
	    			$("#resultBox .resultList").append('<li style="text-align:center;font-size:0.28rem;padding: 0.8rem 0 1rem;color:#aaa;">未找到您要搜索的结果，请重新查找！</li>');
	    		}else if(queryResultArr.msg.length < 15){
	    			$("#svrollJiaZai a").css({'display':'none'});
	    			$("#svrollJiaZai").html('<span>加载完毕</span>');
	    			stop = false;
	    		}
	    		// 渲染页面
	    		var htmlResult ="";
	    		for(var i=0;i<queryResultArr.msg.length;i++){
	    			var cxfyHouseId = queryResultArr.msg[i].house_id;
	    			var cxfyContractNo = queryResultArr.msg[i].contract_no;
	    			 htmlResult +='<li><a href="cxfyResultDetails.html?cxfyHouseId='+cxfyHouseId+'&cxfyContractNo='+cxfyContractNo+'&zhiFu='+enPay+'&zhuangTai='+enState+'"><div class="topBox clearfix fs26"><span class="quYu">区域：'+queryResultArr.msg[i].district+'</span><span class="guanJia textCe">管家：'+queryResultArr.msg[i].job_no+'</span><span class="zhuangtai textRi">房屋状态：'+queryResultArr.msg[i].state+'</span></div><p class="fs28">地址：'+queryResultArr.msg[i].address+'</p></a></li>'	 				
	 			}
	 			$("#resultBox .resultList").append(htmlResult);
			    $("#resultKeyWord").val(deAddr);		 	
	    	},
	    	error:function(jqXHR){
	    		$("#loadingBox1").hide();
	    		$("#resultBox .resultList").append('<li style="text-align:center;font-size:0.28rem;padding: 0.8rem 0 1rem;color:#aaa;">返回结果有误，错误代码：'+jqXHR.status+'</li>');
	    	}
	    });
    };

    // 渲染页面，根据右侧表单信息
    function chaXun(){
    	var keyWord = encodeURI( encodeURI($("#resultKeyWord").val()) );//转换16进制
	 	var quYu = 0;
	 	var cxZhuangTai = 0;
	 	var zhiFufs = encodeURI(encodeURI($("#ZhiFufs").val()));
	 	var guanJia = $("#guanJia").val();
	 	// 取值区域
	 	for(var q=0;q<$("#conditionQuYu .quyu1 div").length;q++){
	 		if($("#conditionQuYu .quyu1 div").eq(q).attr('class')=='selectedQuery'){
	 			quYu =encodeURI(encodeURI($("#conditionQuYu .quyu1 div").eq(q).html()));
	 		}
	 	}
	 	// 取值房源状态
	 	for(var j=0;j<$("#cxfyZhuangTai .quyu2 div").length;j++){
	 		if($("#cxfyZhuangTai .quyu2 div").eq(j).attr('class')=='selectedQuery'){
	 			cxZhuangTai =encodeURI(encodeURI($("#cxfyZhuangTai .quyu2 div").eq(j).html()));
	 		}
	 	}
	 	$.ajax({
	 		type:'GET',
	 		url: CONFIG['url']+'phoneGJ/phouse.do',
	 		data : "address="+keyWord+"&district="+quYu+"&state="+cxZhuangTai+"&job_no="+guanJia+"&pay_method="+zhiFufs+"&contract_start1="+deStart1+"&contract_start2="+deStart2+"&contract_end1="+deEnd1+"&contract_end2="+deEnd2+"&page="+page+"&num="+15, //要发送的数据
	 		async:true,
	 		success:function(data){
	 			stop = true;
	 			var queryResultArr = JSON.parse(data);
	 			$("#svrollJiaZai a").css({'display':'block'});
    			$("#svrollJiaZai span").remove();
	    		// 如果没有查询结果
	    		if(queryResultArr.msg.length < 15){
	    			$("#svrollJiaZai a").css({'display':'none'});
	    			$("#svrollJiaZai").html('<span>加载完毕</span>');
	    			stop = false;
	    		}
	 			for(var i=0;i<queryResultArr.msg.length;i++){
	 				var cxfyHouseId=queryResultArr.msg[i].house_id;
	 				var cxfyContractNo = queryResultArr.msg[i].contract_no;
	 				$("#resultBox .resultList").append('<li><a href="cxfyResultDetails.html?cxfyHouseId='+cxfyHouseId+'&cxfyContractNo='+cxfyContractNo+'&zhiFu='+zhiFufs+'&zhuangTai='+cxZhuangTai+'"><div class="topBox clearfix fs26"><span class="quYu">区域：'+queryResultArr.msg[i].district+'</span><span class="guanJia textCe">管家：'+queryResultArr.msg[i].job_no+'</span><span class="zhuangtai textRi">房屋状态：'+queryResultArr.msg[i].state+'</span></div><p class="fs28">地址：'+queryResultArr.msg[i].address+'</p></a></li>');
	 			}
	 		},
	    	error:function(jqXHR){
	    		$("#loadingBox1").hide();
	    		$("#resultBox .resultList").append('<li style="text-align:center;font-size:0.28rem;padding: 0.8rem 0 1rem;color:#aaa;">返回结果有误，错误代码：'+jqXHR.status+'</li>');
	    	}
	 	});
    };

    // 点击完成按钮提交搜索条件
 	$("#resultComplete").on('click',function(){
 		$("#svrollJiaZai").html('<a href="javascript:void();" class="b_radius_l fs28 textCe" style="height: 100%;"><img src="images/preloader-white.gif" alt="" id="gif" style="margin:0 auto;width: 15px;height: 15px;display: none;"></a>');
 		$("#bodyBox").css({'position':'static','height':'auto','overflow':'auto'});
 		$("#loadingBox1").show();
 		page=1;
 		$("#resultComplete").attr('data',false);
    	var keyWord = encodeURI( encodeURI($("#resultKeyWord").val()) );//转换16进制
	 	var quYu = 0;
	 	var cxZhuangTai = 0;
	 	var zhiFufs = encodeURI(encodeURI($("#ZhiFufs").val()));
	 	var guanJia = $("#guanJia").val();
	 	// 取值区域
	 	for(var q=0;q<$("#conditionQuYu .quyu1 div").length;q++){
	 		if($("#conditionQuYu .quyu1 div").eq(q).attr('class')=='selectedQuery'){
	 			quYu =encodeURI(encodeURI($("#conditionQuYu .quyu1 div").eq(q).html()));
	 		}
	 	}
	 	// 取值房源状态
	 	for(var j=0;j<$("#cxfyZhuangTai .quyu2 div").length;j++){
	 		if($("#cxfyZhuangTai .quyu2 div").eq(j).attr('class')=='selectedQuery'){
	 			cxZhuangTai =encodeURI(encodeURI($("#cxfyZhuangTai .quyu2 div").eq(j).html()));
	 		}
	 	}
	 	$("#queryLeftBox").animate({right:"-7.6rem"},300);
	 	$("#resultBox .resultList").empty();
	 	$("#resultBox header em").html("0条");
	 	$.ajax({
	 		type:'GET',
	 		url: CONFIG['url']+'phoneGJ/phouse.do',
	 		data : "address="+keyWord+"&district="+quYu+"&state="+cxZhuangTai+"&job_no="+guanJia+"&pay_method="+zhiFufs+"&contract_start1="+deStart1+"&contract_start2="+deStart2+"&contract_end1="+deEnd1+"&contract_end2="+deEnd2+"&page="+page+"&num="+15, //要发送的数据
	 		async:true,
	 		success:function(data){
	 			stop = true;
	 			var queryResultArr = JSON.parse(data);
	 			$("#resultBox header em").html(queryResultArr.total+"条");
	    		// 如果没有查询结果
	    		if(queryResultArr.total==0){
	    			$("#resultBox .resultList").append('<li style="text-align:center;font-size:0.28rem;padding: 0.8rem 0 1rem;color:#aaa;">未找到您要搜索的结果，请重新查找！</li>');
	    		}
	 			for(var i=0;i<queryResultArr.msg.length;i++){
	 				var cxfyHouseId=queryResultArr.msg[i].house_id;
	 				var cxfyContractNo = queryResultArr.msg[i].contract_no;
	 				$("#resultBox .resultList").append('<li><a href="cxfyResultDetails.html?cxfyHouseId='+cxfyHouseId+'&cxfyContractNo='+cxfyContractNo+'&zhiFu='+zhiFufs+'&zhuangTai='+cxZhuangTai+'"><div class="topBox clearfix fs26"><span class="quYu">区域：'+queryResultArr.msg[i].district+'</span><span class="guanJia textCe">管家：'+queryResultArr.msg[i].job_no+'</span><span class="zhuangtai textRi">房屋状态：'+queryResultArr.msg[i].state+'</span></div><p class="fs28">地址：'+queryResultArr.msg[i].address+'</p></a></li>');
	 			}
	 			if(queryResultArr.code==1){
	 				$("#loadingBox1").hide();
	 			}
	 		},
	    	error:function(jqXHR){
	    		$("#loadingBox1").hide();
	    		$("#resultBox .resultList").append('<li style="text-align:center;font-size:0.28rem;padding: 0.8rem 0 1rem;color:#aaa;">返回结果有误，错误代码：'+jqXHR.status+'</li>');
	    	}
	 	});
 	});

	// 滑动加载更多
    $(window).scroll(function(){
    	varData = $("#resultComplete").attr('data');
        totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        var documenHeight= $(document).height() - 20;   
        if (documenHeight <= totalheight) {
            if (stop == true) {
            	stop = false;
                if(varData == 'true'){
                	page++;
					chuShiHua2();
                }else if(varData == 'false'){
                	page++;
                	chaXun(); 
                }  
                $("#gif").show();
            }
        }
    });

 	// 重置
 	$("#reset").on('click',function(){
 		$("#resultKeyWord").val('');
 		$("#guanJia option").eq(0).attr('selected',true).siblings().attr('selected',false);
 		$("#ZhiFufs option").eq(0).attr('selected',true).siblings().attr('selected',false);
 		$("#cxfyZhuangTai .quyu2").empty();
 		$("#cxfyZhuangTai .quyu2").append('<div class="BCf2f2f2">全部</div><div class="BCf2f2f2">已出租</div><div class="BCf2f2f2">空置中</div><div class="BCf2f2f2">已解约</div><div class="BCf2f2f2">审核中</div><div class="BCf2f2f2">已到期</div><div class="BCf2f2f2">配置中</div>');
 		$("#conditionQuYu .quyu1 div").eq(0).addClass('selectedQuery').removeClass('BCf2f2f2').siblings().removeClass('selectedQuery').addClass('BCf2f2f2');
 		$("#cxfyZhuangTai .quyu2 div").eq(0).addClass('selectedQuery').removeClass('BCf2f2f2').siblings().removeClass('selectedQuery').addClass('BCf2f2f2');
 	});


});

