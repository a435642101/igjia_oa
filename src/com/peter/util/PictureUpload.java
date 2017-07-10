package com.peter.util;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/* *
 *类名：PictureUpload
 *功能：上传图片类
 *详细：用于提交待图片的表单
 *版本：1.0
 *日期：2016-07-11
 *author:TYShi
 */
public class PictureUpload {
	
	/**
	 * 过滤表单文本，向服务器传图片
	 * @param path 图片存储的路径
	 * @param request
	 */
	public static void pictureupload(String path,List<String> list,Map<String,String> map,HttpServletRequest request){
		boolean isMultipart = ServletFileUpload.isMultipartContent(request);
		if(isMultipart){
			path = createpath(path);
			
			try{
				FileItemFactory factory = new DiskFileItemFactory();
				ServletFileUpload upload = new ServletFileUpload(factory);
				List<FileItem> items = upload.parseRequest(request);
				String dir = path;
				File dirFile = new File(dir);
				if(!dirFile.exists()){
					dirFile.mkdirs();
				}
				for(FileItem item:items){
					if(item.isFormField()){		//文本类型
						String name = item.getFieldName();
						String value = item.getString();
						map.put(name, value);					
					}else{				//文件类型					
						String picname = UtilDate.getOrderNum()+item.getName();
						File saveFile = new File(dirFile,picname);
						item.write(saveFile);
						list.add(picname);
					}
				}
			}catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
			}
		}
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
	
	/**
	 * 重命名文件
	 * @param file 原文件路径文件名
	 * @param toFile 修改的路径文件名
	 */
	public static String renameFile(String file, String toFile) {

        File toBeRenamed = new File(file);
        //检查要重命名的文件是否存在，是否是文件
        if (!toBeRenamed.exists() || toBeRenamed.isDirectory()) {        
            return "error";
        }

        File newFile = new File(toFile);
        if(newFile.exists()) newFile.delete();	//如果存在删除
        
        //修改文件名
        if (toBeRenamed.renameTo(newFile)) {
        	return "success";
        } else {
        	return "fail";
        }
    }
}
