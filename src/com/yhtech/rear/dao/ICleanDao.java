package com.yhtech.rear.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.igjia.domain.Rent;

/**
 * 租客保洁的记录
 * @author Administrator
 *
 */
@Repository("cleandao")
public interface ICleanDao {
	public int add(Rent rent);
	public int update(Rent rent);
	public Rent list(String address);
	public List<Rent> dayclean(String date,String period);
}
