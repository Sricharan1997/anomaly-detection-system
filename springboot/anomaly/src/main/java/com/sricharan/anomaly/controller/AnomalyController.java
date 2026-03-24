package com.sricharan.anomaly.controller;

import com.sricharan.anomaly.entity.AnomalyResultEntity;
import com.sricharan.anomaly.repository.AnomalyResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anomalies")
@RequiredArgsConstructor
public class AnomalyController {

    private final AnomalyResultRepository anomalyResultRepository;

    @GetMapping
    public List<AnomalyResultEntity> getAllAnomalies() {
        return anomalyResultRepository.findAll();
    }

    @GetMapping("/flagged")
    public List<AnomalyResultEntity> getFlaggedAnomalies() {
        return anomalyResultRepository.findByAnomalyFlagTrue();
    }
}