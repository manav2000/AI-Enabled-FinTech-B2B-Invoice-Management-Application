package com.highradius.milestone;

//import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;

public class ReadCSV {
	
	static LoadCSVToDB lctd = new LoadCSVToDB();
	
	//convert long number to date
	public String dateFormat(String d) {
		String dateInString = d;
		LocalDate date = LocalDate.parse(dateInString, DateTimeFormatter.BASIC_ISO_DATE);
		return date.toString();
	}
	
	//convert string having decimal number to integer number but keeping it in form of string 
	public String validateData(String s) {
		return s.split("\\.", 2)[0];
	}
	
	public void readCSV() {
		
		FileReader filereader = null;
		ArrayList<InvoicePOJO> csvPojoList = null;
		try {
			
			filereader = new FileReader("C:\\HighRadius\\1802315.csv");
			
			//reading the complete csv and storing it in list
			CSVReader csvReader = new CSVReaderBuilder(filereader)
										.withSkipLines(1)
										.build();

			List<String[]> csvData = csvReader.readAll();
			
			csvPojoList = new ArrayList<InvoicePOJO>();
			
			for (String[] row: csvData) {
				InvoicePOJO pojo = new InvoicePOJO();
				
				pojo.setBusiness_code(row[0]);
				pojo.setCust_number(row[1]);
				pojo.setName_customer(row[2]);
				pojo.setClear_date(row[3]);
				pojo.setBusiness_year(row[4] != "" ? validateData(row[4]) : null);
				pojo.setDoc_id(Long.parseLong(validateData(row[5])));
				pojo.setPosting_date(row[6]);
				pojo.setDocument_create_date(row[7] != "" ? dateFormat(row[7]) : null);
				pojo.setDue_in_date(row[9] != "" ? dateFormat(validateData(row[9])) : null);
				pojo.setInvoice_currency(row[10]);
				pojo.setDocument_type(row[11]);
				pojo.setPosting_id(row[12] != "" ? Integer.parseInt(validateData(row[12])) : 0); //--
				pojo.setArea_business(row[13]);
				pojo.setTotal_open_amount(row[14] != "" ? Double.parseDouble(row[14]) : 0); //--
				pojo.setBaseline_create_date(row[15] != "" ? dateFormat(validateData(row[15])) : null);
				pojo.setCust_payment_terms(row[16]);
				pojo.setInvoice_id(row[17] != "" ? Long.parseLong(validateData(row[17])) : 0); //--
				pojo.setIsOpen(row[18] != "" ? Integer.parseInt(row[18]) : 0);
				
				csvPojoList.add(pojo);
			}
			
			System.out.println("size => " + csvPojoList.size());
			
		} catch (IOException | CsvException | NumberFormatException e) {

			e.printStackTrace();
		}
		
		//calling this function transfers complete data from csv to DB
		lctd.loadCSVToDB(csvPojoList);
	}
}
