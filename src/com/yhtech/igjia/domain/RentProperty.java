package com.yhtech.igjia.domain;

public class RentProperty {
	private String contract_no;		//房源ID
	private String now_water_degree;	//当前水表度数
	private String now_elec_degree_day;	//本次电表度数(白天)
	private String now_elec_degree_night;	//本次电表度数(黑夜)
	private String now_gas_degree;		//现在煤气表度数
	private String keyinfo;			//钥匙凭证
	private String application;		//家具
	private String rentname;		//租客名字
	private String rent_telephone;	//租客手机号
	private String state;
	public RentProperty(){}

	public RentProperty(String contract_no, String now_water_degree,
			String now_elec_degree_day, String now_elec_degree_night,
			String now_gas_degree, String keyinfo, String application,
			String rentname, String rent_telephone, String state) {
		super();
		this.contract_no = contract_no;
		this.now_water_degree = now_water_degree;
		this.now_elec_degree_day = now_elec_degree_day;
		this.now_elec_degree_night = now_elec_degree_night;
		this.now_gas_degree = now_gas_degree;
		this.keyinfo = keyinfo;
		this.application = application;
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


	public String getApplication() {
		return application;
	}
	public void setApplication(String application) {
		this.application = application;
	}
	
	public String getContract_no() {
		return contract_no;
	}

	public void setContract_no(String contract_no) {
		this.contract_no = contract_no;
	}

	public String getNow_water_degree() {
		return now_water_degree;
	}
	public void setNow_water_degree(String now_water_degree) {
		this.now_water_degree = now_water_degree;
	}
	public String getNow_elec_degree_day() {
		return now_elec_degree_day;
	}
	public void setNow_elec_degree_day(String now_elec_degree_day) {
		this.now_elec_degree_day = now_elec_degree_day;
	}
	public String getNow_elec_degree_night() {
		return now_elec_degree_night;
	}
	public void setNow_elec_degree_night(String now_elec_degree_night) {
		this.now_elec_degree_night = now_elec_degree_night;
	}
	public String getNow_gas_degree() {
		return now_gas_degree;
	}
	public void setNow_gas_degree(String now_gas_degree) {
		this.now_gas_degree = now_gas_degree;
	}
	public String getKeyinfo() {
		return keyinfo;
	}
	public void setKeyinfo(String keyinfo) {
		this.keyinfo = keyinfo;
	}
	
	
	
}
