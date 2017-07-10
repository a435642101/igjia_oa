
// 百度地图API功能
window.onload = function (){ 
	var map = new BMap.Map("allmap");
	map.centerAndZoom("上海");
	map.enableScrollWheelZoom();
 	map.addControl(new BMap.NavigationControl());  
	map.addControl(new BMap.MapTypeControl());  
 	map.addControl(new BMap.ScaleControl());  
	map.addControl(new BMap.OverviewMapControl());  
	var MAX = 100;
	
	$.ajax({
		type: "GET",
		url: "house.do",
		data: "district="+encodeURI(encodeURI("全部"))+"&state="+encodeURI(encodeURI("全部"))+"&contract_start1=&contract_start2=&contract_end1=&contract_end2=",
		success: function(result){
			$('.loading').hide();
			if(result=="error"){
				alert('数据加载失败')
			}else if(result=="fail"){
				alert('未登录，数据加载失败')
			}else{
				var arr=JSON.parse(result);		
				var obj;
				for (var i = 0; i < arr.length; i++){
					obj = arr[i];
					mapa(map,obj.address,obj.job_no,obj.room_yuqichufangjia,obj.district,obj.business_area,obj.state,obj.house_id);
				}
			}		
		}
	});
} 

function mapa(map,address,jobno,room_yuqichufangjia,district,business_area,state,house_id){
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(address, function(point){
		if (point) {
			var poi = new BMap.Point(point.lng,point.lat);
			var myIcon;
			if(state=='空置中'){
				myIcon = new BMap.Icon("http://www.199y.com/picture/igjia/red2017.png", new BMap.Size(39,25));		 
			}else if(state=='已出租'){
				myIcon= new BMap.Icon("http://www.199y.com/picture/igjia/blue2017.png", new BMap.Size(39,25));		 
			}			   		   
		    var marker = new BMap.Marker(poi,{icon:myIcon}); //创建marker对象
		    marker.addEventListener("click", function(e){
			    searchInfoWindow.open(marker);
		    });
		    map.addOverlay(marker);
		     //创建检索信息窗口对象
		     var content = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="http://www.199y.com/picture/igjia/yi.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    '商圈:'+business_area+'<br/>地址：'+address+'<br/>管家：'+jobno+'<br/>预租价：' +room_yuqichufangjia+'&nbsp;&nbsp;&nbsp;<a href=houseDetail.html?house_id='+house_id+'>查看详情</a>'
                  '</div>';
		     var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
				title  : district,      //标题
				width  : 290,             //宽度
				height : 105,              //高度
				panel  : "panel",         //检索结果面板
				enableAutoPan : true,     //自动平移
				searchTypes   :[
					BMAPLIB_TAB_SEARCH,   //周边检索
					BMAPLIB_TAB_TO_HERE,  //到这里去
					BMAPLIB_TAB_FROM_HERE //从这里出发
				]
			});
		}		  		
	}, "上海市");
}