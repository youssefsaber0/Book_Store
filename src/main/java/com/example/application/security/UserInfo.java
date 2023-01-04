package com.example.application.security;

import javax.annotation.Nonnull;

/**
 * User information used in client-side authentication and authorization.
 * To be saved in browsers’ LocalStorage for offline support.
 */
public class UserInfo {

    @Nonnull
    private Integer userId;
    @Nonnull
    private String firstName;
    @Nonnull
    private String lastName;
    @Nonnull
    private String email;
    @Nonnull
    private String role;
    @Nonnull
    private String shippingAddress;
    @Nonnull
    private String phoneNumber;

    public UserInfo(@Nonnull Integer userId, @Nonnull String firstName, @Nonnull String lastName, @Nonnull String email,
            @Nonnull String role, @Nonnull String shippingAddress,
            @Nonnull String phoneNumber) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.shippingAddress = shippingAddress;
        this.phoneNumber = phoneNumber;
    }

    @Nonnull
    public Integer getUserId() {
        return userId;
    }

    @Nonnull
    public String getFirstName() {
        return firstName;
    }

    @Nonnull
    public String getLastName() {
        return lastName;
    }

    @Nonnull
    public String getEmail() {
        return email;
    }

    @Nonnull
    public String getRole() {
        return role;
    }

    @Nonnull
    public String getShippingAddress() {
        return shippingAddress;
    }

    @Nonnull
    public String getPhoneNumber() {
        return phoneNumber;
    }

}
