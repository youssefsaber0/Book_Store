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
@Table(name = "`top_customers`")
@Getter
@NoArgsConstructor
public class TopCustomersView implements Serializable {
    @Id
    @Column(name = "user_id")
    private int user_id;

    @Column(name = "first_name")
    private String first_name;

    @Column(name = "last_name")
    private String last_name;

    @Column(name = "email")
    private String email;

    @Column(name = "purchased_books")
    private int purchased_books;
}