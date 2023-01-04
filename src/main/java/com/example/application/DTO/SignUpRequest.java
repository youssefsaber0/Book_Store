package com.example.application.DTO;

import javax.annotation.Nonnull;

public record SignUpRequest(
        @Nonnull String firstName,
        @Nonnull String lastName,
        @Nonnull String email,
        @Nonnull String password,
        @Nonnull String role,
        @Nonnull String shippingAddress,
        @Nonnull String phoneNumber) {
}