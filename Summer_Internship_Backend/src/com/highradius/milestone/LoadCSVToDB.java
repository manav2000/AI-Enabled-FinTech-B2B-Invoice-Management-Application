package com.highradius.milestone;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;

public class LoadCSVToDB {
	
	public void loadCSVToDB(ArrayList<InvoicePOJO> csvPojoList) {
		
		Connection conn = null;
		PreparedStatement stmt = null;
		String BATCH_QUERY = "INSERT INTO invoice_details VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
		try {
			
			conn = JDBCConnector.getConnection();
			stmt = conn.prepareStatement(BATCH_QUERY);
			
			int batch_size = 500;
			int i = 0;
			int percent = 1;
			
			for(InvoicePOJO pojo: csvPojoList) {
				stmt.setString(1, pojo.getBusiness_code());
				if (pojo.getCust_number().matches("[0-9]+")) {
					stmt.setString(2, String.valueOf(Long.parseLong(pojo.getCust_number())));
				} else {
					stmt.setString(2, pojo.getCust_number());
				}
				stmt.setString(3, pojo.getName_customer());
				if(pojo.getClear_date() == null || pojo.getClear_date() == "") {
					System.out.println(pojo.getClear_date());
					stmt.setNull(4, Types.NULL);
				} else {
					stmt.setString(4, pojo.getClear_date());
				}
				stmt.setString(5, pojo.getBusiness_year());
				stmt.setLong(6, pojo.getDoc_id());
				stmt.setString(7, pojo.getPosting_date());
				stmt.setString(8, pojo.getDocument_create_date());
				stmt.setString(9, pojo.getDue_in_date());
				stmt.setString(10, pojo.getInvoice_currency());
				stmt.setString(11, pojo.getDocument_type());
				stmt.setInt(12, pojo.getPosting_id());
				if(pojo.getArea_business() == "") {
					stmt.setNull(13, Types.NULL);
				} else {
					stmt.setString(13, pojo.getArea_business());
				}
				stmt.setDouble(14, pojo.getTotal_open_amount());
				stmt.setString(15, pojo.getBaseline_create_date());
				stmt.setString(16, pojo.getCust_payment_terms());
				if (pojo.getInvoice_id() == 0) {
					stmt.setNull(17, Types.NULL);
				} else {
					stmt.setLong(17, pojo.getInvoice_id());
				}
				stmt.setInt(18, pojo.getIsOpen());
				stmt.addBatch();
				
				i++;
				
				if (i%batch_size==0) {
					stmt.executeBatch();
					System.out.print((percent++) + "%\r");
				}
			}
			
			System.out.println("CSV DATA WAS TRANSFERED TO THE DATABASE SUCCESSFULLY!!");
			stmt.executeBatch();
			
			stmt.close();
			conn.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
