package com.peter.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

/**
 * 读取excel 2003版
 * @author TYShi
 *
 */
public class ReadXls {
	/**
	 * 读取excel整列
	 * @param path excel绝对路径
	 * @param col 列（第一列值为1）
	 * @return 第N列的每行组成的集合
	 */
	@SuppressWarnings("static-access")
	public static List<String> readexcel(String path,int col){
		List<String> list= new ArrayList<String>();
		HSSFWorkbook wb=null;
		try {
			wb = new HSSFWorkbook(new FileInputStream(path));
		} catch (FileNotFoundException e) {
			list.add("文件不存在");
			return list;
		} catch (IOException e) {
			list.add("网络错误");
			return list;
		}
		HSSFSheet sheet = wb.getSheetAt(0);
	    HSSFRow row = null;
	    HSSFCell cell = null;
	    int rowNum=sheet.getLastRowNum();							//获得总行数
	    int coloumNum=sheet.getRow(0).getPhysicalNumberOfCells();	//获得总列数
	    if(col>coloumNum){
	    	list.add("超过最大列");
	    	return list;
	    }
	    
		String cellStr = null;
	    for (int i = 0; i <= rowNum; i++){
			row=sheet.getRow(i);
			if(row==null) continue;
			cell=row.getCell(col-1);
			if (cell == null) {// 单元格为空设置cellStr为空串  
				continue;
			}else if(cell.getCellType()==HSSFCell.CELL_TYPE_NUMERIC){	
					if (HSSFDateUtil.isCellDateFormatted(cell)) {//日期格式
						Date d = cell.getDateCellValue();
						DateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
						cellStr= formater.format(d);
					}else{
						cell.setCellType(cell.CELL_TYPE_STRING);
						cellStr = cell.getStringCellValue();
					}
				
	         } else {// 其余按照字符串处理
	        	cellStr = cell.getStringCellValue();
	         }
			list.add(cellStr);
		}
	    return list;
	}
}
