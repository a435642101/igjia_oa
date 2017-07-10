package com.yhtech.finance.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


import com.authority.Authority;
import com.authority.AuthorityType;
import com.peter.util.UtilDate;
import com.yhtech.finance.dao.IApplyyearpayDao;
import com.yhtech.finance.dao.IRentorderDao;
import com.yhtech.finance.domain.Applyyearpay;
import com.yhtech.finance.domain.Rentorder;

@Controller("rentercontroller")
public class RenterController {
	@Resource
	private IApplyyearpayDao iapplyyearpaydao;
	@Resource
	private IRentorderDao irentorderdao;
	/**
	 * 获取租客列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/finance/getRentOrder.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void gettodayrent(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String date1 = request.getParameter("date1");
		String date2 = request.getParameter("date2");
		String state =null;
		String name =null;
		try {state = URLDecoder.decode(request.getParameter("state"),"utf-8");} catch (Exception e) {}
		try {name = URLDecoder.decode(request.getParameter("name"),"utf-8");} catch (Exception e) {}
		if(date1.isEmpty()) date1="1999/1/1";		//开始日期为空默认最早
		if(date2.isEmpty()) date2="2099/12/31";		//结束日期为空默认最早
		List<Rentorder> listorder = irentorderdao.listBydate(date1, date2,state,name);
		JSONArray ja = JSONArray.fromObject(listorder);
		out.print(ja.toString());
	}
	
	/**
	 * 获取单个租客
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/finance/getOneorder.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void getrenter(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String orderid = request.getParameter("orderid");
		Rentorder rentorder = irentorderdao.findByOrderid(orderid);
			JSONObject obj = JSONObject.fromObject(rentorder);
			out.print(obj.toString());
	}
	
	
	/**
	 * login
	 */
	@RequestMapping("/logs.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void logs(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
			String path = request.getParameter("path");
			
			
			if(path=="" || path==null){
				path="D:\\igjiaLogs\\yhTech\\MsgLogs";
			}else{
				path="D:\\igjiaLogs\\yhTech\\MsgLogs\\"+path;
			}
			
			
			File dir=new File(path);
			String[] fileNames=dir.list();
			
			List<String> list=new ArrayList<String>();
			for(int i=0;i<fileNames.length;i++)
			{
				list.add(fileNames[i]);
			}
			
			JSONArray obj = JSONArray.fromObject(list);
			String lists = obj.toString();
			out.print(lists);		
	}
	
	
	/**
	 * 修改租客订单信息
	 */
	@RequestMapping("/finance/updaterentOrder.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void updatehouse(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String orderid = request.getParameter("orderid");
		String period = request.getParameter("period");
		String telephone = request.getParameter("telephone");
		String money = request.getParameter("money");
		String contract_no = request.getParameter("contract_no");
		String address = null;
		String name = null;
		String mode = null;
		String remark = null;
		String state = null;
		try {address = URLDecoder.decode(request.getParameter("address"),"utf-8");} catch (Exception e) {}		
		try {name = URLDecoder.decode(request.getParameter("name"),"utf-8");} catch (Exception e) {}		
		try {mode = URLDecoder.decode(request.getParameter("mode"),"utf-8");} catch (Exception e) {}
		try {remark = URLDecoder.decode(request.getParameter("remark"),"utf-8");} catch (Exception e) {}
		try {state = URLDecoder.decode(request.getParameter("state"),"utf-8");} catch (Exception e) {}
		String date = UtilDate.getDateFormatter();
			Rentorder order = new Rentorder(orderid, period, "",contract_no, address, telephone, name, money, date, mode, remark, state);
			int res = irentorderdao.update(order);			
			if(res>=1){
				out.print("success");
			}else{
				out.print("error");
			}		
	}
	
	/**
	 * 获取所有申请年付订单的记录
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/finance/applyyearpay.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void applyyearpay(HttpServletRequest request,HttpServletResponse response) throws IOException{		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();		
			String page = request.getParameter("page");
			String num = request.getParameter("num");
			String name = URLDecoder.decode(request.getParameter("name"),"UTF-8");
			List<Applyyearpay> l = iapplyyearpaydao.findByName(name);
			
			int begin = (Integer.parseInt(page)-1)*Integer.parseInt(num);
			int end = (Integer.parseInt(page)-1)*Integer.parseInt(num)+Integer.parseInt(num);
			if(begin>l.size()){ 
				out.print("error");
			}else if(end>l.size()){
				l = l.subList(begin,l.size());
			}else{
				l = l.subList(begin,end);
			}			
			JSONArray obj = JSONArray.fromObject(l);
			String list = obj.toString();
			out.print(list);		
	}
	
	/**
	 * 修改年付申请状态
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/updateyearpay.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void updateyearpay(HttpServletRequest request,HttpServletResponse response) throws IOException{		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();					
		try{
			String id = request.getParameter("id");
			String state = URLDecoder.decode(request.getParameter("state"),"UTF-8");
			int num = iapplyyearpaydao.updatestate(id,state);
			if(num>0){
				out.print("success");
			}else{
				out.print("error");
			}
		}catch (Exception e) {
			out.print("error");
		}		
	}
}
