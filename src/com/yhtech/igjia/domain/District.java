package com.yhtech.igjia.domain;

public class District {
	private String province;
	private String city;
	private String district;
	private String date;
	
	public District(){}
	public District(String province, String city, String district, String date) {
		super();
		this.province = province;
		this.city = city;
		this.district = district;
		this.date = date;
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
