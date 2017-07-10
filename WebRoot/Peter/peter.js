//js验证码60s倒计时
$(function(){
	$('#send').click(function(){	
		var wait=60;
		var reg = "^1[3|4|5|8][0-9]{9}$";
		var value=$('#mobile').val();
		var time = setInterval(function(){			
		   if(value.match(reg)){
			   if(wait == 0) {
		            $('#send').attr("disabled",false);           
		            $('#send').val("获取验证码");
		            clearInterval(time)
		       }else{
		    	    $('#send').attr("disabled",'true');
		    	    $('#send').val("重新发送("+wait+")");
		            wait--;
			   }
		   }
		},1000);
	})
})

//按下enter(键位13)的时候触发	
$(document).ready(function(){ 
	$("#username,#password").keydown(function(e){ 
		var curKey = e.which; 
	 	if(curKey == 13){ 
	    	checkForm();
		} 
	}); 
});