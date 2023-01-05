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


    public byte[] generateBookSalesReport() {
        return makeReport(templateDir + "sales_temp.jrxml", bookSalesRepo.findAll());
    }

    public byte[] generateBestSellersReport() {
        return makeReport(templateDir + "best_sellers_temp.jrxml",bestSellersRepo.findAll());
    }

    public byte[] generateTopCustomersReport() {
        return makeReport(templateDir + "customers_temp.jrxml", topCustomersRepo.findAll());
    }


    private byte[] makeReport(String template, Collection<?> data){
        try {
//            System.out.println(data);
            //Compile the Jasper report from .jrxml to .japser
            JasperReport jasperReport = JasperCompileManager
                    .compileReport(template);
            //make the data source
            JRBeanCollectionDataSource jrBeanCollectionDataSource = new JRBeanCollectionDataSource(data);

            //Fill the report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null,
                    jrBeanCollectionDataSource);
            System.out.println("Report was successfully generated");

            // Export the report to byte[] of the pdf
            return JasperExportManager.exportReportToPdf(jasperPrint);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
