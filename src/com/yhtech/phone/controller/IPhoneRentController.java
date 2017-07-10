package com.yhtech.phone.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yhtech.igjia.dao.IRentDao;
import net.sf.json.JSONObject;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yhtech.igjia.domain.Rent;

@Controller("IPhoneRentController")
public class IPhoneRentController {
	@Resource
	private IRentDao irentdao;
	/**
	 * 获取单个房源记录(出房)
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/phoneGJ/pOnerent.do")
	//@Authority(AuthorityType.LoginAuthority)
	public void phoneOneRent(HttpServletRequest request,HttpServletResponse response) throws IOException{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		//获取数据
				String house_id=request.getParameter("house_id");
				String contract_no=request.getParameter("contract_no");
//				String result = data.getRentHouse(redisTemplate);
//				Gson gson = new Gson();
//				JsonParser parser = new JsonParser();
//				JsonArray Jarray = parser.parse(result).getAsJsonArray();
//				JSONObject jo=new JSONObject();
//				if(house_id!=null){
//					for(JsonElement obj : Jarray ){
//						Rent rent = gson.fromJson( obj , Rent.class);
//					    if(house_id.equals(rent.getHouse_id())&& "出租中".equals(rent.getState())){
//					    	jo = JSONObject.fromObject(rent);
//					    	break;
//					    }
//					}
//				}else{
//					for(JsonElement obj : Jarray ){
//						Rent rent = gson.fromJson( obj , Rent.class);
//					    if(contract_no.equals(rent.getContract_no())){
//					    	jo = JSONObject.fromObject(rent);
//					    	break;
//					    }
//					}
//				}
				JSONObject jo=new JSONObject();
				Rent rent = new Rent();
				if(house_id!=null){
					rent = irentdao.findById(house_id);
				}else{
					rent = irentdao.findByContractNo(contract_no);
				}
				jo = JSONObject.fromObject(rent);
				if(jo.size()==0){
					out.print("zero");
				}else{
					out.print(jo.toString());
				}
	}
}
