package com.yhtech.yhtech.dao;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.domain.Log;

@Repository("logdao")
public interface ILogDao {
	/**
	 * 插入日志
	 * @param log
	 */
	public void add(Log log);
	
	/**
	 * 按日期查询日志
	 * @param date1
	 * @param date2
	 * @return
	 */
	public List<Log> listBydate(String date1,String date2);
	
	/**
	 * 查询日志
	 * @return
	 */
	public List<Log> listSearch(Log log);

	/**
	 * 分页查询日志
	 * @param page
	 * @param num
	 * @return
	 */
	public List<Log> listPage(int num1,int num2);
}
