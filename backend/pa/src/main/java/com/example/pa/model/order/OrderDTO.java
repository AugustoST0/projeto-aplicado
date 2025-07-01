package com.example.pa.model.order;

import java.time.LocalDateTime;
import java.util.List;

public record OrderDTO(
        LocalDateTime orderDateTime,
        LocalDateTime deliverDateTime,
        List<OrderItemDTO> orderItemList,
        String userId
) { }
