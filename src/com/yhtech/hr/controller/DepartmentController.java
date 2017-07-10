package com.yhtech.hr.controller;

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
import com.peter.util.FirstLetter;
import com.peter.util.UtilDate;
import com.yhtech.hr.dao.IDeptDao;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Dept;
import com.yhtech.hr.domain.Staff;

@Controller("departmentcontroller")
public class DepartmentController {
	@Resource
	private IDeptDao deptdao;
	@Resource
	private IStaffDao staffdao;
	/**
	 * 获得所有部门
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getAllDept.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getAllDept(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		List<Dept> allDept = deptdao.listDept();	//获得所有部门
		JSONArray adja = JSONArray.fromObject(allDept);
		out.print(adja.toString());		
	}
	
	/**
	 * 新增部门
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/addDept.do")
	@Authority(AuthorityType.HRAuthority)
	public void addDept(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String name = URLDecoder.decode(request.getParameter("name"),"utf-8");
			String department = FirstLetter.cn2py(name)+UtilDate.getThree(); //生成部门的编号
			Dept dept = new Dept(department, name, UtilDate.getDateFormatter());
			int num = deptdao.add(dept);
			if(num>0){
				jo.put("code", "1");
				jo.put("msg", "success");
			}else{
				jo.put("code", "3");
				jo.put("msg", "添加失败");
			}
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 修改部门
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/updateDept.do")
	@Authority(AuthorityType.HRAuthority)
	public void updateDept(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String name = URLDecoder.decode(request.getParameter("name"),"utf-8");
			String department = request.getParameter("department");
			Dept dept = new Dept(department, name, UtilDate.getDateFormatter());
			int num = deptdao.updateDept(dept);
			if(num>0){
				jo.put("code", "1");
				jo.put("msg", "success");
			}else{
				jo.put("code", "3");
				jo.put("msg", "修改失败");
			}
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 删除部门
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/deleteDept.do")
	@Authority(AuthorityType.HRAuthority)
	public void deleteDept(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String department = request.getParameter("department");
			List<Staff> liststaff = staffdao.findByDepartment(department);
			if(liststaff.size()==0){
				int num = deptdao.deleteDept(department);
				if(num>0){
					jo.put("code", "1");
					jo.put("msg", "success");
				}else{
					jo.put("code", "3");
					jo.put("msg", "删除失败");
				}
			}else{
				jo.put("code", "4");
				jo.put("msg", "删除失败,该部门下还有在职员工");
			}
			
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
}
