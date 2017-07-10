
$(document).ready(function(){

	// var getAllDistrict='http://192.168.1.115/yhTech/getAllDistrict.do';
	// var gettotalstatistics='http://192.168.1.115/yhTech/igjia/gettotalstatistics.do';
	// var pagerent='http://192.168.1.115/igjia/pagerent.do';
	// var pagehouse='http://192.168.1.115/pagehouse.do';

	// 壹公寓首页，房源统计，遍历所有区域
    var explainHtml= '<li><span></span><i></i></li>';
    var colorArr = new Array('#ff9900','#fe654b','#ff99cc','#f35960',
    						 '#8171c8','#56cefc','#89cd69','#fdb667',
    						 '#ffff00','#55vb90','#ff9966','#ff8f7c',
    						 '#ffbaba','#ff7a7a','#99a5ff','#6bd6d6',
    						 '#cc7799','#ffcc00','#ffffa8','#a5dca5');//颜色

    //获取所有区域
 	$.ajax({
 		type : 'GET',
 		url : CONFIG['url']+'getAllDistrict.do',
 		async : true,
 		success : function(data){
 			var districtLength = JSON.parse(data);
 			for(var i=0;i<districtLength.length;i++){
 				$("#explainBox").append(explainHtml);
 				$("#explainBox li").eq(i).find('i').html(districtLength[i].district);
 				$("#explainBox li").eq(i).find('span').css('background-color',colorArr[i]);
 			}
 		},
 		error : function(jqXHR){// alert("状态码：" + jqXHR.status);
 		},
 	});  

 	
 	// 出房总计、入房总计、空置间数，比例图形
 	var tjHtml= '<li></li>';
 	setTimeout(function(){
	 	$.ajax({
	 		type : 'GET',
	 		url : CONFIG['url']+'igjia/gettotalstatistics.do',
	 		async : true,
	 		success : function(data){
	 			if(data=="fail"){
	 				window.location.href="signIn.html";
	 			}else{
		 			var jsonArr = JSON.parse(data);// 解析JOSN对象
		 			var jsonArrCF = jsonArr.出房总计;
		 			var jsonArrRF = jsonArr.入房总计;
		 			var jsonArrKZ = jsonArr.空置间数;
		 			var cfArr = new Array();//存放各个区域的出房数量
		 			var rfArr = new Array();//存放各个区域的入房数量
		 			var kzArr = new Array();//存放各个区域的空置间数
		 			var biLi = 0;//出房比例
		 			var biLiRF = 0;//入房比例
		 			var biLiKZ = 0;//空置房间比例
		 			var biLiArr = new Array();//存放各个区域的出房数量占出房总计的比例,即色块的宽度
		 			var biLiArrRF = new Array();//存放各个区域的入房数量占入房总计的比例,即色块的宽度
		 			var biLiArrKZ = new Array();//存放各个区域的空置间数占房间空置间数总计的比例,即色块的宽度
		 			var totalTj = 0; //出房总量
		 			var totalRF = 0; //入房总量
		 			var totalKZ = 0; //空置间数总计
		 			for(var key1 in jsonArrCF){// 把各个区域的出房数量存放到数组当中
						count = jsonArrCF;
						count = parseInt(count[key1]);
						name = key1;
						cfArr.push(count);
					} 
		 			for(var key2 in jsonArrRF){// 把各个区域的入房数量存放到数组当中
						count = jsonArrRF;
						count = parseInt(count[key2]);
						name = key2;
						rfArr.push(count);
					}
		 			for(var key3 in jsonArrKZ){// 把各个区域的空置间数存放到数组当中
						count = jsonArrKZ;
						count = parseInt(count[key3]);
						name = key3;
						kzArr.push(count);
					} 
		 			for(var i=0; i<$("#explainBox li").length; i++){
		 				totalTj += Number(cfArr[i]);//出房总量
		 				totalRF += Number(rfArr[i]);//入房总量
		 				totalKZ += Number(kzArr[i]);//空置间数总计
		 			}
		 			// 各个区域出房数量占总出房量的比例,即色块的宽度
		 			for(var i=0; i<$("#explainBox li").length; i++){
		 				// 出房
		 				biLi = cfArr[i]/totalTj*5.8;//每个色块的宽度
		 				biLiArr.push(biLi.toFixed(4)+"rem");//每个色块的宽度存放到数组里
		 				$("#CFInfor").append(tjHtml);
		 				$("#CFInfor li").eq(i).css({'width':biLiArr[i] , 'background-color':colorArr[i]});
		 				// 入房
		 				biLiRF = rfArr[i]/totalRF*5.8;//每个色块的宽度
		 				biLiArrRF.push(biLiRF.toFixed(4)+"rem");//每个色块的宽度存放到数组里
		 				$("#RFInfor").append(tjHtml);
		 				$("#RFInfor li").eq(i).css({'width':biLiArrRF[i] , 'background-color':colorArr[i]});
		 				// 空置间数
		 				biLiKZ = kzArr[i]/totalKZ*5.8;//每个色块的宽度
		 				biLiArrKZ.push(biLiKZ.toFixed(4)+"rem");//每个色块的宽度存放到数组里
		 				$("#KZInfor").append(tjHtml);
		 				$("#KZInfor li").eq(i).css({'width':biLiArrKZ[i] , 'background-color':colorArr[i]});
		 			}
		 		}
	 		},
	 		error : function(jqXHR){// alert("状态码：" + jqXHR.status);
	 		},
	 	});
	},100);


 	var newCFHtml='<li><a href="javascript:void(0);"></a></li>';
 	// 壹公寓首页，最新出房信息
 	$.ajax({
 		type:'GET',
 		url: CONFIG['url']+'igjia/pagerent.do',
 		data: 'page='+1,
 		async:true,
 		success:function(data){
 			var newCFArr = JSON.parse(data);
 			for(var i=0; i<newCFArr.length; i++){
 				$("#newChuFang").append(newCFHtml);
 				$("#newChuFang li").eq(i).find('a').html(newCFArr[i].name + "新出一套编号为" + newCFArr[i].house_id + "的房源");
 			}
 		},
 		error:function(jqXHR){// alert("状态码：" + jqXHR.status);
 		}
 	});

 	// 壹公寓首页，最新入房信息
 	$.ajax({
 		type:'GET',
 		url: CONFIG['url']+'igjia/pagehouse.do',
 		data: 'page='+1,
 		async:true,
 		success:function(data){
 			var newRFArr = JSON.parse(data);
 			for(var i=0; i<newRFArr.length; i++){
 				$("#newRuFang").append(newCFHtml);
 				$("#newRuFang li").eq(i).find('a').html(newRFArr[i].name + "新入一套编号为" + newRFArr[i].house_id + "的房源");
 			}
 		},
 		error:function(jqXHR){// alert("状态码：" + jqXHR.status);
 		}
 	});

});



