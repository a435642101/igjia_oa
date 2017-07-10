package com.yhtech.finance.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.finance.domain.Applyyearpay;

@Repository("applyyeardao")
public interface IApplyyearpayDao {
	public List<Applyyearpay> findByName(String name);

	/**
	 * 修改状态
	 * @param id
	 * @param state
	 * @return
	 */
	public int updatestate(String id, String state);
}
