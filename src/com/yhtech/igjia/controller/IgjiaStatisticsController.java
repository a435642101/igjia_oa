package com.yhtech.igjia.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

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
import com.peter.util.UtilDate;
import com.yhtech.hr.dao.IDistrictDao;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;

import com.yhtech.service.YGJdataService;
import com.yhtech.hr.domain.District;

@Controller("statisticscontroller")
public class IgjiaStatisticsController {
	@Autowired @Qualifier("jedisTemplate")
	public //TODO redis 需要修改<String, String> //TODO redis 需要修改;
	
	@Resource
	private IStaffDao admindao;
	@Resource
	private IDistrictDao districtdao;
	
	
	
	/**
	 * 各区域管家的统计数据
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("igjia/getdistricttotalstatistics.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getdistricttotalstatistics(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String district = null;
		try {
			district = URLDecoder.decode(request.getParameter("district"),"utf-8");	
		} catch (Exception e) {
			out.print("参数值不合法");
			return;
		}
		ValueOperations<String,String> operation = //TODO redis 需要修改.opsForValue();
		String result = null;
		if(operation.get("regionstatistics_"+district)==null){
			List<Staff> adminlist=null;
			String houselist = null;
			String rentlist = null;
			if(!"全部".equals(district)){		
				adminlist = admindao.findByDeptDist("YGJZL",district);
				try {
					houselist = YGJdataService.getHouseDistrict(//TODO redis 需要修改,district);
					rentlist = YGJdataService.getDistrictRent(//TODO redis 需要修改,district);
				} catch (Exception e) {
					out.print("error");
				}	
			}else{
				adminlist = admindao.findByDepartment("YGJZL");
				try {											   
					houselist = YGJdataService.getHouse(//TODO redis 需要修改);
					rentlist = YGJdataService.getRentHouse(//TODO redis 需要修改);
				} catch (Exception e) {
					out.print("error");
				}	
			}
			JSONArray adminja = JSONArray.fromObject(adminlist);
			JSONArray ahja = JSONArray.fromObject(houselist);
			JSONArray arja = JSONArray.fromObject(rentlist);
			JSONObject totaljo = new JSONObject();		//总的总计数据		
			getdata(adminja, ahja, "house","name",totaljo);		//获得各个管家的入房统计数据
			getdata(adminja, arja, "rent","name", totaljo);		//获得管家的出房统计数据
			JSONObject finaljo = new JSONObject();		//最终统计结果
			patternJson(totaljo, finaljo);				//调整格式
			
			operation.set("regionstatistics_"+district,finaljo.toString(),2,TimeUnit.HOURS);
			result = finaljo.toString();
		}else{
			result = operation.get("regionstatistics_"+district);
		}
		out.print(result);
	}

	
	
	/**
	 * 房源各区总的统计
	 */
	@RequestMapping("igjia/gettotalstatistics.do")
	@Authority(AuthorityType.LoginAuthority)
	public void gettotalstatistics(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		ValueOperations<String,String> operation = //TODO redis 需要修改.opsForValue();
		String result = null;
		if(operation.get("totalstatistics")==null){
			String houselist;
			String rentlist;
			try {			
				houselist = YGJdataService.getHouse(//TODO redis 需要修改);
				rentlist = YGJdataService.getRentHouse(//TODO redis 需要修改);
				List<District> alldistrict = districtdao.listByDept("YGJZL");	//获得所有分区
				JSONArray adja = JSONArray.fromObject(alldistrict);
				JSONArray ahja = JSONArray.fromObject(houselist);
				JSONArray arja = JSONArray.fromObject(rentlist);
				
				JSONObject totaljo = new JSONObject();		//总的总计数据		
				getdata(adja, ahja, "house","district",totaljo);		//获得房源的统计数据
				getdata(adja, arja, "rent","district", totaljo);		//获得出房统计数据
				
				JSONObject finaljo = new JSONObject();		//最终统计结果
				patternJson(totaljo, finaljo);				//调整格式
				
				operation.set("totalstatistics",finaljo.toString(),2,TimeUnit.HOURS);
				result = finaljo.toString();
			} catch (Exception e) {
				out.print("error");
				e.printStackTrace();
			}
		}else{
			result = operation.get("totalstatistics");
		}
			out.print(result);		
	}

	
	/**
	 * 统计数据转成json套json格式
	 * @param totaljo
	 * @param finaljo
	 */
	@SuppressWarnings("rawtypes")
	private void patternJson(JSONObject totaljo, JSONObject finaljo) {
		JSONObject houseweekjo = new JSONObject();
		JSONObject housemonthjo = new JSONObject();
		JSONObject houselastmonthjo = new JSONObject();
		JSONObject housealljo = new JSONObject();
		JSONObject housevacancyjo = new JSONObject();
		JSONObject househotvacancyjo = new JSONObject();
		JSONObject rentweekjo = new JSONObject();
		JSONObject rentmonthjo = new JSONObject();
		JSONObject rentlastmonthjo = new JSONObject();
		JSONObject rentalljo = new JSONObject();
		Iterator iterator = totaljo.keys();		//遍历json
		while(iterator.hasNext()){
		       String key = (String) iterator.next();
		       String  value = totaljo.getString(key);
		       if(key.contains("house_weeknum")){
		    	   houseweekjo.put(key.substring(0,key.indexOf("house")), value);
		       }else if(key.contains("house_monthnum")){
		    	   housemonthjo.put(key.substring(0,key.indexOf("house")), value);
		       }else if(key.contains("house_lastmonthnum")){
		    	   houselastmonthjo.put(key.substring(0,key.indexOf("house")), value);
		       }else if(key.contains("house_all")){
		    	   housealljo.put(key.substring(0,key.indexOf("house")), value);
		       }else if(key.contains("house_vacancy")){
		    	   housevacancyjo.put(key.substring(0,key.indexOf("house")), value);
		       }else if(key.contains("house_hot_vacancy")){
		    	   househotvacancyjo.put(key.substring(0,key.indexOf("house")), value);
		       }else if(key.contains("rent_weeknum")){
		    	   rentweekjo.put(key.substring(0,key.indexOf("rent")), value);
		       }else if(key.contains("rent_monthnum")){
		    	   rentmonthjo.put(key.substring(0,key.indexOf("rent")), value);
		       }else if(key.contains("rent_lastmonthnum")){
		    	   rentlastmonthjo.put(key.substring(0,key.indexOf("rent")), value);
		       }else if(key.contains("rent_all")){
		    	   rentalljo.put(key.substring(0,key.indexOf("rent")), value);
		       }
		}
		finaljo.put("本周入房", houseweekjo);
		finaljo.put("本月入房", housemonthjo);
		finaljo.put("上月入房", houselastmonthjo);
		finaljo.put("空置间数", housevacancyjo);
		finaljo.put("过免租期空置间数", househotvacancyjo);
		finaljo.put("入房总计", housealljo);
		finaljo.put("本周出房", rentweekjo);
		finaljo.put("本月出房", rentmonthjo);
		finaljo.put("上月出房", rentlastmonthjo);
		finaljo.put("出房总计", rentalljo);
	}

	/**
	 * 
	 * @param adja	json数组集合（外层遍历）
	 * @param ahja	json数组集合（内层遍历）
	 * @param house	类型（出房还是入房）
	 * @param comparefield 2个json数组相同的字段
	 * @param totaljo	json字符串，数据存这里（个数）
	 */
	private void getdata(JSONArray adja, JSONArray ahja, String house,String comparefield,
			JSONObject totaljo) {
		String sunday = UtilDate.getWeekStartDate();		//本周第一天（周日）
		String thismonthstart = UtilDate.getMonthFirst();		//本月第一天
		String lastmonthstart = UtilDate.getLastMonthFirst();		//上月第一天
		String now = UtilDate.getDate1();		//今天
		
		if("house".equals(house)){				//统计房源数据
			for(int i=0;i<adja.size();i++){				
				JSONObject jo = (JSONObject) adja.get(i);
				String field = (String) jo.getString(comparefield);
				int weeknum = 0;
				int monthnum = 0;
				int lastmonthnum = 0;
				int vacancy =0;
				int all=0;
				int hot_vacancy =0;
				for(int j=0;j<ahja.size();j++){
					jo = (JSONObject) ahja.get(j);
					String date = jo.getString("date").substring(0,10);		//年月日
					String pay_date = jo.getString("pay_date").replaceAll("/", "-");
					String state = jo.getString("state");
					if(field.equals(jo.getString(comparefield))){		
						if(date.compareTo(sunday)>=0){		//该区本周的房源数据
							weeknum++;
						}
						if(date.compareTo(thismonthstart)>=0){	//该区本月的房源数据
							monthnum++;
						}else if(date.compareTo(thismonthstart)<0 && date.compareTo(lastmonthstart)>=0){	//该区上月的房源数据
							lastmonthnum++;
						}
						if("空置中".equals(state)){
							vacancy++;
						}
						all++;
						if(now.compareTo(pay_date)>0 && "空置中".equals(state)){
							hot_vacancy++;
						}
					}
				}		
				if(comparefield.equals("job_no")){
					Staff admin = admindao.findByjobno(field);
					field = admin.getName();			//工号换成名字
				}
				
				totaljo.put(field+house+"_weeknum", weeknum);
				totaljo.put(field+house+"_monthnum", monthnum);
				totaljo.put(field+house+"_lastmonthnum", lastmonthnum);
				totaljo.put(field+house+"_all", all);
				totaljo.put(field+house+"_vacancy", vacancy);	
				totaljo.put(field+house+"_hot_vacancy", hot_vacancy);	
			}
		}else{									//统计出房数据
			for(int i=0;i<adja.size();i++){				
				JSONObject jo = (JSONObject) adja.get(i);
				String field = (String) jo.getString(comparefield);
				int weeknum = 0;
				int monthnum = 0;
				int lastmonthnum = 0;
				int all =0;
				for(int j=0;j<ahja.size();j++){
					jo = (JSONObject) ahja.get(j);
					String date = jo.getString("date").substring(0,10);		//年月日
					if(field.equals(jo.getString(comparefield))){		
						if(date.compareTo(sunday)>=0){		//该区本周的房源数据
							weeknum++;
						}
						if(date.compareTo(thismonthstart)>=0){	//该区本月的房源数据
							monthnum++;
						}else if(date.compareTo(thismonthstart)<0 && date.compareTo(lastmonthstart)>=0){	//该区上月的房源数据
							lastmonthnum++;
						}
						all++;
					}
				}	
//				if(comparefield.equals("job_no")){
//					Staff admin = admindao.findByjobno(field);
//					field = admin.getName();			//工号换成名字
//				}
				totaljo.put(field+house+"_weeknum", weeknum);
				totaljo.put(field+house+"_monthnum", monthnum);
				totaljo.put(field+house+"_lastmonthnum", lastmonthnum);
				totaljo.put(field+house+"_all", all);	
			}
		}
	}

	
}
