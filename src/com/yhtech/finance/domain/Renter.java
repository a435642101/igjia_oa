package com.yhtech.finance.domain;

public class Renter {
	private int id;				//
	private String telephone;	//
	private String vxin;		//
	private String headimgurl;	//
	private String nickname;	//
	private String country;		//
	private String province;	//
	private String city;		//
	private String registdate;	//
	private String logindate;	//
	private String state;		//
	
	public Renter(){};
	
	

	
	public Renter(String telephone, String vxin, String headimgurl,
			String nickname, String country, String province, String city,
			String registdate, String logindate, String state) {
		super();
		this.telephone = telephone;
		this.vxin = vxin;
		this.headimgurl = headimgurl;
		this.nickname = nickname;
		this.country = country;
		this.province = province;
		this.city = city;
		this.registdate = registdate;
		this.logindate = logindate;
		this.state = state;
	}




	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
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

	public String getHeadimgurl() {
		return headimgurl;
	}
	public void setHeadimgurl(String headimgurl) {
		this.headimgurl = headimgurl;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getVxin() {
		return vxin;
	}
	public void setVxin(String vxin) {
		this.vxin = vxin;
	}
	public String getRegistdate() {
		return registdate;
	}
	public void setRegistdate(String registdate) {
		this.registdate = registdate;
	}
	public String getLogindate() {
		return logindate;
	}
	public void setLogindate(String logindate) {
		this.logindate = logindate;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
}
