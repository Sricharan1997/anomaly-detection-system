import { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

export default function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactions().then(res => setData(res.data));
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