package com.yhtech.domain;

public class Log {
	private String job_no;
	private String name;
	private String house_id;
	private String contract_no;
	private String address;
	private String type;
	private String content;
	private String date;
	private String ip;
	
	public Log(){}
	
	public Log(String job_no, String name, String house_id, String contract_no,
			String address, String type, String content, String date, String ip) {
		super();
		this.job_no = job_no;
		this.name = name;
		this.house_id = house_id;
		this.contract_no = contract_no;
		this.address = address;
		this.type = type;
		this.content = content;
		this.date = date;
		this.ip = ip;
	}

	public String getContract_no() {
		return contract_no;
	}

	public void setContract_no(String contract_no) {
		this.contract_no = contract_no;
	}

	public String getJob_no() {
		return job_no;
	}
	public void setJob_no(String job_no) {
		this.job_no = job_no;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getHouse_id() {
		return house_id;
	}
	public void setHouse_id(String house_id) {
		this.house_id = house_id;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	
}
