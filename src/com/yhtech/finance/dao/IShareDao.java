package com.yhtech.finance.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.finance.domain.Share;



@Repository("isharedao")
public interface IShareDao {
	public int addPc(Share share);
	public int updatePc(Share share);
	public Share findByOrderidPc(String orderid);
	public List<Share> allPc(String period1, String period2, String renter_name, String state, int page1, int page2);
	public int totalPc(String period1, String period2, String renter_name, String state, int page1, int page2);
}
