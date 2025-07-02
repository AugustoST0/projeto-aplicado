package com.example.pa.resources;

import com.example.pa.model.order.Order;
import com.example.pa.model.order.OrderDTO;
import com.example.pa.model.order.OrderStatus;
import com.example.pa.model.user.User;
import com.example.pa.services.OrderService;
import com.example.pa.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/orders")
public class OrderResource {

    @Autowired
    OrderService orderService;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<List<Order>> findAll() {
        List<Order> list = orderService.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/porUser")
    public List<Order> getOrdersForUser(Authentication authentication) {
        String userEmail = authentication.getName();
        User user = userService.findByEmail(userEmail);
        return orderService.findOrdersByUser(user);
    }

    @PostMapping
    public ResponseEntity<Order> insert(@RequestBody @Valid OrderDTO obj) {
        Order newOrder = orderService.insert(obj);
        return ResponseEntity.ok().body(newOrder);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestBody OrderStatus newStatus) {
        Order order = orderService.findById(id);
        order.setStatus(newStatus);
        orderService.save(order);
        return ResponseEntity.noContent().build();
    }
}
