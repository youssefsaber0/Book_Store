package com.example.application.reporting.views;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@AllArgsConstructor
@Entity
@Immutable
@Table(name = "`best_sellers'")
@Getter
@NoArgsConstructor
public class BestSellersView implements Serializable {
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