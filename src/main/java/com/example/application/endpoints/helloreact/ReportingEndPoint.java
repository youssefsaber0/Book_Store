package com.example.application.endpoints.helloreact;

import com.example.application.reporting.reportingService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class ReportingEndPoint {
    @Autowired
    reportingService s;

    public byte[] downloadBookSalesReport(){
        return s.generateBookSalesReport();
    }
    public byte[] downloadBestSellersReport(){
        return s.generateBestSellersReport();
    }
    public byte[] downloadTopCustomersReport(){
        return s.generateTopCustomersReport();
    }
}
