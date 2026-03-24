from fastapi import FastAPI
from schemas import AnomalyRequest, AnomalyResponse
from predictor import predict_anomaly

app = FastAPI(title="Python Anomaly ML Service")


@app.get("/health")
def health():
    return {"status": "OK"}


@app.post("/predict", response_model=AnomalyResponse)
def predict(request: AnomalyRequest):
    return predict_anomaly(request)
