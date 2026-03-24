from pydantic import BaseModel
from typing import Optional


class AnomalyRequest(BaseModel):
    amount: float
    accountId: Optional[str] = None
    transactionType: Optional[str] = None
    merchant: Optional[str] = None
    location: Optional[str] = None


class AnomalyResponse(BaseModel):
    anomalyScore: float
    anomaly: bool
    reason: str
    modelVersion: str
