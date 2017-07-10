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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;

import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.rear.dao.INewRearDao;
import com.yhtech.rear.domain.Rear;

@Controller("newrearcontroller")
public class NewRearController {
	@Resource
	private INewRearDao newreardao;
	@Resource
	private IStaffDao staffdao;
	/**
	 * 获得所有的后勤配置
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getAllNewRear.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getAllRear(HttpServletRequest request, HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		try {
			String page=request.getParameter("page");	//页数
			String num=request.getParameter("num");	//数量
			String district =null;
			try {
				district = URLDecoder.decode(request.getParameter("district"),"utf-8");
			} catch (Exception e) {}
			String address =null;
			try {
				address = URLDecoder.decode(request.getParameter("address"),"utf-8");
			} catch (Exception e) {}
			if(page==null ||num==null ||page.isEmpty()||num.isEmpty()){
				jo.put("code", "2");
				jo.put("msg", "参数错误");
			}else{
				List<Rear> listrear =newreardao.listRear((Integer.parseInt(page)-1)*Integer.parseInt(num),Integer.parseInt(num),address,district);
				JSONArray reararray = JSONArray.fromObject(listrear);
				int total = newreardao.getTotal(address,district);
				reararray = nameReplaceJobno(reararray,staffdao);
				jo.put("code", "1");
				jo.put("msg", reararray.toString());
				jo.put("total",total);
			}
		} catch (Exception e) {
			e.printStackTrace();
			jo.put("code", "3");
			jo.put("msg", "参数异常");
		}
		out.print(jo.toString());		
	}
	
	/**
	 * 添加物业配置
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addNewRear.do")
	@Authority(AuthorityType.LoginAuthority)
	public void addRear(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();		
		JSONObject jo = new JSONObject();
		String contract_no=request.getParameter("contract_no");
		String house_id=request.getParameter("house_id");
		String measure_date=request.getParameter("measure_date");
		String begin_date=request.getParameter("begin_date");
		String job_no=request.getParameter("job_no");
		int num =0;
		String district=null;
		try {
			district=URLDecoder.decode(request.getParameter("district"),"UTF-8");
			String business_area=URLDecoder.decode(request.getParameter("business_area"),"UTF-8");
			String estate=URLDecoder.decode(request.getParameter("estate"),"UTF-8");
			String address=URLDecoder.decode(request.getParameter("address"),"UTF-8");
			String type=URLDecoder.decode(request.getParameter("type"),"UTF-8");
			Rear rear1 = new Rear(contract_no, house_id, district, business_area, estate, address, type, measure_date, begin_date, "", job_no, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");
			Rear rear2 = newreardao.getRear(contract_no);
			if(rear2==null){			//该房源未配置过
				num = newreardao.add(rear1);	
				if(num>0){
					jo.put("code", "1");
					jo.put("msg", "success");
				}
			}else{
				jo.put("code", "5");
				jo.put("msg", "该套房源配置过");
			}					
		} catch (Exception e) {
			jo.put("code", "2");
			jo.put("msg", "参数异常");
		}
		out.print(jo.toString());
	}
	
	/**
	 * 管家名字替换管家工号
	 * @param ja 房源集合
	 * @return
	 */
	private JSONArray nameReplaceJobno(JSONArray ja,IStaffDao admindao) {
		//获取admin表
		List<Staff> adminlist = admindao.listAll();
		JSONArray adminja = JSONArray.fromObject(adminlist);
		for(int i=0;i<ja.size();i++){
			JSONObject jo = (JSONObject) ja.get(i);
			for(int j=0;j<adminja.size();j++){
				JSONObject adminjo = (JSONObject) adminja.get(j);
				if(jo.get("job_no").equals(adminjo.get("job_no"))){
					jo.put("job_no", adminjo.get("name"));
				}
			}
		}
		return ja;
	}
}
