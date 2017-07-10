package com.yhtech.igjia.dao;

import java.util.List;

import com.yhtech.igjia.domain.Application;


public interface IApplicationDao {
	public List<Application> getByHouseid(String house_id);
	public int add(Application application);
	public int delete(String house_id);
}
