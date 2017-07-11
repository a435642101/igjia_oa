//package com.yhtech.websocket;
//
//import java.io.UnsupportedEncodingException;
//import java.net.URLDecoder;
//
//import javax.servlet.http.HttpServletRequest;
//
//
//import org.apache.catalina.websocket.StreamInbound;
//import org.apache.catalina.websocket.WebSocketServlet;
//
//import javax.servlet.annotation.WebServlet;
//
//@SuppressWarnings("deprecation")
//@WebServlet(urlPatterns = { "/message"})
//public class WebSocket extends WebSocketServlet{
//	 private static final long serialVersionUID = 1L;
//	@Override
//	protected StreamInbound createWebSocketInbound(String subProtocol,HttpServletRequest request) {
//		// TODO Auto-generated method stub
//		String userid = null;
//		try {
//		//	System.out.println(admindao.listAll());
//			userid = URLDecoder.decode(request.getParameter("userid"),"utf-8");
//			System.out.println(userid);
//		} catch (UnsupportedEncodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return new WebSocketMessageInbound(userid);
//	}
//
//}
