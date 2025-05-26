package com.example.pa.model.product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    public Product(ProductDTO dto) {
        this.name = dto.name();
        this.description = dto.description();
        this.price = dto.price();
        this.quantity = dto.quantity();
        this.category = dto.category();
    }
}
