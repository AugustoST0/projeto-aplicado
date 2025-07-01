package com.example.pa.repositories;

import com.example.pa.model.order.Order;
import com.example.pa.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
