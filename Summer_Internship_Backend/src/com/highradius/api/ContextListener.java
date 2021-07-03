package com.highradius.api;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;

public class ContextListener implements ServletContextListener {
	
	/*
	 * All ServletContextListeners are notified of context initialization before any 
	 * filter or servlet in the web application is initialized. So, it is an ideal 
	 * place to initialize the DB connection for complete lifecycle of our application.
	 */
	
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		
		ServletContext context = sce.getServletContext();
		String DB_URL = context.getInitParameter("DB_URL");
		String USER = context.getInitParameter("USER");
		String PASS = context.getInitParameter("PASS");
		
		DBConnector.createConnection(DB_URL, USER, PASS);
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {

		try {
			DBConnector.closeConnection();
			AbandonedConnectionCleanupThread.checkedShutdown();
	    } catch (Exception e) {
	    	  e.printStackTrace();
	    }
	}

}
