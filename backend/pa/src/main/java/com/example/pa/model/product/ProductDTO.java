package com.example.pa.model.product;

public record ProductDTO(
        String name,
        String description,
        Double price,
        Integer stock,
        ProductCategory category
) {
}
