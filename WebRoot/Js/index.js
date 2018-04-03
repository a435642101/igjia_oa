$(function(){
	$(".center aside ul li").click(function(){
		var a = $(this).attr("lang");
		$("#rightiframe").attr("src",a);
	});
	$(".tou").click(function(){
		var a = $(this).attr("lang");
		$("#rightiframe").attr("src", a);
	});
})

function color(job_no){
	var col = new Array('#f6b55e','#b38979','#f2725e','#4da9ea','#15c395','#f6b55e','#b38979','#f2725e','#4da9ea','#15c395');
	return col[job_no];
}
$.ajax({
		type:"get",
		url:"/admin.do",
		async:false,
		success:function(result){
			if(result=='fail'){
				window.location.href="login.html";
			}else{
				var json = eval('(' + result + ')');
				var name = json.name;				
				var job_no = json.job_no;
				var job = job_no.substring(job_no.length-1,job_no.length);
				var na = name.substring(name.length-2,name.length);
				$(".tou").text(na);
				$(".tou").css("background-color",color(job));
				$(".tou").attr("lang","personal/person.html?job_no="+job_no);
				
				$('.right>span').attr('title',"工号"+job_no)
				$('#name').html(name);
				if(job_no == '30079'){
				$("li[lang='rear/nav.html']").hide();
			
}
				var arr={
				    	"dept" : json.department,  
				    	"job_no" :job_no,  
				    	"type" : "staff"
				    } ; 
					// initWebSocket(JSON.stringify(arr));
			}			
		}
	})
	
	setInterval(function() {
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth();
		var date = now.getDate();
		var day = now.getDay();
		var hours = now.getHours(); 
		var minutes = now.getMinutes();  
		var seconds = now.getSeconds();
		
		if(seconds<10){
			seconds = "0"+seconds;
		}
		if(minutes<10){
			minutes = "0"+minutes;
		}
		if(hours<10){
			hours = "0"+hours;
		}
		switch(day){
			case 1: day="星期一";  break;
			case 2: day="星期二";  break;
			case 3: day="星期三";  break;
			case 4: day="星期四";  break;
			case 5: day="星期五";  break;
			case 6: day="星期六";  break;
			case 0: day="星期天";  break;
		}
		
		$(".today span").text(year+"年"+(month+1)+"月"+date+"日 "+day+" "+hours+":"+minutes+":"+seconds);
	}, 100);
	function destroy(){
		$.ajax({
			type:"get",
			url:"destroy.do",
			success:function(result){
				window.location.href="login.html";
			}
		})
	}
	
    // function initWebSocket(userid) {
    //     if (window.WebSocket) {
    //         websocket = new WebSocket(encodeURI("ws://websocket.igjia.com/message?userid="+encodeURI(userid)));
    //         websocket.onopen = function() {
    //             //连接成功  win.setTitle(title + '  (已连接)');
    //         }
    //         websocket.onerror = function() {
    //             //连接失败   win.setTitle(title + '  (连接发生错误)');
    //         }
    //         websocket.onclose = function() {
    //             //连接断开  win.setTitle(title + '  (已经断开连接)');
    //         }
    //         //消息接收
    //         websocket.onmessage = function(message) {
    //             var message = JSON.parse(message.data);
    //             //接收用户发送的消息
    //             if (message.type == 'message') {
    //             	if(message.content=='ArepairOrder'){
    //             		if(confirm("一条新的维修订单,是否查看")){
    //             			$("#rightiframe").attr("src","rear/nav.html");
    //               		  setTimeout(function () {
    //               		  	$("#rightiframe").contents().find("iframe").attr("src","repairList.html");
    //               		  }, 100);
    //             		}
    //             	}
    //             } else if (message.type == 'get_online_user') {
    //                 //获取在线用户列表
    //             } else if (message.type == 'user_join') {
    //         //    window.location.reload();
    //                 //用户上线
    //             } else if (message.type == 'user_leave') {
    //                     //用户下线
    //             }
    //         }
    //     }
    // };