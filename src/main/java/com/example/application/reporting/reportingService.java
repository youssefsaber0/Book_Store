package com.example.application.reporting;

import com.example.application.reporting.repos.BookSalesRepo;
import com.example.application.reporting.views.BookSalesView;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor(onConstructor = @__(@Autowired))
@NoArgsConstructor
@Service
public class reportingService {
    private BookSalesRepo bookSalesRepo;

    public String generateBookSalesReport() {
        final String reportDir = "src/main/java/com/example/application/reporting/templates/";
        try {

            List<BookSalesView> book_sales = bookSalesRepo.findAll();


            // Compile the Jasper report from .jrxml to .japser
            JasperReport jasperReport = JasperCompileManager
                    .compileReport(reportDir+"book_sales_template.jrxml");
            // Get your data source
            JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(book_sales);

            // Add parameters
            Map<String, Object> parameters = new HashMap<>();


            // Fill the report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,
                    jrBeanCollectionDataSource);

            // Export the report to a PDF file
            JasperExportManager.exportReportToPdfFile(jasperPrint, reportDir + "\\book_sales_report.pdf");

            System.out.println("Done");
            return "Report successfully generated @path= " + reportDir;
        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR";
        }
    }
}
