package com.example.application.DTO;

import javax.annotation.Nonnull;

public record AddToCartRequest(
        @Nonnull String isbn,
        @Nonnull Integer quantity) {
}