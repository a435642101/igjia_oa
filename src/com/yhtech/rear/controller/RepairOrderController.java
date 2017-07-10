package com.yhtech.rear.controller;

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
import com.yhtech.rear.dao.IRepairDao;
import com.yhtech.rear.domain.Repair;

@Controller("repairordercontroller")
public class RepairOrderController {
	@Resource
	private IRepairDao repairdao;
	
	/**
	 * 获得所有维修单子
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getAllRepair.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getproperty(HttpServletResponse response,HttpServletRequest request) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String page = request.getParameter("page");
		String num = request.getParameter("num");
		JSONObject jo = new JSONObject();
		if(page==null || num==null ||page.isEmpty()||num.isEmpty()){
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}else{
			List<Repair> list = repairdao.listRepair((Integer.parseInt(page)-1)*Integer.parseInt(num), Integer.parseInt(num));
			int total = repairdao.total("","");
			JSONArray ja = JSONArray.fromObject(list);
			jo.put("code", "1");
			jo.put("msg", ja.toString());
			jo.put("total", total+"");
		}
		out.print(jo.toString());
	}
	
	/**
	 * 搜索
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/searchRepair.do")
	@Authority(AuthorityType.LoginAuthority)
	public void searchRepair(HttpServletResponse response,HttpServletRequest request) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String page = request.getParameter("page");
			String num = request.getParameter("num");
			String renter =null;
			try {
				renter = URLDecoder.decode(request.getParameter("renter"),"UTF-8");
			} catch (Exception e) {}
			String state = URLDecoder.decode(request.getParameter("state"),"UTF-8");
			List<Repair> list = repairdao.search(renter,state,(Integer.parseInt(page)-1)*Integer.parseInt(num),Integer.parseInt(num));
			JSONArray ja = JSONArray.fromObject(list);
			int total = repairdao.total(renter,state);
			jo.put("code", "1");
			jo.put("msg", ja.toString());
			jo.put("total",total+"");
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());
	}
	
	/**
	 * 修改维修状态
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/updaterepair.do")
	@Authority(AuthorityType.LoginAuthority)
	public void updateyearpay(HttpServletRequest request,HttpServletResponse response) throws IOException{		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();					
		try{
			String repair_id = request.getParameter("repair_id");
			String state = URLDecoder.decode(request.getParameter("state"),"UTF-8");
			int num = repairdao.updatestate(repair_id,state);
			if(num>0){
				out.print("success");
			}else{
				out.print("error");
			}
		}catch (Exception e) {
			out.print("error");
		}		
	}
	/**
	 * 添加维修备注
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/changeremark.do")
	@Authority(AuthorityType.LoginAuthority)
	public void changeremark(HttpServletRequest request,HttpServletResponse response) throws IOException{		
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();					
		try{
			String repair_id = request.getParameter("repair_id");
			String remark = URLDecoder.decode(request.getParameter("remark"),"UTF-8");
			int num = repairdao.updateremark(repair_id,remark);
			if(num>0){
				out.print("success");
			}else{
				out.print("error");
			}
		}catch (Exception e) {
			out.print("error");
		}		
	}
	
	
	/**
	 * 添加维修项目
	 * @throws IOException 
	 */
	@RequestMapping(value="/addRepair.do")
	@Authority(AuthorityType.LoginAuthority)
	public void addRepair(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();				
			try {
				String rentername =URLDecoder.decode(request.getParameter("renter"),"utf-8");
				String telephone=request.getParameter("telephone");
				String yuyue_date=request.getParameter("yuyue_date");
				String address=URLDecoder.decode(request.getParameter("address"),"utf-8");
				String describe=URLDecoder.decode(request.getParameter("describe"),"utf-8");
				String remark=URLDecoder.decode(request.getParameter("remark"),"utf-8");
				IdWorkerStandard id = new IdWorkerStandard(0);
				Long repair_id=id.nextId();
				String date = UtilDate.getDateFormatter();
				Repair repair = new Repair(repair_id+"", rentername, telephone, yuyue_date, address, describe, "images/bg01.png","处理中",date,"线下保修",remark);
				int num = repairdao.add(repair);
				if(num>0){
					jo.put("code", "1");
					jo.put("msg", "success");
				}else{
					jo.put("code", "3");
					jo.put("msg", "添加失败");
				}
			} catch (Exception e) {
				e.printStackTrace();
				jo.put("code", "2");
				jo.put("msg", "参数异常");
			}
		out.print(jo.toString());
	}
}
