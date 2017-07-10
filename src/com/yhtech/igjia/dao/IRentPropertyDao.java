package com.yhtech.igjia.dao;

import com.yhtech.igjia.domain.RentProperty;

public interface IRentPropertyDao {
	public RentProperty getByHouseid(String house_id);
	public int add(RentProperty rentproperty);
	public int update(RentProperty rentproperty);
}
