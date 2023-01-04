package com.example.application.reporting.repos;

import com.example.application.reporting.views.TopCustomersView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopCustomersRepo extends JpaRepository<TopCustomersView,Integer> {
}
