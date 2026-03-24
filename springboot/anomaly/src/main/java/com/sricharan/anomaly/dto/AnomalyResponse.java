package com.sricharan.anomaly.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnomalyResponse {
    private Double anomalyScore;
    private Boolean anomaly;
    private String reason;
    private String modelVersion;
}