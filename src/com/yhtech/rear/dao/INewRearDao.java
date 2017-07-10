package com.yhtech.rear.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.rear.domain.Rear;

@Repository("newreardao")
public interface INewRearDao {
	public int add(Rear rear);
	public Rear getRear(String contract_no);
	public int getTotal(String address,String district);
	public List<Rear> listRear(int i, int parseInt, String address,String district);
}
