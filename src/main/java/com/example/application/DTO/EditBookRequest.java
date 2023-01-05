package com.example.application.DTO;

import javax.annotation.Nonnull;

public record EditBookRequest(
		@Nonnull String isbn,
		@Nonnull Integer value) {
}