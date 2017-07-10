package com.yhtech.igjia.domain;

public class RentApplication {
	private String contract_no;
	private String region;
	private String name;
	private String number;
	private String model;
	private String remark;
	private String rentname;		//租客名字
	private String rent_telephone;	//租客手机号
	private String state;
	public RentApplication(){}
	
	

	public RentApplication(String contract_no, String region, String name,
			String number, String model, String remark, String rentname,
			String rent_telephone, String state) {
		super();
		this.contract_no = contract_no;
		this.region = region;
		this.name = name;
		this.number = number;
		this.model = model;
		this.remark = remark;
		this.rentname = rentname;
		this.rent_telephone = rent_telephone;
		this.state = state;
	}



	public String getRentname() {
		return rentname;
	}



	public void setRentname(String rentname) {
		this.rentname = rentname;
	}



	public String getRent_telephone() {
		return rent_telephone;
	}



	public void setRent_telephone(String rent_telephone) {
		this.rent_telephone = rent_telephone;
	}



	public String getState() {
		return state;
	}



	public void setState(String state) {
		this.state = state;
	}



	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	
	public String getContract_no() {
		return contract_no;
	}



	public void setContract_no(String contract_no) {
		this.contract_no = contract_no;
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
