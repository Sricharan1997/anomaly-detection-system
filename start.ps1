# Start Python ML service
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd C:\Projects\AnomalyDetectionSystem\ml-service\python-anomaly-api; uvicorn app:app --host 0.0.0.0 --port 8000'

Start-Sleep -Seconds 3

# Start Spring Boot
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd C:\Projects\AnomalyDetectionSystem\springboot\anomaly; .\gradlew bootRun'

Start-Sleep -Seconds 20

# Start React frontend
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd C:\Projects\AnomalyDetectionSystem\frontend\anomaly-dashboard; npm run dev'

Start-Sleep -Seconds 5

# Open browser
Start-Process "http://localhost:5173"

Write-Host "All services started. Browser opening..."