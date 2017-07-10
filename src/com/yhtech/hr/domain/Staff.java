package com.yhtech.hr.domain;

public class Staff {
	private String job_no;//工号	
	private String pwd;	//密码
	private String department;//部门
	private String name;	//名字
	private String position; //职位
	private String permission; //权限等级
	private String district; //组别
	private String origo;	//户籍所在地
	private String address;	//现居住地址
	private String idcard;	//身份证号
	private String prfunds;//公积金账户
	private String telephone;	//手机号
	private String social_security;	//社保账户
	private String emergency_contactname; //紧急联系人
	private String emergency_contacttelephone; //紧急联系人电话
	private String regist_date;	//注册时间
	private String login_date;	//上次登录时间
	private String state;	//账号状态
	private String email;	//邮箱
	private String vxin;	//微信号
	
	
	public Staff(){}
	public Staff(String job_no, String pwd, String department, String name,
			String position, String permission, String district, String origo,
			String address, String idcard, String prfunds, String telephone,
			String social_security, String emergency_contactname,
			String emergency_contacttelephone, String regist_date,
			String login_date, String state, String email, String vxin) {
		super();
		this.job_no = job_no;
		this.pwd = pwd;
		this.department = department;
		this.name = name;
		this.position = position;
		this.permission = permission;
		this.district = district;
		this.origo = origo;
		this.address = address;
		this.idcard = idcard;
		this.prfunds = prfunds;
		this.telephone = telephone;
		this.social_security = social_security;
		this.emergency_contactname = emergency_contactname;
		this.emergency_contacttelephone = emergency_contacttelephone;
		this.regist_date = regist_date;
		this.login_date = login_date;
		this.state = state;
		this.email = email;
		this.vxin = vxin;
	}
	public String getPrfunds() {
		return prfunds;
	}
	public void setPrfunds(String prfunds) {
		this.prfunds = prfunds;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getVxin() {
		return vxin;
	}
	public void setVxin(String vxin) {
		this.vxin = vxin;
	}
	public String getJob_no() {
		return job_no;
	}
	public void setJob_no(String jobNo) {
		job_no = jobNo;
	}
	
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
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
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getOrigo() {
		return origo;
	}
	public void setOrigo(String origo) {
		this.origo = origo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getIdcard() {
		return idcard;
	}
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getSocial_security() {
		return social_security;
	}
	public void setSocial_security(String socialSecurity) {
		social_security = socialSecurity;
	}
	public String getEmergency_contactname() {
		return emergency_contactname;
	}
	public void setEmergency_contactname(String emergencyContactname) {
		emergency_contactname = emergencyContactname;
	}
	public String getEmergency_contacttelephone() {
		return emergency_contacttelephone;
	}
	public void setEmergency_contacttelephone(String emergencyContacttelephone) {
		emergency_contacttelephone = emergencyContacttelephone;
	}
	public String getRegist_date() {
		return regist_date;
	}
	public void setRegist_date(String registDate) {
		regist_date = registDate;
	}
	public String getLogin_date() {
		return login_date;
	}
	public void setLogin_date(String loginDate) {
		login_date = loginDate;
	}

	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}

	
}
