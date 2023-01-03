package com.example.application.reporting;

import com.example.application.reporting.repos.BestSellersRepo;
import com.example.application.reporting.repos.BookSalesRepo;
import com.example.application.reporting.repos.TopCustomersRepo;
import com.example.application.reporting.views.BestSellersView;
import com.example.application.reporting.views.BookSalesView;
import com.example.application.reporting.views.TopCustomersView;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class reportingServiceTest {
    reportingService s;

    @Mock
    BookSalesRepo bookSalesRepo;

    @Mock
    TopCustomersRepo topCustomersRepo;

    @Mock
    BestSellersRepo bestSellersRepo;

    @BeforeEach
    void prep(){
        s = new reportingService(bookSalesRepo, topCustomersRepo, bestSellersRepo);
    }

    @Test
    void generateBookSalesReport(){
        Mockito.when(bookSalesRepo.findAll()).thenReturn(new ArrayList<>(List.of(
                new BookSalesView("isbn_0","title_0",9.5,"pub_0",123),
                new BookSalesView("isbn_1","title_1",9.5,"pub_!",123),
                new BookSalesView("isbn_2","title_2",9.5,"pub_2",123))));
        s.generateBookSalesReport("src/main/java/com/example/application/reporting/templates/reports");
    }

    @Test
    void generateBestSellersReport(){
        Mockito.when(bestSellersRepo.findAll()).thenReturn(new ArrayList<>(List.of(
                new BestSellersView("isbn_0","title_0",9.5,"pub_0",123),
                new BestSellersView("isbn_1","title_1",9.5,"pub_!",123),
                new BestSellersView("isbn_2","title_2",9.5,"pub_2",123))));
        s.generateBestSellersReport("src/main/java/com/example/application/reporting/templates/reports");
    }

    @Test
    void generateTopCustomersReport(){
        Mockito.when(topCustomersRepo.findAll()).thenReturn(new ArrayList<>(List.of(
                new TopCustomersView(0,"fname_0","lname_0","user_0@gmail.com",123),
                new TopCustomersView(1,"fname_1","lname_1","user_1@gmail.com",123),
                new TopCustomersView(2,"fname_2","lname_2","user_2@gmail.com",123))));
        s.generateTopCustomersReport("src/main/java/com/example/application/reporting/templates/reports");
    }
}
