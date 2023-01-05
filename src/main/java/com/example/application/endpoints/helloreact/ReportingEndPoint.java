package com.example.application.endpoints.helloreact;

import com.example.application.reporting.reportingService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class ReportingEndPoint {
    @Autowired
    reportingService s;

    public String downloadBookSalesReport() {
        byte[] fileBytes = s.generateBookSalesReport();
        String dataUrl = "data:application/pdf;base64," + Base64.getEncoder().encodeToString(fileBytes);
        return dataUrl;
    }

    public String downloadBestSellersReport() {
        byte[] fileBytes = s.generateBestSellersReport();
        String dataUrl = "data:application/pdf;base64," + Base64.getEncoder().encodeToString(fileBytes);
        return dataUrl;
    }

    public String downloadTopCustomersReport() {
        byte[] fileBytes = s.generateTopCustomersReport();
        String dataUrl = "data:application/pdf;base64," + Base64.getEncoder().encodeToString(fileBytes);
        return dataUrl;
    }
}
