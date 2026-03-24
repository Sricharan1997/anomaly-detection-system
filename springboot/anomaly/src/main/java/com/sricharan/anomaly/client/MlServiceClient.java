package com.sricharan.anomaly.client;

import com.sricharan.anomaly.dto.AnomalyRequest;
import com.sricharan.anomaly.dto.AnomalyResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class MlServiceClient {

    private final RestTemplate restTemplate;

    @Value("${app.ml.base-url}")
    private String mlBaseUrl;

    public MlServiceClient() {
        this.restTemplate = new RestTemplate();
    }

    public AnomalyResponse predict(AnomalyRequest request) {
        String url = mlBaseUrl + "/predict";
        ResponseEntity<AnomalyResponse> response =
                restTemplate.postForEntity(url, request, AnomalyResponse.class);
        return response.getBody();
    }
}