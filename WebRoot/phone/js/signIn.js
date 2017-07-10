

$(document).ready(function(){

	
	$("#contentBox .inputK input").on('click',function(){
		$(this).siblings().show(100);
		$(this).parent().addClass('selectBg').parent().siblings().find('.inputK').removeClass('selectBg').find('i').hide(100);
	});

	$("#signInBtn").on('click',function(){
		var userName=$("#userName").val();
		var passWord=$("#password").val();
		$.ajax({
			type:'GET',
			url : CONFIG['url']+'login.do',
			data:"username="+userName+"&password="+passWord,
			success:function(data){
				if(data=='success'){
					window.location.href='index.html';
				}else if(data=='用户不存在'){
					alert("用户名不存在！");
				}else if(data=='密码错误'){
					alert("密码错误！");
				}
			},
			error:function(jqXHR){

			}
		});
	});



});

