package com.yhtech.finance.dao;


import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;



public class TestDI {
	
	/**
	 * @param args
	 * @throws SQLException 
	 */
	public static void main(String[] args) throws Exception {
//		String conf="applicationContext.xml";
//		ApplicationContext ac = new ClassPathXmlApplicationContext(conf);
//		System.out.println();
//		IEstateDemoDao estatedao = ac.getBean("estatedao",IEstateDemoDao.class);
//		Threebanner t = new Threebanner();
//		t.setBannerdate("2015-12-16 9:16:30");
//		t.setGamename("壹火互动");
//		t.setGamepicture("abc.jpg");
//		three.insert(t);
//		List<String> list = ReadXls.readexcel("d://rent_contract.xls",3);
//		String pwd = Math.random()*900000+100000+"";
		System.out.println(getLastMonthlast(2017,06));
     }
	
	/**
	 * 获得上月最后一天
	 */
	public static String getLastMonthlast(int year,int month){
		SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd"); 
		Calendar ca = Calendar.getInstance(); 
		ca.set(Calendar.YEAR,year);
		ca.set(Calendar.MONTH, month-2);
		ca.set(Calendar.DATE, 1);
        ca.set(Calendar.DAY_OF_MONTH, ca.getActualMaximum(Calendar.DAY_OF_MONTH));  
        return format.format(ca.getTime());
	}
	
	/**
	 * 发送消息
	 * @param telephone
	 * @param money
	 * @return
	 
	private static String sendmsg(String telephone,int i){		
		String Url = "http://106.ihuyi.cn/webservice/sms.php?method=Submit";
		HttpClient client = new HttpClient();  
		PostMethod method = new PostMethod(Url); 	
		client.getParams().setContentCharset("UTF-8");
		method.setRequestHeader("ContentType","application/x-www-form-urlencoded;charset=UTF-8");		
		//		String content ="亲爱的壹管家租客：您好！\r\n为了防范风险，保障租客与公司双方资金安全，经济不受损失，现告知租客支付租金的支付方式只限定于以下三种：\r\n1、银行账户：户名：上海壹火网络科技有限公司，账号：310066852018800007612，开户行：交通银行三门路支行\r\n2、支付宝ygy_sh@qq.com支付宝名字：上海壹火网络科技有限公司\r\n3、微信支付，关注微信公众号“壹管家社区”进行交租。\r\n从即日起上海壹火网络科技有限公司只接受上述三种房租支付方式，除此之外的其他任何形式付款上海壹火网络科技有限公司一概不予认可，由此造成的损失由付款人自行承担。由此给您带来的不便公司深表抱歉。";
		String content ="特别提醒：原先使用“王石磊个人支付宝”、“王石磊个人招商银行账户”、向业务员个人支付现金及其他任何形式交付租金的租客，从即日起请您选择以上述三种方式中的任何一种缴付房租。\r\n有疑问可致电：4000117281客户专线\r\n\r\n上海壹火网络科技有限公司";
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
Log.logResult(i+";"+UtilDate.getDateFormatter()+";"+telephone+"发送内容:"+content+"-----------发送状态："+msg+"\r\n", "d:\\igjiaLogs\\yhTech\\MsgLogs");
			if("2".equals(code)){
				return "success";
			}else{
				return msg;
			}			
		}catch (Exception e) {
			return "error";
		}
	}*/
}
