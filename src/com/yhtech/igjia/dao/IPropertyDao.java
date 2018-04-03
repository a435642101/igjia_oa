package com.yhtech.igjia.dao;

import com.yhtech.igjia.domain.Property;

public interface
IPropertyDao {
	public Property getByHouseid(String house_id);
	public int add(Property property);
	public int update(Property property);
}
