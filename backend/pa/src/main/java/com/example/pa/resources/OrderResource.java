package com.example.pa.resources;

import com.example.pa.model.order.Order;
import com.example.pa.model.order.OrderDTO;
import com.example.pa.services.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/orders")
public class OrderResource {

    @Autowired
    OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> findAll() {
        List<Order> list = orderService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<Order> insert(@RequestBody @Valid OrderDTO obj) {
        Order newOrder = orderService.insert(obj);
        return ResponseEntity.ok().body(newOrder);
    }
}
