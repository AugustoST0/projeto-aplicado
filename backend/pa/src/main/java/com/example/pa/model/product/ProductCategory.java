package com.example.pa.model.product;

import lombok.Getter;

@Getter
public enum ProductCategory {

    LANCHES("lanches"),
    SALGADOS("salgados"),
    BEBIDAS("bebidas"),
    COMBOS("combos");

    private String category;

    ProductCategory(String category) {
        this.category = category;
    }
}
