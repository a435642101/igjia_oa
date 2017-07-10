


// 确认提交弹框
// function confirm(){
// 	var alertConfirm= "<div id=" + "alertBox" + ">" + "<div class=" + "alertBox" + ">" + "<p>是否确认所填信息无误？</p>" + "<div class=" + "btnBox" + ">" + "<input type=" + "submit" + " value=" + "是，确认提交" + " id=" + "btnYes" + ">" + "<input type=" + "reset" + " value=" + "不，返回提交" + " id=" + "btnNo" + ">" + "</div>" + "</div>" + "</div>";
// 	$('body').append(alertConfirm);
// };


$(document).ready(function(){

    // alert($(window).width());

	// 首页最新出房、最新入房 滚动播出
	function newsScrollCf(){
        $(".newCF1 .CFList").stop(true,true).animate({marginTop:'-0.6rem'},800,function(){
            $(this).css({marginTop:0});
            $(".newCF1 .CFList li:last").after($(".newCF1 .CFList li:first"));
        });
    };
    setInterval(newsScrollCf,2500);//函数2.5秒执行一次
    function newsScroll(){
        $(".newRF1 .CFList").stop(true,true).animate({marginTop:'-0.6rem'},800,function(){
            $(this).css({marginTop:0});
            $(".newRF1 .CFList li:last").after($(".newRF1 .CFList li:first"));
        });
    };
    setInterval(newsScroll,2500);//函数2.5秒执行一次

	//查询房源，查询结果，查询条件右侧滑动出现
    var bodyHeight=$(document).height()+'px';
	$("#resultBox .menu").click(function(){
		$("#queryLeftBox").animate({right:"0"},300);
        $("#bodyBox").css({'position':'fixed','height':'100%','overflow':'hidden'});
	});
	$("#queryLeftBox").click(function(){
		$(this).animate({right:"-7.6rem"},300);
        $("#bodyBox").css({'position':'static','height':'auto','overflow':'auto'});
	});
	$("#queryLe").click(function(event){
		event.stopPropagation();
	});

	//查询房源，查询结果详情，收房信息、出房信息切换
	$("#detailsBox .head span").click(function(){
		var spanIndex = $(this).index();
		$(this).removeClass("BCf2f2f2");
		$(this).siblings("span").addClass("BCf2f2f2");

		$("#detailsBox .showBox").eq(spanIndex).stop(true,true).slideDown(500);
		$("#detailsBox .showBox").eq(spanIndex).siblings(".showBox").stop(true,true).slideUp(500);
	});

	// 添加出房，房源信息，确认提交弹框
	$("#addFyxx .queryBtn input").click(function(){
		$("#alertBox").fadeIn(500);
	});

	// 添加出房，租客信息，确认提交弹框
	$("#addZkxx .queryBtn input").click(function(){
		$("#alertBox").fadeIn(500);
	});

	// 添加出房，合同信息，确认提交弹框
	$("#addHtxx .queryBtn input").click(function(){
		$("#alertBox").fadeIn(500);
	});

	// 设置select option的颜色
    // $(".colorSZ").css('color','#d2d2d2');
    // $(".colorSZ option").css('color','#000');
    // $(".colorSZ").on('click touchStart',function(){
    //     if($(this).get(0).selectedIndex == 0){
    //         $(this).css('color','#d2d2d2');
    //     }else{
    //         $(this).css('color','#000');
    //     }
    // });
    

    // 维修详情，是否更换配件
    $("#wxDetailsBtn .wxBtn").on('click',function(){
    	$(this).find('i').css({'color':'#ee6b41'});
    	$(this).siblings('.wxBtn').find('i').css({'color':'#aaa'});
    });
    $("#wxDetailsBtn .wxBtnYes").on('click',function(){
    	$("#peiJianInfor").stop(true,true).slideDown(500);
    });
    $("#wxDetailsBtn .wxBtnNo").on('click',function(){
    	$("#peiJianInfor").stop(true,true).slideUp(500);
    });
    var partsI=0;
    // 更换配件，点击添加，添加新的表单元素内容
    $("#addBtn").on('click',function(){
    	partsI++;
	    var partsHtml='<div class="partsItem clearfix">'+'<div class="addBtn delateBtn fl iconfont">&#xe617;</div>'+'<div class="partsForm fr">'+'<div class="partsName clearfix">'+'<label class="fl" for="partsName'+partsI+'">名称:</label>'+'<div class="inputK fr">'+'<input type="text" value="" placeholder="请输入名称" id="partsName'+partsI+'">'+'</div>'+'</div>'+'<div class="priceTime clearfix">'+'<label for="partsPrice'+partsI+'">单价:</label>'+'<div class="inputK">'+'<input type="text" value="" placeholder="请输入单价" id="partsPrice'+partsI+'">'+'</div>'+'<label for="partsTime'+partsI+'">质保时间:</label>'+'<div class="inputK">'+'<input type="text" value="" placeholder="请选择时间" id="partsTime'+partsI+'">'+'</div>'+'</div>'+'</div>'+'</div>';
    	$("#peiJianInfor .peiJianView").append(partsHtml);
    });
    // 更换配件，点击删除，删除对应的表单元素内容
    $("#peiJianInfor .peiJianView").on("click",".partsItem .delateBtn",function(){
    	$(this).parent('.partsItem').remove();
    });

});



