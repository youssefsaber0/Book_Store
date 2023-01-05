package com.example.application.DTO;

import dev.hilla.Nonnull;

public record OrderRequest(
		@Nonnull String isbn,
		@Nonnull int count) {
}
