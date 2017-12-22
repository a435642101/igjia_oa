package com.yhtech.igjia.controller;

import com.yhtech.igjia.dao.IHouseDao;
import com.yhtech.igjia.dao.IRentDao;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

/**
 * Created by 1 on 2017/12/19.
 */

@Controller
public class NewoaController {
    @Autowired
    private IHouseDao houseDao;
    @Autowired
    private IRentDao rentDao;

    @RequestMapping(value = "/newoa/newoahouse", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    private void NewoaHouse(HttpServletRequest request, HttpServletResponse response) throws Exception{
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        String ipAddress = null;
        ipAddress = request.getHeader("x-forwarded-for");
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        if(ipAddress.equals("127.0.0.1")){
            List<Map<String, Object>> newoaHouse = houseDao.newoaHouse();
            JSONArray array = JSONArray.fromObject(newoaHouse);
            out.print(array);
        }else{
            out.print(666);
        }

    }

    @ResponseBody
    @RequestMapping(value = "/newoa/newoaroom", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    private void  NewoaRoom(HttpServletRequest request, HttpServletResponse response) throws Exception{
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        String ipAddress = null;
        ipAddress = request.getHeader("x-forwarded-for");
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        if(ipAddress.equals("127.0.0.1")){
            List<Map<String, Object>> newoaRoom = houseDao.newoaRoom();
            JSONArray array = JSONArray.fromObject(newoaRoom);
            out.print(array);
        }else{
            out.print(666);
        }

    }

    @ResponseBody
    @RequestMapping(value = "/newoa/newoarent", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    private void NewoaRent(HttpServletRequest request, HttpServletResponse response) throws Exception{
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        String ipAddress = null;
        ipAddress = request.getHeader("x-forwarded-for");
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        if(ipAddress.equals("127.0.0.1")){
            List<Map<String, Object>> newoaRent = rentDao.newoaRent();
            JSONArray array = JSONArray.fromObject(newoaRent);
            out.print(array);
        }else{
            out.print(666);
        }

    }
}
