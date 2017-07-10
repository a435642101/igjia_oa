package com.yhtech.rear.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.rear.domain.Rear;

@Repository("reardao")
public interface IRearDao {
	public int add(Rear rear);
	public Rear getRear(String contract_no);
	public int getTotal(String address,String district,String rear,String start_date,String start_date2,String finish_date,String finish_date2);
	public List<Rear> listRear(int i, int parseInt, String address,String district,String rear,String start_date,String start_date2,String finish_date,String finish_date2);
	public int getTotalPerson(String job_no, String district);
	public List<Rear> listRearPerson(int i, int parseInt, String job_no,
			String district);
}
