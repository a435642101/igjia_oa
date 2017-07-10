package com.yhtech.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.peter.util.Log;
import com.peter.util.MD5;
import com.peter.util.UtilDate;
import com.yhtech.hr.domain.Staff;
import com.yhtech.hr.dao.IStaffDao;

@Controller("logincontroller")
public class LoginController {
	@Resource
	private IStaffDao staffdao;
	/**
	 * 登录
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/login.do")
	public void login(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String ip = request.getHeader("x-forwarded-for"); 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("Proxy-Client-IP"); 
			} 
			if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("WL-Proxy-Client-IP"); 
			} 
			if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getRemoteAddr(); 
			}		
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Staff admin = staffdao.findByjobno(username);
		if(admin!=null){
			String pwd = admin.getPwd();
			String password1 = MD5.sign(password, "utf-8");
			if(password1.equals(pwd)){
				String state = admin.getState();
				if("正常".equals(state)){
					Staff staff = new Staff();
					staff.setJob_no(username);
					staff.setDistrict(admin.getDistrict());			//分区修改无IF判断
					staff.setLogin_date(UtilDate.getDateFormatter());
					staffdao.update(staff);			//更新登录时间
					log(";"+username+"登录成功",ip);					
					HttpSession session = request.getSession();
					session.setAttribute("admin", admin);
					session.setMaxInactiveInterval(60*60*6);
					out.print("success");
				}else{
					log(";"+username+"账号冻结;状态:"+state,ip);
					out.print("账号冻结!");
				}
			}else{
				log(";"+username+"密码错误"+password,ip);
				out.print("密码错误");
			}
		}else{
			log(";"+username+"用户不存在",ip);
			out.print("用户不存在");	
		}
	}
	
	private void log(String content,String ip){
		Log.logResult(UtilDate.getDateFormatter()+content+"。来源IP:"+ip+"\r\n", "d:\\igjiaLogs\\yhTech\\LoginLogs");
	}

	/**
	 * 返回登录的对象
	 * @param request
	 * @param response
	 */
	@RequestMapping("/admin.do")
	@Authority(AuthorityType.LoginAuthority)
	public void admin(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		Staff admin = (Staff) request.getSession().getAttribute("admin");
		JSONObject jo = JSONObject.fromObject(admin);
		out.print(jo.toString());
	}
	/**
	 * 退出
	 * @param request
	 * @param response
	 */
	@RequestMapping("/destroy.do")
	@Authority(AuthorityType.LoginAuthority)
	public void destroy(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession s = request.getSession();
		s.removeAttribute("admin");
		out.print("success");
	}
}
