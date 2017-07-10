package com.yhtech.finance.domain;

public class Applyyearpay {
	private int id;
	private String house_id;
	private String name;
	private String telephone;
	private String date;
	private String state;
	
	public Applyyearpay() {
		super();
	}

	public Applyyearpay(int id, String houseId, String name, String telephone,
			String date, String state) {
		super();
		this.id = id;
		house_id = houseId;
		this.name = name;
		this.telephone = telephone;
		this.date = date;
		this.state = state;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getHouse_id() {
		return house_id;
	}
	public void setHouse_id(String houseId) {
		house_id = houseId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
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
