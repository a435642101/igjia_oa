package com.peter.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Random;

/* *
 *类名：UtilDate
 *功能：自定义订单类
 *详细：工具类，可以用作获取系统日期、订单编号等
 *版本：1.0
 *日期：2016-01-22
 *author:TYShi
 */
public class UtilDate {
	
    /** 年月日时分秒(无下划线) yyyyMMddHHmmss */
    public static final String dtLong                  = "yyyyMMddHHmmss";
    
    /** 完整时间 yyyy-MM-dd HH:mm:ss */
    public static final String simple                  = "yyyy-MM-dd HH:mm:ss";
    
    /** 年月日(无下划线) yyyyMMdd */
    public static final String dtShort                 = "yyyyMMdd";
    
    /** 年月日(下划线) yyyy-MM-dd */
    public static final String Short                 = "yyyy-MM-dd";
    /** 年月(下划线) yyyyMM */
    public static final String Month                = "yyyyMM";
    
    /**
	 * 获取系统当期年月，格式：yyyyMM
	 * @return
	 */
	public static String getMonth(){
		Date date=new Date();
		DateFormat df=new SimpleDateFormat(Month);
		return df.format(date);
	}
    
    /**
     * 返回系统当前时间(精确到毫秒),作为一个唯一的订单编号
     * @return
     *      以yyyyMMddHHmmss为格式的当前系统时间
     */
	public  static String getOrderNum(){
		Date date=new Date();
		DateFormat df=new SimpleDateFormat(dtLong);
		return df.format(date);
	}
	
	/**
	 * 获取系统当前日期(精确到毫秒)，格式：yyyy-MM-dd HH:mm:ss
	 * @return
	 */
	public  static String getDateFormatter(){
		Date date=new Date();
		DateFormat df=new SimpleDateFormat(simple);
		return df.format(date);
	}
	
	/**
	 * 获取系统当期年月日(精确到天)，格式：yyyyMMdd
	 * @return
	 */
	public static String getDate(){
		Date date=new Date();
		DateFormat df=new SimpleDateFormat(dtShort);
		return df.format(date);
	}
	
	/**
	 * 获取系统当期年月日(精确到天)，格式：yyyy-MM-dd
	 * @return
	 */
	public static String getDate1(){
		Date date=new Date();
		DateFormat df=new SimpleDateFormat(Short);
		return df.format(date);
	}
	
	/**
	 * 获取时间戳
	 */
	public static String getTimeStamp(){
		Date date = new Date();
		long timestamp = date.getTime()/1000;
		String timestamp1 = Long.toString(timestamp);
		return timestamp1;
	}
	
	
	/**
	 * 产生随机的三位数
	 * @return
	 */
	public static String getThree(){
		Random rad=new Random();
		return rad.nextInt(1000)+"";
	}
	
	/**
	 * 批量生成日期
	 * @param date 起始日期  eg:2016-12-19
	 * @param times		生成日期的次数
	 * @param month		日期间隔几个月
	 * @return	返回日期的集合
	 */
	public static List<String> getTimeList(String date,int times,int month){
		List<String> list = new ArrayList<String>();
		Calendar calendar = Calendar.getInstance(Locale.CHINA);
		String[] arrdate = date.split("-");
	      for(int i=0;i<times;i++){
	    	  calendar.set(Integer.parseInt(arrdate[0])+(month*i+Integer.parseInt(arrdate[1])-1)/12,(month*i+Integer.parseInt(arrdate[1])-1)%12,Integer.parseInt(arrdate[2]));
	    	  String str = (new SimpleDateFormat("yyyy-MM-dd")).format(calendar.getTime());  
		      list.add(str);
	      }	  
	      return list;
	}
	
	/**
	 * 获得当前月第一天
	 */
	public static String getMonthFirst(){
		SimpleDateFormat format = new SimpleDateFormat(Short); 
		Calendar c = Calendar.getInstance();    
        c.add(Calendar.MONTH, 0);
         c.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天 
         return format.format(c.getTime());
	}
	
	/**
	 * 获得当前月最后一天
	 */
	public static String getMonthlast(){
		SimpleDateFormat format = new SimpleDateFormat(Short);
		Calendar ca = Calendar.getInstance();    
        ca.set(Calendar.DAY_OF_MONTH, ca.getActualMaximum(Calendar.DAY_OF_MONTH));  
        return format.format(ca.getTime());
	}
	
	/**
	 * 获得上个月第一天
	 * @return
	 */
	public static String getLastMonthFirst(){
		SimpleDateFormat format = new SimpleDateFormat(Short);
		Calendar   cal_1=Calendar.getInstance();//获取当前日期 
        cal_1.add(Calendar.MONTH, -1);
	    cal_1.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天 
	    return format.format(cal_1.getTime());
	}
	/**
	 * 获得上个月最后一天
	 * @return
	 */
	public static String getLastMonthLast(){
		SimpleDateFormat format = new SimpleDateFormat(Short);
		 Calendar cale = Calendar.getInstance();   
         cale.set(Calendar.DAY_OF_MONTH,0);//设置为1号,当前日期既为本月第一天 
	    return format.format(cale.getTime());
	}
	
	/**
	 * 本周第一天
	 * @return
	 */
	public static String getWeekStartDate(){
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY); 
		Date date = cal.getTime();
		SimpleDateFormat sdf=new SimpleDateFormat(Short);   
		String str=sdf.format(date);
		return str;
	}
	
	/**
	 * 本周最后一天
	 * @return
	 */
	public static String getWeekEndDate(){
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
		Date date = cal.getTime();
		SimpleDateFormat sdf=new SimpleDateFormat(Short);   
		String str=sdf.format(date);
		return str;
	}
	
	/**
	 * 日子加减
	 * @param date 传入日期
	 * @param day 加减天数
	 * @return 返回日期
	 */
	public static String caldate(String date,int day){
		  //根据当前日期得到前一天的日期
		  SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd"); 
		  Date dd = null;
		try {
			dd = format.parse(date);
		} catch (ParseException e) {
			return date;
		}
		  Calendar calendar1 = Calendar.getInstance();
		  calendar1.setTime(dd);
		  calendar1.add(Calendar.DATE,day);	 
		  String beforeDay = format.format(calendar1.getTime()) ;
		  return beforeDay;
	}
	/**
     * 通过时间秒毫秒数判断两个时间的间隔
     * @param date1
     * @param date2
     * @return
     */
    public static int differentDaysByMillisecond(Date date1,Date date2)
    {
        int days = (int) ((date2.getTime() - date1.getTime()) / (1000*3600*24));
        return days;
    }
}
