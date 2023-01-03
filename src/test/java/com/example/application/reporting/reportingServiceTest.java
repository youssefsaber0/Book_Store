package com.example.application.reporting;

import com.example.application.reporting.repos.BookSalesRepo;
import com.example.application.reporting.views.BookSalesView;
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

    @Test
    void generateBookSalesReport(){
        Mockito.when(bookSalesRepo.findAll()).thenReturn(new ArrayList<>(List.of(
                new BookSalesView("isbn_0","title_0",100),
                new BookSalesView("isbn_1","title_1",123),
                new BookSalesView("isbn_2","title_2",412))));
        s = new reportingService(bookSalesRepo);
        s.generateBookSalesReport();

    }

}
