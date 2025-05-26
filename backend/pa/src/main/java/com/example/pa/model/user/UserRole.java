package com.example.pa.model.user;

import lombok.Getter;

@Getter
public enum UserRole {

    ADMIN("admin"),
    EMPLOYEE("employee"),
    USER("user");

    private String role;

    UserRole(String role) {
        this.role = role;
    }
}
