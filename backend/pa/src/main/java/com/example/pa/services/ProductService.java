package com.example.pa.services;

import com.example.pa.model.product.Product;
import com.example.pa.model.product.ProductDTO;
import com.example.pa.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product insert(ProductDTO obj) {
        Product newProduct = new Product(obj);
        return productRepository.save(newProduct);
    }
}
