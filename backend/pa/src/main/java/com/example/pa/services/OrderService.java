package com.example.pa.services;

import com.example.pa.model.order.Order;
import com.example.pa.model.order.OrderDTO;
import com.example.pa.model.order.OrderItem;
import com.example.pa.model.product.Product;
import com.example.pa.repositories.OrderRepository;
import com.example.pa.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Order insert(OrderDTO obj) {
        Order newOrder = new Order();
        newOrder.setOrderDateTime(obj.orderDateTime());
        newOrder.setDeliverDateTime(obj.deliverDateTime());

        List<OrderItem> items = obj.orderItemList().stream().map(itemDTO -> {
            Product product = productRepository.findById(itemDTO.productId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            return new OrderItem(newOrder, product, itemDTO.quantity());
        }).toList();

        newOrder.setOrderItemList(items);

        return orderRepository.save(newOrder);
    }
}
