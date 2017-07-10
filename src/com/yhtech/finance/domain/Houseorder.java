package com.yhtech.finance.domain;

public class Houseorder {
	private String orderid;
	private String period;
	private String house_id;
	private String contract_no;
	private String address;
	private String shoukuanren_name;
	private String shoukuanren_telephone;
	private String shoukuanren_kaihuhang;
	private String shoukuanren_account;
	private String money;
	private String date;
	private String remark;
	private String state;
	
	public Houseorder(){}
	
	public Houseorder(String orderid, String period, String house_id,
			String contract_no, String address, String shoukuanren_name,
			String shoukuanren_telephone, String shoukuanren_kaihuhang,
			String shoukuanren_account, String money, String date, String remark,
			String state) {
		super();
		this.orderid = orderid;
		this.period = period;
		this.house_id = house_id;
		this.contract_no = contract_no;
		this.address = address;
		this.shoukuanren_name = shoukuanren_name;
		this.shoukuanren_telephone = shoukuanren_telephone;
		this.shoukuanren_kaihuhang = shoukuanren_kaihuhang;
		this.shoukuanren_account = shoukuanren_account;
		this.money = money;
		this.date = date;
		this.remark = remark;
		this.state = state;
	}

	public String getHouse_id() {
		return house_id;
	}

	public void setHouse_id(String house_id) {
		this.house_id = house_id;
	}

	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public String getContract_no() {
		return contract_no;
	}
	public void setContract_no(String contract_no) {
		this.contract_no = contract_no;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getShoukuanren_name() {
		return shoukuanren_name;
	}
	public void setShoukuanren_name(String shoukuanren_name) {
		this.shoukuanren_name = shoukuanren_name;
	}
	public String getShoukuanren_telephone() {
		return shoukuanren_telephone;
	}
	public void setShoukuanren_telephone(String shoukuanren_telephone) {
		this.shoukuanren_telephone = shoukuanren_telephone;
	}
	public String getShoukuanren_kaihuhang() {
		return shoukuanren_kaihuhang;
	}
	public void setShoukuanren_kaihuhang(String shoukuanren_kaihuhang) {
		this.shoukuanren_kaihuhang = shoukuanren_kaihuhang;
	}
	public String getShoukuanren_account() {
		return shoukuanren_account;
	}
	public void setShoukuanren_account(String shoukuanren_account) {
		this.shoukuanren_account = shoukuanren_account;
	}
	
	
	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
}
