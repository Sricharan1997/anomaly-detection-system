from kafka import KafkaProducer
import json
import time
import random

producer = KafkaProducer(
    bootstrap_servers="localhost:9092",
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

print("Producer started...")

while True:

    event = {
        "event_id": f"EVT-{random.randint(100000,999999)}",
        "provider_id": f"PR-{random.randint(100,999)}",
        "amount": round(random.uniform(100,900),2)
    }

    producer.send("billing.transactions.v1", event)

    print("Sent:", event)

    time.sleep(2)