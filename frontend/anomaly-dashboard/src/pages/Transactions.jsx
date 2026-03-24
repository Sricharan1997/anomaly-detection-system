import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

export default function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactions()
      .then(res => {
        const result = Array.isArray(res.data) ? res.data : [];
        setData(result);
      })
      .catch(err => console.error("Failed to fetch transactions:", err));
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <table border="1" cellPadding="8" style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr><th>Event ID</th><th>Amount</th><th>Received At</th></tr>
        </thead>
        <tbody>
          {data.map(t => (
            <tr key={t.eventId}>
              <td>{t.eventId}</td>
              <td>${t.amount}</td>
              <td>{t.receivedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}