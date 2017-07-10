package com.yhtech.rear.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.yhtech.rear.domain.Goods;
@Repository("goodsdao")
public interface IGoodsDao {
	public int add(Goods goods);
	public List<Goods> getGoods(String contract_no);
}
