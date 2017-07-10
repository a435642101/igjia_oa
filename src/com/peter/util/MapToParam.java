package com.peter.util;

import java.util.Iterator;
import java.util.Map;
/* *
 *类名：MapToParam
 *功能：对Map集合的处理
 *详细：对Map参数加密等等的一系列操作
 *版本：1.0
 *日期：2016-07-11
 *author:TYShi
 */
public class MapToParam {
	/** 
     * 把Map集合所有元素排序，并按照“参数=参数值”的模式用“&”字符拼接成字符串
     * @param params 需要排序并参与字符拼接的集合
     * @return 拼接后字符串
     */
    @SuppressWarnings("rawtypes")
	public static String createKeyValue(Map<String, String> params) {
        Iterator<?> iter = params.entrySet().iterator();
        StringBuffer prestr =  new StringBuffer();
        while (iter.hasNext()) {
        	Map.Entry entry = (Map.Entry) iter.next();
        	Object key = entry.getKey();
        	Object value = entry.getValue();
        	if(value==null||value=="") continue;
        	prestr.append(key+"="+value+"&");
        }
        prestr.deleteCharAt(prestr.length()-1);
        return prestr.toString();
    }
    
    /** 
     * 把Map集合所有元素排序，并按照“参数值”+"参数值"的模式拼接成字符串
     * @param params 需要排序并参与字符拼接的集合
     * @return 拼接后字符串
     */
    @SuppressWarnings("rawtypes")
	public static String createValue(Map<String, String> params) {
        Iterator<?> iter = params.entrySet().iterator();       
        StringBuffer prestr =  new StringBuffer();
        while (iter.hasNext()) {
        	Map.Entry entry = (Map.Entry) iter.next();
        	Object value = entry.getValue();
        	prestr.append(value);
        }
        return prestr.toString();
    }
    
    /**
     * 对Map集合按照“参数=参数值”的模式用“&”字符拼接成字符串+key进行加密，然后以“sign”为key值添加入map集合中
     * @param params 需要排序并参与字符拼接的集合
     * @return 加入签名的集合
     */
    public static Map<String,String> createKeyValueMysign(Map<String, String> params,String key){
    	String KeyValue = createKeyValue(params);
    	String mysign = MD5.sign(KeyValue,key,"utf-8");
    	params.put("sign", mysign);
    	return params;
    }  
    /**
     * 对Map集合按照“参数值=参数值”的模式拼接成字符串+key进行加密，然后以“sign”为key值添加入map集合中
     * @param params 需要排序并参与字符拼接的集合
     * @return 加入签名的集合
     */
    public static Map<String,String> createValueMysign(Map<String, String> params,String key){
    	String KeyValue = createValue(params);
    	String mysign = MD5.sign(KeyValue,key, "utf-8");
    	params.put("sign", mysign);
    	return params;
    } 
    
    /**
     * 构建请求的参数，包含对参数的签名sign(key=value&的形式)
     * @param params 请求
     * @return
     */
    public static String createRequestParams(Map<String,String> params,String key){
    	params = createKeyValueMysign(params,key);
    	return createKeyValue(params);
    }
    
    /**
     * 构建请求的参数，包含对参数的签名sign(value&的形式)
     * @param params 请求
     * @return
     */
    public static String createRequestParams1(Map<String,String> params,String key){
    	params = createValueMysign(params,key);
    	return createKeyValue(params);
    }
}
