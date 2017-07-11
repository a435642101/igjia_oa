package com.yhtech.finance.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yhtech.igjia.dao.IRentDao;
import com.yhtech.igjia.domain.Rent;
import com.yhtech.service.RedisService;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.peter.util.IdWorkerStandard;
import com.peter.util.UtilDate;
import com.yhtech.finance.dao.IRentorderDao;
import com.yhtech.finance.domain.Rentorder;

@Controller("createrordercontroller")
public class CreateRentOrder {
	@Resource
	private IRentorderDao rentorderdao;
	@Resource
	private IRentDao rentdao;
	@Resource
	private RedisService redisService;
	/**
	 * 订单获取出房信息
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("igjia/selectrentorder.do")
	@Authority(AuthorityType.LoginAuthority)
	public void igjiaSelectrentorder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String district=request.getParameter("district");
		if(district != null && district != ""){
			district = URLDecoder.decode(district,"UTF-8");
		}
		out.print(redisService.getDistrictRent(district));

	}

	@RequestMapping("/createRentOrder.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void COrder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String address=null;
		try {address = URLDecoder.decode(request.getParameter("address"),"UTF-8");} catch (Exception e) {}
		String renterName=null;	
		try {renterName = URLDecoder.decode(request.getParameter("renter_name"),"UTF-8");} catch (Exception e) {}
		String remark=null;	
		try {remark = URLDecoder.decode(request.getParameter("remark"),"UTF-8");} catch (Exception e) {}
		String paymethod=null;	
		try {paymethod = URLDecoder.decode(request.getParameter("paymethod"),"UTF-8");} catch (Exception e) {}
		String contractStartdate=request.getParameter("contract_startdate");
		String renterTelephone=request.getParameter("renterTelephone");
		String houseId=request.getParameter("houseId");
		String contractMonth=request.getParameter("contractMonth");
		String contract_no=request.getParameter("contract_no");
		Double deposit=0.0;
		Double firstyearMonthrent =0.0;
		Double secondyearMonthrent =0.0;
		Double thirdyearMonthrent =0.0;
		Double fourthyearMonthrent =0.0;
		Double fifthyearMonthrent =0.0;
		Double sixthyearMonthrent =0.0;
		try {deposit = Double.parseDouble(request.getParameter("deposit"));} catch (Exception e) {}
		try {firstyearMonthrent = Double.parseDouble(request.getParameter("firstyear_monthrent"));} catch (Exception e) {}
		try {secondyearMonthrent = Double.parseDouble(request.getParameter("secondyear_monthrent"));} catch (Exception e) {}
		try {thirdyearMonthrent = Double.parseDouble(request.getParameter("thirdyear_monthrent"));} catch (Exception e) {}
		try {fourthyearMonthrent = Double.parseDouble(request.getParameter("fourthyear_monthrent"));} catch (Exception e) {}
		try {fifthyearMonthrent = Double.parseDouble(request.getParameter("fifthyear_monthrent"));} catch (Exception e) {}
		try {sixthyearMonthrent = Double.parseDouble(request.getParameter("sixthyear_monthrent"));} catch (Exception e) {}

		Double firststageRent=0.0;		
		try {firststageRent = Double.parseDouble(request.getParameter("firststage_rent"));} catch (Exception e) {}
		
		String date= UtilDate.getDateFormatter();
		try {remark = URLDecoder.decode(request.getParameter("remark"),"UTF-8");} catch (Exception e) {}
		IdWorkerStandard idWorker = new IdWorkerStandard(0);			//生成付房租订单编号
    	contractStartdate = contractStartdate.replaceAll("/", "-");		//日期转格式
    	if("30".equals(paymethod)){		//月付租客	    		   		
    		buildOrder(contractStartdate,houseId,contract_no, address, renterName, renterTelephone,deposit,
					firstyearMonthrent+firststageRent, secondyearMonthrent+firststageRent,
					thirdyearMonthrent+firststageRent, fourthyearMonthrent+firststageRent,
					fifthyearMonthrent+firststageRent, remark, date, sixthyearMonthrent+firststageRent,
					idWorker, contractMonth,12);				//生成订单	    		
    	}else if("60".equals(paymethod)){
    		buildOrder(contractStartdate,houseId,contract_no, address, renterName, renterTelephone,deposit,
					firstyearMonthrent*2+firststageRent*2, secondyearMonthrent*2+firststageRent*2,
					thirdyearMonthrent*2+firststageRent*2, fourthyearMonthrent*2+firststageRent*2,
					fifthyearMonthrent*2+firststageRent*2, remark, date, sixthyearMonthrent*2+firststageRent*2,
					idWorker, contractMonth,6);				//生成订单	    		
    	}else if("90".equals(paymethod)){
    		buildOrder(contractStartdate,houseId,contract_no, address, renterName, renterTelephone,deposit,
					firstyearMonthrent*3+firststageRent*3, secondyearMonthrent*3+firststageRent*3,
					thirdyearMonthrent*3+firststageRent*3, fourthyearMonthrent*3+firststageRent*3,
					fifthyearMonthrent*3+firststageRent*3, remark, date, sixthyearMonthrent*3+firststageRent*3,
					idWorker, contractMonth,4);				//生成订单
    	}else if("180".equals(paymethod)){
    		buildOrder(contractStartdate,houseId,contract_no, address, renterName, renterTelephone,deposit,
					firstyearMonthrent*6+firststageRent*6, secondyearMonthrent*6+firststageRent*6,
					thirdyearMonthrent*6+firststageRent*6, fourthyearMonthrent*6+firststageRent*6,
					fifthyearMonthrent*6+firststageRent*6, remark, date, sixthyearMonthrent*6+firststageRent*6,
					idWorker, contractMonth,2);				//生成订单
    	}else if("365".equals(paymethod)){
    		buildOrder(contractStartdate,houseId,contract_no, address, renterName, renterTelephone,deposit,
					firstyearMonthrent*12+firststageRent*12, secondyearMonthrent*12+firststageRent*12,
					thirdyearMonthrent*12+firststageRent*12, fourthyearMonthrent*12+firststageRent*12,
					fifthyearMonthrent*12+firststageRent*12, remark, date, sixthyearMonthrent*12+firststageRent*12,
					idWorker, contractMonth,1);				//生成订单
    	}else{
    		Rentorder rentorder = new Rentorder(idWorker.nextId()+"",contractStartdate,houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent+deposit+firststageRent+"",date,paymethod+"月付",remark,"待付款");
    		rentorderdao.add(rentorder);
    	}	
    	out.print("生成订单成功");
	}
	
	/**
	 * 批量生成收租订单
	 * @param houseId 房源ID
	 * @param address	房源地址
	 * @param renterName	租客名字
	 * @param renterTelephone	租客电话
	 * @param firstyearMonthrent	首年每期租金
	 * @param secondyearMonthrent	次年每期租金
	 * @param thirdyearMonthrent	第三年每期租金
	 * @param fourthyearMonthrent	第四年每期租金
	 * @param fifthyearMonthrent	第五年每期租金
	 * @param remark				备注
	 * @param date		生成日期
	 * @param sixthyearMonthrent	第六年每期租金
	 * @param idWorker		订单编号
	 * @param datelist	每期付房租的日期列表
	 * @param yearperiod	一年分几期
	 */
	private void buildOrder(String contractStartdate,String houseId,String contract_no, String address, String renterName,
			String renterTelephone,Double deposit,Double firstyearMonthrent,
			Double secondyearMonthrent, Double thirdyearMonthrent,
			Double fourthyearMonthrent, Double fifthyearMonthrent, String remark,
			String date, Double sixthyearMonthrent, IdWorkerStandard idWorker,
			String contractMonth,int yearperiod) {
		List<String> datelist = UtilDate.getTimeList(contractStartdate,Integer.parseInt(contractMonth)/(12/yearperiod),12/yearperiod);
		Rentorder rentorder = new Rentorder(idWorker.nextId()+"",contractStartdate,houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent+deposit+"",date,"","第1/"+datelist.size()+"期,"+remark,"待付款");	//第一期房租,付一押一
		rentorderdao.add(rentorder);
		
		if(datelist.size()<=yearperiod){			//一年合同
			for(int i=1;i<datelist.size();i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			if(Integer.parseInt(contractMonth)%(12/yearperiod)!=0){		//最后剩出不规则月份
				String lastdate = datelist.get(datelist.size()-1);
				String[] lastarr = lastdate.split("-");
				Calendar calendar = Calendar.getInstance(Locale.CHINA);
				calendar.set(Integer.parseInt(lastarr[0]),Integer.parseInt(lastarr[1])+12/yearperiod-1, Integer.parseInt(lastarr[2]));
    			rentorder = new Rentorder(idWorker.nextId()+"",(new SimpleDateFormat("yyyy-MM-dd")).format(calendar.getTime()),houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent/(12/yearperiod)*(Integer.parseInt(contractMonth)-12/yearperiod*datelist.size())+"",date,"","最后一期,"+remark,"待付款");	//生成最后一笔不规则订单
    			rentorderdao.add(rentorder);
			}
		}else if(datelist.size()<=yearperiod*2){		//二年合同
			for(int i=1;i<yearperiod;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod;i<datelist.size();i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,secondyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			if(Integer.parseInt(contractMonth)%(12/yearperiod)!=0){		//最后剩出不规则月份
				String lastdate = datelist.get(datelist.size()-1);
				String[] lastarr = lastdate.split("-");
				Calendar calendar = Calendar.getInstance(Locale.CHINA);
				calendar.set(Integer.parseInt(lastarr[0]),Integer.parseInt(lastarr[1])+12/yearperiod-1, Integer.parseInt(lastarr[2]));
    			rentorder = new Rentorder(idWorker.nextId()+"",(new SimpleDateFormat("yyyy-MM-dd")).format(calendar.getTime()),houseId,contract_no,address,renterTelephone,renterName,secondyearMonthrent/(12/yearperiod)*(Integer.parseInt(contractMonth)-12/yearperiod*datelist.size())+"",date,"","最后一期,"+remark,"待付款");	//生成最后一笔不规则订单
    			rentorderdao.add(rentorder);
			}
		}else if(datelist.size()<=yearperiod*3){		//3年合同
			for(int i=1;i<yearperiod;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod;i<yearperiod*2;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,secondyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*2;i<datelist.size();i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,thirdyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			if(Integer.parseInt(contractMonth)%(12/yearperiod)!=0){		//最后剩出不规则月份
				String lastdate = datelist.get(datelist.size()-1);
				String[] lastarr = lastdate.split("-");
				Calendar calendar = Calendar.getInstance(Locale.CHINA);
				calendar.set(Integer.parseInt(lastarr[0]),Integer.parseInt(lastarr[1])+12/yearperiod-1, Integer.parseInt(lastarr[2]));
    			rentorder = new Rentorder(idWorker.nextId()+"",(new SimpleDateFormat("yyyy-MM-dd")).format(calendar.getTime()),houseId,contract_no,address,renterTelephone,renterName,thirdyearMonthrent/(12/yearperiod)*(Integer.parseInt(contractMonth)-12/yearperiod*datelist.size())+"",date,"","最后一期,"+remark,"待付款");	//生成最后一笔不规则订单
    			rentorderdao.add(rentorder);
			}
		}else if(datelist.size()<=yearperiod*4){		//4年合同
			for(int i=1;i<yearperiod;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod;i<yearperiod*2;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,secondyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*2;i<yearperiod*3;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,thirdyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*3;i<datelist.size();i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,fourthyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			if(Integer.parseInt(contractMonth)%(12/yearperiod)!=0){		//最后剩出不规则月份
				String lastdate = datelist.get(datelist.size()-1);
				String[] lastarr = lastdate.split("-");
				Calendar calendar = Calendar.getInstance(Locale.CHINA);
				calendar.set(Integer.parseInt(lastarr[0]),Integer.parseInt(lastarr[1])+12/yearperiod-1, Integer.parseInt(lastarr[2]));
    			rentorder = new Rentorder(idWorker.nextId()+"",(new SimpleDateFormat("yyyy-MM-dd")).format(calendar.getTime()),houseId,contract_no,address,renterTelephone,renterName,fourthyearMonthrent/(12/yearperiod)*(Integer.parseInt(contractMonth)-12/yearperiod*datelist.size())+"",date,"","最后一期,"+remark,"待付款");	//生成最后一笔不规则订单
    			rentorderdao.add(rentorder);
			}
		}else if(datelist.size()<=yearperiod*5){		//5年合同
			for(int i=1;i<yearperiod;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod;i<yearperiod*2;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,secondyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*2;i<yearperiod*3;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,thirdyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*3;i<yearperiod*4;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,fourthyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*4;i<datelist.size();i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,fifthyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			if(Integer.parseInt(contractMonth)%(12/yearperiod)!=0){		//最后剩出不规则月份
				String lastdate = datelist.get(datelist.size()-1);
				String[] lastarr = lastdate.split("-");
				Calendar calendar = Calendar.getInstance(Locale.CHINA);
				calendar.set(Integer.parseInt(lastarr[0]),Integer.parseInt(lastarr[1])+12/yearperiod-1, Integer.parseInt(lastarr[2]));
    			rentorder = new Rentorder(idWorker.nextId()+"",(new SimpleDateFormat("yyyy-MM-dd")).format(calendar.getTime()),houseId,contract_no,address,renterTelephone,renterName,fifthyearMonthrent/(12/yearperiod)*(Integer.parseInt(contractMonth)-12/yearperiod*datelist.size())+"",date,"","最后一期,"+remark,"待付款");	//生成最后一笔不规则订单
    			rentorderdao.add(rentorder);
			}
		}else{								//5年以上
			for(int i=1;i<yearperiod;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,firstyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod;i<yearperiod*2;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,secondyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*2;i<yearperiod*3;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,thirdyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*3;i<yearperiod*4;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,fourthyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*4;i<yearperiod*5;i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,fifthyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			for(int i=yearperiod*5;i<datelist.size();i++){
				rentorder = new Rentorder(idWorker.nextId()+"",datelist.get(i),houseId,contract_no,address,renterTelephone,renterName,sixthyearMonthrent+"",date,"","第"+(i+1)+"/"+datelist.size()+"期,"+remark,"待付款");
				rentorderdao.add(rentorder);
			}
			if(Integer.parseInt(contractMonth)%(12/yearperiod)!=0){		//最后剩出不规则月份
				String lastdate = datelist.get(datelist.size()-1);
				String[] lastarr = lastdate.split("-");
				Calendar calendar = Calendar.getInstance(Locale.CHINA);
				calendar.set(Integer.parseInt(lastarr[0]),Integer.parseInt(lastarr[1])+12/yearperiod-1, Integer.parseInt(lastarr[2]));
    			rentorder = new Rentorder(idWorker.nextId()+"",(new SimpleDateFormat("yyyy-MM-dd")).format(calendar.getTime()),houseId,contract_no,address,renterTelephone,renterName,sixthyearMonthrent/(12/yearperiod)*(Integer.parseInt(contractMonth)-12/yearperiod*datelist.size())+"",date,"","最后一期,"+remark,"待付款");	//生成最后一笔不规则订单
    			rentorderdao.add(rentorder);
			}
		}
	}
}
