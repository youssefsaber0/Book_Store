package com.example.application.controllers;

import com.example.application.reporting.reportingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/reports")
public class reportingController {
    @Autowired
    reportingService s;

    @GetMapping("/test")
    public byte[] tst() {
        byte[] x = s.generateBookSalesReport();
        System.out.println(Arrays.toString(x));
        return x;
    }
}
