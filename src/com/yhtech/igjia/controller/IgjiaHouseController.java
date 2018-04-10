package com.yhtech.igjia.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yhtech.igjia.domain.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;

import com.peter.util.UtilDate;
import com.yhtech.domain.Log;
import com.yhtech.finance.dao.IHouseorderDao;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.dao.IApplicationDao;
import com.yhtech.igjia.dao.IHouseDao;
import com.yhtech.igjia.dao.IPropertyDao;
import com.yhtech.service.OperateDataService;
import com.yhtech.service.YGJdataService;
import com.yhtech.yhtech.dao.ILogDao;

@Controller("IgjiaHouseController")
public class IgjiaHouseController {
	Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource
	private IStaffDao admindao;
	@Resource
	private ILogDao logdao;
	@Resource
	private IHouseorderDao houseorderdao;
	@Resource
	private IPropertyDao propertydao;
	
	@Resource
	private IApplicationDao applicationdao;
	
	@Resource
	private IHouseDao ihousedao;
	@Resource
	private IHouseDao irentdao;
	
	@Resource
	private OperateDataService ods;
	@Autowired
	private YGJdataService data;
	@RequestMapping("igjia/kz.do")
	@Authority(AuthorityType.LoginAuthority)
	public void kz(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		List<House> houselist = new ArrayList<House>();
		List<Rent> rentlist = new ArrayList<Rent>();
		for (int i= 0; i<houselist.size();i++){
			for (int j= 0; i<rentlist.size();j++){
				if(houselist.get(i).getHouse_id() == rentlist.get(i).getHouse_id()){
					
				}
			}
		}


	}


//	@RequestMapping("igjia/getproperty1.do")
//	@Authority(AuthorityType.LoginAuthority)
//	public void getproperty1(HttpServletRequest request,HttpServletResponse response) throws IOException{
//		response.setContentType("text/html;charset=utf-8");
//		PrintWriter out = response.getWriter();
//		List<House> list = ihousedao.listAll();
//		JSONArray arr = JSONArray.fromObject(list);
//	
//		out.print(arr.toString());
//	}




	@RequestMapping("igjia/getproperty.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getproperty(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String house_id = request.getParameter("house_id");
		Property property = propertydao.getByHouseid(house_id);			
		List<Application> list = applicationdao.getByHouseid(house_id);
		if(list.size()!=0){
			JSONArray ja = JSONArray.fromObject(list);
			property.setApplication(ja.toString());
		}			
		JSONObject jo = JSONObject.fromObject(property);
		out.print(jo.toString());
	}
	
	/**
	 * 分页获得房源
	 * @param request
	 * @param response
	 */
	@RequestMapping("igjia/pagehouse.do")
	@Authority(AuthorityType.LoginAuthority)
	public void pagehouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String page=request.getParameter("page");
		List<House> list = new ArrayList<House>();
		if(page!=null){
			int page1 = Integer.parseInt(page);
			Page pa = new Page("", "", "", "", "", "", "", (page1*15)-15, 15, "");
			list = ihousedao.listPage(pa);
		}else{
			Page pa = new Page("", "", "", "", "", "", "", 0, 15, "");
			list = ihousedao.listPage(pa);
		}
		
		JSONArray jrr = JSONArray.fromObject(list);
		JSONArray ja = nameReplaceJobno(jrr);
		out.print(ja.toString());
	}
	
	/**
	 * 首页展示排位
	 * @param request
	 * @param response
	 */
	@RequestMapping("/pagehouse.do")
	@Authority(AuthorityType.LoginAuthority)
	public void pagehouseindex(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String page=request.getParameter("page");
		List<House> list = new ArrayList<House>();
		if(page!=null){
			int page1 = Integer.parseInt(page);
			Page pa = new Page("", "", "", "", "", "", "", (page1*15)-15, 15, "");
			list = ihousedao.listPage(pa);
		}else{
			Page pa = new Page("", "", "", "", "", "", "", 0, 15, "");
			list = ihousedao.listPage(pa);
		}
		
		JSONArray jrr = JSONArray.fromObject(list);
		JSONArray ja = nameReplaceJobno(jrr);
		out.print(ja.toString());
	}
	
	/**
	 * 获取单个房源记录
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/Onehouse.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaoneHouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		//获取数据
		String house_id=request.getParameter("house_id");
		JSONObject jo=new JSONObject();
		House house = ihousedao.findById(house_id);
		jo = JSONObject.fromObject(house);
		out.print(jo.toString());
	}

	/**
	 * 获取单个房源记录
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/Onehouse1.do")
	public void aaaaaaa(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		//获取数据
		String idcard=request.getParameter("idcard");
 		JSONArray array = JSONArray.fromObject(ihousedao.idcardHouse(idcard));
		array.addAll(ihousedao.idcardrent(idcard));
		out.print(array.toString());
	}
	
	/**
	 * 获取前15条房源
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/Allhouse.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaAllHouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		List<House> list = new ArrayList<House>();
		int count = 0;
		Page pa = new Page("", "", "", "", "", "", "", 0, 15, "");
		list = ihousedao.listPage(pa);
		count = ihousedao.count(pa);
		JSONObject obj = new JSONObject();
		JSONArray jrr = JSONArray.fromObject(list);
		JSONArray arr1 = nameReplaceJobno(jrr);

		obj.put("maxnum", count);
		arr1.add(obj);
		out.print(arr1.toString());
	}
	
	/**
	 * 条件查询(查缓存，缓存按区域分)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/house.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaHouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String address=request.getParameter("address");
		String district=request.getParameter("district");
		String state=request.getParameter("state");


		try {
			state = StringUtils.isBlank(state)?"":URLDecoder.decode(state,"UTF-8");
			district = StringUtils.isBlank(district)?"":URLDecoder.decode(district,"UTF-8");
			address = StringUtils.isBlank(address)?"":URLDecoder.decode(address,"UTF-8");
		}catch(Exception e){
            logger.error("decode occured Exception",e);
		}
		String contract_start1=request.getParameter("contract_start1");
		String contract_start2=request.getParameter("contract_start2");
		String contract_end1=request.getParameter("contract_end1");
		String contract_end2=request.getParameter("contract_end2");
		if(contract_start1.isEmpty()) contract_start1="1999/1/1";		//开始日期为空默认最早
		if(contract_end1.isEmpty()) contract_end1="1999/1/1";		//结束日期为空默认最早
		if(contract_start2.isEmpty()) contract_start2="2099/12/31";		//结束日期为空默认最晚
		if(contract_end2.isEmpty()) contract_end2="2099/12/31";		//结束日期为空默认最晚
		
		if(state.equals("全部")){
			state="";
		}
		if(district.equals("全部")){
			district="";
		}
		
		
		String page = request.getParameter("page");
		String num = request.getParameter("num");  
		List<House> list = new ArrayList<House>();
		int count = 0;
		if(page!=null && num!=null){
			int page1 = Integer.parseInt(page);
			int num1 = Integer.parseInt(num);
			Page pa = new Page(district, state, contract_start1, contract_start2, contract_end1, contract_end2, address, (page1*num1)-num1, num1, "");
			list = ihousedao.listPage(pa);
			count = ihousedao.count(pa);
		}else{
			Page pa = new Page(district, state, contract_start1, contract_start2, contract_end1, contract_end2, address, 0, 15, "");
			list = ihousedao.listPage(pa);
			count = ihousedao.count(pa);
		}
		
			JSONObject jo = new JSONObject();
			JSONArray jrr = JSONArray.fromObject(list);
			JSONArray jsonarr = nameReplaceJobno(jrr);
			jo.put("code", "1");
			jo.put("msg", jsonarr.toString());
			jo.put("total",count);
			out.print(jo.toString());

	}
	
	/**
	 * 出房获取入房房源信息
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/house1.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaHouse1(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String district=request.getParameter("district");
		if(district != null && district != ""){
			district = URLDecoder.decode(district,"UTF-8");
		}
		List<House> list = ihousedao.findByDistrict(district);
		JSONArray jo = JSONArray.fromObject(list);
		out.print(jo.toString());

	}
	/**
	 * 出房获取入房房源信息
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/house2.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaHouse2(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String district=request.getParameter("district");
		if(district != null && district != ""){
			district = URLDecoder.decode(district,"UTF-8");
		}
		List<House> list = ihousedao.findByDistrict1(district);
		JSONArray jo = JSONArray.fromObject(list);
		out.print(jo.toString());
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
	/**
	 * 添加房源
	 * @param request
	 * @param response
	 * @throws InterruptedException 
	 * @throws Exception
	 */
	@RequestMapping("igjia/addHouse.do")
	@Authority(AuthorityType.LoginAuthority)
	public void addHouse(HttpServletRequest request,HttpServletResponse response) throws IOException, InterruptedException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();	
		Staff admin = (Staff) request.getSession().getAttribute("admin");
		//if("商圈经理".equals(admin.getPosition()) || "2".equals(admin.getPermission())){
		if(admin.getDepartment().equals("YGJZL")){
			synchronized(this){			
				Thread.sleep(1000);
				String houseId = System.currentTimeMillis()/1000+"";
				String city=null;
				String region=null;
				String estate=null;
				String businessArea=null;
				String address=null;
				String houseType=null;
				String area=null;
				String contractNo=null;
				String contractDate=null;
				String contractStartdate=null;
				String contractEnddate=null;
				String contractMonth=null;
				
				String paymethod=null;


				String payNextyear=null;
				String payDate=null;
				String salesman=null;
				String regionManager=null;
				String remark=null;
				String houseProvider=null;
				String jobNo = null;
				String roomNum=null;
				String state=null;
				String district=null;
				String date= UtilDate.getDateFormatter();
				
				String firstyearMonthrent=request.getParameter("firstyear_monthrent");
				String secondyearMonthrent=request.getParameter("secondyear_monthrent");
				String thirdyearMonthrent=request.getParameter("thirdyear_monthrent");
				String fourthyearMonthrent=request.getParameter("fourthyear_monthrent");
				String fifthyearMonthrent=request.getParameter("fifthyear_monthrent");			
				String sixthyearMonthrent=request.getParameter("sixthyear_monthrent");			//第六年
				
				String totalcost=request.getParameter("totalcost");
				String roomYuqichufangjia=request.getParameter("room_yuqichufangjia");			//房间预期出房价格
				String deposit=request.getParameter("deposit");
				String overduePayment=request.getParameter("overdue_payment");
				
				//物业交割参数
				String water_account=null;
				try {water_account = URLDecoder.decode(request.getParameter("water_account"),"UTF-8");} catch (Exception e) {}
				String last_water_degree=request.getParameter("last_water_degree");
				String now_water_degree=request.getParameter("now_water_degree");
				String water_unitprice=request.getParameter("water_unitprice");
				String elec_account=null;
				try {elec_account = URLDecoder.decode(request.getParameter("elec_account"),"UTF-8");} catch (Exception e) {}
				String last_elec_degree_day=request.getParameter("last_elec_degree_day");
				String last_elec_degree_night=request.getParameter("last_elec_degree_night");
				String now_elec_degree_day=request.getParameter("now_elec_degree_day");
				String now_elec_degree_night=request.getParameter("now_elec_degree_night");
				String elec_unitprice_day=request.getParameter("elec_unitprice_day");
				String elec_unitprice_night=request.getParameter("elec_unitprice_night");
				String gas_account=null;
				try {gas_account = URLDecoder.decode(request.getParameter("gas_account"),"UTF-8");} catch (Exception e) {}
				String last_gas_degree=request.getParameter("last_gas_degree");
				String now_gas_degree=request.getParameter("now_gas_degree");
				String gas_unitprice=request.getParameter("gas_unitprice");
				String cableTV = null;
				try {cableTV = URLDecoder.decode(request.getParameter("cableTV"),"UTF-8");} catch (Exception e) {}
				String cableTV_account=null;
				try {cableTV_account = URLDecoder.decode(request.getParameter("cableTV_account"),"UTF-8");} catch (Exception e) {}
				String cableTV_date=null;
				try {cableTV_date = URLDecoder.decode(request.getParameter("cableTV_date"),"UTF-8");} catch (Exception e) {}
				String cableTV_money=request.getParameter("cableTV_money");
				String cleaning_price=request.getParameter("cleaning_price");
				String total_money=request.getParameter("totalmoney");
				String phone = null;
				try {phone = URLDecoder.decode(request.getParameter("phone"),"UTF-8");} catch (Exception e) {}
				String decoration = null;
				try {decoration = URLDecoder.decode(request.getParameter("decoration"),"UTF-8");} catch (Exception e) {}
				String property_remark = null;
				try {property_remark = URLDecoder.decode(request.getParameter("property_remark"),"UTF-8");} catch (Exception e) {}
				
				
				try {city = URLDecoder.decode(request.getParameter("city"),"UTF-8");} catch (Exception e) {}
				try {estate = URLDecoder.decode(request.getParameter("estate"),"UTF-8");} catch (Exception e) {}
				try {address = URLDecoder.decode(request.getParameter("address"),"UTF-8");} catch (Exception e) {}
				try {businessArea = URLDecoder.decode(request.getParameter("business_area"),"UTF-8");} catch (Exception e) {}
				try {houseType = URLDecoder.decode(request.getParameter("house_type"),"UTF-8");} catch (Exception e) {}
				try {area = URLDecoder.decode(request.getParameter("area"),"UTF-8");} catch (Exception e) {}
				try {contractNo = URLDecoder.decode(request.getParameter("contract_no"),"UTF-8");} catch (Exception e) {}
				try {contractDate = URLDecoder.decode(request.getParameter("contract_date"),"UTF-8");} catch (Exception e) {}
				try {contractStartdate = URLDecoder.decode(request.getParameter("contract_startdate"),"UTF-8");} catch (Exception e) {}
				try {contractEnddate = URLDecoder.decode(request.getParameter("contract_enddate"),"UTF-8");} catch (Exception e) {}
				try {contractMonth = URLDecoder.decode(request.getParameter("contract_month"),"UTF-8");} catch (Exception e) {}
				try {paymethod = URLDecoder.decode(request.getParameter("paymethod"),"UTF-8");} catch (Exception e) {}
					
					try {payNextyear = URLDecoder.decode(request.getParameter("pay_nextyear"),"UTF-8");} catch (Exception e) {}
					try {payDate = URLDecoder.decode(request.getParameter("pay_date"),"UTF-8");} catch (Exception e) {}
					try {salesman = URLDecoder.decode(request.getParameter("salesman"),"UTF-8");} catch (Exception e) {}
					try {regionManager = URLDecoder.decode(request.getParameter("region_manager"),"UTF-8");} catch (Exception e) {}
					try {jobNo = URLDecoder.decode(request.getParameter("job_no"),"UTF-8");} catch (Exception e) {}
					try {remark = URLDecoder.decode(request.getParameter("remark"),"UTF-8");} catch (Exception e) {}
					try {houseProvider = URLDecoder.decode(request.getParameter("house_provider"),"UTF-8");} catch (Exception e) {}
					try {roomNum = URLDecoder.decode(request.getParameter("room_num"),"UTF-8");} catch (Exception e) {}
					try {state = URLDecoder.decode(request.getParameter("state"),"UTF-8");} catch (Exception e) {}
					try {district = URLDecoder.decode(request.getParameter("district"),"UTF-8");} catch (Exception e) {}
					
					//新增字段
					String vacancyDate=null;
					String fangdongName=null;			//房东名字
					String fangdongTelephone=null;		//房东电话
					String fangdongIdcard=null;			//房东身份证
					String shoukuanrenName=null;		//收款人名字
					String shoukuanrenTelephone=null;	//收款人电话号码
					String shoukuanrenKaihuhang=null;	//收款人开户行
					String shoukuanrenAccount=null;		//收款人银行账户
					
					
					String roomArea=null;				//放房间面积
					String roomChaoxiang=null;			//房间朝向
					String roomTese=null;				//房间特色
					
					String providerMoney=null;			//入房中介费
					
					try {vacancyDate = URLDecoder.decode(request.getParameter("vacancy_date"),"UTF-8");} catch (Exception e) {}
					try {fangdongName = URLDecoder.decode(request.getParameter("fangdong_name"),"UTF-8");} catch (Exception e) {}
					try {fangdongTelephone = URLDecoder.decode(request.getParameter("fangdong_telephone"),"UTF-8");} catch (Exception e) {}
					try {fangdongIdcard = URLDecoder.decode(request.getParameter("fangdong_idcard"),"UTF-8");} catch (Exception e) {}
					try {shoukuanrenName = URLDecoder.decode(request.getParameter("shoukuanren_name"),"UTF-8");} catch (Exception e) {}
					try {shoukuanrenTelephone = URLDecoder.decode(request.getParameter("shoukuanren_telephone"),"UTF-8");} catch (Exception e) {}
					try {shoukuanrenKaihuhang = URLDecoder.decode(request.getParameter("shoukuanren_kaihuhang"),"UTF-8");} catch (Exception e) {}
					try {shoukuanrenAccount = URLDecoder.decode(request.getParameter("shoukuanren_account"),"UTF-8");} catch (Exception e) {}
					try {roomArea = URLDecoder.decode(request.getParameter("room_area"),"UTF-8");} catch (Exception e) {}
					try {roomChaoxiang = URLDecoder.decode(request.getParameter("room_chaoxiang"),"UTF-8");} catch (Exception e) {}
					try {roomTese = URLDecoder.decode(request.getParameter("room_tese"),"UTF-8");} catch (Exception e) {}
					try {providerMoney = URLDecoder.decode(request.getParameter("provider_money"),"UTF-8");} catch (Exception e) {}		
				Integer ls_id = ihousedao.getContractMax();
				int ContractNum= ihousedao.getContractNum(contractNo);
				if(ContractNum==0){
					ls_id++;
				}
				House h = new House(houseId, city, region, estate, businessArea, address, fangdongName, fangdongTelephone, fangdongIdcard, shoukuanrenName, shoukuanrenTelephone, shoukuanrenKaihuhang, shoukuanrenAccount, houseType, area, roomArea, roomChaoxiang, roomTese, roomYuqichufangjia, contractNo, contractDate, contractStartdate, contractEnddate, contractMonth, vacancyDate, firstyearMonthrent, secondyearMonthrent, thirdyearMonthrent, fourthyearMonthrent, fifthyearMonthrent, sixthyearMonthrent, payNextyear, payDate, salesman, regionManager, totalcost, paymethod, deposit, overduePayment, remark, houseProvider, providerMoney, jobNo, roomNum, state, district, date, ls_id);
				int res = 0;
				String result = "error";
				try {
					res = ihousedao.add(h);
				} catch (Exception e) {
					e.printStackTrace();
					out.print("error");
				}
				if(res == 1){
					result = "success";
				}
			    if("success".equals(result)){
			    	String application = null;
					try {application = URLDecoder.decode(request.getParameter("application"),"UTF-8");
						JSONArray appja = JSONArray.fromObject(application);
						for(int i=0;i<appja.size();i++){
							JSONObject jo1 = (JSONObject) appja.get(i);
							jo1.put("house_id", houseId);
						}
						
						application = appja.toString();
				    	Property property = new Property(houseId, water_account, last_water_degree, now_water_degree, water_unitprice, elec_account, last_elec_degree_day, last_elec_degree_night, now_elec_degree_day, now_elec_degree_night, elec_unitprice_day, elec_unitprice_night, gas_account, last_gas_degree, now_gas_degree, gas_unitprice, cableTV, cableTV_account, cableTV_date, cableTV_money, cleaning_price, total_money, phone, decoration, application, property_remark);
				    	int num = propertydao.add(property);
						String application1 = property.getApplication();
						JSONArray ja = JSONArray.fromObject(application1);
						Application a;
						for(int i=0;i<ja.size();i++){
							a = (Application) JSONObject.toBean(JSONObject.fromObject(ja.get(i)),Application.class);
							applicationdao.add(a);
						}
						if(num>0){
							result="success";
						}else{
							result="propertyinsertfail";
						}
					} catch (Exception e) {
						result="propertyinserterror";
					}
			    }else if("fail".equals(result)){
			    	result="insertfail";
			    }
			    out.print(result);
			}
		}else{
			out.print("refused");
		}
		
	}
	/**
	 * 修改房源
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/putHouse.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void putHouse(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();	
		String houseId=null;
		String city=null;
		String region=null;
		String estate=null;
		String businessArea=null;
		String address=null;
		String houseType=null;
		String area=null;
		String contractNo=null;
		String contractDate=null;
		String contractStartdate=null;
		String contractEnddate=null;
		String contractMonth=null;
		
		String paymethod=null;
		
		String payNextyear=null;
		String payDate=null;
		String salesman=null;
		String regionManager=null;
		String remark=null;
		String houseProvider=null;
		String jobNo=null;
		String roomNum=null;
		String state=null;
		String district=null;
		String date=null;
		
		String firstyearMonthrent=request.getParameter("firstyear_monthrent");
		String secondyearMonthrent=request.getParameter("secondyear_monthrent");
		String thirdyearMonthrent=request.getParameter("thirdyear_monthrent");
		String fourthyearMonthrent=request.getParameter("fourthyear_monthrent");
		String fifthyearMonthrent=request.getParameter("fifthyear_monthrent");			
		String sixthyearMonthrent=request.getParameter("sixthyear_monthrent");			//第六年
		
		String totalcost=request.getParameter("totalcost");
		String roomYuqichufangjia=request.getParameter("room_yuqichufangjia");			//房间预期出房价格
		String deposit=request.getParameter("deposit");
		String overduePayment=request.getParameter("overdue_payment");
		
		
		try {houseId = URLDecoder.decode(request.getParameter("house_id"),"UTF-8");} catch (Exception e) {}
		try {city = URLDecoder.decode(request.getParameter("city"),"UTF-8");} catch (Exception e) {}
		try {estate = URLDecoder.decode(request.getParameter("estate"),"UTF-8");} catch (Exception e) {}
		try {businessArea = URLDecoder.decode(request.getParameter("business_area"),"UTF-8");} catch (Exception e) {}
		try {address = URLDecoder.decode(request.getParameter("address"),"UTF-8");} catch (Exception e) {}
		try {houseType = URLDecoder.decode(request.getParameter("house_type"),"UTF-8");} catch (Exception e) {}
		try {area = URLDecoder.decode(request.getParameter("area"),"UTF-8");} catch (Exception e) {}
		try {contractNo = URLDecoder.decode(request.getParameter("contract_no"),"UTF-8");} catch (Exception e) {}
		try {contractDate = URLDecoder.decode(request.getParameter("contract_date"),"UTF-8");} catch (Exception e) {}
		try {contractStartdate = URLDecoder.decode(request.getParameter("contract_startdate"),"UTF-8");} catch (Exception e) {}
		try {contractEnddate = URLDecoder.decode(request.getParameter("contract_enddate"),"UTF-8");} catch (Exception e) {}
		try {contractMonth = URLDecoder.decode(request.getParameter("contract_month"),"UTF-8");} catch (Exception e) {}

		try {paymethod = URLDecoder.decode(request.getParameter("paymethod"),"UTF-8");} catch (Exception e) {}
			
		try {payNextyear = URLDecoder.decode(request.getParameter("pay_nextyear"),"UTF-8");} catch (Exception e) {}
		try {payDate = URLDecoder.decode(request.getParameter("pay_date"),"UTF-8");} catch (Exception e) {}
		try {salesman = URLDecoder.decode(request.getParameter("salesman"),"UTF-8");} catch (Exception e) {}
		try {regionManager = URLDecoder.decode(request.getParameter("region_manager"),"UTF-8");} catch (Exception e) {}
		try {remark = URLDecoder.decode(request.getParameter("remark"),"UTF-8");} catch (Exception e) {}
		try {houseProvider = URLDecoder.decode(request.getParameter("house_provider"),"UTF-8");} catch (Exception e) {}
		try {jobNo = URLDecoder.decode(request.getParameter("job_no"),"UTF-8");} catch (Exception e) {}
		try {roomNum = URLDecoder.decode(request.getParameter("room_num"),"UTF-8");} catch (Exception e) {}
		try {state = URLDecoder.decode(request.getParameter("state"),"UTF-8");} catch (Exception e) {}
		try {district = URLDecoder.decode(request.getParameter("district"),"UTF-8");} catch (Exception e) {}
		
		//新增字段
		String vacancyDate=null;			//空置开始日期
		String fangdongName=null;			//房东名字
		String fangdongTelephone=null;		//房东电话
		String fangdongIdcard=null;			//房东身份证
		String shoukuanrenName=null;		//收款人名字
		String shoukuanrenTelephone=null;	//收款人电话号码
		String shoukuanrenKaihuhang=null;	//收款人开户行
		String shoukuanrenAccount=null;		//收款人银行账户
		
		String roomArea=null;				//放房间面积
		String roomChaoxiang=null;			//房间朝向
		String roomTese=null;				//房间特色
		String providerMoney=null;			//入房中介费
		try {vacancyDate = URLDecoder.decode(request.getParameter("vacancy_date"),"UTF-8");} catch (Exception e) {}
		try {fangdongName = URLDecoder.decode(request.getParameter("fangdong_name"),"UTF-8");} catch (Exception e) {}
		try {fangdongTelephone = URLDecoder.decode(request.getParameter("fangdong_telephone"),"UTF-8");} catch (Exception e) {}
		try {fangdongIdcard = URLDecoder.decode(request.getParameter("fangdong_idcard"),"UTF-8");} catch (Exception e) {}
		try {shoukuanrenName = URLDecoder.decode(request.getParameter("shoukuanren_name"),"UTF-8");} catch (Exception e) {}
		try {shoukuanrenTelephone = URLDecoder.decode(request.getParameter("shoukuanren_telephone"),"UTF-8");} catch (Exception e) {}
		try {shoukuanrenKaihuhang = URLDecoder.decode(request.getParameter("shoukuanren_kaihuhang"),"UTF-8");} catch (Exception e) {}
		try {shoukuanrenAccount = URLDecoder.decode(request.getParameter("shoukuanren_account"),"UTF-8");} catch (Exception e) {}
		try {roomArea = URLDecoder.decode(request.getParameter("room_area"),"UTF-8");} catch (Exception e) {}
		try {roomChaoxiang = URLDecoder.decode(request.getParameter("room_chaoxiang"),"UTF-8");} catch (Exception e) {}
		try {roomTese = URLDecoder.decode(request.getParameter("room_tese"),"UTF-8");} catch (Exception e) {}
		try {providerMoney = URLDecoder.decode(request.getParameter("provider_money"),"UTF-8");} catch (Exception e) {}
		
		//物业交割参数
		String water_account=null;
		try {water_account = URLDecoder.decode(request.getParameter("water_account"),"UTF-8");} catch (Exception e) {}
		String last_water_degree=request.getParameter("last_water_degree");
		String now_water_degree=request.getParameter("now_water_degree");
		String water_unitprice=request.getParameter("water_unitprice");
		String elec_account=null;
		try {elec_account = URLDecoder.decode(request.getParameter("elec_account"),"UTF-8");} catch (Exception e) {}
		String last_elec_degree_day=request.getParameter("last_elec_degree_day");
		String last_elec_degree_night=request.getParameter("last_elec_degree_night");
		String now_elec_degree_day=request.getParameter("now_elec_degree_day");
		String now_elec_degree_night=request.getParameter("now_elec_degree_night");
		String elec_unitprice_day=request.getParameter("elec_unitprice_day");
		String elec_unitprice_night=request.getParameter("elec_unitprice_night");
		String gas_account=null;
		try {gas_account = URLDecoder.decode(request.getParameter("gas_account"),"UTF-8");} catch (Exception e) {}
		String last_gas_degree=request.getParameter("last_gas_degree");
		String now_gas_degree=request.getParameter("now_gas_degree");
		String gas_unitprice=request.getParameter("gas_unitprice");
		String cableTV = null;
		try {cableTV = URLDecoder.decode(request.getParameter("cableTV"),"UTF-8");} catch (Exception e) {}
		String cableTV_account=null;
		try {cableTV_account = URLDecoder.decode(request.getParameter("cableTV_account"),"UTF-8");} catch (Exception e) {}
		String cableTV_date=null;
		try {cableTV_date = URLDecoder.decode(request.getParameter("cableTV_date"),"UTF-8");} catch (Exception e) {}
		String cableTV_money=request.getParameter("cableTV_money");
		String cleaning_price=request.getParameter("cleaning_price");
		String total_money=request.getParameter("totalmoney");
		String phone = null;
		try {phone = URLDecoder.decode(request.getParameter("phone"),"UTF-8");} catch (Exception e) {}
		String decoration = null;
		try {decoration = URLDecoder.decode(request.getParameter("decoration"),"UTF-8");} catch (Exception e) {}
		String property_remark = null;
		try {property_remark = URLDecoder.decode(request.getParameter("property_remark"),"UTF-8");} catch (Exception e) {}
		
		
		if(houseId.isEmpty() || houseId==null){		//房源ID不能为空
			out.print("houseId_fail");
			return;
		}
		
		if("已解约".equals(state)){		//改为已解约做日志
			houseorderdao.updatestate("已失效", contractNo,UtilDate.getDate1());		//修改与房东结算的订单失效
		}
		House h = new House(houseId, city, region, estate, businessArea, address, fangdongName, fangdongTelephone, fangdongIdcard, shoukuanrenName, shoukuanrenTelephone, shoukuanrenKaihuhang, shoukuanrenAccount, houseType, area, roomArea, roomChaoxiang, roomTese, roomYuqichufangjia, contractNo, contractDate, contractStartdate, contractEnddate, contractMonth, vacancyDate, firstyearMonthrent, secondyearMonthrent, thirdyearMonthrent, fourthyearMonthrent, fifthyearMonthrent, sixthyearMonthrent, payNextyear, payDate, salesman, regionManager, totalcost, paymethod, deposit, overduePayment, remark, houseProvider, providerMoney, jobNo, roomNum, state, district, date);
		
		int res = 0;
		String result = "error";
		try {
			res = ihousedao.update(h);
		} catch (Exception e) {
			e.printStackTrace();
			out.print("error");
		}
		if(res == 1){
			result = "success";
		}
	    if("success".equals(result)){
	    	//修改成功做日志
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
			Log log = new Log(admin.getJob_no(),admin.getName(),houseId,contractNo,address,"收房",state,UtilDate.getDateFormatter(),ip);
			logdao.add(log);
	    	
			String application = null;
			try {
				application = URLDecoder.decode(request.getParameter("application"),"UTF-8");	
				JSONArray appja = JSONArray.fromObject(application);
				for(int i=0;i<appja.size();i++){
					JSONObject jo1 = (JSONObject) appja.get(i);
					jo1.put("house_id", houseId);
				}	
				application = appja.toString();
				//修改物业配置
		    	Property property = new Property(houseId, water_account, last_water_degree, now_water_degree, water_unitprice, elec_account, last_elec_degree_day, last_elec_degree_night, now_elec_degree_day, now_elec_degree_night, elec_unitprice_day, elec_unitprice_night, gas_account, last_gas_degree, now_gas_degree, gas_unitprice, cableTV, cableTV_account, cableTV_date, cableTV_money, cleaning_price, total_money, phone, decoration, application, property_remark);
		    	int num = propertydao.update(property);
				String application1 = property.getApplication();
				JSONArray ja = JSONArray.fromObject(application1);
				Application a;
				applicationdao.delete(property.getHouse_id());
				for(int i=0;i<ja.size();i++){
					a = (Application) JSONObject.toBean(JSONObject.fromObject(ja.get(i)),Application.class);
					applicationdao.add(a);
				}
				if(num>0){
					result="success";
				}else{
					result="propertyupdatefail";
				}
			} catch (Exception e) {
				result="propertyupdateerror";
			} 	
	    }else if("fail".equals(result)){
	    	result="updatefail";
	    }
	    out.print(result);
	}
		
}
