package com.example.application.DTO;

import javax.annotation.Nonnull;

public record CheckoutRequest(
        @Nonnull String cardNumber,
        @Nonnull String expirationDate) {
}