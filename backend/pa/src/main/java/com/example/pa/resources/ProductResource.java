package com.example.pa.resources;

import com.example.pa.model.product.Product;
import com.example.pa.model.product.ProductDTO;
import com.example.pa.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductResource {

    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> findAll() {
        List<Product> list = productService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<Product> insert(@RequestBody @Valid ProductDTO obj) {
        Product newProduct = productService.insert(obj);
        return ResponseEntity.ok().body(newProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable String id, @RequestBody @Valid ProductDTO obj) {
        Product updatedProduct = productService.update(id, obj);
        return ResponseEntity.ok().body(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        Product product = productService.findById(id);
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
