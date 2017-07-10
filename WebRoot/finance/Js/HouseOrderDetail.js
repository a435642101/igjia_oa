$(function(){
	gethouse();
	$(".bj a").click(function(){
		$(this).parents(".bj").siblings(".word_grey").children("input").removeAttr("readonly");
		$(this).parents(".bj").siblings(".word_grey").children("input").focus();
	})
	$(".update").click(function(){
		var house_id = $('.house_id').val();
		var contract_no = $('.contract_no').val();
		var orderid = $('.orderid').val();
		var address = $('.address').val();
		var period = $('.period').val();
		var shoukuanren_name = $('.shoukuanren_name').val();
		var shoukuanren_telephone = $('.shoukuanren_telephone').val();
		var shoukuanren_kaihuhang = $('.shoukuanren_kaihuhang').val();
		var shoukuanren_account = $('.shoukuanren_account').val();
		var money = $('.money').val();
		var remark = $('.remark').val();
		var state = $('.state').val();
		update(contract_no,house_id,orderid,address,period,shoukuanren_name,shoukuanren_telephone,money,shoukuanren_kaihuhang,shoukuanren_account,remark,state);
	})
})
function gethouse(){
	var orderid = GetQueryString("orderid");
	$.ajax({
		   type: "GET",
		   url: "getOneHouseorder.do",
		   data: "orderid="+orderid,
		   success: function(result){
				if(result == "fail"){
					$("#loadmore").html("您还尚未登录,<a href=\"../login.html\" target=\"_blank\">点击登录</a>");
				}else{
					var obj=JSON.parse(result);
					$(".contract_no").val(obj.contract_no);
					$(".orderid").val(obj.orderid);
					$(".house_id").val(obj.house_id);
					$(".date").val(obj.date);
					$(".address").val(obj.address);
					$(".period").val(obj.period);
					$(".shoukuanren_name").val(obj.shoukuanren_name);
					$(".shoukuanren_telephone").val(obj.shoukuanren_telephone);
					$(".shoukuanren_kaihuhang").val(obj.shoukuanren_kaihuhang);
					$(".shoukuanren_account").val(obj.shoukuanren_account);
					$(".money").val(obj.money);
					$(".remark").val(obj.remark);
					$(".state")[0].value=obj.state;
				}
				
		   }
	});
}

function update(contract_no,house_id,orderid,address,period,shoukuanren_name,shoukuanren_telephone,money,shoukuanren_kaihuhang,shoukuanren_account,remark,state){
	$.ajax({
		   type: "GET",
		   url: "updatehouseOrder.do",
		   data: "contract_no="+contract_no+"&house_id="+house_id+"&orderid="+orderid+"&address="+encodeURI(encodeURI(address))+"&period="+period+"&shoukuanren_name="+encodeURI(encodeURI(shoukuanren_name))+"&shoukuanren_telephone="+shoukuanren_telephone
		   +"&shoukuanren_account="+shoukuanren_account+"&shoukuanren_kaihuhang="+encodeURI(encodeURI(shoukuanren_kaihuhang))+"&money="+money+"&remark="+encodeURI(encodeURI(remark))+"&state="+encodeURI(encodeURI(state)),
		   success: function(result){
				if(result=="error"){
					alert("修改失败");
				}else if(result=="fail"){
					alert("尚未登陆");
				}else{
					alert("修改成功");
					window.location.href='HouseOrder.html';
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