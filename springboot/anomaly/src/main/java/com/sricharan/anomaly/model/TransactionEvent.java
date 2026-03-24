package com.sricharan.anomaly.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEvent {
    private String event_id;
    private String provider_id;
    private String account_id;
    private BigDecimal amount;
    private String transaction_type;
    private String merchant;
    private String location;
}