package com.yhtech.hr.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.hr.domain.District;

/**
 * 所有的区域的数据库连接接口
 * @author Administrator
 *
 */
@Repository("districtdao")
public interface IDistrictDao {
	/**
	 * 插入区域
	 * @param log
	 */
	public int add(District district);

	/**
	 * 获得所有分区
	 * @return
	 */
	public List<District> listByDept(String department);

	public int updateGroup(District districtdomain);

	public int deleteDeptGroup(String department, String district_id);
}
