package com.yhtech.finance.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.peter.util.Http;
import com.yhtech.finance.dao.IEstateDemoDao;

@Controller("estatecontroller")
public class EstateController {
	@Resource
	private IEstateDemoDao estatedao;
	
	/**
	 * 发送短信
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/estate.do")
	public void estate(HttpServletRequest request,HttpServletResponse response) throws Exception{
//		String[] arr = {"浦东新区","闵行","徐汇","宝山","松江","嘉定","普陀","杨浦","长宁","虹口","静安","黄浦","闸北","卢湾","奉贤","青浦","金山","崇明","上海周边"};
//		String[] arr1 = {"pudong","minhang","xuhui","baoshan","songjiang","jiading","putuo","yangpu","changning","hongkou","jingan","huangpu","zhabei","luwan","fengxian","qingpu","jinshan","chongming","shanghaizhoubian"};		
//		String url = null;
//		for(int ar=0;ar<arr.length;ar++){
//			for(int page=1;page<36;page++){
//				if(page==1){
//					url = "http://www.anjuke.com/shanghai/cm/"+arr1[ar]+"/";
//				}else{
//					url = "http://www.anjuke.com/shanghai/cm/"+arr1[ar]+"/p"+page+"/";
//				} 
//				Map<String,String> param = new HashMap<String,String>();
//				Http hp = Http.getInstance();
//				String result = hp.hp(url,param, "GET");
//				Document doc = Jsoup.parse(result);
//				Elements elements = doc.select("ul.P3").select("li");
//				try {
//					for(int i=0;i<20;i++){
//						Elements z_elements = elements.get(i).select("em");
//						for(Element ele:z_elements){
//							if(ele.select("a").html().contains("大全")) break;
//							System.out.println(arr[ar] +"------"+ele.select("a").html());
////							estatedao.add(arr[ar], ele.select("a").html());
//						}
//					}
//				} catch (Exception e) {
//					// TODO: handle exception
//				}
//				
//			}
//		}
		int total=0;
		//爬区域 商圈
		String url = "https://shanghai.anjuke.com/community/pudong/";
		Map<String,String> param = new HashMap<String,String>();
		Http hp = Http.getInstance();
		String result = hp.hp(url,param, "GET");
		Document doc = Jsoup.parse(result);
		Elements elements = doc.select("div.items").select("span.elems-l").select("a");
		for(int d=1;d<20;d++){
			String href = elements.get(d).attr("href");
			String district = elements.get(d).html();		//上海各区
			String result1 = hp.hp(href,param, "GET");
			Document doc1 = Jsoup.parse(result1);
			Elements elements1 = doc1.select("div.items").select("span.elems-l").select("div.sub-items").select("a");
			for(int b=1;b<elements1.size();b++){		//2
				
				String lasturl = elements1.get(b).attr("href");
				
				String business_area = elements1.get(b).attr("data-id");		//商圈
				String result2 = hp.hp(lasturl,param, "GET");
				Document doc2 = Jsoup.parse(result2);
				Elements elements2 = doc2.select("div.maincontent").select("div.list-content").select("div.sortby").select("span.tit").select("em");
				String num = isNumeric(elements2.html());
				for(int i=1;i<Integer.parseInt(num)/30+2;i++){
					Thread.sleep(250);			//线程睡眠
					String result3=null;
					if(i==1){
						result3 = hp.hp(lasturl,param, "GET");
					}else{
						result3 = hp.hp(lasturl+"p"+i+"/",param, "GET");
					} 
					Document doc3 = Jsoup.parse(result3);
					Elements elements3 = doc3.select("div.list-content").select("div.li-itemmod");
					for(int j=0;j<elements3.size();j++){
						String img = elements3.get(j).select("a").select("img").attr("src");		//小区图片地址
						String name = elements3.get(j).select("div.li-info").select("h3").select("a").html();	//小区名字
						String address = elements3.get(j).select("div.li-info").select("address").text();	//小区地址
						String date = isNumeric(elements3.get(j).select("div.li-info").select("p.date").html());	//小区建造年代
						String price = elements3.get(j).select("div.li-side").select("p").select("strong").html();	//小区均价
						System.out.println("区："+district);
						System.out.println("商圈："+business_area);
						System.out.println("小区："+name);
						System.out.println("地址："+address);
						System.out.println("完工日期："+date);
						System.out.println("小区均价："+price);
						System.out.println("小区图片："+img);
						System.out.println("-------------------");
						total++;
				//		estatedao.add(district,business_area,name,address,date,price,img);
					}
				}
			}
		}	
		System.out.println(total);
	}
	/**
     * 截取数字
     * @param str
     * @return
     */
    public String isNumeric(String str){
	    str=str.trim();
	    	String str2="";
	    	if(str != null && !"".equals(str)){
	    	for(int i=0;i<str.length();i++){
	    	if(str.charAt(i)>=48 && str.charAt(i)<=57){
	    	str2+=str.charAt(i);
	    	}
    	}

    	}
    	return str2;
    }
}
