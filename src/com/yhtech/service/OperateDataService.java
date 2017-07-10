package com.yhtech.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.dao.IHouseDao;
import com.yhtech.igjia.domain.House;
import com.yhtech.igjia.domain.Rent;

@Component("OperateDataService")
public class OperateDataService {
	@Resource
	private IStaffDao admindao;
//	@Resource
//	private IHouseDao housedao;
//	/**
//	 * 分页 按录入时间排序
//	 * @param page 页数
//	 * @param num 每页条数
//	 * @param result 需要分页的json数组(json字段和与House实体类一致)
//	 * @return
//	 */
//	public JSONArray getPageHouse(String page,String num, String jsonarray) {
//		int p = Integer.parseInt(page)-1;
//		int n = Integer.parseInt(num);
//		JSONArray ja = new JSONArray();
//		Gson gson = new Gson();
//		JsonParser parser = new JsonParser();
//		JsonArray Jarray = parser.parse(jsonarray).getAsJsonArray();
//		Jarray = sortJsonArrayByDate(Jarray);		//排序
//		for(int i=p*n;i<(p+1)*n;i++){
//			if(Jarray.size()>i){
//				House house = gson.fromJson( Jarray.get(i) , House.class);
//				ja.add(JSONObject.fromObject(house));
//			}
//		}
//		OperateDataService od = new OperateDataService();
//		ja = od.nameReplaceJobno(ja,admindao);
//
//		return ja;
//	}
//
//	/**
//	 * 分页 按空置天数排序
//	 * @param page 页数
//	 * @param num 每页条数
//	 * @param result 需要分页的json数组(json字段和与House实体类一致)
//	 * @return
//	 */
//	public JSONArray getPageHouseBydate(String page,String num, String jsonarray) {
//		int p = Integer.parseInt(page)-1;
//		int n = Integer.parseInt(num);
//		JSONArray ja = new JSONArray();
//		Gson gson = new Gson();
//		JsonParser parser = new JsonParser();
//		JsonArray Jarray = parser.parse(jsonarray).getAsJsonArray();
//		for(int i=p*n;i<(p+1)*n;i++){
//			if(Jarray.size()>i){
//				House house = gson.fromJson( Jarray.get(i) , House.class);
//				ja.add(JSONObject.fromObject(house));
//			}
//		}
//		OperateDataService od = new OperateDataService();
//		ja = od.nameReplaceJobno(ja,admindao);
//		return ja;
//	}
//
//	private JsonArray sortJsonArrayByDate(JsonArray array){
//		Gson gson = new Gson();
//	    List<House> list = new ArrayList<House>();
//	    	House jsonObj = new House();
//	        for (int i = 0; i < array.size(); i++) {
//	        	jsonObj = gson.fromJson( array.get(i) , House.class);
//	            list.add(jsonObj);
//	        }
//	        //排序操作
//	        Collections.sort(list, new Comparator<House>(){
//	            public int compare(House arg0, House arg1) {
//	                return arg1.getDate().compareTo(arg0.getDate());
//	            }
//	        });
//	        JsonArray Jarray  = new Gson().toJsonTree(list, new TypeToken<List<House>>() {}.getType()).getAsJsonArray();
//	        return Jarray;
//	    }
//
//
//
//	/**
//	 * 分页
//	 * @param page 页数
//	 * @param num 每页条数
//	 * @param result 需要分页的json数组(json字段和与Rent实体类一致)
//	 * @return
//	 */
//	public JSONArray getPageRent(String page,String num, String jsonarray) {
//		int p = Integer.parseInt(page)-1;
//		int n = Integer.parseInt(num);
//		JSONArray ja = new JSONArray();
//		Gson gson = new Gson();
//		JsonParser parser = new JsonParser();
//		JsonArray Jarray = parser.parse(jsonarray).getAsJsonArray();
//		for(int i=p*n;i<(p+1)*n;i++){
//			if(Jarray.size()>i){
//				Rent rent = gson.fromJson( Jarray.get(i) , Rent.class);
//				ja.add(JSONObject.fromObject(rent));
//			}
//		}
//		OperateDataService od = new OperateDataService();
//		ja = od.nameReplaceJobno(ja,admindao);
//		return ja;
//	}
	
	/**
	 * 管家名字替换管家工号
	 * @param ja 房源集合
	 * @return
	 */
	private JSONArray nameReplaceJobno(JSONArray ja,IStaffDao admindao) {
		//获取admin表
		List<Staff> adminlist = admindao.listAll();
		JSONArray adminja = JSONArray.fromObject(adminlist);
		for(int i=0;i<ja.size();i++){
			JSONObject jo = (JSONObject) ja.get(i);
			for(int j=0;j<adminja.size();j++){
				JSONObject adminjo = (JSONObject) adminja.get(j);
				if(jo.get("job_no").equals(adminjo.get("job_no"))){
					jo.put("job_no", adminjo.get("name"));
				}
			}
		}
		return ja;
	}
}
