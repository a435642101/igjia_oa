package com.yhtech.rear.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.domain.Rent;
import com.yhtech.rear.dao.ICleanDao;
import com.yhtech.service.YGJdataService;

@Controller("cleaningcontroller")
public class CleaningController {
	@Autowired @Qualifier("jedisTemplate")
	public  RedisTemplate<String, String> redisTemplate;
	@Resource
	private ICleanDao cleandao;
	@Resource
	private IStaffDao admindao;
	
	/**
	 * 修改保洁日期
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/updatecleandate.do")
	@Authority(AuthorityType.LoginAuthority)
	public void updatedate(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		String date = request.getParameter("date");		//查询某天的保洁
		String address = URLDecoder.decode(request.getParameter("address"),"utf-8");		//获取地址
		if(address!=null && !address.isEmpty() && date!=null && !date.isEmpty()){
			Rent rent = new Rent();
			rent.setAddress(address);
			rent.setContract_startdate(date);
			int num = cleandao.update(rent);
			if(num>0){
				jo.put("code", "1");
				jo.put("msg", "success");
			}else{
				jo.put("code", "3");
				jo.put("msg", "更新失败");
			}
		}else{
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());
	}
	
	/**
	 * 当日保洁列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getCleanlist.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getCleanlist(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String date = request.getParameter("date");		//查询某天的保洁
		int period=14;		//定义打扫周期
		ValueOperations<String,String> operation = redisTemplate.opsForValue();
		if(operation.get("updatecleantoday")==null){						//出房数据更新到保洁表，12小时更新一次
			updateCleanHouse();
			operation.set("updatecleantoday","yes",12,TimeUnit.HOURS);
		}
		List<Rent> cleanlist = cleandao.dayclean(date, period+"");
		JSONArray ja = JSONArray.fromObject(cleanlist);
		ja = nameReplaceJobno(ja,admindao);
		out.print(ja.toString());
	}

	/**
	 * 更新保洁的房屋数据
	 * @param ja
	 */
	private void updateCleanHouse() {
		String rentlist = YGJdataService.getRentHouse(redisTemplate);
		Gson gson = new Gson();
		JsonParser parser = new JsonParser();
		JsonArray Jarray = parser.parse(rentlist).getAsJsonArray();
		for(JsonElement obj : Jarray ){
		    Rent rent = gson.fromJson( obj , Rent.class);
				if(rent.getState().equals("出租中")){			
			    	String address = rent.getAddress();
			    	int addressl = address.indexOf("-");		
			    	Rent Cleanrent = new Rent();
				    if(addressl>=0){		//筛选出新房源
				    	address = address.substring(0,address.indexOf("-"));
			    		Cleanrent = cleandao.list(address);		
			    		if(Cleanrent==null){										//查询有无该套记录
			    			rent.setAddress(address);
				    		cleandao.add(rent);
				    	}
			    	}			    				    	
			    }    					      
		}
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
