package com.highradius.api;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnector {
	
	private static Connection conn;
	private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
//	private static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
//	private static final String USER = "root";
//	private static final String PASS = "parmar.2000";
	
	public static void createConnection(String DB_URL, String USER, String PASS) {
		
		try {
			
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			System.out.println("CONNECTION ESTABLISHED SUCCESSFULLY");
			
		} catch(Exception e) {
			
			e.printStackTrace();
			
		}
	}
	
	public static Connection getConnection() {
		
		return conn;
	}
	
	public static void closeConnection() {
		
		if(conn != null) {
			try {
				conn.close();
				System.out.println("DISCONNECTED SUCCESSFULLY");
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
