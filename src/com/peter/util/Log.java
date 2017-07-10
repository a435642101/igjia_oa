package com.peter.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;


/* *
 *类名：Log
 *功能：自定义日志打印类
 *详细：打印日志
 *版本：1.0
 *日期：2016-07-11
 *author:TYShi
 */
public class Log {
    public static Logger logger = LoggerFactory.getLogger(Log.class);
	/**
	 * 日志记录
	 * @param sWord 日志的内容
	 * @param path 路径（d://）
	 */
    public static void logResult(String sWord,String path) {
        logger.info("================================LOG===================:"+path+sWord);
//        FileWriter writer = null;
//        try {
//        	path = createpath(path);
//            writer = new FileWriter(path+"\\log"+UtilDate.getDate()+".txt",true);
//            writer.write(sWord);
//        } catch (Exception e) {
//            e.printStackTrace();
//        } finally {
//            if (writer != null) {
//                try {
//                    writer.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
    }
    
    /**
	 * 生成新的路径
	 * @param path
	 * @return
	 */
	private static String createpath(String path) {
		File saveDir = new File(path+"\\"+UtilDate.getMonth());//初始化上传文件后的保存目录 
		 if(!saveDir.exists()){
			 saveDir.mkdir();
		 }
		 path=path+"\\"+UtilDate.getMonth();
		return path;
	}
    
}
