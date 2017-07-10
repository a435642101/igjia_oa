package com.yhtech.rear.domain;

public class Repair {
	private String repair_id;
	private String renter;
	private String telephone;
	private String yuyue_date;
	private String address;
	private String descrip;
	private String picture;
	private String state;
	private String date;
	private String type;
	private String remark;
	
	public Repair(String repair_id, String renter, String telephone,
			String yuyue_date, String address, String descrip, String picture,
			String state, String date, String type, String remark) {
		super();
		this.repair_id = repair_id;
		this.renter = renter;
		this.telephone = telephone;
		this.yuyue_date = yuyue_date;
		this.address = address;
		this.descrip = descrip;
		this.picture = picture;
		this.state = state;
		this.date = date;
		this.type = type;
		this.remark = remark;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Repair(){}
	
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getRepair_id() {
		return repair_id;
	}
	public void setRepair_id(String repair_id) {
		this.repair_id = repair_id;
	}
	public String getRenter() {
		return renter;
	}
	public void setRenter(String renter) {
		this.renter = renter;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getYuyue_date() {
		return yuyue_date;
	}
	public void setYuyue_date(String yuyue_date) {
		this.yuyue_date = yuyue_date;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getDescrip() {
		return descrip;
	}
	public void setDescrip(String descrip) {
		this.descrip = descrip;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
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
	};
	
}
