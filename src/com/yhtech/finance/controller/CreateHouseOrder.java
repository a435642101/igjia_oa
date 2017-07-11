package com.yhtech.finance.controller;


import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yhtech.igjia.dao.IHouseDao;
import com.yhtech.igjia.domain.House;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.peter.util.IdWorkerStandard;
import com.peter.util.UtilDate;
import com.yhtech.finance.dao.IHouseorderDao;
import com.yhtech.finance.domain.Houseorder;

@Controller("createhordercontroller")
public class CreateHouseOrder {
	@Resource
	private IHouseorderDao houseorderdao;
	@Resource
	private IHouseDao ihousedao;

	/**
	 * 订单获取房源信息
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/selecthouseorder.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaSelecthouseorder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String district=request.getParameter("district");
		if(district != null && district != ""){
			district = URLDecoder.decode(district,"UTF-8");
		}
		House house = new House();
		house.setDistrict(district);
		List<House> list = ihousedao.listSearch(house);
		JSONArray jo = JSONArray.fromObject(list);
		out.print(jo.toString());

	}

	@RequestMapping("/createhouseorder.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void createHouseOrder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String contract_no = request.getParameter("contract_no");
		String contract_startdate = request.getParameter("contract_startdate");
		String pay_date = request.getParameter("pay_date");//免租期结束日期
		String month = request.getParameter("contract_month");
		Double firstyear_monthrent =0.0;
		Double secondyear_monthrent =0.0;
		Double thirdyear_monthrent =0.0;
		Double fourthyear_monthrent =0.0;
		Double fifthyear_monthrent =0.0;
		Double sixthyear_monthrent =0.0;
		try {firstyear_monthrent = Double.parseDouble(request.getParameter("firstyear_monthrent"));} catch (Exception e) {}
		try {secondyear_monthrent = Double.parseDouble(request.getParameter("secondyear_monthrent"));} catch (Exception e) {}
		try {thirdyear_monthrent = Double.parseDouble(request.getParameter("thirdyear_monthrent"));} catch (Exception e) {}
		try {fourthyear_monthrent = Double.parseDouble(request.getParameter("fourthyear_monthrent"));} catch (Exception e) {}
		try {fifthyear_monthrent = Double.parseDouble(request.getParameter("fifthyear_monthrent"));} catch (Exception e) {}
		try {sixthyear_monthrent = Double.parseDouble(request.getParameter("sixthyear_monthrent"));} catch (Exception e) {}

		String paymethod = request.getParameter("paymethod");
		String shoukuanren_telephone = request.getParameter("shoukuanren_telephone");
		String shoukuanren_account = request.getParameter("shoukuanren_account");
		String shoukuanren_name = null;
		String shoukuanren_kaihuhang=null;
		String address=null;
		try {shoukuanren_name = URLDecoder.decode(request.getParameter("shoukuanren_name"),"UTF-8");} catch (Exception e) {}
		try {shoukuanren_kaihuhang = URLDecoder.decode(request.getParameter("shoukuanren_kaihuhang"),"UTF-8");} catch (Exception e) {}
		try {address = URLDecoder.decode(request.getParameter("address"),"UTF-8");} catch (Exception e) {}
		//以下生成收租订单
		String date = UtilDate.getDateFormatter();
    	IdWorkerStandard idWorker = new IdWorkerStandard(0);			//生成付房租订单编号
    	pay_date = pay_date.replaceAll("/", "-");		//日期转格式
    	contract_startdate = contract_startdate.replaceAll("/", "-");		//日期转格式
    	if("30".equals(paymethod)){		//月付房东    		   		
    		buildOrder(contract_startdate,pay_date,contract_no, address, shoukuanren_name, shoukuanren_telephone,shoukuanren_account,shoukuanren_kaihuhang,
    				firstyear_monthrent, secondyear_monthrent,
    				thirdyear_monthrent, fourthyear_monthrent,
    				fifthyear_monthrent,sixthyear_monthrent, date,
					idWorker, month,12);				//生成订单	    		
    	}else if("60".equals(paymethod)){
    		buildOrder(contract_startdate,pay_date,contract_no, address, shoukuanren_name, shoukuanren_telephone,shoukuanren_account,shoukuanren_kaihuhang,
    				firstyear_monthrent*2, secondyear_monthrent*2,
    				thirdyear_monthrent*2, fourthyear_monthrent*2,
    				fifthyear_monthrent*2,sixthyear_monthrent*2, date,
					idWorker, month,6);				//生成订单	    			//生成订单	    		
    	}else if("90".equals(paymethod)){
    		buildOrder(contract_startdate,pay_date,contract_no, address, shoukuanren_name, shoukuanren_telephone,shoukuanren_account,shoukuanren_kaihuhang,
    				firstyear_monthrent*3, secondyear_monthrent*3,
    				thirdyear_monthrent*3, fourthyear_monthrent*3,
    				fifthyear_monthrent*3,sixthyear_monthrent*3, date,
					idWorker, month,4);				//生成订单
    	}else if("180".equals(paymethod)){
    		buildOrder(contract_startdate,pay_date,contract_no, address, shoukuanren_name, shoukuanren_telephone,shoukuanren_account,shoukuanren_kaihuhang,
    				firstyear_monthrent*6, secondyear_monthrent*6,
    				thirdyear_monthrent*6, fourthyear_monthrent*6,
    				fifthyear_monthrent*6,sixthyear_monthrent*6, date,
					idWorker, month,2);;				//生成订单
    	}else if("365".equals(paymethod)){
    		buildOrder(contract_startdate,pay_date,contract_no, address, shoukuanren_name, shoukuanren_telephone,shoukuanren_account,shoukuanren_kaihuhang,
    				firstyear_monthrent*12, secondyear_monthrent*12,
    				thirdyear_monthrent*12, fourthyear_monthrent*12,
    				fifthyear_monthrent*12,sixthyear_monthrent*12, date,
					idWorker, month,1);				//生成订单
    	}
    	out.print("生成订单成功");
	}
	
	
	/**
	 * 
	 * @param contract_startdate 合同生效日期
	 * @param pay_date 免租期结束日期
	 * @param contract_no	合同编号
	 * @param address	地址
	 * @param shoukuanren_name 收款人名字
	 * @param shoukuanren_telephone 收款人电话
	 * @param firstyear_monthrent 首年每期租金
	 * @param secondyear_monthrent 次年每期租金
	 * @param thirdyear_monthrent 第三年每期租金
	 * @param fourthyear_monthrent 第四年每期租金
	 * @param fifthyear_monthrent 第五年每期租金
	 * @param sixthyear_monthrent 第六年每期租金
	 * @param date	当前时间
	 * @param idWorker 订单号
	 * @param month 一共几个月份
	 * @param yearperiod	一年分几期
	 */
	private void buildOrder(String contract_startdate,String pay_date,String contract_no,String address,String shoukuanren_name,String shoukuanren_telephone,String shoukuanren_account,String shoukuanren_kaihuhang,
			Double firstyear_monthrent,Double secondyear_monthrent,
			Double thirdyear_monthrent,Double fourthyear_monthrent,
			Double fifthyear_monthrent,Double sixthyear_monthrent,String date,
			IdWorkerStandard idWorker, String month,int yearperiod){
		List<String> datelist = UtilDate.getTimeList(pay_date,Integer.parseInt(month)/(12/yearperiod),12/yearperiod);
		String firstpaydate = UtilDate.caldate(contract_startdate,2);
		pay_date = UtilDate.caldate(pay_date,1);
		Houseorder houseorder = new Houseorder(idWorker.nextId()+"", firstpaydate,"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, firstyear_monthrent+"", date,1+"/"+datelist.size(), "待结算");
		houseorderdao.add(houseorder);
		
		if(datelist.size()<=yearperiod){			//一年合同
			for(int i=0;i<datelist.size()-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, firstyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}		
		}else if(datelist.size()<=yearperiod*2){		//二年合同
			for(int i=0;i<yearperiod-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, firstyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod-1;i<datelist.size()-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, secondyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}			
		}else if(datelist.size()<=yearperiod*3){		//3年合同
			for(int i=0;i<yearperiod-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, firstyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod-1;i<yearperiod*2-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, secondyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*2-1;i<datelist.size()-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, thirdyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
		}else if(datelist.size()<=yearperiod*4){		//4年合同
			for(int i=0;i<yearperiod-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, firstyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod-1;i<yearperiod*2-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, secondyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*2-1;i<yearperiod*3-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, thirdyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*3-1;i<datelist.size()-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, fourthyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
		}else if(datelist.size()<=yearperiod*5){		//5年合同
			for(int i=0;i<yearperiod-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, firstyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod-1;i<yearperiod*2-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, secondyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*2-1;i<yearperiod*3-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, thirdyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*3-1;i<yearperiod*4-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, fourthyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*4-1;i<datelist.size()-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, fifthyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}			
		}else{								//5年以上
			for(int i=0;i<yearperiod-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, firstyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod-1;i<yearperiod*2-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, secondyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*2-1;i<yearperiod*3-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, thirdyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*3-1;i<yearperiod*4-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, fourthyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*4-1;i<yearperiod*5-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, fifthyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
			for(int i=yearperiod*5-1;i<datelist.size()-1;i++){
				houseorder = new Houseorder(idWorker.nextId()+"",datelist.get(i),"", contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, sixthyear_monthrent+"", date,i+2+"/"+datelist.size(), "待结算");
				houseorderdao.add(houseorder);
			}
		}
	}
}
