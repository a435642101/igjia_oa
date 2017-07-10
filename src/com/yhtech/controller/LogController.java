package com.yhtech.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.peter.util.UtilDate;
import com.yhtech.domain.Log;
import com.yhtech.yhtech.dao.ILogDao;

@Controller("logcontroller")
public class LogController {
	@Resource
	private ILogDao logdao;
	
	@RequestMapping("/getLogs.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getLogs(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();	
		String house_id = request.getParameter("house_id");
		String contract_no = request.getParameter("contract_no");
		String type = URLDecoder.decode(request.getParameter("type"),"utf-8");
		Log log = new Log();
		log.setContract_no(contract_no);
		log.setHouse_id(house_id);
		log.setType(type);
		List<Log> listlog = logdao.listSearch(log);
		JSONArray ja = JSONArray.fromObject(listlog);
		out.print(ja.toString());
	}
	
	@RequestMapping("/logs/getAllLogs.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getAllLogs(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();	
		String date1 = request.getParameter("date1");
		String date2 = request.getParameter("date2");
		if(date1.isEmpty() && date2.isEmpty()){
			date1 = getStatetime();
			date2 = UtilDate.getDateFormatter();
		}
		List<Log> listlog = logdao.listBydate(date1, date2);
		JSONArray ja = JSONArray.fromObject(listlog);
		out.print(ja.toString());
	}
	
	private String getStatetime(){		  
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();  
		c.add(Calendar.DATE, - 7);  
		Date monday = c.getTime();
		String preMonday = sdf.format(monday);
		return preMonday;
	}
}
