package com.example.application.reporting.repos;

import com.example.application.reporting.views.BestSellersView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BestSellersRepo extends JpaRepository<BestSellersView,String> {
}
