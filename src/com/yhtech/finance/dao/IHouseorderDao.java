package com.yhtech.finance.dao;

import java.util.List;

import com.yhtech.finance.domain.Houseorder;

public interface IHouseorderDao {
	public List<Houseorder> listBydate(String date1, String date2, String state, String name);
	public void add(Houseorder houseorder);
	public Houseorder findByOrderid(String orderid);
	public int update(Houseorder houseorder);
	public int updatestate(String state, String contract_no, String period);
}
