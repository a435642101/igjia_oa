package com.yhtech.igjia.domain;

public class House {
	private String house_id;			//房源ID唯一
	private String city;			//房源所在城市
	private String region;			//房源所属区域
	private String estate;			//房源所在小区
	private String business_area;	//商圈
	private String address;			//房源具体地址
	private String fangdong_name;	//房东名字
	private String fangdong_telephone;//房东电话
	private String fangdong_idcard;		//房东身份证
	private String shoukuanren_name;		//收款人名字
	private String shoukuanren_telephone;	//收款人电话号码
	private String shoukuanren_kaihuhang;	//收款人开户行
	private String shoukuanren_account;		//收款人银行账户
	private String house_type;		//户型
	private String area;			//面积
	private String room_area;		//放房间面积
	private String room_chaoxiang;	//房间朝向
	private String room_tese;		//房间特色
	private String room_yuqichufangjia;	//房间预期出房价格
	
	private String contract_no;		//入房合同编号
	private String contract_date;	//合同签约日期
	private String contract_startdate;	//合同生效起始日期
	private String contract_enddate;	//合同结束日期
	private String contract_month;		//合同期限（月份）
	private String finish_date;		//后勤完工时间
	private String vacancy_date;		//空置期开始日期
	private String firstyear_monthrent;	//首年月租金
	private String secondyear_monthrent;	//次年月租金
	private String thirdyear_monthrent;	//第三年月租金
	private String fourthyear_monthrent;	//第四年月租金
	private String fifthyear_monthrent;	//第五年月租金
	private String sixthyear_monthrent;	//第五年月租金
	private String pay_nextyear;		//次年是否支付13个月
	private String pay_date;			//打款日期
	private String name;			//业务员
	private String region_manager;		//区域经理
	private String totalcost;				//该房子总共花费的成本
	private String paymethod;				//支付方式（30日or60日...）
	private String deposit;				//押金
	private String overdue_payment;		//逾期赔付金额
	private String remark;				//备注
	private String house_provider;		//进房服务商
	private String provider_money;		//入房中介费
	private String job_no;				//管家工号
	private String room_num;				//该房源房间数
	private String state;				//房源状态
	private String district;			//房子区域
	private String date;				//录入日期

	private Integer ls_id;


	
	
	public House(){}

	public House(String house_id, String city, String region, String estate,
				 String business_area, String address, String fangdong_name,
				 String fangdong_telephone, String fangdong_idcard,
				 String shoukuanren_name, String shoukuanren_telephone,
				 String shoukuanren_kaihuhang, String shoukuanren_account,
				 String house_type, String area, String room_area,
				 String room_chaoxiang, String room_tese,
				 String room_yuqichufangjia, String contract_no,
				 String contract_date, String contract_startdate,
				 String contract_enddate, String contract_month,
				 String vacancy_date, String firstyear_monthrent,
				 String secondyear_monthrent, String thirdyear_monthrent,
				 String fourthyear_monthrent, String fifthyear_monthrent,
				 String sixthyear_monthrent, String pay_nextyear, String pay_date,
				 String name, String region_manager, String totalcost,
				 String paymethod, String deposit, String overdue_payment,
				 String remark, String house_provider, String provider_money,
				 String job_no, String room_num, String state, String district,
				 String date,Integer ls_id) {
		super();
		this.house_id = house_id;
		this.city = city;
		this.region = region;
		this.estate = estate;
		this.business_area = business_area;
		this.address = address;
		this.fangdong_name = fangdong_name;
		this.fangdong_telephone = fangdong_telephone;
		this.fangdong_idcard = fangdong_idcard;
		this.shoukuanren_name = shoukuanren_name;
		this.shoukuanren_telephone = shoukuanren_telephone;
		this.shoukuanren_kaihuhang = shoukuanren_kaihuhang;
		this.shoukuanren_account = shoukuanren_account;
		this.house_type = house_type;
		this.area = area;
		this.room_area = room_area;
		this.room_chaoxiang = room_chaoxiang;
		this.room_tese = room_tese;
		this.room_yuqichufangjia = room_yuqichufangjia;
		this.contract_no = contract_no;
		this.contract_date = contract_date;
		this.contract_startdate = contract_startdate;
		this.contract_enddate = contract_enddate;
		this.contract_month = contract_month;
		this.vacancy_date = vacancy_date;
		this.firstyear_monthrent = firstyear_monthrent;
		this.secondyear_monthrent = secondyear_monthrent;
		this.thirdyear_monthrent = thirdyear_monthrent;
		this.fourthyear_monthrent = fourthyear_monthrent;
		this.fifthyear_monthrent = fifthyear_monthrent;
		this.sixthyear_monthrent = sixthyear_monthrent;
		this.pay_nextyear = pay_nextyear;
		this.pay_date = pay_date;
		this.name = name;
		this.region_manager = region_manager;
		this.totalcost = totalcost;
		this.paymethod = paymethod;
		this.deposit = deposit;
		this.overdue_payment = overdue_payment;
		this.remark = remark;
		this.house_provider = house_provider;
		this.provider_money = provider_money;
		this.job_no = job_no;
		this.room_num = room_num;
		this.state = state;
		this.district = district;
		this.date = date;
		this.ls_id = ls_id;
	}

	public House(String house_id, String city, String region, String estate,
				 String business_area, String address, String fangdong_name,
				 String fangdong_telephone, String fangdong_idcard,
				 String shoukuanren_name, String shoukuanren_telephone,
				 String shoukuanren_kaihuhang, String shoukuanren_account,
				 String house_type, String area, String room_area,
				 String room_chaoxiang, String room_tese,
				 String room_yuqichufangjia, String contract_no,
				 String contract_date, String contract_startdate,
				 String contract_enddate, String contract_month,
				 String vacancy_date, String firstyear_monthrent,
				 String secondyear_monthrent, String thirdyear_monthrent,
				 String fourthyear_monthrent, String fifthyear_monthrent,
				 String sixthyear_monthrent, String pay_nextyear, String pay_date,
				 String name, String region_manager, String totalcost,
				 String paymethod, String deposit, String overdue_payment,
				 String remark, String house_provider, String provider_money,
				 String job_no, String room_num, String state, String district,
				 String date) {
		super();
		this.house_id = house_id;
		this.city = city;
		this.region = region;
		this.estate = estate;
		this.business_area = business_area;
		this.address = address;
		this.fangdong_name = fangdong_name;
		this.fangdong_telephone = fangdong_telephone;
		this.fangdong_idcard = fangdong_idcard;
		this.shoukuanren_name = shoukuanren_name;
		this.shoukuanren_telephone = shoukuanren_telephone;
		this.shoukuanren_kaihuhang = shoukuanren_kaihuhang;
		this.shoukuanren_account = shoukuanren_account;
		this.house_type = house_type;
		this.area = area;
		this.room_area = room_area;
		this.room_chaoxiang = room_chaoxiang;
		this.room_tese = room_tese;
		this.room_yuqichufangjia = room_yuqichufangjia;
		this.contract_no = contract_no;
		this.contract_date = contract_date;
		this.contract_startdate = contract_startdate;
		this.contract_enddate = contract_enddate;
		this.contract_month = contract_month;
		this.vacancy_date = vacancy_date;
		this.firstyear_monthrent = firstyear_monthrent;
		this.secondyear_monthrent = secondyear_monthrent;
		this.thirdyear_monthrent = thirdyear_monthrent;
		this.fourthyear_monthrent = fourthyear_monthrent;
		this.fifthyear_monthrent = fifthyear_monthrent;
		this.sixthyear_monthrent = sixthyear_monthrent;
		this.pay_nextyear = pay_nextyear;
		this.pay_date = pay_date;
		this.name = name;
		this.region_manager = region_manager;
		this.totalcost = totalcost;
		this.paymethod = paymethod;
		this.deposit = deposit;
		this.overdue_payment = overdue_payment;
		this.remark = remark;
		this.house_provider = house_provider;
		this.provider_money = provider_money;
		this.job_no = job_no;
		this.room_num = room_num;
		this.state = state;
		this.district = district;
		this.date = date;
	}

	public Integer getLs_id() {
		return ls_id;
	}

	public void setLs_id(Integer ls_id) {
		this.ls_id = ls_id;
	}

	public String getFinish_date() {
		return finish_date;
	}

	public void setFinish_date(String finish_date) {
		this.finish_date = finish_date;
	}

	public String getHouse_id() {
		return house_id;
	}

	public void setHouse_id(String house_id) {
		this.house_id = house_id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getEstate() {
		return estate;
	}

	public void setEstate(String estate) {
		this.estate = estate;
	}

	public String getBusiness_area() {
		return business_area;
	}

	public void setBusiness_area(String business_area) {
		this.business_area = business_area;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFangdong_name() {
		return fangdong_name;
	}

	public void setFangdong_name(String fangdong_name) {
		this.fangdong_name = fangdong_name;
	}

	public String getFangdong_telephone() {
		return fangdong_telephone;
	}

	public void setFangdong_telephone(String fangdong_telephone) {
		this.fangdong_telephone = fangdong_telephone;
	}

	public String getFangdong_idcard() {
		return fangdong_idcard;
	}

	public void setFangdong_idcard(String fangdong_idcard) {
		this.fangdong_idcard = fangdong_idcard;
	}

	public String getShoukuanren_name() {
		return shoukuanren_name;
	}

	public void setShoukuanren_name(String shoukuanren_name) {
		this.shoukuanren_name = shoukuanren_name;
	}

	public String getShoukuanren_telephone() {
		return shoukuanren_telephone;
	}

	public void setShoukuanren_telephone(String shoukuanren_telephone) {
		this.shoukuanren_telephone = shoukuanren_telephone;
	}

	public String getShoukuanren_kaihuhang() {
		return shoukuanren_kaihuhang;
	}

	public void setShoukuanren_kaihuhang(String shoukuanren_kaihuhang) {
		this.shoukuanren_kaihuhang = shoukuanren_kaihuhang;
	}

	public String getShoukuanren_account() {
		return shoukuanren_account;
	}

	public void setShoukuanren_account(String shoukuanren_account) {
		this.shoukuanren_account = shoukuanren_account;
	}

	public String getHouse_type() {
		return house_type;
	}

	public void setHouse_type(String house_type) {
		this.house_type = house_type;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getRoom_area() {
		return room_area;
	}

	public void setRoom_area(String room_area) {
		this.room_area = room_area;
	}

	public String getRoom_chaoxiang() {
		return room_chaoxiang;
	}

	public void setRoom_chaoxiang(String room_chaoxiang) {
		this.room_chaoxiang = room_chaoxiang;
	}

	public String getRoom_tese() {
		return room_tese;
	}

	public void setRoom_tese(String room_tese) {
		this.room_tese = room_tese;
	}

	public String getRoom_yuqichufangjia() {
		return room_yuqichufangjia;
	}

	public void setRoom_yuqichufangjia(String room_yuqichufangjia) {
		this.room_yuqichufangjia = room_yuqichufangjia;
	}

	public String getContract_no() {
		return contract_no;
	}

	public void setContract_no(String contract_no) {
		this.contract_no = contract_no;
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

	public String getVacancy_date() {
		return vacancy_date;
	}

	public void setVacancy_date(String vacancy_date) {
		this.vacancy_date = vacancy_date;
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

	public String getPay_nextyear() {
		return pay_nextyear;
	}

	public void setPay_nextyear(String pay_nextyear) {
		this.pay_nextyear = pay_nextyear;
	}

	public String getPay_date() {
		return pay_date;
	}

	public void setPay_date(String pay_date) {
		this.pay_date = pay_date;
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

	public String getTotalcost() {
		return totalcost;
	}

	public void setTotalcost(String totalcost) {
		this.totalcost = totalcost;
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

	public String getOverdue_payment() {
		return overdue_payment;
	}

	public void setOverdue_payment(String overdue_payment) {
		this.overdue_payment = overdue_payment;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getHouse_provider() {
		return house_provider;
	}

	public void setHouse_provider(String house_provider) {
		this.house_provider = house_provider;
	}

	public String getProvider_money() {
		return provider_money;
	}

	public void setProvider_money(String provider_money) {
		this.provider_money = provider_money;
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
