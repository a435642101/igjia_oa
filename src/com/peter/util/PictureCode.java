package com.peter.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;
import javax.servlet.http.HttpServletResponse;

/**
* 类名：PictureCode 
* 功能：绘制图形验证码
* 版本：1.0
* 修改日期：2016-01-22
* author:TYSShi
**/
public class PictureCode {
	
	public static void drawCode(HttpServletResponse response) throws IOException{
		//1创建一个内存印象（画布）
		BufferedImage image = new BufferedImage(100,34,BufferedImage.TYPE_INT_RGB);
		//2获得画笔
		Graphics g = image.getGraphics();
		//3给画笔设置颜色
		g.setColor(new Color(255,255,255));
		//4给画布设置背景颜色
		g.fillRect(0,0,100,34);
		//5重新设置画笔颜色
		Random r = new Random();
		g.setColor(new Color(r.nextInt(111),r.nextInt(255),r.nextInt(255)));
		//6生成一个随机数（验证码）
		//	String number = r.nextInt(89999)+10000+"";
		String number = code();
		//7绘制number
		g.setFont(new Font(null,Font.ITALIC,25));
		g.drawString(number, 10, 30);
		//加一些干扰线
		for(int i=0;i<8;i++){
			g.setColor(new Color(r.nextInt(255)));
			g.drawLine(r.nextInt(120),r.nextInt(30),r.nextInt(120),r.nextInt(30));
		}
		
		//二，压缩图片，发送给浏览器jpg
		//1,设置服务器返回的数据类型（图片）
		response.setContentType("image/jpeg");
		//2,获得自己输出流
		OutputStream ops = response.getOutputStream();
		//3，压缩图片，输出
		javax.imageio.ImageIO.write(image, "jpeg",ops);
		ops.close();
	}	
	
		public static String code(){
			String number="";
			char[] chars = {'A','B','C','D','E','F','G','H','I','J',
					'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
					'1','2','3','4','5','6','7','8','9','0'};
			Random r= new Random();
			for(int i=0;i<5;i++){
				number+=chars[r.nextInt(chars.length)];
			}
			return number;
		}
}
