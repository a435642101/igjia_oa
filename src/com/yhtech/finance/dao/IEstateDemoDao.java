package com.yhtech.finance.dao;

import org.springframework.stereotype.Repository;


@Repository("estatedao")
public interface IEstateDemoDao {
	/**
	 * tianjia
	 * @param img 
	 * @param price 
	 * @param date 
	 * @param address 
	 * @param name 
	 * @param id
	 * @param state
	 * @return
	 */
	public int add(String district, String estate, String name, String address, String date, String price, String img);
}
