package com.yhtech.hr.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.hr.domain.Dept;

/**
 * 部门数据库连接接口
 * @author Administrator
 *
 */
@Repository("deptdao")
public interface IDeptDao {
	/**
	 * 插入部门
	 * @param log
	 */
	public int add(Dept dept);

	/**
	 * 获得所有部门
	 * @return
	 */
	public List<Dept> listDept();
	
	public Dept getDept(String department);
	
	public int deleteDept(String department);
	
	public int updateDept(Dept dept);
}
