import { useEffect, useState } from "react";
import { getAnomalies } from "../services/api";

export default function Anomalies() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAnomalies().then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>All Anomalies</h2>
      <table border="1" cellPadding="8" style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr><th>ID</th><th>Transaction ID</th><th>Score</th><th>Flagged</th><th>Reason</th><th>Model</th><th>Created At</th></tr>
        </thead>
        <tbody>
          {data.map(a => (
            <tr key={a.id} style={{background: a.anomalyFlag ? "#ffe0e0" : "white"}}>
              <td>{a.id}</td>
              <td>{a.transactionId}</td>
              <td>{a.anomalyScore}</td>
              <td>{a.anomalyFlag ? "YES" : "NO"}</td>
              <td>{a.anomalyReason}</td>
              <td>{a.modelVersion}</td>
              <td>{a.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}