package com.yhtech.phone.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.peter.util.Http;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.controller.IgjiaHouseController;
import com.yhtech.igjia.domain.House;
import com.yhtech.rear.dao.IRearDao;
import com.yhtech.rear.domain.Rear;
import com.yhtech.service.OperateDataService;

@Controller("personcentercontroller")
public class PersonCenterController {
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
	public RedisTemplate<String, String> redisTemplate;
	@Resource
	private IStaffDao staffdao;
	@Resource
	private IRearDao reardao;
	@Resource
	private OperateDataService ods;

	
	/**
	 * 获得员工名下房源
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getPersonHouse.do")
	//@Authority(AuthorityType.HRAuthority)
	public void getPersonHouse(HttpServletRequest request, HttpServletResponse response) throws IOException{
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			JSONObject jo = new JSONObject();
			String job_no = request.getParameter("job_no");
			Staff astaff =staffdao.findByNo(job_no);
			House house = null;
			if("YGJZL".equals(astaff.getDepartment())){		//判断是不是业务部的
				JSONArray housearray = new JSONArray();
				String result=null;
				Http hp = Http.getInstance();			//获取所有房源
				Map<String,String> m = new LinkedHashMap<String, String>();	
				ValueOperations<String,String> operation = redisTemplate.opsForValue();
				if(operation.get("houselist")==null){
					try {
						result = hp.hp(HURL,m, "get");
						operation.set("houselist", result);
					} catch (Exception e) {
						e.printStackTrace();
						out.print("error");
					}		    	
				}else{
					result = operation.get("houselist");
				}
				JSONArray ja = JSONArray.fromObject(result);
				for(int i=0;i<ja.size();i++){					
					String rjobno = ja.getJSONObject(i).getString("job_no");
					String rdistrict = ja.getJSONObject(i).getString("district");
					if(job_no.equals(rjobno) && astaff.getDistrict().equals(rdistrict)){
						house = selectHouseResult(ja, i);
						housearray.add(house);
					}
				}
				String page = request.getParameter("page");
				String num = request.getParameter("num");  
				JSONArray jarr = new JSONArray();
				JSONArray jsonarr = null;
				if(page==null || page.isEmpty() || num==null || num.isEmpty()){
					jarr = nameReplaceJobno(housearray,staffdao);	
					out.print(jarr.toString());
				}else{								//分页数据
					jsonarr = ods.getPageHouse(page, num, housearray.toString());	
					jo.put("code", "1");
					jo.put("msg", jsonarr.toString());
					jo.put("total",housearray.size());
					out.print(jo.toString());
				}	
				if(housearray.size()==0){
					jo.put("code", "2");
					jo.put("msg","没有房源");
				}
			}else{
				jo.put("code", "3");
				jo.put("msg", "不是业务部的");
			}
	}

	/**
	 * 获得配置房源
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getPersonAllRear.do")
	//@Authority(AuthorityType.LoginAuthority)
	public void getPersonAllRear(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String page=request.getParameter("page");	//页数
			String num=request.getParameter("num");	//数量
			String job_no = request.getParameter("job_no");
			String district = null;
			Rear rear = null;
			try{
				district = URLDecoder.decode(request.getParameter("district"), "UTF-8");
			}catch(Exception e){}
			Staff astaff =staffdao.findByNo(job_no);
			if("YGJZL".equals(astaff.getDepartment()) || "KHFWZX".equals(astaff.getDepartment())){
				if(page==null ||num==null ||page.isEmpty()||num.isEmpty()){
					jo.put("code", "2");
					jo.put("msg", "参数错误");
				}else{
					List<Rear> listrear =reardao.listRearPerson((Integer.parseInt(page)-1)*Integer.parseInt(num),Integer.parseInt(num),job_no,district);
					JSONArray reararray = JSONArray.fromObject(listrear);
					JSONArray jarr = new JSONArray();
					for(int i=0;i<reararray.size();i++){
						rear = selectRearResult(reararray, i);
						jarr.add(rear);
					}
					int total = reardao.getTotalPerson(job_no,district);
					jarr = nameReplaceJobno(jarr,staffdao);
					jo.put("code", "1");
					jo.put("msg", jarr.toString());
					jo.put("total",total);
				}
			}else{
				jo.put("code", "4");
				jo.put("msg", "不是业务部的，也不是后勤部的");
			}
		} catch (Exception e) {
			e.printStackTrace();
			jo.put("code", "3");
			jo.put("msg", "参数异常");
		}
		out.print(jo.toString());		
	}
	/**
	 * 后勤名字、管家名字替换管家工号
	 * @param ja 房源集合
	 * @return
	 */
	private JSONArray nameReplaceJobno(JSONArray ja,IStaffDao admindao){
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
				if(jo.get("rear").equals(adminjo.get("job_no"))){
					jo.put("rear", adminjo.get("name"));
				}
			}
		}
		return ja;
	}
	/**
	 * 获取查询配置房源所需的结果字段
	 * @param   ja 查询的配置房源结果
	 * @param   j       循环变量
	 * @return  rear   
	 * */
	public Rear selectRearResult(JSONArray ja,int j){
	    	String resultdistrict = ja.getJSONObject(j).getString("district");
	    	String resultjob_no = ja.getJSONObject(j).getString("job_no");
	    	String resultrear = ja.getJSONObject(j).getString("rear");
	    	String resultaddress = ja.getJSONObject(j).getString("address");
	    	String resulthouse_id = ja.getJSONObject(j).getString("house_id");
	    	String resultcontract_no = ja.getJSONObject(j).getString("contract_no");
	    	String resultdate = ja.getJSONObject(j).getString("date");
	    	String resultbegin_date = ja.getJSONObject(j).getString("begin_date");
	    	String resultfinish_date = ja.getJSONObject(j).getString("finish_date");
		    Rear rear = new Rear();
		    rear.setDistrict(resultdistrict);
		    rear.setJob_no(resultjob_no);
		    rear.setRear(resultrear);
		    rear.setAddress(resultaddress);
		    rear.setHouse_id(resulthouse_id);
		    rear.setContract_no(resultcontract_no);
		    rear.setBegin_date(resultbegin_date);
		    rear.setFinish_date(resultfinish_date);
		    rear.setDate(resultdate);
	        return rear;
	}
	
	/**
	 * 获取查询名下房源所需的结果字段
	 * @param   ja 查询的名下房源结果
	 * @param   j       循环变量
	 * @return  house   
	 * */
	public House selectHouseResult(JSONArray ja,int j){
	    	String resultdistrict = ja.getJSONObject(j).getString("district");
	    	String resultaddress = ja.getJSONObject(j).getString("address");
	    	String resultstate = ja.getJSONObject(j).getString("state");
	    	String resulthouse_id = ja.getJSONObject(j).getString("house_id");
	    	String resultcontract_no = ja.getJSONObject(j).getString("contract_no");
	    	String resultdate = ja.getJSONObject(j).getString("date");
	        House house = new House();
		    house.setDistrict(resultdistrict);
		    house.setAddress(resultaddress);
		    house.setState(resultstate);
		    house.setHouse_id(resulthouse_id);
		    house.setContract_no(resultcontract_no);
		    house.setDate(resultdate);
	        return house;
	}
}
