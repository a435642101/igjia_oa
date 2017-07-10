$(function(){
	getrenter();
	$(".bj a").click(function(){
		$(this).parents(".bj").siblings(".word_grey").children("input").removeAttr("readonly");
		$(this).parents(".bj").siblings(".word_grey").children("input").focus();
	})
	$(".update").click(function(){
		var orderid = $('.orderid').val();
		var address = $('.address').val();
		var period = $('.period').val();
		var name = $('.name').val();
		var telephone = $('.telephone').val();
		var money = $('.money').val();
		var mode = $('.mode').val();
		var remark = $('.remark').val();
		var state = $('.state').val();
		var contract_no = $('.contract_no').val();
		update(orderid,address,period,name,telephone,money,mode,remark,state,contract_no);
	})
})
function getrenter(){
	var orderid = GetQueryString("orderid");
	$.ajax({
		   type: "GET",
		   url: "getOneorder.do",
		   data: "orderid="+orderid,
		   success: function(result){				
				if(result == "fail"){
					$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>");
				}else{
					var obj=JSON.parse(result);
					$(".orderid").val(obj.orderid);
					$(".date").val(obj.date);
					$(".house_id").val(obj.house_id);
					$(".address").val(obj.address);
					$(".period").val(obj.period);
					$(".name").val(obj.name);
					$(".telephone").val(obj.telephone);
					$(".money").val(obj.money);
					$(".mode").val(obj.mode);
					$(".remark").val(obj.remark);
					$(".contract_no").val(obj.contract_no);
					$(".state")[0].value=obj.state;
				}
				
		   }
	});
}

function update(orderid,address,period,name,telephone,money,mode,remark,state,contract_no){
	$.ajax({
		   type: "GET",
		   url: "updaterentOrder.do",
		   data: "orderid="+orderid+"&address="+encodeURI(encodeURI(address))+"&period="+period+"&name="+encodeURI(encodeURI(name))+"&telephone="+telephone
		   +"&money="+money+"&mode="+encodeURI(encodeURI(mode))+"&remark="+encodeURI(encodeURI(remark))+"&state="+encodeURI(encodeURI(state))+"&contract_no="+contract_no,
		   success: function(result){
				if(result=="error"){
					alert("修改失败");
				}else if(result=="fail"){
					alert("尚未登陆");
				}else{
					alert("修改成功");
					window.location.href='RentOrder.html';
				}
		   }
	});
}

//截取参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}