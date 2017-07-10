package com.yhtech.igjia.domain;

public class Property {
	private String house_id;		//房源ID
	private String water_account;	//水表账号
	private String last_water_degree;	//上次水表度数
	private String now_water_degree;	//当前水表度数
	private String water_unitprice;		//水费单价
	private String elec_account;		//电表账号
	private String last_elec_degree_day;	//上次电表度数(白天)
	private String last_elec_degree_night;	//上次电表度数(黑夜)
	private String now_elec_degree_day;	//本次电表度数(白天)
	private String now_elec_degree_night;	//本次电表度数(黑夜)
	private String elec_unitprice_day;	//电费单价(白天)
	private String elec_unitprice_night;	//电费单价(黑夜)
	private String gas_account;			//煤气账号
	private String last_gas_degree;		//上次煤气表度数
	private String now_gas_degree;		//现在煤气表度数
	private String gas_unitprice;		//煤气单价
	private String cableTV;			//是否有有线电视
	private String cableTV_account;	//有线电视账号
	private String cableTV_date;	//有线电视付款日
	private String cableTV_money;	//有线电视价钱
	private String cleaning_price;	//保洁费
	private String total_money;		//总价
	private String phone;			//是否有电话机
	private String decoration;		//装修情况
	private String application;		//家具
	private String remark;			//备注
	
	public Property(){};
	
	public Property(String house_id, String water_account,
			String last_water_degree, String now_water_degree,
			String water_unitprice, String elec_account,
			String last_elec_degree_day, String last_elec_degree_night,
			String now_elec_degree_day, String now_elec_degree_night,
			String elec_unitprice_day, String elec_unitprice_night,
			String gas_account, String last_gas_degree, String now_gas_degree,
			String gas_unitprice, String cableTV, String cableTV_account,
			String cableTV_date, String cableTV_money, String cleaning_price,
			String total_money, String phone, String decoration,
			String application, String remark) {
		super();
		this.house_id = house_id;
		this.water_account = water_account;
		this.last_water_degree = last_water_degree;
		this.now_water_degree = now_water_degree;
		this.water_unitprice = water_unitprice;
		this.elec_account = elec_account;
		this.last_elec_degree_day = last_elec_degree_day;
		this.last_elec_degree_night = last_elec_degree_night;
		this.now_elec_degree_day = now_elec_degree_day;
		this.now_elec_degree_night = now_elec_degree_night;
		this.elec_unitprice_day = elec_unitprice_day;
		this.elec_unitprice_night = elec_unitprice_night;
		this.gas_account = gas_account;
		this.last_gas_degree = last_gas_degree;
		this.now_gas_degree = now_gas_degree;
		this.gas_unitprice = gas_unitprice;
		this.cableTV = cableTV;
		this.cableTV_account = cableTV_account;
		this.cableTV_date = cableTV_date;
		this.cableTV_money = cableTV_money;
		this.cleaning_price = cleaning_price;
		this.total_money = total_money;
		this.phone = phone;
		this.decoration = decoration;
		this.application = application;
		this.remark = remark;
	}

	public String getApplication() {
		return application;
	}

	public void setApplication(String application) {
		this.application = application;
	}

	public String getHouse_id() {
		return house_id;
	}
	public void setHouse_id(String house_id) {
		this.house_id = house_id;
	}
	public String getWater_account() {
		return water_account;
	}
	public void setWater_account(String water_account) {
		this.water_account = water_account;
	}
	public String getLast_water_degree() {
		return last_water_degree;
	}
	public void setLast_water_degree(String last_water_degree) {
		this.last_water_degree = last_water_degree;
	}
	public String getNow_water_degree() {
		return now_water_degree;
	}
	public void setNow_water_degree(String now_water_degree) {
		this.now_water_degree = now_water_degree;
	}
	public String getWater_unitprice() {
		return water_unitprice;
	}
	public void setWater_unitprice(String water_unitprice) {
		this.water_unitprice = water_unitprice;
	}
	public String getElec_account() {
		return elec_account;
	}
	public void setElec_account(String elec_account) {
		this.elec_account = elec_account;
	}
	public String getLast_elec_degree_day() {
		return last_elec_degree_day;
	}
	public void setLast_elec_degree_day(String last_elec_degree_day) {
		this.last_elec_degree_day = last_elec_degree_day;
	}
	public String getLast_elec_degree_night() {
		return last_elec_degree_night;
	}
	public void setLast_elec_degree_night(String last_elec_degree_night) {
		this.last_elec_degree_night = last_elec_degree_night;
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
	public String getElec_unitprice_day() {
		return elec_unitprice_day;
	}
	public void setElec_unitprice_day(String elec_unitprice_day) {
		this.elec_unitprice_day = elec_unitprice_day;
	}
	public String getElec_unitprice_night() {
		return elec_unitprice_night;
	}
	public void setElec_unitprice_night(String elec_unitprice_night) {
		this.elec_unitprice_night = elec_unitprice_night;
	}
	public String getGas_account() {
		return gas_account;
	}
	public void setGas_account(String gas_account) {
		this.gas_account = gas_account;
	}
	public String getLast_gas_degree() {
		return last_gas_degree;
	}
	public void setLast_gas_degree(String last_gas_degree) {
		this.last_gas_degree = last_gas_degree;
	}
	public String getNow_gas_degree() {
		return now_gas_degree;
	}
	public void setNow_gas_degree(String now_gas_degree) {
		this.now_gas_degree = now_gas_degree;
	}
	public String getGas_unitprice() {
		return gas_unitprice;
	}
	public void setGas_unitprice(String gas_unitprice) {
		this.gas_unitprice = gas_unitprice;
	}
	public String getCableTV() {
		return cableTV;
	}
	public void setCableTV(String cableTV) {
		this.cableTV = cableTV;
	}
	public String getCableTV_account() {
		return cableTV_account;
	}
	public void setCableTV_account(String cableTV_account) {
		this.cableTV_account = cableTV_account;
	}
	public String getCableTV_date() {
		return cableTV_date;
	}
	public void setCableTV_date(String cableTV_date) {
		this.cableTV_date = cableTV_date;
	}
	public String getCableTV_money() {
		return cableTV_money;
	}
	public void setCableTV_money(String cableTV_money) {
		this.cableTV_money = cableTV_money;
	}
	public String getCleaning_price() {
		return cleaning_price;
	}
	public void setCleaning_price(String cleaning_price) {
		this.cleaning_price = cleaning_price;
	}
	public String getTotal_money() {
		return total_money;
	}
	public void setTotal_money(String total_money) {
		this.total_money = total_money;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getDecoration() {
		return decoration;
	}
	public void setDecoration(String decoration) {
		this.decoration = decoration;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
