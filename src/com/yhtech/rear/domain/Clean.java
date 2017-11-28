package com.yhtech.rear.domain;

/**
 * Created by 1 on 2017/11/24.
 */
public class Clean {
    private int id;
    private String house_id;
    private String district;
    private String address;
    private String job_no;
    private String renter_name;
    private String renter_telephone;
    private String contract_startdate;
    private String state;


    private int cleandate_id;
    private String clean_date;
    private String status;
    private String create_name;
    private String crate_date;
    private String remark;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHouse_id() {
        return house_id;
    }

    public void setHouse_id(String house_id) {
        this.house_id = house_id;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getJob_no() {
        return job_no;
    }

    public void setJob_no(String job_no) {
        this.job_no = job_no;
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

    public String getContract_startdate() {
        return contract_startdate;
    }

    public void setContract_startdate(String contract_startdate) {
        this.contract_startdate = contract_startdate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getCleandate_id() {
        return cleandate_id;
    }

    public void setCleandate_id(int cleandate_id) {
        this.cleandate_id = cleandate_id;
    }

    public String getClean_date() {
        return clean_date;
    }

    public void setClean_date(String clean_date) {
        this.clean_date = clean_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreate_name() {
        return create_name;
    }

    public void setCreate_name(String create_name) {
        this.create_name = create_name;
    }

    public String getCrate_date() {
        return crate_date;
    }

    public void setCrate_date(String crate_date) {
        this.crate_date = crate_date;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

}
