import { useState } from "react";
import Transactions from "./pages/Transactions";
import Anomalies from "./pages/Anomalies";
import Flagged from "./pages/Flagged";

export default function App() {
  const [page, setPage] = useState("transactions");

  return (
    <div style={{fontFamily:"sans-serif", padding:"20px"}}>
      <h1>Anomaly Detection Dashboard</h1>
      <nav style={{marginBottom:"20px"}}>
        <button onClick={() => setPage("transactions")} style={{marginRight:"10px"}}>Transactions</button>
        <button onClick={() => setPage("anomalies")} style={{marginRight:"10px"}}>Anomalies</button>
        <button onClick={() => setPage("flagged")}>Flagged</button>
      </nav>
      {page === "transactions" && <Transactions />}
      {page === "anomalies" && <Anomalies />}
      {page === "flagged" && <Flagged />}
    </div>
  );
}