package com.example.application.DTO;

import javax.annotation.Nonnull;

public record AddBookRequest(
		@Nonnull String isbn,
		@Nonnull String title,
		@Nonnull String[] authors,
		@Nonnull String publisher,
		@Nonnull Integer numberOfCopies,
		@Nonnull Double price,
		@Nonnull String category,
		@Nonnull Integer publishYear,
		@Nonnull Integer threshhold) {
}
