package com.example.pa.services;

import com.example.pa.model.product.Product;
import com.example.pa.model.product.ProductDTO;
import com.example.pa.repositories.ProductRepository;
import com.example.pa.services.exceptions.ResourceNotFoundException;
import jakarta.validation.Valid;
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

    public Product findById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com id: " + id));
    }

    public Product insert(ProductDTO obj) {
        Product newProduct = new Product(obj);
        return productRepository.save(newProduct);
    }

    public Product update(String id, ProductDTO dto) {
        Product product = findById(id);

        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setStock(dto.stock());
        product.setCategory(dto.category());

        return productRepository.save(product);
    }

    public void deleteById(String id) {
        productRepository.deleteById(id);
    }
}
