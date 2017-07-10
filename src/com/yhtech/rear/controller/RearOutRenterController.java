package com.yhtech.rear.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.//TODO redis 需要修改;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.peter.util.Http;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.controller.IgjiaHouseController;
import com.yhtech.igjia.domain.House;
import com.yhtech.service.YGJdataService;

@Controller("RearOutRenterController")
public class RearOutRenterController {
	private static String HURL;
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
		HURL = prop.getProperty("address" ).trim()+"/IGJdata/house";
	}
	@Autowired @Qualifier("jedisTemplate")
	public //TODO redis 需要修改<String, String> //TODO redis 需要修改;
	@Resource
	private IStaffDao staffdao;
	
	/**
	 * 获得退租中的房源
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getRentBack.do")
	@Authority(AuthorityType.LoginAuthority)
	public void pagerent(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String result =YGJdataService.getHouse(//TODO redis 需要修改);
		JSONArray ja = new JSONArray();
		JSONObject jo = new JSONObject();
		Gson gson = new Gson();
	    JsonParser parser = new JsonParser();
	    JsonArray Jarray = parser.parse(result).getAsJsonArray();
	    for(JsonElement obj : Jarray ){
	        House house = gson.fromJson( obj , House.class);
	        
	        if(house.getState().equals("配置中") && house.getVacancy_date()!=null && !house.getVacancy_date().isEmpty()){
	        	ja.add(JSONObject.fromObject(house));  
	        }	        
	    }
	    ja = nameReplaceJobno(ja,staffdao);
	   jo.put("code", "1");
	   jo.put("msg", ja.toString());
	   out.print(jo.toString());
	}
	
	/**
	 * 获得退租中的房源
	 * @param request
	 * @param response
	 */
	@RequestMapping("/ComfirmRentBack.do")
	@Authority(AuthorityType.LoginAuthority)
	public void ComfirmRentBack(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String house_id = request.getParameter("house_id");
		String district =null;
		try {
			district = URLDecoder.decode(request.getParameter("district"),"utf-8");
		} catch (Exception e) {}
		JSONObject jo = new JSONObject();
		if(house_id==null || house_id.isEmpty()|| district==null){
			jo.put("code", "3");
			jo.put("msg","参数错误");  
		}else{
			String result =YGJdataService.getHouseDistrict(//TODO redis 需要修改, district);			
			Gson gson = new Gson();
		    JsonParser parser = new JsonParser();
		    JsonArray Jarray = parser.parse(result).getAsJsonArray();
		    int num=0;
		    for(JsonElement obj : Jarray ){
		        House house = gson.fromJson( obj , House.class);
		        if(house.getHouse_id().equals(house_id) && house.getState().equals("配置中")){
		        	num++;
		        	break;
		        }	        
		    }
		    if(num>0){
		    	House house = new House();
		    	house.setHouse_id(house_id);
		    	house.setState("空置中");
		    	JSONObject hjo = JSONObject.fromObject(house);
		    	Map<String,String> m = new LinkedHashMap<String, String>();
			    m.put("house", URLEncoder.encode(hjo.toString(),"UTF-8"));
			    Http hp = Http.getInstance();
				try {
					String result1 = hp.hp(HURL, m, "put");
					if("success".equals(result1)){
						ValueOperations<String,String> operation = //TODO redis 需要修改.opsForValue();
						operation.set("houselist", null);
				    	operation.set("houselist_"+district, null);
						jo.put("code", "1");
						jo.put("msg","success");  
					}
				} catch (Exception e) {
					jo.put("code", "4");
					jo.put("msg","修改异常");  
				}
		    }else{
			   jo.put("code", "2");
			   jo.put("msg","该房源不在配置中");  
		    }
		}	  
	   out.print(jo.toString());
	}
	
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
