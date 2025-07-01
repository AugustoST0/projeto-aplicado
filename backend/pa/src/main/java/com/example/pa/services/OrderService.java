package com.example.pa.services;

import com.example.pa.model.order.Order;
import com.example.pa.model.order.OrderDTO;
import com.example.pa.model.order.OrderItem;
import com.example.pa.model.product.Product;
import com.example.pa.model.user.User;
import com.example.pa.repositories.OrderRepository;
import com.example.pa.repositories.ProductRepository;
import com.example.pa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public List<Order> findOrdersByUser(User user) {
        return orderRepository.findByUser(user);
    }

    public Order insert(OrderDTO obj) {
        Order newOrder = new Order();
        newOrder.setOrderDateTime(obj.orderDateTime());
        newOrder.setDeliverDateTime(obj.deliverDateTime());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        newOrder.setUser(user);

        List<OrderItem> items = obj.orderItemList().stream().map(itemDTO -> {
            Product product = productRepository.findById(itemDTO.productId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            return new OrderItem(newOrder, product, itemDTO.quantity());
        }).toList();

        newOrder.getOrderItemList().clear();
        newOrder.getOrderItemList().addAll(items);

        return orderRepository.save(newOrder);
    }
}
