package com.yhtech.igjia.domain;

/**
 * Created by 1 on 2017/7/11.
 */
public class Statistics {
    private int count;
    private String district;
    private String name;
    private String date;
    private String state;
    public Statistics() {
    }

    public Statistics(int count, String district, String name, String date, String state) {
        this.count = count;
        this.district = district;
        this.name = name;
        this.date = date;
        this.state = state;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDistrict() {

        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public int getCount() {

        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
