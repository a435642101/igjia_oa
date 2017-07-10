package com.peter.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

/* *
 *类名：StreamTool
 *功能：读取输入流
 *详细：将读取的输入流转为字节或字符串输出
 *版本：1.0
 *日期：2016-07-11
 *author:TYShi
 */
public class StreamTool {

		
	/**
	 * 读取流中的数据
	 * @param inStream
	 * @return	字节
	 * @throws Exception
	 */
	public static byte[] read(InputStream inStream) throws Exception{
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int len = 0;
		while((len = inStream.read(buffer)) !=-1){
			outStream.write(buffer, 0, len);
		}
		inStream.close();
		
		return outStream.toByteArray();
	}
	
	/**
	 * 读取流中的数据
	 * @param inStream
	 * @return	字符串
	 * @throws Exception
	 */
	public static String readReturnString(InputStream inStream) throws Exception{
		BufferedReader br = new BufferedReader(new InputStreamReader(inStream,"utf-8"));  
        StringBuffer resBuffer = new StringBuffer();  
        String resTemp = "";  
        while((resTemp = br.readLine()) != null){  
            resBuffer.append(resTemp);  
        }  
		
		return resBuffer.toString();
	}

}
