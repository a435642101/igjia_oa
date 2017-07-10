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
import com.yhtech.hr.dao.IDistrictDao;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.District;
import com.yhtech.hr.domain.Staff;

/**
 * 获取所有分区
 * @author Administrator
 *
 */
@Controller("districtcontroller")
public class DistrictController {
	@Resource
	private IDistrictDao districtdao;
	@Resource
	private IStaffDao staffdao;
	
	
	/**
	 * 删除部门
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/deleteDeptGroup.do")
	@Authority(AuthorityType.HRAuthority)
	public void deleteDeptGroup(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try{
			String department = request.getParameter("department");		//部门id
			String district_id=URLDecoder.decode(request.getParameter("district_id"),"utf-8");	//分组id
			List<Staff> liststaff = staffdao.findByDD(department,district_id);
			if(liststaff.size()==0){
				int num = districtdao.deleteDeptGroup(department,district_id);
				if(num>0){
					jo.put("code", "1");
					jo.put("msg", "success");
				}else{
					jo.put("code", "3");
					jo.put("msg", "删除失败");
				}
			}else{
				jo.put("code", "4");
				jo.put("msg", "删除失败,该组下还有在职员工");
			}
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 修改部门分组
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/updateDeptGroup.do")
	@Authority(AuthorityType.HRAuthority)
	public void updateDeptGroup(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String department = request.getParameter("department");		//部门id
			String district = URLDecoder.decode(request.getParameter("district"),"utf-8");	//分组名字
			String district_id=URLDecoder.decode(request.getParameter("district_id"),"utf-8");	//分组id
			if(department.equals("YGJZL")){
				jo.put("code", "4");
				jo.put("msg", "业务部不可修改组名");
			}else{
				District districtdomain = new District("上海", "上海", department, district, district_id, UtilDate.getDateFormatter());
				int num = districtdao.updateGroup(districtdomain);
				if(num>0){
					jo.put("code", "1");
					jo.put("msg", "success");
				}else{
					jo.put("code", "3");
					jo.put("msg", "修改失败");
				}
			}	
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 新增部门下分组
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/addGroup.do")
	@Authority(AuthorityType.HRAuthority)
	public void addGroup(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String department = request.getParameter("department");
			String district = URLDecoder.decode(request.getParameter("district"),"utf-8");
			String district_id=null;
			if("YGJZL".equals(department)){
				district_id = district;			//如果是业务部 ，分区ID就是分区名字
			}else{
				district_id = FirstLetter.cn2py(district)+UtilDate.getThree(); //生成分组的编号
			}
			District districtdomain = new District("上海", "上海", department, district, district_id, UtilDate.getDateFormatter());
			int num = districtdao.add(districtdomain);
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
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 获得某部门下所有分组
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getGroupByDept.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getGroupByDept(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String department = request.getParameter("department");
			List<District> list = districtdao.listByDept(department);		
			JSONArray ja = JSONArray.fromObject(list);
			List<Staff> liststaff = staffdao.findByDD(department, "");
			JSONArray staffja = JSONArray.fromObject(liststaff);
			jo.put("code", "1");
			jo.put("group", ja.toString());
			jo.put("staff", staffja.toString());
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	
	/**
	 * 获得业务部所有分区
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getAllDistrict.do")
//	@Authority(AuthorityType.LoginAuthority)
	public void getDistrict(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		List<District> alldistrict = districtdao.listByDept("YGJZL");	//获得所有分区
		JSONArray adja = JSONArray.fromObject(alldistrict);
		out.print(adja.toString());		
	}
}
