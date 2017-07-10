package com.yhtech.finance.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.finance.domain.Rentorder;

@Repository("renterdao1")
public interface IRentorderDao {
	public List<Rentorder> listSearch(Rentorder rentorder);
	public List<Rentorder> listBydate(String date1,String date2,String state,String name);
	public void add(Rentorder rentorder);
	public Rentorder findByOrderid(String orderid);
	public int update(Rentorder rentorder);
	public int updatestate(String state,String houseid,String period);
}
