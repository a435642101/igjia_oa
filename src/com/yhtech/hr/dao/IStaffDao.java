package com.yhtech.hr.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.hr.domain.Staff;

@Repository("staffdao")
public interface IStaffDao {
	/**
	 * 按工号查询
	 * @return
	 */
	public Staff findByjobno(String jobno);
	
	/**
	 * 按工号查询获得部分信息
	 * @return
	 */
	public Staff findByNo(String jobno);
	
	/**
	   * 根据department查询
	   * @return
	   */
	  public List<Staff> findByDepartment(String department);
	  
	  /**
	   * 获取所有员工，用于把房源名字转成工号
	   * @return
	   */
	  public List<Staff> listAll();
	  
	  public List<Staff> findByDeptDist(String department, String district);
	  
	  public List<Staff> findByDD(String department, String district);
	  
	  public int add(Staff staff);//新增员工
	  
	  public int update(Staff staff);//修改员工信息
	  
	  public int total();

	public Staff findNoByName(String name);
}
