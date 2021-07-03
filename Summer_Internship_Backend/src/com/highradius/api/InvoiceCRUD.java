package com.highradius.api;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


@WebServlet("/InvoiceCRUD")
public class InvoiceCRUD extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Connection conn = null;
	private static PreparedStatement stmt = null;
       
    public InvoiceCRUD() {
        super();
        
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int page = Integer.parseInt(request.getParameter("page"));
		int records_per_page = 50;
		
		ArrayList<InvoiceModel> data = new ArrayList<InvoiceModel>();
		
		try {
			conn = DBConnector.getConnection();
			stmt = conn.prepareStatement(
						"SELECT * FROM invoice_details LIMIT " +(page-1)*records_per_page+","+records_per_page
						);
			ResultSet result = stmt.executeQuery();
			
			while(result.next()) {
				InvoiceModel pojo = new InvoiceModel();
//				pojo.setCust_number(result.getString(2));
//				pojo.setName_customer(result.getString(3));
//				pojo.setDoc_id(result.getLong(6));
//				pojo.setDue_in_date(result.getString(9));
//				pojo.setTotal_open_amount(result.getDouble(14));
//				pojo.setInvoice_id(result.getLong(17));
//				pojo.setNotes(result.getString(19));
				
				pojo.setBusiness_code(result.getString(1));
				pojo.setCust_number(result.getString(2));
				pojo.setName_customer(result.getString(3));
				pojo.setClear_date(result.getString(4));
				pojo.setBusiness_year(result.getString(5));
				pojo.setDoc_id(result.getLong(6));
				pojo.setPosting_date(result.getString(7));
				pojo.setDocument_create_date(result.getString(8));
				pojo.setDue_in_date(result.getString(9));
				pojo.setInvoice_currency(result.getString(10));
				pojo.setDocument_type(result.getString(11));
				pojo.setPosting_id(result.getInt(12));
				pojo.setArea_business(result.getString(13));
				pojo.setTotal_open_amount(result.getDouble(14));
				pojo.setBaseline_create_date(result.getString(15));
				pojo.setCust_payment_terms(result.getString(16));
				pojo.setInvoice_id(result.getLong(17));
				pojo.setIsOpen(result.getInt(18));
				pojo.setNotes(result.getString(19));
				
				data.add(pojo);
			}
			
			Gson gson = new Gson();
			String resData = gson.toJson(data);
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8"); 
			out.print(resData);
			out.flush();
			
			result.close();
			stmt.close();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			String req_body = request.getReader().lines()
				    .reduce("", (accumulator, actual) -> accumulator + actual);
			System.out.println(req_body);
			
			HashMap<String, String> req_body_map = new Gson().fromJson(
													req_body, new TypeToken<HashMap<String, String>>(){}.getType()
												);
			System.out.println(req_body_map);
			
			conn = DBConnector.getConnection();
			String INSERT_QUERY = "INSERT INTO invoice_details(name_customer,cust_number,invoice_id,total_open_amount,"
					+ "due_in_date,doc_id,notes) VALUES(?,?,?,?,?,?,?)";
			stmt = conn.prepareStatement(INSERT_QUERY);
			
			stmt.setString(1, req_body_map.get("name_customer"));
			stmt.setString(2, req_body_map.get("cust_number"));
			stmt.setLong(3, Long.parseLong(req_body_map.get("invoice_id")));
			stmt.setDouble(4, Double.parseDouble(req_body_map.get("total_open_amount")));
			stmt.setString(5, req_body_map.get("due_in_date"));
			stmt.setLong(6, Long.parseLong(req_body_map.get("invoice_id")));
			if(req_body_map.get("notes").equals("")) {
				stmt.setNull(7, Types.NULL);
			} else {
				stmt.setString(7, req_body_map.get("notes"));
			}
			
			stmt.executeUpdate();
			
			stmt.close();
			
		} catch(Exception e) {
			System.out.println("ERROR OCCURED WHILE INSERTING A NEW RECORD");
			System.out.println(e.getMessage());
		}
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			String req_body = request.getReader().lines()
				    .reduce("", (accumulator, actual) -> accumulator + actual);
			System.out.println(req_body);
			
			HashMap<String, String> req_body_map = new Gson().fromJson(
													req_body, new TypeToken<HashMap<String, String>>(){}.getType()
												);
			System.out.println(req_body_map);
			
			conn = DBConnector.getConnection();
			String UPDATE_QUERY = "UPDATE invoice_details SET total_open_amount = ?, notes = ? WHERE doc_id = ?";
			stmt = conn.prepareStatement(UPDATE_QUERY);
			
			stmt.setDouble(1, Double.parseDouble(req_body_map.get("total_open_amount")));
			stmt.setString(2, req_body_map.get("notes"));
			stmt.setLong(3, Long.parseLong(req_body_map.get("doc_id")));
			
			stmt.executeUpdate();
			
			stmt.close();
			
		} catch(Exception e) {
			System.out.println(e.getMessage());
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		}
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			String req_body = request.getReader().lines()
				    .reduce("", (accumulator, actual) -> accumulator + actual);
			System.out.println(req_body);
			
			HashMap<String, String[]> req_body_map = new Gson().fromJson(
													req_body, new TypeToken<HashMap<String, String[]>>(){}.getType()
												);
			
			List<String> list = new ArrayList<String>();
			list.addAll(Arrays.asList(req_body_map.get("doc_ids")));

			String docIds = (String) list.stream().collect(Collectors.joining(",","(",")"));
			
			conn = DBConnector.getConnection();
			String DELETE_QUERY = "DELETE FROM invoice_details WHERE doc_id IN " + docIds;
			System.out.println(DELETE_QUERY);
			stmt = conn.prepareStatement(DELETE_QUERY);
			
			stmt.executeUpdate();
			
			stmt.close();
			
		} catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}

}
