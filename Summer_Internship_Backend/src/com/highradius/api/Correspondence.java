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


@WebServlet("/Correspondence")
public class Correspondence extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Connection conn = null;
	private static PreparedStatement stmt = null;

    public Correspondence() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String invoiceIds = request.getParameter("invoice_ids");
		
		ArrayList<InvoiceModel> templateData = new ArrayList<InvoiceModel>();
		
		System.out.println(request.getParameter("invoice_ids"));
		
		try {
			conn = DBConnector.getConnection();
			stmt = conn.prepareStatement(
						"SELECT * FROM invoice_details WHERE invoice_id IN (" + invoiceIds + ")"
						);
			ResultSet result = stmt.executeQuery();
			
			while(result.next()) {
				InvoiceModel pojo = new InvoiceModel();
				pojo.setPosting_date(result.getString(7));
				pojo.setDue_in_date(result.getString(9));
				pojo.setInvoice_currency(result.getString(10));
				pojo.setTotal_open_amount(result.getDouble(14));
				pojo.setInvoice_id(result.getLong(17));
				
				templateData.add(pojo);
			}
			
			Gson gson = new Gson();
			String resData = gson.toJson(templateData);
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8"); 
			out.print(resData);
			out.flush();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}
