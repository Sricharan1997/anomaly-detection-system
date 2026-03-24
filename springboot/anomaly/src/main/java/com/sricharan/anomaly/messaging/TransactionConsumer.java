package com.sricharan.anomaly.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sricharan.anomaly.model.TransactionEvent;
import com.sricharan.anomaly.service.AnomalyDetectionService;
import com.sricharan.anomaly.service.TransactionPersistenceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;

@Component
public class TransactionConsumer {

    private static final Logger log = LoggerFactory.getLogger(TransactionConsumer.class);

    private final ObjectMapper objectMapper;
    private final TransactionPersistenceService persistenceService;
    private final AnomalyDetectionService anomalyDetectionService;

    public TransactionConsumer(ObjectMapper objectMapper,
                               TransactionPersistenceService persistenceService,
                               AnomalyDetectionService anomalyDetectionService) {
        this.objectMapper = objectMapper;
        this.persistenceService = persistenceService;
        this.anomalyDetectionService = anomalyDetectionService;
    }

    @KafkaListener(topics = "${app.topics.transactions}")
    public void listen(String payload, Acknowledgment acknowledgment) {
        log.info("Kafka message received: {}", payload);
        try {
            TransactionEvent event = objectMapper.readValue(payload, TransactionEvent.class);
            boolean inserted = persistenceService.persistIfNew(event);
            anomalyDetectionService.detect(event);
            log.info("Processed eventId={} inserted={}", event.getEvent_id(), inserted);
            acknowledgment.acknowledge();
        } catch (Exception ex) {
            log.error("Failed to process Kafka message: {}", payload, ex);
            acknowledgment.acknowledge();
        }
    }
}