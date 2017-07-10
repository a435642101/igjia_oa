//JavaScript Document
$(function(){
	$("button").click(function(){
		var renter = $(".renter").val();
		var telephone = $(".telephone").val();
		var yuyue_date = $(".yuyue_date").val();
		var address = $(".address").val();
		var descrip = $(".descrip").val();
		var remark = $(".remark").val();
		if(renter!="" && telephone!="" && yuyue_date!="" && address!="" && descrip!=""){
			renter = encodeURI(encodeURI(renter));
			address = encodeURI(encodeURI(address));
			descrip = encodeURI(encodeURI(descrip));
			remark = encodeURI(encodeURI(remark));
			add(renter,telephone,yuyue_date,address,descrip,remark);
		}else{
			alert("除备注外其他都是必填项");
		}
	});
});

function add(renter,telephone,yuyue_date,address,descrip,remark){
	$.ajax({
		type : "POST",
		url : "/addRepair.do",
		data : "renter=" + renter + "&telephone=" + telephone + "&yuyue_date=" + yuyue_date + "&address=" + address + "&describe=" + descrip + "&remark=" + remark,
		success : function(result) {
			var arr = JSON.parse(result);

			if (arr.code == "3") {
				alert("添加失败");
			} else if (arr.code == "2") {
				alert("参数异常");
			} else {
				alert("添加成功");
			}
		}
	})
}
