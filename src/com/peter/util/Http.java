package com.peter.util;


import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.Map;


import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpConnectionManager;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.MultiThreadedHttpConnectionManager;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.DeleteMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.PutMethod;
import org.apache.commons.httpclient.util.IdleConnectionTimeoutThread;
/* *
 *类名：Http
 *功能：自定义Http请求类
 *详细：http的get和post请求,线程安全的
 *版本：2.0
 *日期：2016-07-11
 *author:TYShi
 */
public class Http {
	/** 连接超时时间，由bean factory设置，缺省为8秒钟 */
    private int defaultConnectionTimeout = 8000;

    /** 回应超时时间, 由bean factory设置，缺省为30秒钟 */
    private int defaultSoTimeout = 30000;

    /** 闲置连接超时时间, 由bean factory设置，缺省为60秒钟 */
    private int defaultIdleConnTimeout = 60000;

    private int defaultMaxConnPerHost = 30;

    private int defaultMaxTotalConn = 80;

    /** 默认等待HttpConnectionManager返回连接超时（只有在达到最大连接数时起作用）：1秒*/
    private static final long defaultHttpConnectionManagerTimeout = 3 * 1000;
	/**
     * HTTP连接管理器，该连接管理器必须是线程安全的.
     */
    private static HttpConnectionManager      connectionManager;
    
    private static Http httpHandler = new Http();
	
    /**
     * 工厂方法
     * 
     * @return
     */
    public static Http getInstance() {
        return httpHandler;
    }
    
    /**
     * 私有的构造方法
     */
    private Http() {
        // 创建一个线程安全的HTTP连接池
        connectionManager = new MultiThreadedHttpConnectionManager();
        connectionManager.getParams().setDefaultMaxConnectionsPerHost(defaultMaxConnPerHost);
        connectionManager.getParams().setMaxTotalConnections(defaultMaxTotalConn);

        IdleConnectionTimeoutThread ict = new IdleConnectionTimeoutThread();
        ict.addConnectionManager(connectionManager);
        ict.setConnectionTimeout(defaultIdleConnTimeout);

        ict.start();
    }
    
	/**
	 * 建立连接
	 * @param url 请求地址
	 * @param param 参数，map形式
	 * @param requestmethod 请求方式（GET,POST）
	 * @return
	 * @throws Exception
	 */
	public String hp(String url,Map<String,String> param,String requestmethod) throws Exception{
		HttpClient client = new HttpClient(connectionManager); 
		
		 // 设置连接超时
        int connectionTimeout = defaultConnectionTimeout;
        client.getHttpConnectionManager().getParams().setConnectionTimeout(connectionTimeout);
        
     // 设置回应超时
        int soTimeout = defaultSoTimeout;
        client.getHttpConnectionManager().getParams().setSoTimeout(soTimeout);
        
     // 设置等待ConnectionManager释放connection的时间
        client.getParams().setConnectionManagerTimeout(defaultHttpConnectionManagerTimeout);
        
        HttpMethod method = null;
        if("get".equalsIgnoreCase(requestmethod)){			//GET请求
        	method = new GetMethod(url);
        	NameValuePair[] nvp = generatNameValuePair(param);
        	method.setQueryString(toString(nvp));
        }else if("post".equalsIgnoreCase(requestmethod)){			//POST请求
        	method = new PostMethod(url); 				
    		client.getParams().setContentCharset("UTF-8");
    		((PostMethod) method).addParameters(generatNameValuePair(param));
    		method.setRequestHeader("ContentType","application/x-www-form-urlencoded;charset=UTF-8");
        }else if("delete".equalsIgnoreCase(requestmethod)){															
        	method = new DeleteMethod(url);
        	NameValuePair[] nvp = generatNameValuePair(param); 
        	method.setQueryString(toString(nvp));
        }else if("put".equalsIgnoreCase(requestmethod)){															
        	method = new PutMethod(url); 				
    		client.getParams().setContentCharset("UTF-8");
    		NameValuePair[] nvp = generatNameValuePair(param);
    		method.setQueryString(toString(nvp));	
        }else{
        	method = new GetMethod(url);
        	NameValuePair[] nvp = generatNameValuePair(param);
        	method.setQueryString(toString(nvp));	//缺省为GET请求
        }
        method.releaseConnection();
        // 设置Http Header中的User-Agent属性
        method.addRequestHeader("User-Agent", "Mozilla/4.0");	
			client.executeMethod(method);				
		//	String SubmitResult =method.getResponseBodyAsString();
			InputStream is = method.getResponseBodyAsStream();
			String SubmitResult = StreamTool.readReturnString(is);
			method.releaseConnection();
			return SubmitResult;
		
	}
	
	/**
     * MAP类型数组转换成NameValuePair类型
     * @param properties  MAP类型数组
     * @return NameValuePair类型数组
     */
	private static NameValuePair[] generatNameValuePair(Map<String, String> properties) {
        NameValuePair[] nameValuePair = new NameValuePair[properties.size()];
        int i = 0;
        for (Map.Entry<String, String> entry : properties.entrySet()) {
            nameValuePair[i++] = new NameValuePair(entry.getKey(), entry.getValue());
        }

        return nameValuePair;
    }
    
    /**
     * 将NameValuePairs数组转变为字符串
     * 
     * @param nameValues
     * @return
     */
    protected String toString(NameValuePair[] nameValues) {
        if (nameValues == null || nameValues.length == 0) {
            return "null";
        }

        StringBuffer buffer = new StringBuffer();

        for (int i = 0; i < nameValues.length; i++) {
            NameValuePair nameValue = nameValues[i];

            if (i == 0) {
                buffer.append(nameValue.getName() + "=" + nameValue.getValue());
            } else {
                buffer.append("&" + nameValue.getName() + "=" + nameValue.getValue());
            }
        }

        return buffer.toString();
    }
	
    /**
     * testDemo
     * @param args
     * @throws Exception
     */
	public static void main(String[] args) throws Exception{
		Map<String, String> sParaTemp = new LinkedHashMap<String, String>();
		sParaTemp.put("id", "w1633944307");
		sParaTemp.put("sign","eb3f6a6f5a4fe121f830d7f44c1debf8");
		sParaTemp.put("time","1467702465");
		sParaTemp.put("sid","1");
		Http h = Http.getInstance();
		String r = h.hp("http://qq.17515.cn:880/gamelist/199y/199y_pt_player.php",sParaTemp,"post");
		System.out.println(r);
	}
}
