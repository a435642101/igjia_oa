package com.yhtech.websocket;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;


public class WebSocketMessageInboundPool {
	//保存连接的MAP容器  
    private static final Map<String,WebSocketMessageInbound > connections = new HashMap<String,WebSocketMessageInbound>();  


	/**
	 * 获取所有在线用户
	 * @return
	 */
	public static Set<String> getOnlineUser() {
		// TODO Auto-generated method stub
		return connections.keySet(); 
	}

	/**
	 * 增加连接
	 * @param webSocketMessageInbound
	 */
	public static void addMessageInbound(WebSocketMessageInbound webSocketMessageInbound) {
		// TODO Auto-generated method stub
		 //添加连接  
System.out.println("user : " + webSocketMessageInbound.getUserid() + " join..");  
        connections.put(webSocketMessageInbound.getUserid(), webSocketMessageInbound);  
    }

	/**
	 * 向所有在线用户发送信息
	 * @param string
	 */
	@SuppressWarnings("deprecation")
	public static void sendMessage(String message) {
		// TODO Auto-generated method stub
		try {  
            Set<String> keySet = connections.keySet();  
            for (String key : keySet) {  
                WebSocketMessageInbound inbound = connections.get(key);  
                if(inbound != null){  
System.out.println("send message to user : " + key + " ,message content : " + message);  
                    inbound.getWsOutbound().writeTextMessage(CharBuffer.wrap(message));  
                }  
            }  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
	}
	
	 @SuppressWarnings("deprecation")
	public static void sendMessageToUser(String userid,String message){  
		 	try {  
	            //向特定的用户发送数据  
System.out.println("send message to user : " + userid + " ,message content : " + message);
	            WebSocketMessageInbound inbound = connections.get(userid);  
	            if(inbound != null){  
	                inbound.getWsOutbound().writeTextMessage(CharBuffer.wrap(message));  
	            }  
	        } catch (IOException e) {  
	            e.printStackTrace();  
	        } 
	    } 

	/**
	 * 退出
	 * @param webSocketMessageInbound
	 */
	public static void removeMessageInbound(
			WebSocketMessageInbound webSocketMessageInbound) {
		// TODO Auto-generated method stub
		//移除连接  
System.out.println("user : " + webSocketMessageInbound.getUserid() + " exit..");  
        connections.remove(webSocketMessageInbound.getUserid());  
	}

}
