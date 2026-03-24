package com.sricharan.anomaly.repository;

import com.sricharan.anomaly.entity.AnomalyResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnomalyResultRepository extends JpaRepository<AnomalyResultEntity, Long> {
    List<AnomalyResultEntity> findByAnomalyFlagTrue();
}