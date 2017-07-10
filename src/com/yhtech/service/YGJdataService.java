package com.yhtech.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Properties;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.peter.util.Http;
import com.yhtech.igjia.controller.IgjiaHouseController;
import com.yhtech.igjia.domain.House;
import com.yhtech.igjia.domain.Rent;

@Component("YGJdataService")
public class YGJdataService {
	private static String URL;
	private static String RURL;
	static{
		Properties prop = new Properties();
		InputStream in =IgjiaHouseController.class.getClassLoader().getResourceAsStream("/address.properties"); 
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		URL = prop.getProperty("address" ).trim()+"/IGJdata/house";
		RURL = prop.getProperty("address" ).trim()+"/IGJdata/rent";
	}
	/**
	 * 加载所有房源
	 * @return
	 */
	public static String getHouse(RedisTemplate<String, String> redisTemplate) {
		ValueOperations<String,String> operation = redisTemplate.opsForValue();
		String result = null;	
		Http hp = Http.getInstance();
		Map<String,String> m = new LinkedHashMap<String, String>();	
		if(operation.get("houselist")==null){
			try {
				result = hp.hp(URL,m, "get");
				operation.set("houselist", result);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}		    	
		}else{
			result = operation.get("houselist");
		}
		
		return result;
	}
	
	/**
	 * 加载区域房源
	 * @param district
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String getHouseDistrict(RedisTemplate<String, String> redisTemplate,String district)
			throws UnsupportedEncodingException {
		ValueOperations<String,String> operation = redisTemplate.opsForValue();
		String result = null;	
		Http hp = Http.getInstance();
		Map<String,String> m = new LinkedHashMap<String, String>();	
		if(operation.get("houselist_"+district)==null){		
			House house = new House();
			 house.setDistrict(district);
			 JSONObject jo  = JSONObject.fromObject(house);
			 m.put("house",URLEncoder.encode(jo.toString(),"utf-8"));
			    try {				   
			    	result = hp.hp(URL,m, "get");
					operation.set("houselist_"+district, result);
				} catch (Exception e) {
					e.printStackTrace();
				}
		}else{
			result = operation.get("houselist_"+district);
		}
		
		return result;
	}
	
	/**
	 * 获得全部出房记录
	 * @return
	 * @throws Exception
	 */
	public static String getRentHouse(RedisTemplate<String, String> redisTemplate){
		String result1 = "";
	    ValueOperations<String,String> operation = redisTemplate.opsForValue();
	    if(operation.get("rentlist")==null){
	    	Map<String,String> m = new LinkedHashMap<String, String>();	
	 	    Http hp = Http.getInstance();
	    	try {
				result1 = hp.hp(RURL, m, "get");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	operation.set("rentlist", result1);
	    }else{
	    	result1 = operation.get("rentlist");
	    }
		return result1;
	}
	
	/**
	 * 获得区域出房记录
	 * @return
	 * @throws Exception
	 */
	public static String getDistrictRent(RedisTemplate<String, String> redisTemplate,String district) {
		String rentlist = "";
	    ValueOperations<String,String> operation = redisTemplate.opsForValue();
	    if(operation.get("rentlist")==null){
	    	Map<String,String> m = new LinkedHashMap<String, String>();	
	 	    Http hp = Http.getInstance();
	    	try {
	    		rentlist = hp.hp(RURL, m, "get");
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	    	operation.set("rentlist", rentlist);
	    }else{
	    	rentlist = operation.get("rentlist");
	    }
		
		JSONArray arr = new JSONArray();
		Gson gson = new Gson();
		JsonParser parser = new JsonParser();
		JsonArray Jarray = parser.parse(rentlist).getAsJsonArray();
		for(JsonElement obj : Jarray ){
			Rent rent = gson.fromJson( obj , Rent.class);
			if(district.equals(rent.getDistrict())){
				 arr.add(JSONObject.fromObject(rent)); 
			}			        
		}
		rentlist = arr.toString();
		return rentlist;
	}
}
