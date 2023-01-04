package com.example.application.DTO;

import javax.annotation.Nonnull;

public record AddBookRequest(
        @Nonnull String isbn,
        @Nonnull String title,
        @Nonnull String[]  authors,
                @Nonnull String publisher,

        @Nonnull int numberOfCopies,
        @Nonnull double price,
        @Nonnull String category,
        @Nonnull int publishYear,
        @Nonnull int threshhold) {
}
