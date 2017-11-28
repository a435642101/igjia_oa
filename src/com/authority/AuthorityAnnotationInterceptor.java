package com.authority;

import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.peter.util.Log;
import com.peter.util.UtilDate;
import com.yhtech.hr.domain.Staff;

public class AuthorityAnnotationInterceptor extends HandlerInterceptorAdapter{
	 public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		 response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			String ip = request.getHeader("x-forwarded-for"); 
			if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 		//获取IP
				ip = request.getHeader("Proxy-Client-IP"); 
				} 
				if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
				ip = request.getHeader("WL-Proxy-Client-IP"); 
				} 
				if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
				ip = request.getRemoteAddr(); 
			}
			
	    if (handler instanceof HandlerMethod) {
	        HandlerMethod hm = (HandlerMethod) handler;

	        Class<?> clazz = hm.getBeanType();
	        Method m = hm.getMethod();
	        try {
	            if (clazz != null && m != null) {
	                boolean isClzAnnotation = clazz.isAnnotationPresent(Authority.class);
	                boolean isMethondAnnotation = m.isAnnotationPresent(Authority.class);
	                Authority authority = null;
	                // 如果方法和类声明中同时存在这个注解，那么方法中的会覆盖类中的设定。
	                if (isMethondAnnotation) {
	                    authority = m.getAnnotation(Authority.class);
	                } else if (isClzAnnotation){
	                    authority = clazz.getAnnotation(Authority.class);
	                }
	                if (authority != null){
	                	Staff admin = (Staff) request.getSession().getAttribute("admin");
	                	if(admin!=null){				//此处日志记录
	                		 String queryString = getParams(request);
	                		String log;
	                		if(queryString!=null){
	                			log =UtilDate.getDateFormatter()+";"+admin.getJob_no()+"访问"+request.getRequestURL()+"?"+URLDecoder.decode(URLDecoder.decode(queryString,"utf-8"),"utf-8")+";来源IP:"+ip;
	                		}else{
	                			log =UtilDate.getDateFormatter()+";"+admin.getJob_no()+"访问"+request.getRequestURL()+"?"+queryString+";来源IP:"+ip;
	                		}
	                		
	                		Log.logResult(log+"\r\n", "d:\\igjiaLogs\\yhTech\\Logs");
	                		if("admin".equals(admin.getJob_no()) ||"10002".equals(admin.getJob_no()) ){		//admin直接放行
		                		return true;
		                	}
	                	}
	                	
	                	
	                    if (AuthorityType.NoValidate == authority.value()) {			//不验证直接通过
	                        // 标记为不验证,放行
	                        return true;
	                    }else if (AuthorityType.LoginAuthority == authority.value()) {	//验证是否登录
	                    	if(admin!=null){
	                    		return true;
	                    	}else{
	                    		out.print("fail");
	                    		return false;
	                    	}                        
	                    }else if(AuthorityType.TopAuthority == authority.value()){
	                    	if(admin!=null){
	                    		if("0".equals(admin.getPermission())){	                    			
	                    			return true;
	                    		}else{
	                    			out.print("refused");
	                    			return false;
	                    		}
	                    	}else{
	                    		out.print("fail");
	                    		return false;
	                    	}
	                    }else if(AuthorityType.FinanceAuthority == authority.value()){
	                    	if(admin!=null){
	                    		if("YGJCW".equals(admin.getDepartment())){	                    			
	                    			return true;
	                    		}else{
	                    			out.print("refused");
	                    			return false;
	                    		}	                    	
	                    	}else{
	                    		out.print("fail");
	                    		return false;
	                    	}                    	                   	
	                    }else if(AuthorityType.HRAuthority == authority.value()){
	                    	if(admin!=null){
	                    		if("YGJHR".equals(admin.getDepartment()) || "2".equals(admin.getPermission())){	                    			
	                    			return true;
	                    		}else{
	                    			out.print("refused");
	                    			return false;
	                    		}	                    	
	                    	}else{
	                    		out.print("fail");
	                    		return false;
	                    	}                    	
	                    }else if(AuthorityType.KHFWZXAuthority == authority.value()){
							if(admin!=null){
								if("KHFWZX".equals(admin.getDepartment()) || "2".equals(admin.getPermission())){
									return true;
								}else{
									out.print("refused");
									return false;
								}
							}else{
								out.print("fail");
								return false;
							}
						}
	                }else{
	                	String log =UtilDate.getDateFormatter()+";未验证权限地址访问"+request.getRequestURL()+"?"+request.getQueryString()+";来源IP:"+ip;
                		Log.logResult(log+"\r\n", "d:\\igjiaLogs\\yhTech\\Logs");
	                	 return true;			//未验证直接放行
	                }
	            }
	        } catch (Exception e){
	        	e.printStackTrace();
	        	out.print("error");
	        	return false;
	        }
	    }
	    return false;
	    }

	 /**
	  * 获取参数
	  * @param request
	  * @return
	  */
	private String getParams(HttpServletRequest request) {
		@SuppressWarnings("unchecked")
		Map<String, String[]> params = request.getParameterMap();
		 String queryString = ""; 
		  for (String key : params.keySet()) { 
		   String[] values = params.get(key); 
		   for (int i = 0; i < values.length; i++) { 
		    String value = values[i]; 
		    queryString += key + "=" + value + "&"; 
		   } 
		  } 
		  // 去掉最后一个空格 
		  if(queryString.length()!=0){
			  queryString = queryString.substring(0, queryString.length() - 1);
		  }
		  
		return queryString;
	}   
}
