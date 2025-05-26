package com.example.pa.model.product;

public record ProductDTO(
        String name,
        String description,
        Double price,
        Integer quantity,
        ProductCategory category
) {
}
