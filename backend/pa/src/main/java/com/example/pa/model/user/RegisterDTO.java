package com.example.pa.model.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterDTO(
        @NotBlank String name,
        @Email String email,
        @NotBlank String password,
        @NotNull UserRole role) {
}
