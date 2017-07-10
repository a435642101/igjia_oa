package com.yhtech.websocket;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

import net.sf.json.JSONObject;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;



@SuppressWarnings("deprecation")
public class WebSocketMessageInbound extends MessageInbound {
	//当前连接的用户名称  
    private final String userid; 
	public WebSocketMessageInbound(String userid) {
		// TODO Auto-generated constructor stub
		this.userid = userid;
	}	

	public String getUserid() {
		return userid;
	}



	//建立连接的触发的事件  
    @Override  
    protected void onOpen(WsOutbound outbound) {  
        // 触发连接事件，在连接池中添加连接  
        JSONObject result = new JSONObject();  
        result.element("type", "user_join");  
        result.element("user", this.userid);
        //向所有在线用户推送当前用户上线的消息  
        WebSocketMessageInboundPool.sendMessage(result.toString());  
          
        result = new JSONObject();  
        result.element("type", "get_online_user");  
        result.element("list", WebSocketMessageInboundPool.getOnlineUser());  
        //向连接池添加当前的连接对象  
        WebSocketMessageInboundPool.addMessageInbound(this);  
        //向当前连接发送当前在线用户的列表  
        WebSocketMessageInboundPool.sendMessageToUser(this.userid, result.toString());  
    }  
  
    @Override  
    protected void onClose(int status) {  
        // 触发关闭事件，在连接池中移除连接  
        WebSocketMessageInboundPool.removeMessageInbound(this);  
        JSONObject result = new JSONObject();  
        result.element("type", "user_leave");  
        result.element("user", this.userid);  
        //向在线用户发送当前用户退出的消息  
        WebSocketMessageInboundPool.sendMessage(result.toString());  
    }  
	

	@Override
	protected void onBinaryMessage(ByteBuffer arg0) throws IOException {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Binary message not supported.");  
	}

	@Override
	protected void onTextMessage(CharBuffer message) throws IOException {
		//向所有在线用户发送消息  
		System.out.println(message);
        WebSocketMessageInboundPool.sendMessage(message.toString());
		
	}

}
