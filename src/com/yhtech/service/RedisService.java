package com.yhtech.service;

import com.yhtech.hr.dao.IDistrictDao;
import com.yhtech.hr.domain.District;
import com.yhtech.igjia.dao.IHouseDao;
import com.yhtech.igjia.dao.IRentDao;
import com.yhtech.igjia.domain.House;
import com.yhtech.igjia.domain.Rent;
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
    private IHouseDao ihousedao;
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

    /**
     * 获取所有
     *
     * @return
     */
    public String getHouse() {
        if (redisUtils.get("housedaolistAll") == null) {
            List<House> alldistrict = housedao.listAll();    //获得所有分区
            JSONArray adja = JSONArray.fromObject(alldistrict);
            redisUtils.set("housedaolistAll", adja.toString(), 60*25);
        }
        return redisUtils.get("housedaolistAll");
    }

    /**
     * 获得所有分区
     *
     * @return
     */
    public String getRentHouse() {
        if (redisUtils.get("rentdaolistAll") == null) {
            List<Rent> alldistrict = rentdao.listAll();    //获得所有分区
            JSONArray adja = JSONArray.fromObject(alldistrict);
            redisUtils.set("rentdaolistAll", adja.toString(), 60*25);
        }
        return redisUtils.get("rentdaolistAll");
    }


    public String getDistrictHouse(String district) {
        if (redisUtils.get("ihousedaolistSearch"+district) == null) {
            House house = new House();
            house.setDistrict(district);
            List<House> list = ihousedao.listSearch(house);
            JSONArray jo = JSONArray.fromObject(list);
            redisUtils.set("ihousedaolistSearch"+district, jo.toString(), 1800);
        }
        return redisUtils.get("ihousedaolistSearch"+district);
    }

    public String getDistrictRent(String district) {
        if (redisUtils.get("irentdaolistSearch"+district) == null) {
            Rent rent = new Rent();
            rent.setDistrict(district);
            List<Rent> list = rentdao.listSearch(rent);
            JSONArray jo = JSONArray.fromObject(list);
            redisUtils.set("irentdaolistSearch"+district, jo.toString(), 1800);
        }
        return redisUtils.get("irentdaolistSearch"+district);
    }
}
