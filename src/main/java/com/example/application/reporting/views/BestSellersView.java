package com.example.application.reporting.views;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@AllArgsConstructor
@Entity
@Table(name = "best_sellers")
@Getter
@NoArgsConstructor
public class BestSellersView{
    @Id
    @Column(name = "isbn")
    private String isbn;

    @Column(name = "title")
    private String title;

    @Column(name = "price")
    private double price;

    @Column(name = "publisher_name")
    private String publisher_name;

    @Column(name = "sold_amount")
    private int sold_amount;

}