package com.highradius.milestone;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class JDBCConnector {
	
	private static Connection conn;
	PreparedStatement stmt;
	private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	private static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
	private static final String USER = "root";
	private static final String PASS = "parmar.2000";
	
	public static Connection getConnection() {
		
		try {

			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			
		} catch (SQLException | ClassNotFoundException e) {
			
			e.printStackTrace();
			
		}
		
		return conn;
	}
}
