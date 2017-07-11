package com.yhtech.service;

import com.yhtech.hr.dao.IDistrictDao;
import com.yhtech.hr.domain.District;
import com.yhtech.igjia.dao.IHouseDao;
import com.yhtech.igjia.dao.IRentDao;
import net.sf.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component("redisService")
public class RedisService {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    @Resource
    private IHouseDao housedao;
    @Resource
    private IRentDao rentdao;
    @Resource
    private IDistrictDao districtdao;
    @Autowired
    private RedisUtils redisUtils;

    /**
     * 获得所有分区
     *
     * @return
     */
    public String getAllDistrict() {
        if (redisUtils.get("AllDistrict") == null) {
            List<District> alldistrict = districtdao.listByDept("YGJZL");    //获得所有分区
            JSONArray adja = JSONArray.fromObject(alldistrict);
            redisUtils.set("AllDistrict", adja.toString(), 3600 * 4);
        }
        return redisUtils.get("AllDistrict");
    }
}
