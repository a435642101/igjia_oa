package com.yhtech.igjia.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
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
import com.yhtech.igjia.domain.House;
import com.yhtech.igjia.domain.Rent;
import com.yhtech.service.YGJdataService;

@Controller("igjiatoolscontroller")
public class IgjiaToolsController {
	@Autowired @Qualifier("jedisTemplate")
	public  RedisTemplate<String, String> redisTemplate;
	@Resource
	private IStaffDao admindao;
	/**
	 * 查询本月收房数据
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/searchHouseData.do")
	@Authority(AuthorityType.LoginAuthority)
	public void searchHouseData(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		//获取数据
		try {
			String rdate = request.getParameter("date");
			String district=URLDecoder.decode(request.getParameter("district"),"UTF-8");
			String name=URLDecoder.decode(request.getParameter("name"),"UTF-8");		
			String result = YGJdataService.getHouseDistrict(redisTemplate, district);
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd");
			Date sdate1 = null;
			Date sdate2 = null;
			try {
				String[] sd = rdate.split("/");
				int year = Integer.parseInt(sd[0]);
				int month = Integer.parseInt(sd[1]);				
				try {sdate1 = format.parse(getLastMonthlast(year,month));} catch (ParseException e1) {}		    	
				try {sdate2 = format.parse(getNextMonthFirst(year,month));} catch (ParseException e1) {}
			} catch (Exception e) {
				out.print("时间区域格式错误");
				return;
			}
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonArray Jarray = parser.parse(result).getAsJsonArray();
			JSONArray ja = new JSONArray();
			if("全部".equals(name)){
				for(JsonElement obj : Jarray ){
				    House house = gson.fromJson( obj , House.class);
				    try {
				    	Date date = format.parse(house.getContract_startdate());
				    	if(date.after(sdate1) && date.before(sdate2)){
				    		house = getData(district, name, house);
						    ja.add(JSONObject.fromObject(house));
				    	}
					} catch (ParseException e) {
						ja.add(JSONObject.fromObject(house));
					}			    			    	        
				}
			}else{
				for(JsonElement obj : Jarray ){
				    House house = gson.fromJson( obj , House.class);
				    try {
				    	Date date = format.parse(house.getContract_startdate());
				    	if(date.after(sdate1) && date.before(sdate2) && name.equals(house.getName())){
				    		house = getData(district, name, house);
						    ja.add(JSONObject.fromObject(house));
				    	}
					} catch (ParseException e) {
						ja.add(JSONObject.fromObject(house));
					}			          
				}
			}		
			out.print(ja.toString());
		} catch (Exception e) {
			out.print("参数错误");
		}
		
	}
	
	/**
	 * 查询本月出房数据
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/searchRentData.do")
	@Authority(AuthorityType.LoginAuthority)
	public void searchRentData(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		//获取数据
		try {
			String rdate = request.getParameter("date");
			String district=URLDecoder.decode(request.getParameter("district"),"UTF-8");
			String name=URLDecoder.decode(request.getParameter("name"),"UTF-8");		
			String result = YGJdataService.getDistrictRent(redisTemplate, district);
			SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd"); 
			Date sdate1 = null;
	    	Date sdate2 = null;
	    	String[] sd = rdate.split("/");
			int year = Integer.parseInt(sd[0]);
			int month = Integer.parseInt(sd[1]);				
			try {sdate1 = format.parse(getLastMonthlast(year,month));} catch (ParseException e1) {}		    	
			try {sdate2 = format.parse(getNextMonthFirst(year,month));} catch (ParseException e1) {}
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonArray Jarray = parser.parse(result).getAsJsonArray();
			JSONArray ja = new JSONArray();
			if("全部".equals(name)){
				for(JsonElement obj : Jarray ){
					Rent rent = gson.fromJson( obj , Rent.class);
				    try {
				    	Date date = format.parse(rent.getContract_startdate());
				    	if(date.after(sdate1) && date.before(sdate2)){
				    		rent = getRentData(name, rent);
						    ja.add(JSONObject.fromObject(rent));
				    	}
					} catch (ParseException e) {
						ja.add(JSONObject.fromObject(rent));
					}			    			    	        
				}
			}else{			
				for(JsonElement obj : Jarray ){
					Rent rent = gson.fromJson( obj , Rent.class);
				    try {
				    	Date date = format.parse(rent.getContract_startdate());
				    	if(date.after(sdate1) && date.before(sdate2) && name.equals(rent.getName())){
				    		rent = getRentData(name, rent);
						    ja.add(JSONObject.fromObject(rent));
				    	}
					} catch (ParseException e) {
						ja.add(JSONObject.fromObject(rent));
					}				    		          
				}
			}		
			out.print(ja.toString());
		} catch (Exception e) {
			out.print("参数错误");
		}
		
	}

	/**
	 * 取需要的字段
	 * @param name
	 * @param rent
	 * @return
	 */
	private Rent getRentData(String name, Rent rent) {
		Staff staff = admindao.findByjobno(rent.getJob_no());
		Rent r = new Rent();
		r.setDistrict(rent.getDistrict());
		r.setAddress(rent.getAddress());
		r.setContract_startdate(rent.getContract_startdate());
		r.setContract_enddate(rent.getContract_enddate());
		r.setContract_month(rent.getContract_month());
		r.setName(rent.getName());
		r.setRegion_manager(rent.getRegion_manager());
		r.setJob_no(staff.getName());
		r.setFirstyear_monthrent(rent.getFirstyear_monthrent());
		r.setState(rent.getState());
		r.setRoom_num(rent.getRoom_num());
		return r;
	}
	
	/**
	 * 取需要的字段
	 * @param district
	 * @param name
	 * @param house
	 * @return
	 */
	private House getData(String district, String name, House house) {
		Staff staff = admindao.findByjobno(house.getJob_no());
		House h = new House();
		h.setDistrict(district);
		h.setBusiness_area(house.getBusiness_area());
		h.setAddress(house.getAddress());
		h.setFirstyear_monthrent(house.getFirstyear_monthrent());
		h.setContract_startdate(house.getContract_startdate());
		h.setContract_enddate(house.getContract_enddate());
		h.setContract_month(house.getContract_month());
		h.setName(house.getName());
		h.setRegion_manager(house.getRegion_manager());
		h.setJob_no(staff.getName());
		h.setRoom_num(house.getRoom_num());
		h.setState(house.getState());
		return h;
	}
	
	/**
	 * 获得下月第一天
	 */
	public static String getNextMonthFirst(int year,int month){
		SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd"); 
		Calendar c = Calendar.getInstance();   
		c.set(Calendar.YEAR,year);
		c.set(Calendar.MONTH, month);
         c.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天
         return format.format(c.getTime());
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
}
