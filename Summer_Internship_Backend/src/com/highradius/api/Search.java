package com.highradius.api;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;


@WebServlet("/Search")
public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Connection conn = null;
	private static PreparedStatement stmt = null;
    
    public Search() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String search = request.getParameter("search");
		
		ArrayList<InvoiceModel> data = new ArrayList<InvoiceModel>();
		
		try {
			conn = DBConnector.getConnection();
			stmt = conn.prepareStatement(
						"SELECT * FROM invoice_details WHERE invoice_id LIKE \'" + search + "%\' LIMIT 50"
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

}
