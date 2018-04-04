package com.yhtech.igjia.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.yhtech.igjia.domain.House;
import com.yhtech.igjia.domain.Page;



@Repository("housedao")
public interface IHouseDao {
	public List<House> listAll();
	public List<House> listPage(Page page);
	public List<House> listSearch(House house);
	public House findById(String house_id);
	public House findByContractNo(String contract_no);
	public int delete(String house_id);
	public int add(House house);
	public int update(House house);
	public int count(Page page);
	public List<House> findByDistrict(String district);
	public List<House> findByDistrict1(String district);
	public List<House> selectOrderHouse(String district);
	int getContractNum(String contract_no);
	int getContractMax();
	List<Map<String, Object>> newoaHouse();
	List<Map<String, Object>> newoaRoom();
	List<Map<String, Object>> idcardHouse(String idcard);
	List<Map<String, Object>> idcardrent(String idcard);
}
