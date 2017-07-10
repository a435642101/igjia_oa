$(function(){
    Handlebars.registerHelper('selected', function(val1, options) {
       var div = $('<div>').html(options.fn(this));
       div.find("[value="+val1+"]").attr('selected', true);
       return div.html();
   });
   
  
   
   var state = getUrl("state");
   var rentername = getUrl("rentername");
	
   if(rentername!=null){
	   $(".rentername").val(decodeURI(rentername));
   }
   if(state!=null){
	   $(".state")[0].value=decodeURI(state);
   }
   
   if(decodeURI(state)=="全部" && decodeURI(rentername)==""){
		 getpagerear();
	}else{
		 searchpagerear();
	}
   
   $('.btn-primary').click(function(){
	   var state = encodeURI(encodeURI($('.state').val()));
		var rentername= encodeURI(encodeURI($('.rentername').val()));
		location.href="repairList.html?state="+state+"&rentername="+rentername;
	});
});
function getUrl(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	console.log(r);
	if (r!=null) return unescape(r[2]); return null; //返回参数值
} 
    function getallrent(){
    	var state = encodeURI(encodeURI($('.state').val()));
    	var renter= encodeURI(encodeURI($('.rentername').val()));
    	if(state=="全部" && renter==""){
    		 getpagerear2();
    	}else{
    		 searchpagerear2();
    	}
       
    };

    var page = 1;
    // 初始化页面
    function getpagerear(){
        $.ajax({
            type : 'GET',
            url : '/getAllRepair.do',
            data: "page="+page+"&num=10", //要发送的数据
            // dataType : 'JOSN',
            async : false,
            success : function(data){
                var infor=JSON.parse(data);
                if(infor.code == 1){
                    // alert("初始化页面请求成功！");                     
                    // 渲染页面
                    var template = Handlebars.compile($("#tr-template").html());
                    var html = template(infor);
                    $("#baoxiu tbody").html(html);
                    
                    //分页代码 
                    $('#maxnum').val(infor.total);
                    var maxnum = $('#maxnum').val();
                    $('#total').html(maxnum);
                    maxnum = parseInt(maxnum);
                    maxnum = Math.ceil(maxnum/10.0);
                    $('.pageTest').page({
                        leng:maxnum,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                    });
                }else if(infor.code == 2){
                    alert("页面初始化失败！");
                }
            }
        });
    };

    // 分页
    function getpagerear2(){
        var page = $('.activP').text();
        $.ajax({
            type : 'GET',
            url : '/getAllRepair.do',
            data: "page="+page+"&num=10", //要发送的数据
            // dataType : 'JOSN',
            async : false,
            success : function(data){
                var infor=JSON.parse(data);
                if(infor.code == 1){
                    // 渲染页面
                    var template = Handlebars.compile($("#tr-template").html());
                    var html = template(infor);
                    $("#baoxiu tbody").html(html);
                }else if(infor.code == 2){
                    alert("（分页）参数错误！");
                }
            }
        });
    };
    
 // 初始化页面
    function searchpagerear(){
    	var state = encodeURI(encodeURI($('.state').val()));
    	var renter= encodeURI(encodeURI($('.rentername').val()));
        $.ajax({
            type : 'GET',
            url : "/searchRepair.do",
            data: "state="+state+"&renter="+renter+"&page="+page+"&num=10", //要发送的数据
            // dataType : 'JOSN',
            async : false,
            success : function(data){
                var infor=JSON.parse(data);
                if(infor.code == 1){
                    // alert("初始化页面请求成功！");                     
                    // 渲染页面
                    var template = Handlebars.compile($("#tr-template").html());
                    var html = template(infor);
                    $("#baoxiu tbody").html(html);
                    
                    //分页代码 
                    $('#maxnum').val(infor.total);
                    var maxnum = $('#maxnum').val();
                    $('#total').html(maxnum);
                    maxnum = parseInt(maxnum);
                    maxnum = Math.ceil(maxnum/10.0);
                    $('.pageTest').page({
                        leng:maxnum,//分页总数
                        activeClass: 'activP' , //active 类样式定义
                    });
                }else if(infor.code == 2){
                    alert("页面初始化失败！");
                }
            }
        });
    };

    // 分页
    function searchpagerear2(){
    	var state = encodeURI(encodeURI($('.state').val()));
    	var renter= encodeURI(encodeURI($('.rentername').val()));
        var page = $('.activP').text();
        $.ajax({
            type : 'GET',
            url : "/searchRepair.do",
            data: "state="+state+"&renter="+renter+"&page="+page+"&num=10", //要发送的数据
            // dataType : 'JOSN',
            async : false,
            success : function(data){
                var infor=JSON.parse(data);
                if(infor.code == 1){
                    // 渲染页面
                    var template = Handlebars.compile($("#tr-template").html());
                    var html = template(infor);
                    $("#baoxiu tbody").html(html);
                }else if(infor.code == 2){
                    alert("（分页）参数错误！");
                }
            }
        });
    };

    function changestate(repair_id,e){
    	var state = $(e).val();
    	if(confirm("是否确认更改为"+state)){		
    		$.ajax({
    			   type: "GET",
    			   url: "/updaterepair.do",
    			   data: "repair_id="+repair_id+"&state="+encodeURI(encodeURI(state)),
    			   success: function(result){
    				$('.loading').hide();
    					if(result=="error"){
    						alert('修改失败');
    					}else if(result=="fail"){
    						alert('未登录');
    					}else if(result=="refused"){
    						alert('权限不够');
    					}else{
    						$(e)[0].value=state;						
    					};
    			   }
    		});
    	};		
    } 
    function changeremark(repair_id,e){
    	var remark = $(e).siblings("input").val();
    		$.ajax({
    			   type: "GET",
    			   url: "/changeremark.do",
    			   data: "repair_id="+repair_id+"&remark="+encodeURI(encodeURI(remark)),
    			   success: function(result){
    					if(result=="error"){
    						alert('修改失败')
    					}else if(result=="fail"){
    						alert('未登录');
    					}else if(result=="refused"){
    						alert('权限不够');
    					}
    			   }
    		});	
    };   
    