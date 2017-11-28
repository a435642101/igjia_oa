package com.yhtech.rear.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;
import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yhtech.rear.domain.Clean;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.yhtech.hr.dao.IStaffDao;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.dao.IRentDao;
import com.yhtech.igjia.domain.Rent;
import com.yhtech.rear.dao.ICleanDao;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Component
@Controller("cleaningcontroller")
public class CleaningController {
	@Resource
	private ICleanDao cleandao;
	@Resource
	private IStaffDao admindao;
	@Resource
	private IRentDao rentdao;
	

	/**
	 * 修改保洁日期
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/updatecleandate.do")
	@Authority(AuthorityType.LoginAuthority)
	public void updatedate(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jo = new JSONObject();
		String date = request.getParameter("date");		//查询某天的保洁
		String address = URLDecoder.decode(request.getParameter("address"),"utf-8");		//获取地址
		if(address!=null && !address.isEmpty() && date!=null && !date.isEmpty()){
			Rent rent = new Rent();
			rent.setAddress(address);
			rent.setContract_startdate(date);
			int num = cleandao.update(rent);
			if(num>0){
				jo.put("code", "1");
				jo.put("msg", "success");
			}else{
				jo.put("code", "3");
				jo.put("msg", "更新失败");
			}
		}else{
			jo.put("code", "2");
			jo.put("msg", "参数错误");
		}
		out.print(jo.toString());
	}
	
	/**
	 * 当日保洁列表
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/getCleanlist.do")
	@Authority(AuthorityType.LoginAuthority)
	public void getCleanlist(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String date = request.getParameter("date");		//查询某天的保洁
		int period=15;		//定义打扫周期
//		ValueOperations<String,String> operation = redisTemplate.opsForValue();
//		if(operation.get("updatecleantoday")==null){						//出房数据更新到保洁表，12小时更新一次
//			updateCleanHouse();
//			operation.set("updatecleantoday","yes",12,TimeUnit.HOURS);
//		}
		updateCleanHouse();
		List<Clean> cleanlist = cleandao.dayclean(date, period+"");
		JSONArray ja = JSONArray.fromObject(cleanlist);
		ja = nameReplaceJobno(ja,admindao);
		System.out.print(ja.toString());
		out.print(ja.toString());
	}


	/**
	 *	添加保洁时间
	 */
	@RequestMapping(value = "/addCleanDate.do", method = RequestMethod.POST)
	@Authority(AuthorityType.KHFWZXAuthority)
	private void addCleanDate(@RequestBody Map<String, Object> paramMap,HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Staff admin = (Staff) request.getSession().getAttribute("admin");
		paramMap.put("create_name",admin.getJob_no());
		paramMap.put("clean_date",sdf.format(now));
		int res = cleandao.addCleanDate(paramMap);
		JSONObject obj = JSONObject.fromObject(paramMap);
		if(res>0){
			obj.put("msg","success");
			out.print(obj.toString());
		}else{
			obj.put("msg","error");
			out.print(obj.toString());
		}

	}

	/**
	 *	修改备注
	 */
	@RequestMapping(value = "/updateRemark.do", method = RequestMethod.GET)
	@Authority(AuthorityType.KHFWZXAuthority)
	private void updateRemark(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String remark = request.getParameter("remark");
		if(remark!=null){
			remark = URLDecoder.decode(remark,"utf-8");
		}
		int cleandate_id = 0;
		String cleandate_id1 = request.getParameter("cleandate_id");
		if(cleandate_id1!=null){
			cleandate_id = Integer.parseInt(cleandate_id1);
		}
		Clean c = new Clean();
		c.setCleandate_id(cleandate_id);
		c.setRemark(remark);
		int res = cleandao.updateRemark(c);
		if(res>0){
			out.print("success");
		}else{
			out.print("error");
		}

	}

	/**
	 *	保洁记录
	 */
	@RequestMapping(value = "/getCleanDate.do", method = RequestMethod.GET)
	@Authority(AuthorityType.KHFWZXAuthority)
	private void getCleanDate(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String clean_id = request.getParameter("clean_id");
		List<Clean> cleans = cleandao.findCleanDate(clean_id);
		JSONArray arr = JSONArray.fromObject(cleans);
		out.print(arr.toString());
	}

	/**
	 * 更新保洁的房屋数据
	 * @param
	 */
	@Scheduled(cron = "0 0 21 * * ?")
	private void updateCleanHouse() {
		List<Rent> list = rentdao.listWeek();
		for (Rent rent : list) {
			if(rent.getState().equals("出租中")){
				String[] address = rent.getAddress().split("-");
				Rent clean = cleandao.list(address[0]);
				if(clean==null){
					cleandao.add(rent);
				}
			}
		}
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
