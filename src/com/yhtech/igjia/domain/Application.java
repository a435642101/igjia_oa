package com.yhtech.igjia.domain;

public class Application {
	private String house_id;
	private String name;
	private String number;
	private String model;
	private String remark;
	public Application(){}
	public Application(String house_id, String name, String number,
			String model, String remark) {
		super();
		this.house_id = house_id;
		this.name = name;
		this.number = number;
		this.model = model;
		this.remark = remark;
	}
	public String getHouse_id() {
		return house_id;
	}
	public void setHouse_id(String house_id) {
		this.house_id = house_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
