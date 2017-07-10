package com.yhtech.gateway;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.authority.Authority;
import com.authority.AuthorityType;
import com.peter.util.Http;
import com.peter.util.Log;
import com.peter.util.MD5;
import com.peter.util.UtilDate;
import com.yhtech.hr.domain.Staff;
import com.yhtech.igjia.controller.IgjiaHouseController;
import com.yhtech.igjia.domain.House;

/**
 * 对接巴乐兔
 * @author PeterShi
 *
 */
@Controller("bltcontroller")
public class BaLeTuController {
	
	@Autowired @Qualifier("jedisTemplate")
	public  RedisTemplate<String, String> redisTemplate;
	private static String URL;
	static{
		Properties prop = new Properties();
		InputStream in =IgjiaHouseController.class.getClassLoader().getResourceAsStream("/address.properties"); 
		try {
			prop.load(in);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		URL = prop.getProperty("address" ).trim()+"/IGJdata/house";
	}
	/**
	 * 向第三方平台下架房源
	 * @param request
	 * @param response
	 */
	@RequestMapping("/downHouse.do")
	@Authority(AuthorityType.LoginAuthority)
	public void downHouse(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();	
		Staff admin = (Staff) request.getSession().getAttribute("admin");
		String district=null;
		try {district = URLDecoder.decode(request.getParameter("district"),"UTF-8");} catch (Exception e) {}
		if(admin.getDistrict().equals(district) && admin.getPosition().equals("区域经理") ||admin.getJob_no().equals("admin")){
			String house_id = request.getParameter("house_id");
			Map<String, String> map = new HashMap<String, String>();
			map.put("inner_number", house_id);		//内部房源编号
			map.put("show", "1");			//1是下架，0是上架
			map.put("auth_version", "1.0");
			map.put("auth_timestamp", UtilDate.getTimeStamp());
			map.put("auth_key",BaLeTuConfig.key);
			String params = createLinkString(map);
			params = params+"&auth_secret="+BaLeTuConfig.secret;
			String auth_signature = MD5.sign(params, "utf-8");
			map.put("auth_signature", auth_signature.toUpperCase());		//编码后转大写
			Http hp = Http.getInstance();
			String result = hp.hp(BaLeTuConfig.down_address,map,"POST");
			Log.logResult(UtilDate.getDateFormatter()+"房源"+house_id+"下架，返回："+JSONObject.fromObject(result)+"\r\n", "d:\\igjiaLogs\\yhTech\\BLTLogs");
			JSONObject jsono = JSONObject.fromObject(result);
			if(jsono.getString("status").equals("200")){
				BLTState(district, house_id, hp,"N");		//下架更新N
			    out.print("下架成功");
			}else{
				out.print("下架异常");
			}
		}else{
			out.print("refused");
		}
		
	}

	/**
	 * 巴乐兔状态
	 * @param district
	 * @param house_id
	 * @param hp
	 * @param state
	 */
	private void BLTState(String district, String house_id, Http hp,String state) {
		try {
			House house = new House();
			house.setHouse_id(house_id);
			house.setRegion(state);
			JSONObject jo = JSONObject.fromObject(house);
		    Map<String,String> m = new LinkedHashMap<String, String>();
		    m.put("house", URLEncoder.encode(jo.toString(),"UTF-8"));
			String houseresult = hp.hp(URL, m, "put");
			ValueOperations<String,String> operation = redisTemplate.opsForValue();
		    if("success".equals(houseresult)){
		    	operation.set("houselist_"+district, null);
		    	operation.set("houselist", null);
		    }
		} catch (Exception e) {}
	}
	
	/**
	 * 向第三方平台发布房源
	 * @param request
	 * @param response
	 */
	@RequestMapping("/releaseHouse.do")
	@Authority(AuthorityType.LoginAuthority)
	public void releaseHouse(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();	
		Staff admin = (Staff) request.getSession().getAttribute("admin");
		String district=null;
		try {district = URLDecoder.decode(request.getParameter("district"),"UTF-8");} catch (Exception e) {}
		if(admin.getDistrict().equals(district) && admin.getPosition().equals("区域经理") ||admin.getJob_no().equals("admin")){
			String city_name = "上海";
			String estate=null;
			try {estate = URLDecoder.decode(request.getParameter("estate"),"UTF-8");} catch (Exception e) {}
			String businessArea=null;
			try {businessArea = URLDecoder.decode(request.getParameter("business_area"),"UTF-8");} catch (Exception e) {}
			String area=null;			//房屋面积
			try {area = URLDecoder.decode(request.getParameter("area"),"UTF-8");} catch (Exception e) {};
			String roomArea=null;		//房间面积
			try {roomArea = URLDecoder.decode(request.getParameter("room_area"),"UTF-8");} catch (Exception e) {}
			String roomYuqichufangjia=request.getParameter("room_yuqichufangjia");			//房间预期出房价格
			String floor ="1/1";
			String is_elevator = "1";
			String bedroom =null;
			try {bedroom = URLDecoder.decode(request.getParameter("room_num"),"UTF-8");} catch (Exception e) {}
			String hire_way = "4";		//单间出租
			String room_direction="1";	//房间朝向
			String room_type ="1";		//主卧1，次卧2
			String house_status = "0";		//招租中
			String lease_inception =UtilDate.getDate1();		//起租日
			String inner_number =request.getParameter("house_id");		//房间ID
			String lan_gender ="0";		//房东性别
			String lan_mobile =request.getParameter("fangdong_telephone");		//房东手机号
			String lan_name =null;		//房东名字
			try {lan_name = URLDecoder.decode(request.getParameter("fangdong_name"),"UTF-8");} catch (Exception e) {};			//房东名字
			String address=null;			//地址
			try {address = URLDecoder.decode(request.getParameter("address"),"UTF-8");} catch (Exception e) {}
			String region_name =null;
			String room_name = null;
			String template_id=null;
			String dong = null;
			String hao =null;
			String shi = null;
			JSONArray room_detail = new JSONArray();
			JSONObject jo = new JSONObject();
			if(address.indexOf("区")>0){		
				region_name = address.substring(0,address.indexOf("区")+1);	//获取行政区
			}
			if(address.indexOf("-")>0){
				room_name = address.substring(address.indexOf("-")+1,address.length());	//获取行政区
			}
			if(address.indexOf("栋")>0){
				template_id="3";
				dong = address.substring(address.indexOf("栋")-1,address.indexOf("栋"));
				if(address.indexOf("号")>0 && address.indexOf("室")>0){
					hao = address.substring(address.indexOf("栋")+1,address.indexOf("号"));
					shi = address.substring(address.indexOf("号")+1,address.indexOf("室"));
					jo.put("template_attr_id", "4");
					jo.put("attr_val", dong);
					jo.put("attr_name","幢/栋");
					room_detail.add(jo);
					jo.put("template_attr_id","5");
					jo.put("attr_val", hao);
					jo.put("attr_name","号");
					room_detail.add(jo);
					jo.put("template_attr_id","6");
					jo.put("attr_val", shi);
					jo.put("attr_name","室");
					room_detail.add(jo);
				}
			}else{
				template_id="2";
				if(address.indexOf("弄")>0 && address.indexOf("号")>0 && address.indexOf("室")>0){
					hao = address.substring(address.indexOf("弄")+1,address.indexOf("号"));
					shi = address.substring(address.indexOf("号")+1,address.indexOf("室"));
					jo.put("template_attr_id", "2");
					jo.put("attr_val", hao);
					jo.put("attr_name","号");
					room_detail.add(jo);
					jo.put("template_attr_id", "3");
					jo.put("attr_val", shi);
					jo.put("attr_name","室");
					room_detail.add(jo);
				}
			}
			String houseType=null;
			try {houseType = URLDecoder.decode(request.getParameter("house_type"),"UTF-8");} catch (Exception e) {}
			String livingroom =null;
			String bathroom = null;
			if(houseType.indexOf("厅")>0) livingroom = houseType.substring(houseType.indexOf("厅")-1,houseType.indexOf("厅"));
			if(houseType.indexOf("卫")>0) bathroom = houseType.substring(houseType.indexOf("卫")-1,houseType.indexOf("卫"));
			Map<String,String> map =new HashMap<String, String>();
			map.put("city_name",city_name);
			map.put("region_name", region_name);
			map.put("area_name", businessArea);
			map.put("subdistrict_name", estate);
			map.put("room_detail", room_detail.toString());
			map.put("template_id", template_id);
			map.put("room_name", room_name);
			map.put("month_rent", roomYuqichufangjia);
			map.put("floor_area", area);
			map.put("rent_area", roomArea);
			map.put("floor",floor);
			map.put("is_elevator",is_elevator);
			map.put("bedroom", bedroom);
			map.put("livingroom", livingroom);
			map.put("bathroom",bathroom);
			map.put("hire_way",hire_way);
			map.put("room_direction", room_direction);
			map.put("room_type", room_type);
			map.put("house_status",house_status);
			map.put("lease_inception",lease_inception);
			map.put("inner_number", inner_number);
			map.put("lan_gender", lan_gender);
			map.put("lan_mobile",lan_mobile);
			map.put("lan_name",lan_name);
			
			map.put("auth_version", "1.0");
			map.put("auth_timestamp", UtilDate.getTimeStamp());
			map.put("auth_key",BaLeTuConfig.key);
			String params = createLinkString(map);
			params = params+"&auth_secret="+BaLeTuConfig.secret;
			String auth_signature = MD5.sign(params, "utf-8");
			map.put("auth_signature", auth_signature.toUpperCase());		//编码后转大写
			Http hp = Http.getInstance();
			String result = hp.hp(BaLeTuConfig.address,map,"POST");
			Log.logResult(UtilDate.getDateFormatter()+"房源"+inner_number+"发布，返回："+JSONObject.fromObject(result)+"\r\n", "d:\\igjiaLogs\\yhTech\\BLTLogs");
			
			JSONObject jsono = JSONObject.fromObject(result);
			if(jsono.getString("status").equals("200")){
				BLTState(district, inner_number, hp,"Y");		//上架更新Y
				out.print("发布成功");
			}else{
				out.print("发布异常");
			}
		}else{
			out.print("refused");
		}
	}
	/** 
     * 把数组所有元素排序，并按照“参数=参数值”的模式用“&”字符拼接成字符串
     * @param params 需要排序并参与字符拼接的参数组
     * @return 拼接后字符串
     */
    private String createLinkString(Map<String, String> params) {

        List<String> keys = new ArrayList<String>(params.keySet());
        Collections.sort(keys);
        String prestr = "";
        for (int i = 0; i < keys.size(); i++) {
            String key = keys.get(i);
            String value = params.get(key);

            if (i == keys.size() - 1) {		//拼接时，不包括最后一个&字符
                prestr = prestr + key + "=" + value;
            } else {
                prestr = prestr + key + "=" + value + "&";
            }
        }

        return prestr;
    }
}
