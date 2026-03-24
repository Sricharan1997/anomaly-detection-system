package com.sricharan.anomaly.service;

import com.sricharan.anomaly.entity.TransactionRawEntity;
import com.sricharan.anomaly.model.TransactionEvent;
import com.sricharan.anomaly.repository.TransactionRawRepository;
import org.springframework.stereotype.Service;

@Service
public class TransactionPersistenceService {

    private final TransactionRawRepository repository;

    public TransactionPersistenceService(TransactionRawRepository repository) {
        this.repository = repository;
    }

    public boolean persistIfNew(TransactionEvent event) {
        if (repository.existsById(event.getEvent_id())) {
            return false;
        }

        TransactionRawEntity entity = new TransactionRawEntity();
        entity.setEventId(event.getEvent_id());
        entity.setProviderId(event.getProvider_id());
        entity.setAmount(event.getAmount());

        repository.save(entity);
        return true;
    }
}