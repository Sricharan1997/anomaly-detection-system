package com.sricharan.anomaly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@EnableKafka
@SpringBootApplication
public class AnomalyApplication {

    public static void main(String[] args) {
        SpringApplication.run(AnomalyApplication.class, args);
    }
}