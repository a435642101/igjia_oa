package com.yhtech.igjia.controller;

import com.yhtech.igjia.dao.IHouseDao;
import com.yhtech.igjia.dao.IRentDao;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
    private void NewoaHouse(HttpServletResponse response) throws Exception{
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        List<Map<String, Object>> newoaHouse = houseDao.newoaHouse();
        JSONArray array = JSONArray.fromObject(newoaHouse);
        out.print(array);
    }

    @ResponseBody
    @RequestMapping(value = "/newoa/newoaroom", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    private void  NewoaRoom(HttpServletResponse response) throws Exception{
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        List<Map<String, Object>> newoaHouse = houseDao.newoaRoom();
        JSONArray array = JSONArray.fromObject(newoaHouse);
        out.print(array);
    }

    @ResponseBody
    @RequestMapping(value = "/newoa/newoarent", method = RequestMethod.GET, produces = "application/json;charset=utf-8")
    private void NewoaRent(HttpServletResponse response) throws Exception{
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        List<Map<String, Object>> newoaHouse = rentDao.newoaRent();
        JSONArray array = JSONArray.fromObject(newoaHouse);
        out.print(array);
    }
}
