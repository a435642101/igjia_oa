package com.yhtech.igjia.dao;

import java.util.List;

import com.yhtech.igjia.domain.RentApplication;


public interface IRentApplicationDao {
	public List<RentApplication> getByHouseid(String house_id);
	public int add(RentApplication rentapplication);
	public int update(String house_id);
	public void delete(String contract_no);
}
