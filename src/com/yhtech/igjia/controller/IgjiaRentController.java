package com.yhtech.igjia.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.//TODO redis 需要修改;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
import com.yhtech.domain.Log;
import com.yhtech.finance.dao.IRentorderDao;
import com.yhtech.igjia.dao.IRentApplicationDao;
import com.yhtech.igjia.dao.IRentPropertyDao;
import com.yhtech.igjia.domain.House;
import com.yhtech.igjia.domain.Rent;
import com.yhtech.igjia.domain.RentApplication;
import com.yhtech.igjia.domain.RentProperty;
import com.yhtech.service.OperateDataService;
import com.yhtech.service.YGJdataService;
import com.yhtech.yhtech.dao.ILogDao;

@Controller("IgjiaRentController")
public class IgjiaRentController {
	@Autowired @Qualifier("jedisTemplate")
	   public //TODO redis 需要修改<String, String> //TODO redis 需要修改;
	private static String HURL;
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
		HURL = prop.getProperty("address").trim()+"/IGJdata/house";
		RURL = prop.getProperty("address").trim()+"/IGJdata/rent";
	}
	@Resource
	private IStaffDao admindao;
	@Resource
	private ILogDao logdao;
	@Resource
	private IRentorderDao rentorderdao;
	@Resource
	private IRentPropertyDao rentpropertydao;
	
	@Resource
	private IRentApplicationDao rentapplicationdao;
	@Resource
	private OperateDataService ods;
	
	/**
	 * 获得出房房屋交割清单
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("igjia/getrentproperty.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getproperty(HttpServletResponse response,HttpServletRequest request) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String contract_no = request.getParameter("contract_no");
		RentProperty rentproperty = rentpropertydao.getByHouseid(contract_no);			
		List<RentApplication> list = rentapplicationdao.getByHouseid(contract_no);
		if(list.size()!=0){
			JSONArray ja = JSONArray.fromObject(list);
			rentproperty.setApplication(ja.toString());
		}
		JSONObject jo = JSONObject.fromObject(rentproperty);
		out.print(jo.toString());
	}
	
	/**
	 * 分页获得出房记录
	 * @param request
	 * @param response
	 */
	@RequestMapping("igjia/pagerent.do")
	@Authority(AuthorityType.LoginAuthority)
	public void pagerent(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String page=request.getParameter("page");
		String result =YGJdataService.getRentHouse(//TODO redis 需要修改);
		JSONArray ja = ods.getPageRent(page,"15",result);
		out.print(ja.toString());
	}
	
	
	
	/**
	 * 根据houseid or contract_no获取单个房源记录
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/Onerent.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaoneRent(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		//获取数据
		String house_id=request.getParameter("house_id");
		String contract_no=request.getParameter("contract_no");
		String result = YGJdataService.getRentHouse(//TODO redis 需要修改);
		Gson gson = new Gson();
		JsonParser parser = new JsonParser();
		JsonArray Jarray = parser.parse(result).getAsJsonArray();
		JSONObject jo=new JSONObject();
		if(house_id!=null){
			for(JsonElement obj : Jarray ){
				Rent rent = gson.fromJson( obj , Rent.class);
			    if(house_id.equals(rent.getHouse_id())&& "出租中".equals(rent.getState())){
			    	jo = JSONObject.fromObject(rent);
			    	break;
			    }	        
			}
		}else{
			for(JsonElement obj : Jarray ){
				Rent rent = gson.fromJson( obj , Rent.class);
			    if(contract_no.equals(rent.getContract_no())){
			    	jo = JSONObject.fromObject(rent);
			    	break;
			    }	        
			}
		}	
		if(jo.size()==0){
			out.print("zero");
		}else{
			out.print(jo.toString());
		}
		
	}
	
	/**
	 * 获取所有出租记录
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/Allrent.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaAllRent(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		//获取数据
			String result1=YGJdataService.getRentHouse(//TODO redis 需要修改);
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
		    		Rent rent = gson.fromJson( obj1 , Rent.class);
			        dbjobno = rent.getJob_no();
		    		for(int j=0;j<adminja.size();j++){
		    			JSONObject adminjo = (JSONObject) adminja.get(j);
		    			if(dbjobno.equals(adminjo.get("job_no"))){
		    				rent.setJob_no(adminjo.getString("name"));
		    				break;
		    			}
		    		}
		    		arr1.add(JSONObject.fromObject(rent));
		    	}		   	    	
		    }
		    obj.put("maxnum", Jarray.size());
		    arr1.add(obj);
		    out.print(arr1.toString());
	}
	
	
	
	/**
	 * 模糊查询租客记录
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/rent.do")
	@Authority(AuthorityType.LoginAuthority)
	public void rent(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();		
		//获取关键词		
		String keyword=null;
		try {
			keyword = URLDecoder.decode(request.getParameter("keyword"),"UTF-8");			
		} catch (Exception e) {
		}
		//获取分区		
		String district=null;
		try {
			district = URLDecoder.decode(request.getParameter("district"),"UTF-8");			
		} catch (Exception e) {
		}
		//获取状态
		String state=null;
		try {
			state = URLDecoder.decode(request.getParameter("state"),"UTF-8");			
		} catch (Exception e) {
		}
		
		//获取收款方式	
		String pay_method=null;
		try {
			pay_method = URLDecoder.decode(request.getParameter("paymethod"),"UTF-8");			
		} catch (Exception e) {
		}	
		String contract_start1=request.getParameter("contract_start1");
		String contract_start2=request.getParameter("contract_start2");
		String contract_end1=request.getParameter("contract_end1");
		String contract_end2=request.getParameter("contract_end2");
		if(contract_start1.isEmpty()) contract_start1="1999/1/1";		//开始日期为空默认最早
		if(contract_end1.isEmpty()) contract_end1="1999/1/1";		//结束日期为空默认最早
		if(contract_start2.isEmpty()) contract_start2="2099/12/31";		//结束日期为空默认最晚
		if(contract_end2.isEmpty()) contract_end2="2099/12/31";		//结束日期为空默认最晚
		
	    String result1 = YGJdataService.getRentHouse(//TODO redis 需要修改);	
	    JSONArray arr = new JSONArray();
	    Gson gson = new Gson();
	    JsonParser parser = new JsonParser();
	    JsonArray Jarray = parser.parse(result1).getAsJsonArray();
	    for(JsonElement obj : Jarray ){
	    	Rent rent = gson.fromJson( obj , Rent.class);
	    	arr.add(JSONObject.fromObject(rent));  
	    }
	    JSONArray jarr = mohuSearch(keyword, state,district,pay_method,arr,contract_start1,contract_start2,contract_end1,contract_end2);
	    String page = request.getParameter("page");
		String num = request.getParameter("num");  
		if(page==null || page.isEmpty() || num==null || num.isEmpty()){
			jarr = nameReplaceJobno(jarr);	
			out.print(jarr.toString());
		}else{								//分页数据
			JSONObject jo = new JSONObject();
			JSONArray jsonarr = ods.getPageRent(page, num, jarr.toString());	
			jo.put("code", "1");
			jo.put("msg", jsonarr.toString());
			jo.put("total",jarr.size());
			out.print(jo.toString());
		}	
	}

	
	/**
	 * 模糊查询
	 * @param keyword 关键词
	 * @param state	状态
	 * @param district	分区
	 * @param pay_method	支付方式
	 * @param arr	搜索的集合
	 * @return
	 */
	private JSONArray mohuSearch(String keyword, String state, String district,
			String pay_method, JSONArray ja,String contract_start1,String contract_start2,String contract_end1,String contract_end2) {
		JSONArray jarr = new JSONArray();
		SimpleDateFormat sdf =  new SimpleDateFormat("yyyy/MM/dd");
		String redisguanjianci =null;
		String redisstate =null;
		String redisdistrict =null;
		String redispay_method =null;
		if(keyword!=null && !keyword.isEmpty()){
			if(!pay_method.equals("全部")){
				for(int i=0;i<ja.size();i++){
					redisguanjianci = ja.getJSONObject(i).toString();
					redisstate = ja.getJSONObject(i).getString("state");
					redisdistrict = ja.getJSONObject(i).getString("district");
					redispay_method = ja.getJSONObject(i).getString("paymethod");
					if(redisguanjianci.contains(keyword) && pay_method.equals(redispay_method)){	//满足关键词和支付方式的条件
						String[] districtarr = district.split(",");
						for(int j=0;j<districtarr.length;j++){				//分区多选 判断满足条件
							if(districtarr[j].equals(redisdistrict)){
								String[] statearr = state.split(",");
								for(int k=0;k<statearr.length;k++){				//状态多选 判断满足条件
									if(statearr[k].equals(redisstate)){
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
												jarr.add(ja.get(i));
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
			}else{
				for(int i=0;i<ja.size();i++){
					redisguanjianci = ja.getJSONObject(i).toString();
					redisstate = ja.getJSONObject(i).getString("state");
					redisdistrict = ja.getJSONObject(i).getString("district");
					redispay_method = ja.getJSONObject(i).getString("paymethod");
					if(redisguanjianci.contains(keyword)){	//满足关键词的条件
						String[] districtarr = district.split(",");
						for(int j=0;j<districtarr.length;j++){				//分区多选 判断满足条件
							if(districtarr[j].equals(redisdistrict)){
								String[] statearr = state.split(",");
								for(int k=0;k<statearr.length;k++){				//状态多选 判断满足条件
									if(statearr[k].equals(redisstate)){
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
												jarr.add(ja.get(i));
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
			}			
		}else{
			if(!pay_method.equals("全部")){
				for(int i=0;i<ja.size();i++){
					redisstate = ja.getJSONObject(i).getString("state");
					redisdistrict = ja.getJSONObject(i).getString("district");
					redispay_method = ja.getJSONObject(i).getString("paymethod");
					if(pay_method.equals(redispay_method)){	//满足支付方式的条件
						String[] districtarr = district.split(",");
						for(int j=0;j<districtarr.length;j++){				//分区多选 判断满足条件
							if(districtarr[j].equals(redisdistrict)){
								String[] statearr = state.split(",");
								for(int k=0;k<statearr.length;k++){				//状态多选 判断满足条件
									if(statearr[k].equals(redisstate)){
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
												jarr.add(ja.get(i));
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
			}else{
				for(int i=0;i<ja.size();i++){
					redisstate = ja.getJSONObject(i).getString("state");
					redisdistrict = ja.getJSONObject(i).getString("district");
					redispay_method = ja.getJSONObject(i).getString("paymethod");
						String[] districtarr = district.split(",");
						for(int j=0;j<districtarr.length;j++){				//分区多选 判断满足条件
							if(districtarr[j].equals(redisdistrict)){
								String[] statearr = state.split(",");
								for(int k=0;k<statearr.length;k++){				//状态多选 判断满足条件
									if(statearr[k].equals(redisstate)){
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
												jarr.add(ja.get(i));
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
		}
		return jarr;
	}

	/**
	 * 添加Rent
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/addRent.do")
	@Authority(AuthorityType.LoginAuthority)
	public void addRent(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		Staff admin = (Staff) request.getSession().getAttribute("admin");
		if("商圈经理".equals(admin.getPosition()) || "2".equals(admin.getPermission())){
			ValueOperations<String,String> operation = //TODO redis 需要修改.opsForValue();
			synchronized(this){
				String houseId=null;
				String address=null;
				String contractNo=null;
				String salesman=null;
				String regionManager=null;
				String serviceProvider=null;
				String renterName=null;
				String renterTelephone=null;
				String renterIdcard=null;
				String contractDate=null;
				String contractStartdate=null;
				String contractEnddate=null;
				String contractMonth=null;
				String payrentTime=null;
				String firstyearMonthrent=request.getParameter("firstyear_monthrent");
				String secondyearMonthrent=request.getParameter("secondyear_monthrent");
				String thirdyearMonthrent=request.getParameter("thirdyear_monthrent");
				String fourthyearMonthrent=request.getParameter("fourthyear_monthrent");
				String fifthyearMonthrent=request.getParameter("fifthyear_monthrent");			
				String sixthyearMonthrent=request.getParameter("sixthyear_monthrent");			//第六年
				String firststageRent=request.getParameter("firststage_rent");
				String providerMoney = request.getParameter("provider_money");
				
				
				String paymethod=null;
				String deposit=request.getParameter("deposit");
				String roomNum=null;
				String monthpayProvider=null;
				String monthpayState=null;
				String remark=null;
				String jobNo=null;
				String state=null;
				String district=null;
				String date= UtilDate.getDateFormatter();
					try {houseId = URLDecoder.decode(request.getParameter("house_id"),"UTF-8");} catch (Exception e) {}
					try {address = URLDecoder.decode(request.getParameter("address"),"UTF-8");} catch (Exception e) {}
					try {contractNo = URLDecoder.decode(request.getParameter("contract_no"),"UTF-8");} catch (Exception e) {}
					try {salesman = URLDecoder.decode(request.getParameter("salesman"),"UTF-8");} catch (Exception e) {}
					try {regionManager = URLDecoder.decode(request.getParameter("region_manager"),"UTF-8");} catch (Exception e) {}
					try {serviceProvider = URLDecoder.decode(request.getParameter("service_provider"),"UTF-8");} catch (Exception e) {}
					try {renterName = URLDecoder.decode(request.getParameter("renter_name"),"UTF-8");} catch (Exception e) {}
					try {renterTelephone = URLDecoder.decode(request.getParameter("renter_telephone"),"UTF-8");} catch (Exception e) {}
					try {renterIdcard = URLDecoder.decode(request.getParameter("renter_idcard"),"UTF-8");} catch (Exception e) {}
					try {contractDate = URLDecoder.decode(request.getParameter("contract_date"),"UTF-8");} catch (Exception e) {}
					try {contractStartdate = URLDecoder.decode(request.getParameter("contract_startdate"),"UTF-8");} catch (Exception e) {}
					try {contractEnddate = URLDecoder.decode(request.getParameter("contract_enddate"),"UTF-8");} catch (Exception e) {}
					try {contractMonth = URLDecoder.decode(request.getParameter("contract_month"),"UTF-8");} catch (Exception e) {}
					try {payrentTime = URLDecoder.decode(request.getParameter("payrent_time"),"UTF-8");} catch (Exception e) {}
					try {jobNo = URLDecoder.decode(request.getParameter("job_no"),"UTF-8");} catch (Exception e) {}
					try {paymethod = URLDecoder.decode(request.getParameter("paymethod"),"UTF-8");} catch (Exception e) {}
					
				
					try {roomNum = URLDecoder.decode(request.getParameter("room_num"),"UTF-8");} catch (Exception e) {}
					try {monthpayProvider = URLDecoder.decode(request.getParameter("monthpay_provider"),"UTF-8");} catch (Exception e) {}
					try {monthpayState = URLDecoder.decode(request.getParameter("monthpay_state"),"UTF-8");} catch (Exception e) {}
					try {remark = URLDecoder.decode(request.getParameter("remark"),"UTF-8");} catch (Exception e) {}
					try {state = URLDecoder.decode(request.getParameter("state"),"UTF-8");} catch (Exception e) {}
					try {	district = URLDecoder.decode(request.getParameter("district"),"UTF-8");} catch (Exception e) {}

					
					if(houseId.isEmpty() || houseId==null){		//房源ID不能为空
						out.print("houseId_fail");
						return;
					}
					
					//物业配置
					String now_water_degree=request.getParameter("now_water_degree");
					String now_elec_degree_day=request.getParameter("now_elec_degree_day");
					String now_elec_degree_night=request.getParameter("now_elec_degree_night");
					String now_gas_degree=request.getParameter("now_gas_degree");
					
					String keyinfo = null;
					try {keyinfo = URLDecoder.decode(request.getParameter("keyinfo"),"UTF-8");} catch (Exception e) {}
					
					Map<String,String> m1 = new LinkedHashMap<String, String>();
				    Http hp1 = Http.getInstance();
				    
					
					//新增出房
					Rent rent = new Rent(houseId, address, contractNo, salesman, regionManager, serviceProvider, providerMoney, renterName, renterTelephone, renterIdcard, contractDate, contractStartdate, contractEnddate, contractMonth, firstyearMonthrent, secondyearMonthrent, thirdyearMonthrent, fourthyearMonthrent, fifthyearMonthrent, sixthyearMonthrent, firststageRent, payrentTime, paymethod, deposit, monthpayProvider, monthpayState, remark, jobNo, roomNum, state, district, date);	
				    JSONObject jo = JSONObject.fromObject(rent);
				    m1.put("rent", URLEncoder.encode(jo.toString(),"utf-8"));	    
				    String result1 = hp1.hp(RURL, m1, "post");
			    
			    if("success".equals(result1)){		//出房添加成功后添加物业配置
			    	String application = null;
					try {
						application = URLDecoder.decode(request.getParameter("application"),"UTF-8"); 
						JSONArray appja = JSONArray.fromObject(application);
						for(int i=0;i<appja.size();i++){
							JSONObject jo1 = (JSONObject) appja.get(i);
							jo1.put("contract_no", contractNo);
							jo1.put("rentname", renterName);
							jo1.put("rent_telephone", renterTelephone);
							jo1.put("state", "正常");
						}				
						application = appja.toString();
				    	RentProperty rentproperty = new RentProperty(contractNo, now_water_degree, now_elec_degree_day, now_elec_degree_night, now_gas_degree, keyinfo, application,renterName,renterTelephone,"正常");
				    	int num = rentpropertydao.add(rentproperty);
						String rentapplication = rentproperty.getApplication();
						JSONArray ja = JSONArray.fromObject(rentapplication);
						RentApplication a;
						for(int i=0;i<ja.size();i++){
							a = (RentApplication) JSONObject.toBean(JSONObject.fromObject(ja.get(i)),RentApplication.class);
							rentapplicationdao.add(a);
						}
						if(num>0){
							result1="success";
						}else{
							result1="propertyinsertfail";
						}
					}catch (Exception e) {
						result1="propertyinserterror";
					}
			    	operation.set("rentlist", null);
			    	
			    	//修改房源为已出租
			    	House house = new House();
					house.setHouse_id(houseId);
					house.setState("已出租");
					jo = JSONObject.fromObject(house);
					m1.clear();
					m1.put("house", URLEncoder.encode(jo.toString(),"utf-8"));
					String houser = hp1.hp(HURL, m1, "PUT");
					if("success".equals(houser)){
						operation.set("houselist", null);
						operation.set("houselist_"+district, null);
					}			
			    }else if("fail".equals(result1)){
			    	result1="addfail";
			    }
			    out.print(result1);
			}
		}else{
			out.print("refused");
		}	
	}
	/**
	 * 修改Rent
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/putRent.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void putRent(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();			
		String houseId=null;
		String address=null;
		String contractNo=null;
		String salesman=null;
		String regionManager=null;
		String serviceProvider=null;
		String renterName=null;
		String renterTelephone=null;
		String renterIdcard=null;
		String contractDate=null;
		String contractStartdate=null;
		String contractEnddate=null;
		String contractMonth=null;
		String payrentTime=null;
		String paymethod=null;
		String roomNum=null;
		String monthpayProvider=null;
		String monthpayState=null;
		String remark=null;
		String jobNo=null;
		String state=null;
		String district=null;
		String date=null;
		
		String firstyearMonthrent=request.getParameter("firstyear_monthrent");
		String secondyearMonthrent=request.getParameter("secondyear_monthrent");
		String thirdyearMonthrent=request.getParameter("thirdyear_monthrent");
		String fourthyearMonthrent=request.getParameter("fourthyear_monthrent");
		String fifthyearMonthrent=request.getParameter("fifthyear_monthrent");			
		String sixthyearMonthrent=request.getParameter("sixthyear_monthrent");			//第六年
		String firststageRent=request.getParameter("firststage_rent");
		String providerMoney = request.getParameter("provider_money");
		
		String deposit=request.getParameter("deposit");
		try {houseId = URLDecoder.decode(request.getParameter("house_id"),"UTF-8");} catch (Exception e) {}
		try {address = URLDecoder.decode(request.getParameter("address"),"UTF-8");} catch (Exception e) {}
		try {contractNo = URLDecoder.decode(request.getParameter("contract_no"),"UTF-8");} catch (Exception e) {}
		try {salesman = URLDecoder.decode(request.getParameter("salesman"),"UTF-8");} catch (Exception e) {}
		try {regionManager = URLDecoder.decode(request.getParameter("region_manager"),"UTF-8");} catch (Exception e) {}
		try {serviceProvider = URLDecoder.decode(request.getParameter("service_provider"),"UTF-8");} catch (Exception e) {}
		try {renterName = URLDecoder.decode(request.getParameter("renter_name"),"UTF-8");} catch (Exception e) {}
		try {renterTelephone = URLDecoder.decode(request.getParameter("renter_telephone"),"UTF-8");} catch (Exception e) {}
		try {renterIdcard = URLDecoder.decode(request.getParameter("renter_idcard"),"UTF-8");} catch (Exception e) {}
		try {contractDate = URLDecoder.decode(request.getParameter("contract_date"),"UTF-8");} catch (Exception e) {}
			try {contractStartdate = URLDecoder.decode(request.getParameter("contract_startdate"),"UTF-8");} catch (Exception e) {}
			try {	contractEnddate = URLDecoder.decode(request.getParameter("contract_enddate"),"UTF-8");} catch (Exception e) {}
			try {contractMonth = URLDecoder.decode(request.getParameter("contract_month"),"UTF-8");} catch (Exception e) {}
			try {	payrentTime = URLDecoder.decode(request.getParameter("payrent_time"),"UTF-8");} catch (Exception e) {}
			try {	paymethod = URLDecoder.decode(request.getParameter("paymethod"),"UTF-8");} catch (Exception e) {}
			
		
			try {roomNum = URLDecoder.decode(request.getParameter("room_num"),"UTF-8");} catch (Exception e) {}
			try {monthpayProvider = URLDecoder.decode(request.getParameter("monthpay_provider"),"UTF-8");} catch (Exception e) {}
			try {monthpayState = URLDecoder.decode(request.getParameter("monthpay_state"),"UTF-8");} catch (Exception e) {}
			try {remark = URLDecoder.decode(request.getParameter("remark"),"UTF-8");} catch (Exception e) {}
			try {jobNo = URLDecoder.decode(request.getParameter("job_no"),"UTF-8");} catch (Exception e) {}
			try {state = URLDecoder.decode(request.getParameter("state"),"UTF-8");} catch (Exception e) {}
			try {district = URLDecoder.decode(request.getParameter("district"),"UTF-8");} catch (Exception e) {}


			
			if(houseId.isEmpty() || houseId==null){		//房源ID不能为空
				out.print("houseId_fail");
				return;
			}
			//物业配置
			String now_water_degree=request.getParameter("now_water_degree");
			String now_elec_degree_day=request.getParameter("now_elec_degree_day");
			String now_elec_degree_night=request.getParameter("now_elec_degree_night");
			String now_gas_degree=request.getParameter("now_gas_degree");
				
			String keyinfo = null;
			try {keyinfo = URLDecoder.decode(request.getParameter("keyinfo"),"UTF-8");} catch (Exception e) {}			
			if("已失效".equals(state)){		//改为已失效做日志，租客订单改已失效				
				rentorderdao.updatestate("已失效", houseId,UtilDate.getDate1());		//修改出租订单失效
			}
			
		Rent r = new Rent(houseId, address, contractNo, salesman, regionManager, serviceProvider, providerMoney, renterName, renterTelephone, renterIdcard, contractDate, contractStartdate, contractEnddate, contractMonth, firstyearMonthrent, secondyearMonthrent, thirdyearMonthrent, fourthyearMonthrent, fifthyearMonthrent, sixthyearMonthrent, firststageRent, payrentTime, paymethod, deposit, monthpayProvider, monthpayState, remark, jobNo, roomNum, state, district, date);
		
	    JSONObject jo = JSONObject.fromObject(r);
	    Map<String,String> m = new LinkedHashMap<String, String>();
	    m.put("rent", URLEncoder.encode(jo.toString(),"UTF-8"));
	    Http hp = Http.getInstance();
	    String result1 = hp.hp(RURL, m, "put");
	    ValueOperations<String,String> operation = //TODO redis 需要修改.opsForValue();
	    
	    if("success".equals(result1)){
	    	Staff admin = (Staff) request.getSession().getAttribute("admin");
			String ip = request.getHeader("x-forwarded-for"); 
			if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 		//获取IP
				ip = request.getHeader("Proxy-Client-IP"); 
				} 
				if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
				ip = request.getHeader("WL-Proxy-Client-IP"); 
				} 
				if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
				ip = request.getRemoteAddr(); 
			}				
			Log log = new Log(admin.getJob_no(),admin.getName(),houseId,contractNo,address,"出房",state,UtilDate.getDateFormatter(),ip);
			logdao.add(log);
	    
			String application = null;
			try {
				application = URLDecoder.decode(request.getParameter("application"),"UTF-8");
				JSONArray appja = JSONArray.fromObject(application);
				for(int i=0;i<appja.size();i++){
					JSONObject jo1 = (JSONObject) appja.get(i);
					jo1.put("contract_no", contractNo);
					jo1.put("rentname", renterName);
					jo1.put("rent_telephone", renterTelephone);
					jo1.put("state", "正常");
				}		
				application = appja.toString();
			
		    	RentProperty rentproperty = new RentProperty(contractNo, now_water_degree, now_elec_degree_day, now_elec_degree_night, now_gas_degree, keyinfo, application,renterName,renterTelephone,"正常");
		    
		    	int num = rentpropertydao.update(rentproperty);
				String rentapplication = rentproperty.getApplication();
				JSONArray ja = JSONArray.fromObject(rentapplication);
				RentApplication a;
				
				rentapplicationdao.delete(rentproperty.getContract_no());
				for(int i=0;i<ja.size();i++){
					a = (RentApplication) JSONObject.toBean(JSONObject.fromObject(ja.get(i)),RentApplication.class);
					rentapplicationdao.add(a);
				}
				if(num>0){
					result1="success";
				}else{
					result1="propertyupdatefail";
				}   
			} catch (Exception e) {
				result1="propertyupdateerror";
			}	
	    	operation.set("rentlist", null);
	    }else if("fail".equals(result1)){
	    	result1="updatefail";
	    }	    
	    out.print(result1);
	}
	
	/**
	 * 管家名字替换管家工号
	 * @param ja 房源集合
	 * @return
	 */
	private JSONArray nameReplaceJobno(JSONArray ja) {
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
