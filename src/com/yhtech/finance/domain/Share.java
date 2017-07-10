package com.yhtech.finance.domain;

public class Share {
	private String orderid;
	private String address;
	private String renter_name;
	private String renter_telephone;
	private String elec_money;
	private String water_money;
	private String gas_money;
	private String total_money;
	private String period;
	private String remark;
	private String state;
	private String date;
	
	public Share(){};
	
	public Share(String orderid, String address, String renter_name,
			String renter_telephone, String elec_money, String water_money,
			String gas_money, String total_money, String period, String remark,
			String state, String date) {
		super();
		this.orderid = orderid;
		this.address = address;
		this.renter_name = renter_name;
		this.renter_telephone = renter_telephone;
		this.elec_money = elec_money;
		this.water_money = water_money;
		this.gas_money = gas_money;
		this.total_money = total_money;
		this.period = period;
		this.remark = remark;
		this.state = state;
		this.date = date;
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRenter_name() {
		return renter_name;
	}
	public void setRenter_name(String renter_name) {
		this.renter_name = renter_name;
	}
	public String getRenter_telephone() {
		return renter_telephone;
	}
	public void setRenter_telephone(String renter_telephone) {
		this.renter_telephone = renter_telephone;
	}
	public String getElec_money() {
		return elec_money;
	}
	public void setElec_money(String elec_money) {
		this.elec_money = elec_money;
	}
	public String getWater_money() {
		return water_money;
	}
	public void setWater_money(String water_money) {
		this.water_money = water_money;
	}
	public String getGas_money() {
		return gas_money;
	}
	public void setGas_money(String gas_money) {
		this.gas_money = gas_money;
	}
	public String getTotal_money() {
		return total_money;
	}
	public void setTotal_money(String total_money) {
		this.total_money = total_money;
	}
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
}
