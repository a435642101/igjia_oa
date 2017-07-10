package com.yhtech.rear.domain;

public class Goods {
	private String contract_no;
	private String region;
	private String type;
	private String name;
	private String model;
	private String uniteprice;
	private String number;
	private String handle;
	private String remark;
	
	public Goods(){}
	public Goods(String contract_no, String region, String type, String name,
			String model, String uniteprice, String number, String handle,
			String remark) {
		super();
		this.contract_no = contract_no;
		this.region = region;
		this.type = type;
		this.name = name;
		this.model = model;
		this.uniteprice = uniteprice;
		this.number = number;
		this.handle = handle;
		this.remark = remark;
	}
	public String getContract_no() {
		return contract_no;
	}
	public void setContract_no(String contract_no) {
		this.contract_no = contract_no;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getUniteprice() {
		return uniteprice;
	}
	public void setUniteprice(String uniteprice) {
		this.uniteprice = uniteprice;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getHandle() {
		return handle;
	}
	public void setHandle(String handle) {
		this.handle = handle;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
