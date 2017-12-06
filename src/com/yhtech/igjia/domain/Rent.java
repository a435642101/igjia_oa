package com.yhtech.igjia.domain;

public class Rent {
	private String house_id;				//房源ID唯一
	private String address;				//房源地址
	private String contract_no;			//入房合同编号
	private String name;			//业务员
	private String region_manager;		//区域经理
	private String service_provider;	//出房服务商
	private String provider_money;			//出房费
	private String renter_name;			//租客名字
	private String renter_telephone;	//租客手机号
	private String renter_idcard;		//租客身份证号
	private String contract_date;		//合同签约日期
	private String contract_startdate;	//合同生效起始日期
	private String contract_enddate;	//合同结束日期
	private String contract_month;		//合同期限（月份）
	private String firstyear_monthrent;	//首年月租金
	private String secondyear_monthrent;	//次年月租金
	private String thirdyear_monthrent;	//第三年月租金
	private String fourthyear_monthrent;	//第四年月租金
	private String fifthyear_monthrent;	//第五年月租金
	private String sixthyear_monthrent;	//第五年月租金
	private String firststage_rent;		//第一期房租金额
	private String payrent_time;		//付房租日期
	private String paymethod;				//支付方式（30日or60日...）	
	private String deposit;				//押金金额	
	private String monthpay_provider;	//月付申请服务商
	private String monthpay_state;		//月付申请状态
	private String remark;				//备注	
	private String job_no;				//管家工号
	private String room_num;				//该房源房间数
	private String state;				//房源状态
	private String district;			//房子区域
	private String date;				//录入日期
	private String business_area;
	
	public Rent(){}
	
	public Rent(String house_id, String address, String contract_no,
			String name, String region_manager, String service_provider,
			String provider_money, String renter_name, String renter_telephone,
			String renter_idcard, String contract_date,
			String contract_startdate, String contract_enddate,
			String contract_month, String firstyear_monthrent,
			String secondyear_monthrent, String thirdyear_monthrent,
			String fourthyear_monthrent, String fifthyear_monthrent,
			String sixthyear_monthrent, String firststage_rent,
			String payrent_time, String paymethod, String deposit,
			String monthpay_provider, String monthpay_state, String remark,
			String job_no, String room_num, String state, String district,
			String date) {
		super();
		this.house_id = house_id;
		this.address = address;
		this.contract_no = contract_no;
		this.name = name;
		this.region_manager = region_manager;
		this.service_provider = service_provider;
		this.provider_money = provider_money;
		this.renter_name = renter_name;
		this.renter_telephone = renter_telephone;
		this.renter_idcard = renter_idcard;
		this.contract_date = contract_date;
		this.contract_startdate = contract_startdate;
		this.contract_enddate = contract_enddate;
		this.contract_month = contract_month;
		this.firstyear_monthrent = firstyear_monthrent;
		this.secondyear_monthrent = secondyear_monthrent;
		this.thirdyear_monthrent = thirdyear_monthrent;
		this.fourthyear_monthrent = fourthyear_monthrent;
		this.fifthyear_monthrent = fifthyear_monthrent;
		this.sixthyear_monthrent = sixthyear_monthrent;
		this.firststage_rent = firststage_rent;
		this.payrent_time = payrent_time;
		this.paymethod = paymethod;
		this.deposit = deposit;
		this.monthpay_provider = monthpay_provider;
		this.monthpay_state = monthpay_state;
		this.remark = remark;
		this.job_no = job_no;
		this.room_num = room_num;
		this.state = state;
		this.district = district;
		this.date = date;
	}


	public String getBusiness_area() {
		return business_area;
	}

	public void setBusiness_area(String business_area) {
		this.business_area = business_area;
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

	public String getRegion_manager() {
		return region_manager;
	}

	public void setRegion_manager(String region_manager) {
		this.region_manager = region_manager;
	}

	public String getService_provider() {
		return service_provider;
	}

	public void setService_provider(String service_provider) {
		this.service_provider = service_provider;
	}

	public String getProvider_money() {
		return provider_money;
	}

	public void setProvider_money(String provider_money) {
		this.provider_money = provider_money;
	}

	public String getRenter_name() {
		return renter_name;
	}

	public void setRenter_name(String renter_name) {
		this.renter_name = renter_name;
	}

	public String getRenter_telephone() {
		return renter_telephone;
	}

	public void setRenter_telephone(String renter_telephone) {
		this.renter_telephone = renter_telephone;
	}

	public String getRenter_idcard() {
		return renter_idcard;
	}

	public void setRenter_idcard(String renter_idcard) {
		this.renter_idcard = renter_idcard;
	}

	public String getContract_date() {
		return contract_date;
	}

	public void setContract_date(String contract_date) {
		this.contract_date = contract_date;
	}

	public String getContract_startdate() {
		return contract_startdate;
	}

	public void setContract_startdate(String contract_startdate) {
		this.contract_startdate = contract_startdate;
	}

	public String getContract_enddate() {
		return contract_enddate;
	}

	public void setContract_enddate(String contract_enddate) {
		this.contract_enddate = contract_enddate;
	}

	public String getContract_month() {
		return contract_month;
	}

	public void setContract_month(String contract_month) {
		this.contract_month = contract_month;
	}

	public String getFirstyear_monthrent() {
		return firstyear_monthrent;
	}

	public void setFirstyear_monthrent(String firstyear_monthrent) {
		this.firstyear_monthrent = firstyear_monthrent;
	}

	public String getSecondyear_monthrent() {
		return secondyear_monthrent;
	}

	public void setSecondyear_monthrent(String secondyear_monthrent) {
		this.secondyear_monthrent = secondyear_monthrent;
	}

	public String getThirdyear_monthrent() {
		return thirdyear_monthrent;
	}

	public void setThirdyear_monthrent(String thirdyear_monthrent) {
		this.thirdyear_monthrent = thirdyear_monthrent;
	}

	public String getFourthyear_monthrent() {
		return fourthyear_monthrent;
	}

	public void setFourthyear_monthrent(String fourthyear_monthrent) {
		this.fourthyear_monthrent = fourthyear_monthrent;
	}

	public String getFifthyear_monthrent() {
		return fifthyear_monthrent;
	}

	public void setFifthyear_monthrent(String fifthyear_monthrent) {
		this.fifthyear_monthrent = fifthyear_monthrent;
	}

	public String getSixthyear_monthrent() {
		return sixthyear_monthrent;
	}

	public void setSixthyear_monthrent(String sixthyear_monthrent) {
		this.sixthyear_monthrent = sixthyear_monthrent;
	}

	public String getFirststage_rent() {
		return firststage_rent;
	}

	public void setFirststage_rent(String firststage_rent) {
		this.firststage_rent = firststage_rent;
	}

	public String getPayrent_time() {
		return payrent_time;
	}

	public void setPayrent_time(String payrent_time) {
		this.payrent_time = payrent_time;
	}

	public String getPaymethod() {
		return paymethod;
	}

	public void setPaymethod(String paymethod) {
		this.paymethod = paymethod;
	}

	public String getDeposit() {
		return deposit;
	}

	public void setDeposit(String deposit) {
		this.deposit = deposit;
	}

	public String getMonthpay_provider() {
		return monthpay_provider;
	}

	public void setMonthpay_provider(String monthpay_provider) {
		this.monthpay_provider = monthpay_provider;
	}

	public String getMonthpay_state() {
		return monthpay_state;
	}

	public void setMonthpay_state(String monthpay_state) {
		this.monthpay_state = monthpay_state;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getJob_no() {
		return job_no;
	}

	public void setJob_no(String job_no) {
		this.job_no = job_no;
	}

	public String getRoom_num() {
		return room_num;
	}

	public void setRoom_num(String room_num) {
		this.room_num = room_num;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
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
