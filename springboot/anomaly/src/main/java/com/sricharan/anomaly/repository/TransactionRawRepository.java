package com.sricharan.anomaly.repository;

import com.sricharan.anomaly.entity.TransactionRawEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRawRepository extends JpaRepository<TransactionRawEntity, String> {
}