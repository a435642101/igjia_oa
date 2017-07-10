package com.yhtech.finance.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
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
import com.yhtech.finance.dao.IHouseorderDao;
import com.yhtech.finance.domain.Houseorder;

@Controller("houseordercontroller")
public class HouseController {
	@Resource
	private IHouseorderDao houseorderdao;
	
	
	/**
	 * 获取付房租列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/finance/getHouseOrder.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void getrenthouseorder(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String date1 = request.getParameter("date1");
		String date2 = request.getParameter("date2");
		String state =null;
		String name =null;
		try {state = URLDecoder.decode(request.getParameter("state"),"utf-8");} catch (Exception e) {}
		try {name = URLDecoder.decode(request.getParameter("name"),"utf-8");} catch (Exception e) {}

		List<Houseorder> listorder = houseorderdao.listBydate(date1, date2,state,name);
		JSONArray ja = JSONArray.fromObject(listorder);
		out.print(ja.toString());
	}
	
	/**
	 * 获取单个付房租订单
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/finance/getOneHouseorder.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void gethouser(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String orderid = request.getParameter("orderid");
		Houseorder houseorder = houseorderdao.findByOrderid(orderid);
			JSONObject obj = JSONObject.fromObject(houseorder);
			out.print(obj.toString());
	}
	
	/**
	 * 修改房东预付款订单信息
	 */
	@RequestMapping("/finance/updatehouseOrder.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void updatehouse(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String orderid = request.getParameter("orderid");
		String period = request.getParameter("period");
		String shoukuanren_telephone = request.getParameter("shoukuanren_telephone");
		String money = request.getParameter("money");
		String house_id = request.getParameter("house_id");
		String contract_no = request.getParameter("contract_no");
		String shoukuanren_account = request.getParameter("shoukuanren_account");
		String address = null;
		String shoukuanren_name = null;
		String remark = null;
		String state = null;
		String shoukuanren_kaihuhang = null;
		try {address = URLDecoder.decode(request.getParameter("address"),"utf-8");} catch (Exception e) {}		
		try {shoukuanren_name = URLDecoder.decode(request.getParameter("shoukuanren_name"),"utf-8");} catch (Exception e) {}	
		try {shoukuanren_kaihuhang = URLDecoder.decode(request.getParameter("shoukuanren_kaihuhang"),"utf-8");} catch (Exception e) {}
		try {remark = URLDecoder.decode(request.getParameter("remark"),"utf-8");} catch (Exception e) {}
		try {state = URLDecoder.decode(request.getParameter("state"),"utf-8");} catch (Exception e) {}
		String date = UtilDate.getDateFormatter();
			Houseorder house = new Houseorder(orderid, period, house_id, contract_no, address, shoukuanren_name, shoukuanren_telephone, shoukuanren_kaihuhang, shoukuanren_account, money, date, remark, state);
			int res = houseorderdao.update(house);			
			if(res>=1){
				out.print("success");
			}else{
				out.print("error");
			}		
	}
}
