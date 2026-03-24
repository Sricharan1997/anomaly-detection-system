package com.sricharan.anomaly.service;

import com.sricharan.anomaly.client.MlServiceClient;
import com.sricharan.anomaly.dto.AnomalyRequest;
import com.sricharan.anomaly.dto.AnomalyResponse;
import com.sricharan.anomaly.entity.AnomalyResultEntity;
import com.sricharan.anomaly.model.TransactionEvent;
import com.sricharan.anomaly.repository.AnomalyResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AnomalyDetectionService {

    private final AnomalyResultRepository repository;
    private final MlServiceClient mlServiceClient;

    public AnomalyResponse detect(TransactionEvent event) {
        AnomalyRequest request = AnomalyRequest.builder()
                .amount(event.getAmount() != null ? event.getAmount().doubleValue() : 0.0)
                .accountId(event.getAccount_id())
                .transactionType(event.getTransaction_type())
                .merchant(event.getMerchant())
                .location(event.getLocation())
                .build();

        AnomalyResponse response = mlServiceClient.predict(request);

        AnomalyResultEntity entity = AnomalyResultEntity.builder()
                .transactionId(event.getEvent_id())
                .anomalyScore(response.getAnomalyScore())
                .anomalyFlag(response.getAnomaly())
                .anomalyReason(response.getReason())
                .modelVersion(response.getModelVersion())
                .createdAt(LocalDateTime.now())
                .build();

        repository.save(entity);
        return response;
    }
}