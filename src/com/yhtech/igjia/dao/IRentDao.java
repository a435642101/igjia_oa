package com.yhtech.igjia.dao;

import java.util.List;

import com.yhtech.igjia.domain.Statistics;
import org.springframework.stereotype.Repository;

import com.yhtech.igjia.domain.Page;
import com.yhtech.igjia.domain.Rent;



@Repository("rentdao")
public interface IRentDao {
	public List<Rent> listAll();
	public List<Rent> listPage(Page page);
	public List<Rent> listSearch(Rent rent);
	public int delete(String house_id);
	public int add(Rent rent);
	public int update(Rent rent);
	public int count(Page page);
	public Rent findByContractNo(String contract_no);
	public Rent findById(String house_id);
	public List<Statistics> findByJob15(Statistics statistics);
	public List<Rent> selectOrderRent(String district);
}
