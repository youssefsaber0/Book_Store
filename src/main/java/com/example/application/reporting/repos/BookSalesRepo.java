package com.example.application.reporting.repos;

import com.example.application.reporting.views.BookSalesView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface BookSalesRepo extends JpaRepository<BookSalesView,String> {
}
