package com.example.pa.model.order;

import lombok.Getter;

@Getter
public enum OrderStatus {

    PENDENTE("pendente"),
    PREPARANDO("preparando"),
    PRONTO("pronto"),
    ENTREGUE("entregue");

    private String status;

    OrderStatus(String status) {
        this.status = status;
    }
}
