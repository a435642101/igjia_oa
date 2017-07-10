package com.peter.util;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DoCookie {
	/**
	 * 添加cookie
	 * @param response
	 * @param request
	 * @param cookiename名字
	 * @param content内容
	 * @param time cookie有效时间
	 * @throws Exception
	 */
	public static void addCookie(HttpServletResponse response,HttpServletRequest request,String cookiename,String content,int time){
		StringBuffer url = request.getRequestURL();  
		String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append("/").toString();
		String u = getTopDomainWithoutSubdomain(tempContextUrl);		//转一级域名	
		Cookie c = new Cookie(cookiename,content); 
		c.setDomain("."+u);//注意是以点号开头的. 
		c.setPath("/");
		c.setMaxAge(time);
		response.addCookie(c);
	}
	
	/**
	 * 删掉Cookie
	 * @param response
	 * @throws MalformedURLException 
	 */
	public static boolean deleteCookie(HttpServletResponse response,HttpServletRequest request,String cookiename){
		StringBuffer url = request.getRequestURL();  
		String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append("/").toString();
		String u = getTopDomainWithoutSubdomain(tempContextUrl);		//转一级域名	
		 Cookie c = new Cookie(cookiename, null);
	  	  c.setDomain("."+u);//注意是以点号开头的. 
	  	  c.setPath("/");
	  	  c.setMaxAge(0);
	  	  response.addCookie(c);
	  	  return true;
	}
	
	
	/**
	 * 二级域名转一级域名
	 * @param url
	 * @return
	 * @throws MalformedURLException
	 */
	private static String getTopDomainWithoutSubdomain(String url){
		try {
			String host = new URL(url).getHost().toLowerCase();
			Pattern pattern = Pattern.compile("[^\\.]+(\\.com\\.cn|\\.net\\.cn|\\.org\\.cn|\\.gov\\.cn|\\.com|\\.net|\\.cn|\\.org|\\.cc|\\.me|\\.tel|\\.mobi|\\.asia|\\.biz|\\.info|\\.name|\\.tv|\\.hk|\\.公司|\\.中国|\\.网络)");
			Matcher matcher = pattern.matcher(host);
			while (matcher.find()) {
				return matcher.group();
			}
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		return null;
	}
}
