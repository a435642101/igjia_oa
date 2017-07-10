package com.yhtech.rear.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
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
import com.peter.util.UtilDate;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.controller.IgjiaHouseController;
import com.yhtech.igjia.domain.House;
import com.yhtech.rear.dao.IGoodsDao;
import com.yhtech.rear.dao.IRearDao;
import com.yhtech.rear.domain.Goods;
import com.yhtech.rear.domain.Rear;

@Controller("rearcontroller")
public class RearController {
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
	private IRearDao reardao;
	@Resource
	private IGoodsDao goodsdao;
	@Resource
	private IStaffDao staffdao;
	/**
	 * 获得所有的后勤配置
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getAllRear.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getAllRear(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String page=request.getParameter("page");	//页数
			String num=request.getParameter("num");	//数量
			String rear = request.getParameter("rear");
			String finish_date=request.getParameter("finish_date");	//完工日期
			String finish_date2 = request.getParameter("finish_date2");
			String start_date = request.getParameter("start_date");
			String start_date2 = request.getParameter("start_date2");
			
			if(finish_date.isEmpty()) finish_date= "1999/1/1";
			if(finish_date2.isEmpty()) finish_date2= "2099/12/31";
			if(start_date.isEmpty()) start_date= "1999/1/1";
			if(start_date2.isEmpty()) start_date2= "2099/12/31";
			String district =null;
			try {
				district = URLDecoder.decode(request.getParameter("district"),"utf-8");
			} catch (Exception e) {}
			String address =null;
			try {
				address = URLDecoder.decode(request.getParameter("address"),"utf-8");
			} catch (Exception e) {}
			if(page==null ||num==null ||page.isEmpty()||num.isEmpty()){
				jo.put("code", "2");
				jo.put("msg", "参数错误");
			}else{
				List<Rear> listrear =reardao.listRear((Integer.parseInt(page)-1)*Integer.parseInt(num),Integer.parseInt(num),address,district,rear,start_date,start_date2,finish_date,finish_date2);
				JSONArray reararray = JSONArray.fromObject(listrear);
				int total = reardao.getTotal(address,district,rear,start_date,start_date2,finish_date,finish_date2);
				reararray = nameReplaceJobno(reararray,staffdao);
				jo.put("code", "1");
				jo.put("msg", reararray.toString());
				jo.put("total",total);
			}
		} catch (Exception e) {
			e.printStackTrace();
			jo.put("code", "3");
			jo.put("msg", "参数异常");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 获得某部门某组下所有员工
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getOneRear.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getOneRear(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String contract_no=request.getParameter("contract_no");	//合同编号
			if(contract_no==null || contract_no.isEmpty()){
				jo.put("code", "2");
				jo.put("msg", "参数错误");
			}else{
				Rear rear = reardao.getRear(contract_no);
				List<Goods> goods = goodsdao.getGoods(contract_no);
				JSONObject rearjo = JSONObject.fromObject(rear);
				JSONArray goodja = JSONArray.fromObject(goods);
				jo.put("code", "1");
				jo.put("rear", rearjo.toString());
				jo.put("goods", goodja.toString());
			}
		} catch (Exception e) {
			jo.put("code", "3");
			jo.put("msg", "参数异常");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 添加物业配置
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addRear.do")
	@Authority(AuthorityType.LoginAuthority)
	public void addRear(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		synchronized(this){
			Staff admin = (Staff) request.getSession().getAttribute("admin");
			JSONObject jo = new JSONObject();
			String contract_no=request.getParameter("contract_no");
			String house_id=request.getParameter("house_id");
			String measure_date=request.getParameter("measure_date");
			String begin_date=request.getParameter("begin_date");
			String finish_date=request.getParameter("finish_date");
			String job_no=request.getParameter("job_no");
			String rear=request.getParameter("rear");
			String decorate_telephone=request.getParameter("decorate_telephone");
			String decorate_handle=request.getParameter("decorate_handle");
			String decorate_outofpocket=request.getParameter("decorate_outofpocket");
			String furniture_telephone=request.getParameter("furniture_telephone");
			String furniture_handle=request.getParameter("furniture_handle");
			String furniture_outofpocket=request.getParameter("furniture_outofpocket");
			String furniture_startdate=request.getParameter("furniture_startdate");
			String furniture_reachdate=request.getParameter("furniture_reachdate");
			String appliance_telephone=request.getParameter("appliance_telephone");
			String appliance_startdate=request.getParameter("appliance_startdate");
			String appliance_reachdate=request.getParameter("appliance_reachdate");
			String appliance_handle=request.getParameter("appliance_handle");
			String appliance_outofpocket=request.getParameter("appliance_outofpocket");
			String handle=request.getParameter("handle");
			String out_of_pocket=request.getParameter("out_of_pocket");
			int num =0;
			String district=null;
			try {
				district=URLDecoder.decode(request.getParameter("district"),"UTF-8");
				String business_area=URLDecoder.decode(request.getParameter("business_area"),"UTF-8");
				String estate=URLDecoder.decode(request.getParameter("estate"),"UTF-8");
				String address=URLDecoder.decode(request.getParameter("address"),"UTF-8");
				String type=URLDecoder.decode(request.getParameter("type"),"UTF-8");
				String decorate_team=URLDecoder.decode(request.getParameter("decorate_team"),"UTF-8");	
				String decorate_remark=URLDecoder.decode(request.getParameter("decorate_remark"),"UTF-8");
				String furniture_supplier=URLDecoder.decode(request.getParameter("furniture_supplier"),"UTF-8");
				String furniture_remark=URLDecoder.decode(request.getParameter("furniture_remark"),"UTF-8");
				String appliance_supplier=URLDecoder.decode(request.getParameter("appliance_supplier"),"UTF-8");
				String appliance_remark=URLDecoder.decode(request.getParameter("appliance_remark"),"UTF-8");
				String staff=admin.getJob_no();
				String date=UtilDate.getDateFormatter();
				Rear rear1 = new Rear(contract_no, house_id, district, business_area, estate, address, type, measure_date, begin_date, finish_date, job_no, rear, decorate_team, decorate_telephone, decorate_handle, decorate_outofpocket, decorate_remark, furniture_supplier, furniture_telephone, furniture_handle, furniture_outofpocket, furniture_remark, furniture_startdate, furniture_reachdate, appliance_supplier, appliance_telephone, appliance_remark, appliance_startdate, appliance_reachdate, appliance_handle, appliance_outofpocket, handle, out_of_pocket, staff, date);
				Rear rear2 = reardao.getRear(contract_no);
				if(rear2==null){			//该房源未配置过
					num = reardao.add(rear1);	
				}else{
					jo.put("code", "5");
					jo.put("msg", "该套房源配置过");
				}					
			} catch (Exception e) {
				jo.put("code", "2");
				jo.put("msg", "参数异常");
			}
			if(num>0){		//添加配置成功后修改房源为空置中
				try {
					String[] a =house_id.split(",");		//批量把每个房间修改为空置中
					for(int i=0;i<a.length;i++){
						String houseid = a[i];
						if(!houseid.isEmpty() && houseid!=null && houseid!=""){
							House house = new House();
							house.setHouse_id(houseid);
							house.setState("空置中");
							house.setFinish_date(finish_date);
							JSONObject housejo = JSONObject.fromObject(house);
							Map<String,String> m = new LinkedHashMap<String, String>();
							m.put("house", URLEncoder.encode(housejo.toString(),"UTF-8"));
							Http hp = Http.getInstance();
							hp.hp(HURL, m, "put");
						}				
					}
					ValueOperations<String,String> operation = //TODO redis 需要修改.opsForValue();
					operation.set("houselist", null);			//清redis缓存，下次重新加载
			    	operation.set("houselist_"+district, null);
				} catch (Exception e) {
					// TODO: handle exception
				}			
				try {
					String goods=URLDecoder.decode(request.getParameter("goods"),"UTF-8");	//添加具体物品
					Gson gson = new Gson();
				    JsonParser parser = new JsonParser();
				    JsonArray goodsja = parser.parse(goods).getAsJsonArray();
					Goods a;
					for(int i=0;i<goodsja.size();i++){
						JsonElement obj1 = goodsja.get(i);
				        a = gson.fromJson( obj1 , Goods.class);
						goodsdao.add(a);					
					}
					jo.put("code", "1");
					jo.put("msg", "success");
				} catch (Exception e) {
					jo.put("code", "4");
					jo.put("msg", "添加物品异常");
				}
			}
			out.print(jo.toString());
		}
		
	}

	/**
	 * 根据合同编号获取房源
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getHouseByContractNo.do")
	public void getHouseByContractNo(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String contract_no = request.getParameter("contract_no");
		String district =null;
		try {district = URLDecoder.decode(request.getParameter("district"),"utf-8");} catch (Exception e) {}
		JSONObject jo = new JSONObject();
		if(district==null||district.isEmpty()|| contract_no==null || contract_no.isEmpty()){
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}else{
			String result = getHouse(district);
			JSONArray ja = getHouseWant(contract_no, result);
		    jo.put("code", "1");
		    jo.put("msg", ja.toString());
		}
		out.print(jo.toString());
	}

	/**
	 * 获得满足条件的房源
	 * @param contract_no
	 * @param result
	 * @return
	 */
	private JSONArray getHouseWant(String contract_no, String result) {
		JSONArray ja = new JSONArray();
		Gson gson = new Gson();
		JsonParser parser = new JsonParser();
		JsonArray Jarray = parser.parse(result).getAsJsonArray();
		for(JsonElement obj : Jarray ){
		    House house = gson.fromJson( obj , House.class);
		    if(contract_no.equals(house.getContract_no()) && "配置中".equals(house.getState())){
		    	ja.add(JSONObject.fromObject(house));  
		    }	        
		}
		return ja;
	}

	/**
	 * 判断缓存中有无房源，没有则加载
	 * @param district
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	private String getHouse(String district)
			throws UnsupportedEncodingException {
		ValueOperations<String,String> operation = //TODO redis 需要修改.opsForValue();
		Http hp = Http.getInstance();
		Map<String,String> m = new LinkedHashMap<String, String>();	
		String result=null;
		if(operation.get("houselist_"+district)==null){		
			House house = new House();
			 house.setDistrict(district);
			 JSONObject jo1  = JSONObject.fromObject(house);
			 m.put("house",URLEncoder.encode(jo1.toString(),"utf-8"));
			    try {				   
			    	result = hp.hp(HURL,m, "get");
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
