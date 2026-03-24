package com.sricharan.anomaly.controller;

import com.sricharan.anomaly.entity.TransactionRawEntity;
import com.sricharan.anomaly.repository.TransactionRawRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionRawRepository transactionRawRepository;

    @GetMapping
    public List<TransactionRawEntity> getAllTransactions() {
        return transactionRawRepository.findAll();
    }
}