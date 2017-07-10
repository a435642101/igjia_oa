package com.yhtech.rear.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.rear.domain.Repair;

@Repository("repairdao")
public interface IRepairDao {
	public List<Repair> listRepair(int i, int parseInt);
	public int total(String renter,String state);
	public int updatestate(String orderid, String state);
	public int updateremark(String orderid, String remark);
	public int add(Repair repair);
	
	public List<Repair> search(String renter,String state,int num1,int num2);
}
