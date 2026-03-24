package com.sricharan.anomaly.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnomalyRequest {
    private Double amount;
    private String accountId;
    private String transactionType;
    private String merchant;
    private String location;
}