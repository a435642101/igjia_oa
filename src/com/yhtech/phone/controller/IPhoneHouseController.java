package com.yhtech.phone.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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
import com.yhtech.service.OperateDataService;
import com.yhtech.service.YGJdataService;

@Controller("IPhoneHouseController")
public class IPhoneHouseController {
	  @Autowired
	  @Qualifier("jedisTemplate")
	  public RedisTemplate<String,String> redisTemplate;
	  
	  @Resource
	  private OperateDataService ods;
	  @Resource
	  private IStaffDao admindao;
	  
	  /**
		 * 分页获得房源
		 * @param request
		 * @param response
		 */
		@RequestMapping("/phoneGJ/ppagehouse.do")
		@Authority(AuthorityType.LoginAuthority)
		public void pagehouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			String page=request.getParameter("page");
			String allHouse = YGJdataService.getHouse(redisTemplate);
			JSONArray ja =ods.getPageHouse(page,"15",allHouse);
			out.print(ja.toString());
		}
		/**
		 * 获取单个房源记录(收房)
		 * @param request
		 * @param response
		 * @throws Exception
		 */
		@RequestMapping("/phoneGJ/pOnehouse.do")
		@Authority(AuthorityType.LoginAuthority)
		public void phoneGJoneHouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			//获取数据
			String house_id=request.getParameter("house_id");
			String result = YGJdataService.getHouse(redisTemplate);
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonArray Jarray = parser.parse(result).getAsJsonArray();
			JSONObject jo=new JSONObject();
			for(JsonElement obj : Jarray ){
			    House house = gson.fromJson( obj , House.class);
			    if(house_id.equals(house.getHouse_id())){
			    	jo = JSONObject.fromObject(house);
			    	break;
			    }	        
			}
			out.print(jo.toString());
		}
		
		/**
		 * 获取所有房源
		 * @param request
		 * @param response
		 * @throws Exception
		 */
		@RequestMapping("/phoneGJ/phoneAllhouse.do")
		@Authority(AuthorityType.LoginAuthority)
		public void igjiaAllHouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			String result1 =YGJdataService.getHouse(redisTemplate);
			    Gson gson = new Gson();
			    JsonParser parser = new JsonParser();
			    JsonArray Jarray = parser.parse(result1).getAsJsonArray();
			    //获取admin表
			    List<Staff> adminlist = admindao.listAll();
			    JSONArray adminja = JSONArray.fromObject(adminlist);
			    String dbjobno;
				JSONObject obj = new JSONObject();
				JSONArray arr1 = new JSONArray();
			    for(int i = 0; i <15; i++){
			    	if(i<Jarray.size()){
			    		JsonElement obj1 = Jarray.get(i);
				        House house = gson.fromJson( obj1 , House.class);
				        dbjobno = house.getJob_no();
			    		for(int j=0;j<adminja.size();j++){
			    			JSONObject adminjo = (JSONObject) adminja.get(j);
			    			if(dbjobno.equals(adminjo.get("job_no"))){
			    			house.setJob_no(adminjo.getString("name"));
			    				break;
			    			}
			    		}
			    		arr1.add(JSONObject.fromObject(house));
			    	}		   	    	
			    }
			    obj.put("maxnum", Jarray.size());
			    arr1.add(obj);
			    out.print(arr1.toString());
		}

		/**
		 * 条件查询(查缓存，缓存按区域分)
		 * @param request
		 * @param responce
		 * @throws Exception
		 */
		@RequestMapping("/phoneGJ/phouse.do")
		public void phoneHouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			String address = request.getParameter("address");
			String district = request.getParameter("district");
			String state = request.getParameter("state");
			String pay_method = request.getParameter("pay_method");
			try{
			    state = URLDecoder.decode(state,"UTF-8");
			    district = URLDecoder.decode(district,"UTF-8");
			    pay_method = URLDecoder.decode(pay_method,"UTF-8");
			    address = URLDecoder.decode(address,"UTF-8");			    
			} catch(Exception e){
				
			}
			String job_no = request.getParameter("job_no");
			String contract_start1 = request.getParameter("contract_start1");
			String contract_start2 = request.getParameter("contract_start2");
			String contract_end1 = request.getParameter("contract_end1");
			String contract_end2 = request.getParameter("contract_end2");
			if(contract_start1.isEmpty()) contract_start1 = "1999/1/1";
			if(contract_end1.isEmpty()) contract_end1 = "1999/1/1";
			if(contract_start2.isEmpty()) contract_start2 = "2099/12/31";
			if(contract_end2.isEmpty()) contract_end2 = "2099/12/31";	
			JSONArray ja = new JSONArray();
			JSONArray jarr = new JSONArray();
			String result = null;
			if("全部".equals(pay_method)){// 查询收房
				if("全部".equals(district)){
					result = YGJdataService.getHouse(redisTemplate);
				}else{
					result = YGJdataService.getHouseDistrict(redisTemplate, district);
				}
			}else{//查询出房
				if("全部".equals(district)){
					result = YGJdataService.getRentHouse(redisTemplate);
				}else{
					result = YGJdataService.getDistrictRent(redisTemplate, district);
				}	
			}
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonArray jarray = parser.parse(result).getAsJsonArray();
			for(JsonElement obj : jarray){
				House house = gson.fromJson(obj, House.class);
				ja.add(JSONObject.fromObject(house));
			}
			jarr = mohuSearch(address,state,job_no,pay_method, ja,contract_start1,contract_start2,contract_end1,contract_end2);
			String page = request.getParameter("page");
			String num = request.getParameter("num");
			JSONObject jo = new JSONObject();
			JSONArray jsonarr = ods.getPageHouse(page,num,jarr.toString());
			jo.put("code", "1");
			jo.put("msg", jsonarr.toString());
			jo.put("total", jarr.size());
			out.print(jo.toString());

		}
		/**
		 * 获取查询所需的结果字段
		 * @param   ja 模糊查询的房源结果
		 * @param   j       循环变量
		 * @return  house   
		 * */
		public House selectHouseResult(JSONArray ja,int j){
		    	String resultdistrict = ja.getJSONObject(j).getString("district");
		    	String resultjob_no = ja.getJSONObject(j).getString("job_no");
		    	String resultstate = ja.getJSONObject(j).getString("state");
		    	String resultaddress = ja.getJSONObject(j).getString("address");
		    	String resulthouse_id = ja.getJSONObject(j).getString("house_id");
		    	String resultcontract_no = ja.getJSONObject(j).getString("contract_no");
			    House house = new House();
			    house.setDistrict(resultdistrict);
			    house.setJob_no(resultjob_no);
			    house.setState(resultstate);
			    house.setAddress(resultaddress);
			    house.setHouse_id(resulthouse_id);
			    house.setContract_no(resultcontract_no);
		        return house;
		}
        /**
         * 管家名字替换管家工号
         * @param ja 房源集合
         * @return
         */
		public JSONArray nameReplaceJobno(JSONArray ja) {
			List<Staff> adminlist = admindao.listAll();
			JSONArray adminja = JSONArray.fromObject(adminlist);
			for(int i=0;i<ja.size();i++){
				JSONObject jo = (JSONObject) ja.get(i);
				for(int j=0;j<adminja.size();j++){
					JSONObject adminjo = (JSONObject) ja.get(j);
					if(jo.get("job_no").equals(adminjo.get("job_no"))){
						jo.put("job_no", adminjo.get("name"));
					}
				}
			}
			return ja;
		}
        /**
         * 模糊查询
         * @param address    关键字
         * @param state      房源状态
         * @param job_no     管家工号
         * @param pay_method 支付方式
         * @param ja         总的房源表
         * @return           满足条件的房源
         */
		private JSONArray mohuSearch(String address, String state, String job_no, String pay_method, JSONArray ja,String contract_start1,String contract_start2,String contract_end1,String contract_end2) {
			JSONArray jarr = new JSONArray();
			SimpleDateFormat sdf =  new SimpleDateFormat("yyyy/MM/dd");
			String redisguanjianci =null;
			String redisstate =null;
			String redisjob_no = null;
			String redisguanjiagonghao = null;
			String redispay_method =null;
			if("全部".equals(state)){
				if(address!=null && address!=""){
					if(!"全部".equals(pay_method)){
						if(job_no!=null && job_no!=""){
							for(int i=0;i<ja.size();i++){
								redisguanjianci = ja.getJSONObject(i).toString();
								redispay_method = ja.getJSONObject(i).getString("paymethod");
								redisguanjiagonghao = ja.getJSONObject(i).getString("job_no");
								if(redisguanjianci.contains(address) && redispay_method.equals(pay_method) &&redisguanjiagonghao.equals(job_no)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}else{
							for(int i=0;i<ja.size();i++){
								redisguanjianci = ja.getJSONObject(i).toString();
								redispay_method = ja.getJSONObject(i).getString("paymethod");
								if(redisguanjianci.contains(address) && redispay_method.equals(pay_method)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}
					}else{
						if(job_no!=null && job_no!=""){
							for(int i=0;i<ja.size();i++){
								redisguanjianci = ja.getJSONObject(i).toString();
								redisguanjiagonghao = ja.getJSONObject(i).getString("job_no");
								if(redisguanjianci.contains(address) && redisguanjiagonghao.equals(job_no)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}else{
							for(int i=0;i<ja.size();i++){
								redisguanjianci = ja.getJSONObject(i).toString();
								if(redisguanjianci.contains(address)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}
					}
				}else{
					if(!"全部".equals(pay_method)){
						if(job_no!=null && job_no!=""){
							for(int i=0;i<ja.size();i++){
								redispay_method = ja.getJSONObject(i).getString("paymethod");
								redisguanjiagonghao = ja.getJSONObject(i).getString("job_no");
								if(redispay_method.equals(pay_method) && redisguanjiagonghao.equals(job_no)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}else{
							for(int i=0;i<ja.size();i++){
								redispay_method = ja.getJSONObject(i).getString("paymethod");
								if(redispay_method.equals(pay_method)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}
					}else{
						if(job_no!=null && job_no!=""){
							for(int i=0;i<ja.size();i++){
								redisguanjiagonghao = ja.getJSONObject(i).getString("job_no");
								if(redisguanjiagonghao.equals(job_no)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}else{
							for(int i=0;i<ja.size();i++){
								try {
									String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
									String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
									Date sdate = sdf.parse(redisstartdate);
									Date sdate1 = sdf.parse(contract_start1);
									Date sdate2 = sdf.parse(contract_start2);
									Date edate = sdf.parse(redisenddate);
									Date edate1 = sdf.parse(contract_end1);
									Date edate2 = sdf.parse(contract_end2);
									if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
										House house = selectHouseResult(ja, i);
										jarr.add(house);
									}
								} catch (ParseException e) {
									e.printStackTrace();
								}
							}
						}
					}
				}
			}else{
				if(address!=null && address!=""){
					if(!"全部".equals(pay_method)){
						if(job_no!=null && job_no!=""){
							for(int i=0;i<ja.size();i++){
								redisstate = ja.getJSONObject(i).getString("state");
								redisguanjianci = ja.getJSONObject(i).toString();
								redispay_method = ja.getJSONObject(i).getString("paymethod");
								redisguanjiagonghao = ja.getJSONObject(i).getString("job_no");
								if(redisstate.equals(state) && redisguanjianci.contains(address) && redispay_method.equals(pay_method) && redisguanjiagonghao.equals(job_no)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}else{
							for(int i=0;i<ja.size();i++){
								redisstate = ja.getJSONObject(i).getString("state");
								redisguanjianci = ja.getJSONObject(i).toString();
								redispay_method = ja.getJSONObject(i).getString("paymethod");
								if(redisstate.equals(state) && redisguanjianci.contains(address) && redispay_method.equals(pay_method)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}
					}else{
						if(job_no!=null && job_no!=""){
						   for(int i=0;i<ja.size();i++){
							   redisstate = ja.getJSONObject(i).getString("state");
							   redisguanjianci = ja.getJSONObject(i).toString();
							   redisguanjiagonghao = ja.getJSONObject(i).getString("job_no");
							   if(redisstate.equals(state) && redisguanjianci.contains(address) && redisguanjiagonghao.equals(job_no)){
								   try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
							   }
						   }
						}else{
							for(int i=0;i<ja.size();i++){
							   redisstate = ja.getJSONObject(i).getString("state");
							   redisguanjianci = ja.getJSONObject(i).toString();
							   if(redisstate.equals(state) && redisguanjianci.contains(address)){
								   try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
							   }
							}
						}
					}
				}else{
					if(!"全部".equals(pay_method)){
						if(job_no!=null && job_no!=""){
							for(int i=0;i<ja.size();i++){
								redisstate = ja.getJSONObject(i).getString("state");
								redispay_method = ja.getJSONObject(i).getString("paymethod");
								redisjob_no = ja.getJSONObject(i).getString("job_no");
								if(redisstate.equals(state) && redispay_method.equals(pay_method) && redisjob_no.equals(job_no)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}else{
							for(int i=0;i<ja.size();i++){
								redisstate = ja.getJSONObject(i).getString("state");
								redispay_method = ja.getJSONObject(i).getString("paymethod");
								if(redisstate.equals(state) && redispay_method.equals(pay_method)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}
					}else{
						if(job_no!=null && job_no!=""){
							for(int i=0;i<ja.size();i++){
								redisstate = ja.getJSONObject(i).getString("state");
								redisjob_no = ja.getJSONObject(i).getString("job_no");
								if(redisstate.equals(state) && redisjob_no.equals(job_no)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}else{
							for(int i=0;i<ja.size();i++){
								redisstate = ja.getJSONObject(i).getString("state");
								if(redisstate.equals(state)){
									try {
										String redisstartdate = ja.getJSONObject(i).getString("contract_startdate");
										String redisenddate = ja.getJSONObject(i).getString("contract_enddate");
										Date sdate = sdf.parse(redisstartdate);
										Date sdate1 = sdf.parse(contract_start1);
										Date sdate2 = sdf.parse(contract_start2);
										Date edate = sdf.parse(redisenddate);
										Date edate1 = sdf.parse(contract_end1);
										Date edate2 = sdf.parse(contract_end2);
										if(sdate.after(sdate1) && sdate.before(sdate2) && edate.after(edate1) && edate.before(edate2)){
											House house = selectHouseResult(ja, i);
											jarr.add(house);
										}
									} catch (ParseException e) {
										e.printStackTrace();
									}
								}
							}
						}
					}
				}
			}
			return jarr;
		}

}
