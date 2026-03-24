# Anomaly Detection System

A real-time transaction anomaly detection platform built with a polyglot microservice architecture.

## Architecture
```
React Dashboard → Spring Boot Backend → Kafka → PostgreSQL
                                      → Python FastAPI ML Service (Isolation Forest)
```

## Tech Stack

- **Backend**: Java 21, Spring Boot 4, Spring Kafka, Spring Data JPA
- **ML Service**: Python 3.11, FastAPI, scikit-learn (Isolation Forest)
- **Messaging**: Apache Kafka
- **Database**: PostgreSQL 17
- **Frontend**: React, Vite, Axios
- **Infrastructure**: Docker, Docker Compose

## How It Works

1. Transaction events are published to a Kafka topic
2. Spring Boot consumes each event, validates and persists it to PostgreSQL
3. For each transaction, Spring Boot calls the Python ML service with feature data
4. The ML service runs Isolation Forest inference and returns an anomaly score, flag, and reason
5. Results are saved to PostgreSQL and exposed via REST APIs
6. The React dashboard displays transactions, anomalies, and flagged alerts in real time

## Running Locally

### Prerequisites
- Docker and Docker Compose

### Start everything
```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| React Dashboard | http://localhost:5173 |
| Spring Boot API | http://localhost:8080 |
| Python ML Service | http://localhost:8000 |

## API Endpoints
```
GET /api/transactions
GET /api/anomalies
GET /api/anomalies/flagged
POST /predict (ML service)
GET  /health  (ML service)
```

## Project Structure
```
anomaly-detection-system/
├── backend/anomaly-service/      # Spring Boot
├── ml-service/python-anomaly-api/ # FastAPI + Isolation Forest
├── frontend/anomaly-dashboard/   # React + Vite
└── docker-compose.yml
```