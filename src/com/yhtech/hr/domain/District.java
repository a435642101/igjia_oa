package com.yhtech.hr.domain;

public class District {
	private String province;
	private String city;
	private String department;
	private String district;
	private String district_id;
	private String date;
	private int num;
	
	public District(){}
	public District(String province, String city, String department,
			String district, String district_id, String date) {
		super();
		this.province = province;
		this.city = city;
		this.department = department;
		this.district = district;
		this.district_id = district_id;
		this.date = date;
	}
	public String getDistrict_id() {
		return district_id;
	}
	public void setDistrict_id(String district_id) {
		this.district_id = district_id;
	}
	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
}
