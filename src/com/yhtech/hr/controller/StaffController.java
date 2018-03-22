package com.yhtech.hr.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yhtech.igjia.dao.IHouseDao;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.peter.util.Http;
import com.peter.util.MD5;
import com.peter.util.UtilDate;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.controller.IgjiaHouseController;
import com.yhtech.igjia.domain.House;

@Controller("staffcontroller")
public class StaffController {
	@Resource
	private IStaffDao staffdao;
	@Resource
	private IHouseDao housedao;
	
	/**
	 * 获得某部门某组下所有员工
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/SearchStaff.do")
	@Authority(AuthorityType.LoginAuthority)
	public void SearchStaff(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String name=URLDecoder.decode(request.getParameter("name"),"utf-8");	//分组id
			Staff staff = staffdao.findNoByName(name);	
			if(staff==null){
				jo.put("code", "3");
				jo.put("msg", "无");
			}else{
				jo.put("code", "1");
				jo.put("msg", staff.getJob_no());
			}
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 获得某部门某组下所有员工
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getStaffByDD.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getStaffByDD(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String department = request.getParameter("department");
			String district_id=URLDecoder.decode(request.getParameter("district_id"),"utf-8");	//分组id
			List<Staff> list = staffdao.findByDD(department, district_id);	
			JSONArray ja = JSONArray.fromObject(list);			
			jo.put("code", "1");
			jo.put("msg", ja.toString());
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 获得员工的公开信息
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getStaff.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getStaff(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String job_no = request.getParameter("job_no");
			Staff staff = staffdao.findByNo(job_no);
			JSONObject staffjo = JSONObject.fromObject(staff);
			jo.put("code", "1");
			jo.put("msg", staffjo.toString());
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 获得员工的全部信息
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getStaffinfo.do")
	@Authority(AuthorityType.HRAuthority)
	public void getStaffInfo(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		Staff admin = (Staff) request.getSession().getAttribute("admin");
		try {
			String job_no = request.getParameter("job_no");
			Staff staff = staffdao.findByjobno(job_no);
			JSONObject staffjo = JSONObject.fromObject(staff);
			jo.put("code", "1");
			jo.put("msg", staffjo.toString());
			out.print(jo.toString());
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数错误");
			out.print(jo.toString());
		}				
	}
	
	/**
	 * 新增员工
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/addStaff.do")
	@Authority(AuthorityType.HRAuthority)
	public void addStaff(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
	    String department = request.getParameter("department");
		String prfunds = request.getParameter("prfunds");
		String telephone = request.getParameter("telephone");
		String social_security = request.getParameter("social_security");
		String idcard = request.getParameter("idcard");
		String emergency_contacttelephone = request.getParameter("emergency_contacttelephone");
		String email = request.getParameter("email");
		String vxin = request.getParameter("vxin");
		String name =null;
		try {name = URLDecoder.decode(request.getParameter("name"),"utf-8");} catch (Exception e) {}
		String position = null;
		try {position = URLDecoder.decode(request.getParameter("position"),"utf-8");} catch (Exception e) {}
		String district =null;
		try {district = URLDecoder.decode(request.getParameter("district"),"utf-8");} catch (Exception e) {}
		String origo = null;
		try {origo = URLDecoder.decode(request.getParameter("origo"),"utf-8");} catch (Exception e) {}
		String address=null;
		try {address = URLDecoder.decode(request.getParameter("address"),"utf-8");} catch (Exception e) {}
		String emergency_contactname=null;
		try {emergency_contactname = URLDecoder.decode(request.getParameter("emergency_contactname"),"utf-8");} catch (Exception e) {}
		
		Staff staff1 = staffdao.findNoByName(name);
		if(staff1==null){
			int total = staffdao.total();	
			String job_no = "300"+total;
			String date = UtilDate.getDateFormatter();
			String password = Math.random()*900000+100000+"";
			password = password.substring(0, password.indexOf("."));
			String pwd = MD5.sign(password+"", "utf-8");
			Staff staff = new Staff(job_no, pwd, department, name, position,"3", district, origo, address, idcard, prfunds, telephone, social_security, emergency_contactname, emergency_contacttelephone, date, date, "正常", email, vxin);
			int num = staffdao.add(staff);
			if(num>0){
				jo.put("code", "1");
				jo.put("job_no",job_no);
				jo.put("pwd",password);
			}else{
				jo.put("code", "2");
				jo.put("msg","添加失败");
			}
		}else{
			jo.put("code", "3");
			jo.put("msg","名字存在");
		}	
		out.print(jo.toString());		
	}
	
	/**
	 * 修改员工
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/updateStaff.do")
	@Authority(AuthorityType.HRAuthority)
	public void updateStaff(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		String job_no = request.getParameter("job_no");		
	    String department = request.getParameter("department");
		String prfunds = request.getParameter("prfunds");
		String telephone = request.getParameter("telephone");
		String social_security = request.getParameter("social_security");
		String idcard = request.getParameter("idcard");
		String emergency_contacttelephone = request.getParameter("emergency_contacttelephone");
		String email = request.getParameter("email");
		String vxin = request.getParameter("vxin");
		String name =null;
		try {name = URLDecoder.decode(request.getParameter("name"),"utf-8");} catch (Exception e) {}
		String position = null;
		try {position = URLDecoder.decode(request.getParameter("position"),"utf-8");} catch (Exception e) {}
		String district =null;
		try {district = URLDecoder.decode(request.getParameter("district"),"utf-8");} catch (Exception e) {}
		String origo = null;
		try {origo = URLDecoder.decode(request.getParameter("origo"),"utf-8");} catch (Exception e) {}
		String address=null;
		try {address = URLDecoder.decode(request.getParameter("address"),"utf-8");} catch (Exception e) {}
		String emergency_contactname=null;
		try {emergency_contactname = URLDecoder.decode(request.getParameter("emergency_contactname"),"utf-8");} catch (Exception e) {}
		String state=null;
		try {state = URLDecoder.decode(request.getParameter("state"),"utf-8");} catch (Exception e) {}
		String pwd = request.getParameter("pwd");
		if(pwd!=null && !pwd.isEmpty()){
			pwd=MD5.sign(pwd, "utf-8");
		}
		
		if("YGJZL".equals(department)){		//判断是不是业务部门的员工
			Staff staff = staffdao.findByjobno(job_no);
			if(!department.equals(staff.getDepartment()) || !district.equals(staff.getDistrict()) || !state.equals(staff.getState())){	//判断这三个条件是否改变,如果改变需要验证该员工名下是否有房源
				House house = new House();
				house.setJob_no(job_no);
				List<House> list = housedao.listSearch(house);
				if(list.size() > 0){
					jo.put("code", "3");
					jo.put("msg","该管家名下还有房源");
					out.print(jo.toString());				//返回给前端数据 ，停止执行后续操作
					return;
				}
//				JSONArray ja = JSONArray.fromObject(lise);
//				for(int i=0;i<ja.size();i++){
//					String rjobno = ja.getJSONObject(i).getString("job_no");
//					if(job_no.equals(rjobno)){
//						jo.put("code", "3");
//						jo.put("msg","该管家名下还有房源");
//						out.print(jo.toString());				//返回给前端数据 ，停止执行后续操作
//						return;
//					}
//				}
			}	
		}
		Staff staff = new Staff(job_no, pwd, department, name, position,"3", district, origo, address, idcard, prfunds, telephone, social_security, emergency_contactname, emergency_contacttelephone, "", "",state, email, vxin);
		int num = staffdao.update(staff);
		if(num>0){
			jo.put("code", "1");
			jo.put("msg","success");
		}else{
			jo.put("code", "2");
			jo.put("msg","修改失败");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 获得员工名下房源
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getStaffHouse.do")
	@Authority(AuthorityType.HRAuthority)
	public void getStaffHouse(HttpServletRequest request, HttpServletResponse response) throws IOException{
			response.setContentType("text/html;charset=utf-8");
			PrintWriter out = response.getWriter();
			JSONObject jo = new JSONObject();
			String job_no = request.getParameter("job_no");
			Staff astaff =staffdao.findByNo(job_no);
			if(astaff.getDepartment().equals("YGJZL")){		//判断是不是业务部的
				JSONArray housearray = new JSONArray();
//				String result=null;
//				Http hp = Http.getInstance();			//获取所有房源
//				Map<String,String> m = new LinkedHashMap<String, String>();
//				ValueOperations<String,String> operation = redisTemplate.opsForValue();
//				if(operation.get("houselist")==null){
//					try {
//						result = hp.hp(HURL,m, "get");
//						operation.set("houselist", result);
//					} catch (Exception e) {
//						// TODO Auto-generated catch block
//						e.printStackTrace();
//						out.print("error");
//					}
//				}else{
//					result = operation.get("houselist");
//				}
				House house = new House();
				house.setJob_no(job_no);
				List<House> list = housedao.listSearch(house);
				if(list.size() == 0){
					jo.put("code", "2");
					jo.put("msg","没有房源");
				}else{
					jo.put("code", "1");
					jo.put("msg",housearray.toString());
				}
//				JSONArray ja = JSONArray.fromObject(list);
//				for(int i=0;i<ja.size();i++){
//					String rjobno = ja.getJSONObject(i).getString("job_no");
//					if(job_no.equals(rjobno)){
//						housearray.add(ja.get(i));
//					}
//				}
//				if(housearray.size()==0){
//					jo.put("code", "2");
//					jo.put("msg","没有房源");
//				}else{
//					jo.put("code", "1");
//					jo.put("msg",housearray.toString());
//				}
			}else{
				jo.put("code", "3");
				jo.put("msg", "不是业务部的");
			}
		
		
		out.print(jo.toString());		
	}

	/**
	 * 批量转译房源
	 */
	@RequestMapping("/transferHouse.do")
	@Authority(AuthorityType.HRAuthority)
	public void transferHouse(HttpServletRequest request, HttpServletResponse response)throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String job_no = request.getParameter("job_no");
		String house_id = request.getParameter("house_id");
		Staff staff =staffdao.findByNo(job_no);
		JSONObject jo =  new JSONObject();
		List<String> list = new ArrayList<String>();
		if(staff!=null){
			Map<String,String> m = new LinkedHashMap<String, String>();
			House house = new House();
			house.setJob_no(job_no);
			Http hp = Http.getInstance();
			String[] one_houseid = house_id.split(",");

			for(int i=0;i<one_houseid.length;i++){			//开始批量修改
				house.setHouse_id(one_houseid[i]);
				String result = "error";

				try {
					int res = housedao.update(house);
					if(res == 1) result = "success";
					if(!result.equals("success")){
						list.add(one_houseid[i]); 			//失败的加入集合里
					}
				} catch (Exception e) {
					list.add(one_houseid[i]); 			//失败的加入集合里
				}
//				jo = JSONObject.fromObject(house);
//				m.put("house", URLEncoder.encode(jo.toString(),"UTF-8"));
//				try {
//					 result = hp.hp(HURL, m, "put");
//					 if(!result.equals("success")){
//						 list.add(one_houseid[i]); 			//失败的加入集合里
//					 }
//				} catch (Exception e) {
//					list.add(one_houseid[i]);
//				}
			}
			if(list.size()==0){				
				jo.put("code", "1");
				jo.put("msg","success");
			}else{
				jo.put("code", "3");
				jo.put("msg",JSONObject.fromObject(list));
			}
		}else{
			jo.put("code", "2");
			jo.put("msg","工号错误");
		}
		out.print(jo.toString());
	}
}
