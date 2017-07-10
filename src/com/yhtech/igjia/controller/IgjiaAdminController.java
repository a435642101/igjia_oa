package com.yhtech.igjia.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
@Controller("IgjiaAdminController")
public class IgjiaAdminController {
	@Resource
	private IStaffDao admindao;
	
	/**
	 * 获得壹管家业务部员工
	 * @param request
	 * @param response
	 */
	@RequestMapping("igjia/adminContact.do")
	public void adminContact(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		List<Staff> list = admindao.findByDepartment("YGJZL");
		JSONArray arr = JSONArray.fromObject(list);		
		out.print(arr.toString());
	}
	
	
}
