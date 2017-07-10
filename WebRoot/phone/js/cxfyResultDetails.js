

$(document).ready(function(){

    // 获取通过url传过来的参数
    function getUrl(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return unescape(r[2]); return null; //返回参数值
    } 

    var deZhiFu=decodeURI(decodeURI(getUrl('zhiFu')));
    var zhuangTai=decodeURI(decodeURI(getUrl('zhuangTai')));

    var SFjobNo='';
    var CFjobNo='';
    var fangdongTelephone='';
    var shoukuanrenTelephone='';
    var fangdongTelephoneCF='';

    // -------------手机号码加密显示，只对某些人开放权限
    function phoneEncryption(){
        $.ajax({
            type: 'GET',
            url : CONFIG['url']+'admin.do',
            async: true,
            success:function(data){
                var headUserObj=JSON.parse(data);
                var gjDepartment=headUserObj.department;//部门
                var gjJob_no=headUserObj.job_no;//管家工号
                var gjZhiWei=headUserObj.position;//管家职位
                var gjQuYu=headUserObj.district;//管家区域
                if(gjDepartment=="YGJZL"){
                    if(gjZhiWei=="区域经理"||gjJob_no==SFjobNo||gjZhiWei=="区域总监"){

                    }else{
                        $("#SFfangdong_telephone").html(fangdongTelephone.substring(0,3)+"****"+fangdongTelephone.substring(7,11));
                        $("#SFshoukuanren_telephone").html(shoukuanrenTelephone.substring(0,3)+"****"+shoukuanrenTelephone.substring(7,11));
                        $("#CFrenter_telephone").html(fangdongTelephoneCF.substring(0,3)+"****"+fangdongTelephoneCF.substring(7,11));
                    }
                }
            },
        })
    };

    // ----------管加工号替换成管家姓名
    function guanJiaName(){
        $.ajax({
            type: 'get',
            url: CONFIG['url']+'getStaff.do',
            data: 'job_no='+SFjobNo,
            async: true,
            success:function(data){
                var getStaffObj=JSON.parse(data);
                if(getStaffObj.code==1){
                    $("#SFjob_no").html(getStaffObj.msg.name);
                }
            }
        })
    };
    function guanJiaName2(){
        $.ajax({
            type: 'get',
            url: CONFIG['url']+'igjia/adminContact.do',
            async: true,
            success:function(data){
                var adminContactObj=JSON.parse(data);
                for(var j=0;j<adminContactObj.length;j++){
                    if(adminContactObj[j].job_no == CFjobNo){
                        $("#CFjob_no").html(adminContactObj[j].name);
                    }
                }
            }
        })
    };

    // 收房信息
    $.ajax({
        type:'GET',
        url: CONFIG['url']+'phoneGJ/pOnehouse.do',
        data : "house_id="+getUrl('cxfyHouseId'),
        async:true,
        success:function(data){
            var inforArr = JSON.parse(data);//解析成json对象
            var time=(new Date()).getTime();//当前时间毫秒数
            var haoMiao=(new Date(inforArr.vacancy_date)).getTime();//合同开始日期毫秒数
            var day=Math.ceil((time-haoMiao)/(24*60*60*1000));//空置天数
            SFjobNo=inforArr.job_no;//管家编号
            fangdongTelephone=inforArr.fangdong_telephone;//收房房东电话
            shoukuanrenTelephone=inforArr.shoukuanren_telephone;//收款人电话
            // 渲染页面
            for(var i in inforArr){
                if(inforArr[i]==''){
                    $("#SF"+i).html('无');
                }else{
                    $("#SF"+i).html(inforArr[i]);
                    if(inforArr.vacancy_date!=''){
                        $("#SFvacancy_date").html(day);
                    }
                }
            }
            phoneEncryption();
            guanJiaName();
        },
    });

    //--------------------收房物业信息
    var applicationHtml="";
    var appendHtml='<div id="htInforNone" style="text-align: center;color: #666;padding: 1rem 0 1.4rem;">暂无信息！</div>';
    $.ajax({
        type: 'GET',
        url: CONFIG['url']+'igjia/getproperty.do',//?house_id=1491623404
        data: "house_id="+getUrl('cxfyHouseId'),
        success:function(data){
            var sfObj=JSON.parse(data);
            if(sfObj==null){
                $("#shuiDianMei").append(appendHtml);
                $("#shuiDianMei .fyInforList").remove();
                $("#jiaju").append(appendHtml);
            }else{
                for( var sd in sfObj){
                    $("#SDM"+sd).html(sfObj[sd]);//水电煤渲染
                    if(sfObj[sd]==""||sfObj[sd]==" "){//如果返回字段为空，显示无
                        $("#SDM"+sd).html("无");
                    }
                    if(sd == "application"){
                        var applicationObj=JSON.parse(sfObj.application);
                        for(var jj=0;jj<applicationObj.length;jj++){
                            applicationHtml += '<ul class="fyInforList"><li class="clearfix"><span>家具名称：</span><span>'
                                            +applicationObj[jj].name+'</span></li><li class="clearfix"><span>家具数量：</span><span>'
                                            +applicationObj[jj].number+'</span></li><li class="clearfix"><span>家具型号：</span><span>'
                                            +applicationObj[jj].model+'</span></li><li class="clearfix"><span>备注：</span><span>'
                                            +applicationObj[jj].remark+'</span></li></ul>';
                        }
                        $("#jiaju").append(applicationHtml);
                    }
                }
            }
        }
    });




    // --------------------出房信息
    function getPOnerent(){
        $.ajax({
            type: "GET",
            url: CONFIG['url']+'phoneGJ/pOnerent.do',
            async: true,
            data: "house_id="+getUrl('cxfyHouseId'),
            success: function(result){
                if(result=="zero"){
                    $("#htInforNone").css({'display':'block'});
                    $("#cffyInfor").css({'display':'none'});
                }else if("zero"!=result){
                    var obj = eval('(' + result + ')');
                    CFjobNo=obj.job_no;//管家编号
                    fangdongTelephoneCF=obj.renter_telephone;//出房房东电话
                    // 循环渲染页面
                    for(var i in obj){
                        if(obj[i]==''){
                            $("#CF"+i).html('无');
                        }else{
                            $("#CF"+i).html(obj[i]);
                        }
                    }
                    guanJiaName2();
                }                       
            }
        });
    };

    // ---------------------出房合同信息
    function htInfor(){
        if(deZhiFu=="全部"&&zhuangTai!="已出租"){
            $("#htInforNone").css({'display':'block'});
            $("#cffyInfor").css({'display':'none'});
        }else if(deZhiFu=="全部"&&zhuangTai=="已出租"){
            getPOnerent();
        }else if(deZhiFu!="全部"){
            getPOnerent();
        }
    }
    htInfor();

    //----------------------出房物业信息
    var CFJJhtml='';
    var CFKeyhtml='';
    $.ajax({
        type: 'GET',
        url: CONFIG['url']+'igjia/getrentproperty.do',
        data: "contract_no="+getUrl('cxfyContractNo'),
        success:function(data){
            var cfObj=JSON.parse(data); 
            if(cfObj==null){
                $("#CFZKrentBox").append(appendHtml);
                $("#CFZKrentBox #CFZKrent").remove();
                $("#CFFWinfor").append(appendHtml);
                $("#CFyspz").append(appendHtml);
            }else{
                for(var zk in cfObj){
                    $("#CFZK"+zk).html(cfObj[zk]);//水电煤信息渲染
                    if(zk=="application"){//家具信息渲染
                        var jiajuObj=JSON.parse(cfObj.application);
                        for(var j=0;j<jiajuObj.length;j++){
                            //<li class="clearfix"><span>合同编号：</span><span>'
                            // +jiajuObj[j].contract_no+'</span></li><li class="clearfix"><span>租客姓名：</span><span>'
                            // +jiajuObj[j].rentname+'</span></li><li class="clearfix"><span>租客手机：</span><span>'
                            // +jiajuObj[j].rent_telephone+'</span></li>
                            CFJJhtml+='<ul class="fyInforList fyInforList2"><li class="clearfix"><span>房间类型：</span><span>'
                            +jiajuObj[j].region+'</span></li><li class="clearfix"><span>家具名称：</span><span>'
                            +jiajuObj[j].name+'</span></li><li class="clearfix"><span>家具型号：</span><span>'
                            +jiajuObj[j].model+'</span></li><li class="clearfix"><span>家具状态：</span><span>'
                            +jiajuObj[j].state+'</span></li><li class="clearfix"><span>家具数量：</span><span>'
                            +jiajuObj[j].number+'</span></li><li class="clearfix"><span>备注：</span><span>'
                            +jiajuObj[j].remark+'</span></li></ul>';
                        }
                        $("#CFFWinfor").append(CFJJhtml);
                    }
                    if(zk=="keyinfo"){//钥匙凭证
                        var keyObj=JSON.parse(cfObj.keyinfo);
                        for(var ky=0;ky<keyObj.length;ky++){
                            CFKeyhtml+='<ul class="fyInforList fyInforList3"><li class="clearfix"><span>名称：</span><span>'+keyObj[ky].name+'</span></li><li class="clearfix"><span>数量：</span><span>'+keyObj[ky].number+'</span></li><li class="clearfix"><span>状态：</span><span>'+keyObj[ky].state+'</span></li><li class="clearfix"><span>备注：</span><span>'+keyObj[ky].remark+'</span></li></ul>';
                        }
                        $("#CFyspz").append(CFKeyhtml);
                    }
                }
            }
        }
    });



});



