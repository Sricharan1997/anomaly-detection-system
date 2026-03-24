import json
import random
import time
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

topic = 'billing.transactions.v1'

for i in range(20):
    txn_id = f"txn-{random.randint(1000, 9999)}"
    message = {
        "event_id": txn_id,
        "amount": round(random.uniform(100, 25000), 2),
        "account_id": f"acc-{random.randint(100, 999)}",
        "transaction_type": random.choice(["PAYMENT", "REFUND", "TRANSFER"]),
        "location": random.choice(["NY", "CA", "TX", "FL"]),
        "merchant": f"merchant-{random.randint(1, 50)}"
    }
    producer.send(topic, value=message)
    print(f"Sent: {message}")
    time.sleep(0.5)

producer.flush()
print("Done - 20 transactions sent")