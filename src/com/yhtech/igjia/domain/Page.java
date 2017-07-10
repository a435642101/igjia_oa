package com.yhtech.igjia.domain;

public class Page {
	
	private String address;
	private String state;
	private String contract_start1;
	private String contract_start2;
	private String contract_end1;
	private String contract_end2;
	private String total;
	private int page;
	private int pagesize;
	private String paymethod;
	
	
	
	public Page(String address, String state, String contract_start1,
			String contract_start2, String contract_end1, String contract_end2,
			String total, int page, int pagesize, String paymethod) {
		super();
		this.address = address;
		this.state = state;
		this.contract_start1 = contract_start1;
		this.contract_start2 = contract_start2;
		this.contract_end1 = contract_end1;
		this.contract_end2 = contract_end2;
		this.total = total;
		this.page = page;
		this.pagesize = pagesize;
		this.paymethod = paymethod;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getContract_start1() {
		return contract_start1;
	}
	public void setContract_start1(String contract_start1) {
		this.contract_start1 = contract_start1;
	}
	public String getContract_start2() {
		return contract_start2;
	}
	public void setContract_start2(String contract_start2) {
		this.contract_start2 = contract_start2;
	}
	public String getContract_end1() {
		return contract_end1;
	}
	public void setContract_end1(String contract_end1) {
		this.contract_end1 = contract_end1;
	}
	public String getContract_end2() {
		return contract_end2;
	}
	public void setContract_end2(String contract_end2) {
		this.contract_end2 = contract_end2;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getPagesize() {
		return pagesize;
	}
	public void setPagesize(int pagesize) {
		this.pagesize = pagesize;
	}
	public String getPaymethod() {
		return paymethod;
	}
	public void setPaymethod(String paymethod) {
		this.paymethod = paymethod;
	}
	
}
