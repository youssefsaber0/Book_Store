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
@Table(name = "`book_sales`")
@Getter
@NoArgsConstructor
public class BookSalesView implements Serializable {
    @Id
    @Column(name = "isbn")
    private String isbn;

    @Column(name = "title")
    private String title;

    @Column(name = "sold_amount")
    private int sold_amount;

}