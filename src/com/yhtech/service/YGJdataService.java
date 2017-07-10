package com.yhtech.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.peter.util.Http;
import com.yhtech.igjia.dao.IHouseDao;
import com.yhtech.igjia.dao.IRentDao;
import com.yhtech.igjia.domain.House;
import com.yhtech.igjia.domain.Rent;

@Component("YGJdataService")
public class YGJdataService {
//	@Resource
//	private IHouseDao housedao;
//	@Resource
//	private IRentDao rentdao;
//
//	/**
//	 * 加载所有房源
//	 * @return
//	 */
//
//	public String getHouse(RedisTemplate<String, String> redisTemplate) {
//		String result = "";
//		List<House> list = housedao.listAll();
//		JSONArray arr = JSONArray.fromObject(list);
//		result = arr.toString();
//		return result;
//	}
//
//	/**
//	 * 加载区域房源
//	 * @param district
//	 * @return
//	 * @throws UnsupportedEncodingException
//	 */
//	public String getHouseDistrict(RedisTemplate<String, String> redisTemplate,String district)
//			throws UnsupportedEncodingException {
//		String result = "";
//		House house = new House();
//		house.setDistrict(district);
//		List<House> list = housedao.listSearch(house);
//		JSONArray arr = JSONArray.fromObject(list);
//		result = arr.toString();
//
//		return result;
//	}
//
//	/**
//	 * 获得全部出房记录
//	 * @return
//	 * @throws Exception
//	 */
//	public String getRentHouse(RedisTemplate<String, String> redisTemplate){
//		String result = "";
//		List<Rent> list = rentdao.listAll();
//		JSONArray arr = JSONArray.fromObject(list);
//		result = arr.toString();
//		return result;
//	}
//
//	/**
//	 * 获得区域出房记录
//	 * @return
//	 * @throws Exception
//	 */
//	public String getDistrictRent(RedisTemplate<String, String> redisTemplate,String district) {
//		String rentlist = "";
//		List<Rent> list = rentdao.listAll();
//		JSONArray arr1 = JSONArray.fromObject(list);
//		rentlist = arr1.toString();
//		JSONArray arr = new JSONArray();
//		Gson gson = new Gson();
//		JsonParser parser = new JsonParser();
//		JsonArray Jarray = parser.parse(rentlist).getAsJsonArray();
//		for(JsonElement obj : Jarray ){
//			Rent rent = gson.fromJson( obj , Rent.class);
//			if(district.equals(rent.getDistrict())){
//				 arr.add(JSONObject.fromObject(rent));
//			}
//		}
//		rentlist = arr.toString();
//		return rentlist;
//	}
}
