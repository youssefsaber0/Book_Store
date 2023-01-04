package com.example.application.security;

import javax.annotation.Nonnull;

public record UserInfo(
    @Nonnull Integer userId,
    @Nonnull String firstName,
    @Nonnull String lastName,
    @Nonnull String email,
    @Nonnull String role,
    @Nonnull String shippingAddress,
    @Nonnull String phoneNumber) {
}
