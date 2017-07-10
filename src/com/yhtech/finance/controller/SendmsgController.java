package com.yhtech.finance.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.peter.util.Log;
import com.peter.util.UtilDate;
import com.yhtech.hr.domain.Staff;

@Controller("sendmsgcontroller")
public class SendmsgController {
	
	/**
	 * 发送短信
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/finance/sendmsg.do")
	@Authority(AuthorityType.NoValidate)
	public void sendmsg(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String telephone = request.getParameter("telephone");
		String money = request.getParameter("money");
		String name = URLDecoder.decode(request.getParameter("name"), "utf-8");
		String date = request.getParameter("date");
		Staff admin = (Staff) request.getSession().getAttribute("admin");
		if(admin==null){
			out.print("您还尚未登录,<a href=\"login.html\" target=\"_blank\">点击登录</a>");
		}else if("YGJCW".equals(admin.getDepartment())){
			String result = sendmsg(telephone,money,name,admin.getName(),date);
			if("success".equals(result)){
				out.print("success");
			}else{
				out.print(result);
			}
		}else{
			out.print("权限不够,无法操作");
		}
	}
	
	
	/**
	 * 发送消息
	 * @param telephone
	 * @param money
	 * @return
	 */
	private static String sendmsg(String telephone,String money,String name,String admin,String date){		
		String Url = "http://106.ihuyi.cn/webservice/sms.php?method=Submit";
		HttpClient client = new HttpClient(); 
		PostMethod method = new PostMethod(Url); 	
		client.getParams().setContentCharset("UTF-8");
		method.setRequestHeader("ContentType","application/x-www-form-urlencoded;charset=UTF-8");		
		String content ="您好，尊敬的壹管家用户，您的租金于"+date+"后到期，本期租金为："+money+"元，请及时交款。\r\n1.银行账户：310066852018800007612，开户名：上海壹火网络科技有限公司，开户行：交通银行三门路支行\r\n2.企业支付宝ygy_sh@qq.com，名称：上海壹火网络科技有限公司。\r\n3.微信支付，关注微信公众号“壹管家社区”进行交租\r\n您还可以关注我们微信公众号“壹管家社区”打好房款后直接截图发布在公众号，里面还有精彩活动哦！";
		NameValuePair[] data = {//提交短信
			    new NameValuePair("account", "cf_1ykg"), 
			    new NameValuePair("password", "nt3mB8"), 	//密码可以使用明文密码或使用32位MD5加密
			    //new NameValuePair("password", util.StringUtil.MD5Encode("密码")),
			    new NameValuePair("mobile", telephone), 
			    new NameValuePair("content", content),
		};
		method.setRequestBody(data);					
		try {
			client.executeMethod(method);
			String SubmitResult =method.getResponseBodyAsString();
			Document doc = DocumentHelper.parseText(SubmitResult); 
			Element root = doc.getRootElement();
			String code = root.elementText("code");	
			String msg = root.elementText("msg");	
//			String smsid = root.elementText("smsid");
Log.logResult("后台管理员:"+admin+UtilDate.getDateFormatter()+""+name+telephone+"发送内容:"+content+"-----------发送状态："+msg+"\r\n", "d:\\igjiaLogs\\yhTech\\MsgLogs");
			if("2".equals(code)){
				return "success";
			}else{
				return msg;
			}			
		}catch (Exception e) {
			return "error";
		}
	}
}
