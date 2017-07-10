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
import com.peter.util.IdWorkerStandard;
import com.peter.util.UtilDate;
import com.yhtech.finance.dao.IShareDao;
import com.yhtech.finance.domain.Share;

@Controller("sharecontroller")
public class ShareController {
	@Resource
	private IShareDao isharedao;
	
	
	/**
	 * 获取水电煤列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/finance/shareListPc.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void shareListPc(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String state = request.getParameter("state");
		String renter_name = request.getParameter("renter_name");
		String period1 = request.getParameter("period1");
		String period2 = request.getParameter("period2");
		if(state!=null && state!=""){
			state = URLDecoder.decode(state,"utf-8");
		}
		if(renter_name!=null && renter_name!=""){
			renter_name = URLDecoder.decode(renter_name,"utf-8");
		}
		if(period1!=null && period1!=""){
			period1 = URLDecoder.decode(period1,"utf-8");
		}
		if(period2!=null && period2!=""){
			period2 = URLDecoder.decode(period2,"utf-8");
		}
		int page = 0;
		int num = 0;
		JSONObject obj = new JSONObject();
		try {
			page = Integer.parseInt(request.getParameter("page"));
			num = Integer.parseInt(request.getParameter("num"));
			List<Share> list = isharedao.allPc(period1, period2, renter_name, state, (page-1)*num, num);
			int total = isharedao.totalPc(period1, period2, renter_name, state, (page-1)*num, num);
			JSONArray arr = JSONArray.fromObject(list);
			obj.put("code", "1");
			obj.put("msg", arr);
			obj.put("total", total);
		} catch (Exception e) {
			e.printStackTrace();
			obj.put("code", "2");
			obj.put("msg", "参数错误");
		}
		out.print(obj);
	}
	
	/**
	 * 水电煤录入
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/finance/addSharePc.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void addSharePc(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String address;
		String renter_name;
		String renter_telephone;
		String elec_money;
		String water_money;
		String gas_money;
		String total_money;
		String period;
		String remark;
		IdWorkerStandard orderid = new IdWorkerStandard(0);			//生成水电煤订单
		JSONObject obj = new JSONObject();
		String date = UtilDate.getDateFormatter();
		try {
			address = URLDecoder.decode(request.getParameter("address"),"utf-8");
			renter_name = URLDecoder.decode(request.getParameter("renter_name"),"utf-8");
			renter_telephone = URLDecoder.decode(request.getParameter("renter_telephone"),"utf-8");
			elec_money = URLDecoder.decode(request.getParameter("elec_money"),"utf-8");
			water_money = URLDecoder.decode(request.getParameter("water_money"),"utf-8");
			gas_money = URLDecoder.decode(request.getParameter("gas_money"),"utf-8");
			total_money = URLDecoder.decode(request.getParameter("total_money"),"utf-8");
			period = URLDecoder.decode(request.getParameter("period"),"utf-8");
			remark = URLDecoder.decode(request.getParameter("remark"),"utf-8");
			Share share = new Share(orderid.nextId()+"", address, renter_name, renter_telephone, elec_money, water_money, gas_money, total_money, period, remark, "待付款", date);
			int res = isharedao.addPc(share);
			if(res==0){
				obj.put("code", "3");
				obj.put("msg", "添加失败");
			}else{
				obj.put("code", "1");
				obj.put("msg", "添加成功");
			}
		} catch (Exception e) {
			obj.put("code", "2");
			obj.put("msg", "参数错误");
		}
		out.print(obj);
	}
	
	/**
	 * 水电煤修改
	 */
	@RequestMapping("/finance/updateSharePc.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void updateSharePc(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String state;
		JSONObject obj = new JSONObject();
		String date = UtilDate.getDate();
		try {
			String orderid = request.getParameter("orderid");
			String elec_money = request.getParameter("elec_money");
			String water_money = request.getParameter("water_money");
			String gas_money = request.getParameter("gas_money");
			String total_money = request.getParameter("total_money");
			state = URLDecoder.decode(request.getParameter("state"),"utf-8");
			Share share = new Share(orderid, "", "", "", elec_money, water_money, gas_money, total_money, "", "", state, date);
			int res = isharedao.updatePc(share);
			if(res==0){
				obj.put("code", "3");
				obj.put("msg", "修改失败");
			}else{
				obj.put("code", "1");
				obj.put("msg", "修改成功");
			}
		} catch (Exception e) {
			e.printStackTrace();
			obj.put("code", "2");
			obj.put("msg", "参数错误");
		}
		out.print(obj);
		
	}
	
	/**
	 * 获取单个信息
	 */
	@RequestMapping("/finance/searchSharePc.do")
	@Authority(AuthorityType.FinanceAuthority)
	public void searchSharePc(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String orderid;
		JSONObject obj = new JSONObject();
		try {
			orderid = URLDecoder.decode(request.getParameter("orderid"),"utf-8");
			Share share = isharedao.findByOrderidPc(orderid);
			JSONObject objshare = JSONObject.fromObject(share);
			obj.put("code", "1");
			obj.put("msg", objshare);
		} catch (Exception e) {
			obj.put("code", "2");
			obj.put("msg", "参数错误");
		}
		out.print(obj);
	}
}
