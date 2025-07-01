package com.example.pa.model.product;

import com.example.pa.model.order.OrderItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
    private Integer stock;

    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<OrderItem> orderItemList = new ArrayList<>();

    public Product(ProductDTO dto) {
        this.name = dto.name();
        this.description = dto.description();
        this.price = dto.price();
        this.stock = dto.stock();
        this.category = dto.category();
    }


}
