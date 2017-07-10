package com.yhtech.finance.domain;

public class Rentorder {
	private String orderid;
	private String period;
	private String house_id;
	private String contract_no;
	private String address;
	private String telephone;
	private String name;
	private String money;
	private String date;
	private String mode;
	private String remark;
	private String state;
	
	
	
	public Rentorder() {
		super();
	}	
	public Rentorder(String orderid, String period, String house_id,String contract_no,
			String address, String telephone, String name, String money,
			String date, String mode, String remark, String state) {
		super();
		this.orderid = orderid;
		this.period = period;
		this.house_id = house_id;
		this.contract_no = contract_no;
		this.address = address;
		this.telephone = telephone;
		this.name = name;
		this.money = money;
		this.date = date;
		this.mode = mode;
		this.remark = remark;
		this.state = state;
	}
	
	public String getContract_no() {
		return contract_no;
	}
	public void setContract_no(String contract_no) {
		this.contract_no = contract_no;
	}
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public String getHouse_id() {
		return house_id;
	}
	public void setHouse_id(String houseId) {
		house_id = houseId;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	
}
