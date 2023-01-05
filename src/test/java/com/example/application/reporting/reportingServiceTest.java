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

import java.util.ArrayList;
import java.util.Arrays;
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
        System.out.println(Arrays.toString(s.generateBookSalesReport()));
    }

    @Test
    void generateBestSellersReport(){
        Mockito.when(bestSellersRepo.findAll()).thenReturn(new ArrayList<>(List.of(
                new BestSellersView("isbn_0","title_0",9.5,"pub_0",123),
                new BestSellersView("isbn_1","title_1",9.5,"pub_!",123),
                new BestSellersView("isbn_2","title_2",9.5,"pub_2",123),
                new BestSellersView("isbn_3","title_33",9.5,"pub_0",123),
                new BestSellersView("isbn_4","title_44",9.5,"pub_!",123),
                new BestSellersView("isbn_5","title_5",9.5,"pub_2",123),
                new BestSellersView("isbn_6","title_7",9.5,"pub_0",123),
                new BestSellersView("isbn_7","title_234",9.5,"pub_!",123),
                new BestSellersView("isbn_8","title_75",9.5,"pub_2",123),
                new BestSellersView("isbn_9","title_34",9.5,"pub_0",123),
                new BestSellersView("isbn_10","title_324",9.5,"pub_!",123),
                new BestSellersView("isbn_11","title_4",9.5,"pub_2",123),
                new BestSellersView("isbn_12","title_745",9.5,"pub_0",123),
                new BestSellersView("isbn_13","title3123_3",9.5,"pub_!",123),
                new BestSellersView("isbn_14","tit34Qle_2",9.5,"pub_2",123),
                new BestSellersView("isbn_15","titleQ4_0",9.5,"pub_0",123),
                new BestSellersView("isbn_16","titleSDF_1",9.5,"pub_!",123),
                new BestSellersView("isbn_27","title_ADS2",9.5,"pub_2",123),
                new BestSellersView("isbn_0","title_0",9.5,"pub_0",123),
                new BestSellersView("isbn_1","title_1",9.5,"pub_!",123),
                new BestSellersView("isbn_2","title_2",9.5,"pub_2",123),
                new BestSellersView("isbn_3","title_33",9.5,"pub_0",123),
                new BestSellersView("isbn_4","title_44",9.5,"pub_!",123),
                new BestSellersView("isbn_5","title_5",9.5,"pub_2",123),
                new BestSellersView("isbn_6","title_7",9.5,"pub_0",123),
                new BestSellersView("isbn_7","title_234",9.5,"pub_!",123),
                new BestSellersView("isbn_8","title_75",9.5,"pub_2",123),
                new BestSellersView("isbn_9","title_34",9.5,"pub_0",123),
                new BestSellersView("isbn_10","title_324",9.5,"pub_!",123),
                new BestSellersView("isbn_11","title_4",9.5,"pub_2",123),
                new BestSellersView("isbn_12","title_745",9.5,"pub_0",123),
                new BestSellersView("isbn_13","title3123_3",9.5,"pub_!",123),
                new BestSellersView("isbn_14","tit34Qle_2",9.5,"pub_2",123),
                new BestSellersView("isbn_15","titleQ4_0",9.5,"pub_0",123),
                new BestSellersView("isbn_16","titleSDF_1",9.5,"pub_!",123),
                new BestSellersView("isbn_27","title_ADS2",9.5,"pub_2",123),
                new BestSellersView("isbn_0","title_0",9.5,"pub_0",123),
                new BestSellersView("isbn_1","title_1",9.5,"pub_!",123),
                new BestSellersView("isbn_2","title_2",9.5,"pub_2",123),
                new BestSellersView("isbn_3","title_33",9.5,"pub_0",123),
                new BestSellersView("isbn_4","title_44",9.5,"pub_!",123),
                new BestSellersView("isbn_5","title_5",9.5,"pub_2",123),
                new BestSellersView("isbn_6","title_7",9.5,"pub_0",123),
                new BestSellersView("isbn_7","title_234",9.5,"pub_!",123),
                new BestSellersView("isbn_8","title_75",9.5,"pub_2",123),
                new BestSellersView("isbn_9","title_34",9.5,"pub_0",123),
                new BestSellersView("isbn_10","title_324",9.5,"pub_!",123),
                new BestSellersView("isbn_11","title_4",9.5,"pub_2",123),
                new BestSellersView("isbn_12","title_745",9.5,"pub_0",123),
                new BestSellersView("isbn_13","title3123_3",9.5,"pub_!",123),
                new BestSellersView("isbn_14","tit34Qle_2",9.5,"pub_2",123),
                new BestSellersView("isbn_15","titleQ4_0",9.5,"pub_0",123),
                new BestSellersView("isbn_16","titleSDF_1",9.5,"pub_!",123),
                new BestSellersView("isbn_27","title_ADS2",9.5,"pub_2",123),
                new BestSellersView("isbn_0","title_0",9.5,"pub_0",123),
                new BestSellersView("isbn_1","title_1",9.5,"pub_!",123),
                new BestSellersView("isbn_2","title_2",9.5,"pub_2",123),
                new BestSellersView("isbn_3","title_33",9.5,"pub_0",123),
                new BestSellersView("isbn_4","title_44",9.5,"pub_!",123),
                new BestSellersView("isbn_5","title_5",9.5,"pub_2",123),
                new BestSellersView("isbn_6","title_7",9.5,"pub_0",123),
                new BestSellersView("isbn_7","title_234",9.5,"pub_!",123),
                new BestSellersView("isbn_8","title_75",9.5,"pub_2",123),
                new BestSellersView("isbn_9","title_34",9.5,"pub_0",123),
                new BestSellersView("isbn_10","title_324",9.5,"pub_!",123),
                new BestSellersView("isbn_11","title_4",9.5,"pub_2",123),
                new BestSellersView("isbn_12","title_745",9.5,"pub_0",123),
                new BestSellersView("isbn_13","title3123_3",9.5,"pub_!",123),
                new BestSellersView("isbn_14","tit34Qle_2",9.5,"pub_2",123),
                new BestSellersView("isbn_15","titleQ4_0",9.5,"pub_0",123),
                new BestSellersView("isbn_16","titleSDF_1",9.5,"pub_!",123),
                new BestSellersView("isbn_27","title_ADS2",9.5,"pub_2",123)
        )));
        System.out.println(Arrays.toString(s.generateBestSellersReport()));
    }

    @Test
    void generateTopCustomersReport(){
        Mockito.when(topCustomersRepo.findAll()).thenReturn(new ArrayList<>(List.of(
                new TopCustomersView(0,"fname_0","lname_0","user_0@gmail.com",123),
                new TopCustomersView(1,"fname_1","lname_1","user_1@gmail.com",123),
                new TopCustomersView(2,"fname_2","lname_2","user_2@gmail.com",123))));
        System.out.println(Arrays.toString(s.generateBookSalesReport()));
    }
}
