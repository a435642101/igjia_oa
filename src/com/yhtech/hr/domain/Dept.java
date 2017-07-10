package com.yhtech.hr.domain;

public class Dept {
	private String department;
	private String name;
	private String date;
	private int num;
	
	public Dept(){}
	public Dept(String department, String name, String date) {
		super();
		this.department = department;
		this.name = name;
		this.date = date;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
}
