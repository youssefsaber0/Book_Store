package com.example.application.reporting;

import com.example.application.reporting.repos.BestSellersRepo;
import com.example.application.reporting.repos.BookSalesRepo;
import com.example.application.reporting.repos.TopCustomersRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor(onConstructor = @__(@Autowired))
@NoArgsConstructor
@Service
public class reportingService {
    static final String templateDir = "src/main/java/com/example/application/reporting/templates/";
    private BookSalesRepo bookSalesRepo;
    private TopCustomersRepo topCustomersRepo;
    private BestSellersRepo bestSellersRepo;


    public String generateBookSalesReport(String destination_directory) {
        return makeReport(templateDir + "best_sellers_template.jrxml", bookSalesRepo.findAll(),destination_directory+ "\\book_sales_report.pdf");
    }

    public String generateBestSellersReport(String destination_directory) {
        return makeReport(templateDir + "best_sellers_template.jrxml",bestSellersRepo.findAll(),destination_directory + "\\best_sellers_report.pdf");
    }

    public String generateTopCustomersReport(String destination_directory) {
        return makeReport(templateDir + "top_customers_template.jrxml", topCustomersRepo.findAll(),destination_directory + "\\top_customers_report.pdf");
    }


    private String makeReport(String template, Collection<?> data, String destination_path){
        try {
            // Compile the Jasper report from .jrxml to .japser
            JasperReport jasperReport = JasperCompileManager
                    .compileReport(template);
            // Get your data source
            JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(data);

            // Fill the report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null,
                    jrBeanCollectionDataSource);

            // Export the report to a PDF file
            JasperExportManager.exportReportToPdfFile(jasperPrint,  destination_path);

            System.out.println("Done");
            return "Report was successfully generated @path= " + template;
        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        }
    }
}
