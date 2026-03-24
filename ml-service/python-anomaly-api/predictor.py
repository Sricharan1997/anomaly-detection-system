from schemas import AnomalyRequest, AnomalyResponse


def predict_anomaly(request: AnomalyRequest) -> AnomalyResponse:
    amount = request.amount

    if amount > 10000:
        return AnomalyResponse(
            anomalyScore=0.95,
            anomaly=True,
            reason="High transaction amount detected",
            modelVersion="python-rule-v1"
        )
    elif amount > 5000:
        return AnomalyResponse(
            anomalyScore=0.70,
            anomaly=False,
            reason="Moderately high amount",
            modelVersion="python-rule-v1"
        )
    else:
        return AnomalyResponse(
            anomalyScore=0.10,
            anomaly=False,
            reason="Transaction appears normal",
            modelVersion="python-rule-v1"
        )
