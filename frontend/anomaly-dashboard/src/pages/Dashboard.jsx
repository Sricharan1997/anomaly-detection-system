import { useEffect, useState } from "react";
import { getTransactions, getAnomalies, getFlaggedAnomalies } from "../services/api";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function severity(score) {
  if (score >= 0.8) return { label: "High", color: "#fef2f2", text: "#991b1b" };
  if (score >= 0.5) return { label: "Medium", color: "#fffbeb", text: "#92400e" };
  return { label: "Low", color: "#f0fdf4", text: "#166534" };
}

function ScoreBar({ score }) {
  const pct = Math.round(score * 100);
  const color = score >= 0.8 ? "#ef4444" : score >= 0.5 ? "#f59e0b" : "#22c55e";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#f1f5f9" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: color }} />
      </div>
      <span style={{ fontSize: 12, color: "#64748b", minWidth: 32 }}>{score.toFixed(2)}</span>
    </div>
  );
}

export default function Dashboard() {
  const [anomalies, setAnomalies] = useState([]);
  const [flagged, setFlagged] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState("all");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const load = () => {
    getAnomalies().then(r => Array.isArray(r.data) && setAnomalies(r.data)).catch(() => {});
    getFlaggedAnomalies().then(r => Array.isArray(r.data) && setFlagged(r.data)).catch(() => {});
    getTransactions().then(r => Array.isArray(r.data) && setTransactions(r.data)).catch(() => {});
    setLastRefresh(new Date());
  };

  useEffect(() => { load(); const t = setInterval(load, 30000); return () => clearInterval(t); }, []);

  const avg = anomalies.length ? (anomalies.reduce((s, a) => s + a.anomalyScore, 0) / anomalies.length).toFixed(2) : "—";
  const high = anomalies.filter(a => a.anomalyScore >= 0.8).length;
  const med = anomalies.filter(a => a.anomalyScore >= 0.5 && a.anomalyScore < 0.8).length;
  const low = anomalies.filter(a => a.anomalyScore < 0.5).length;

  const doughnutData = {
    labels: ["High", "Medium", "Low"],
    datasets: [{ data: [high, med, low], backgroundColor: ["#ef4444", "#f59e0b", "#22c55e"], borderWidth: 0 }]
  };

  const barData = {
    labels: anomalies.map(a => a.transactionId),
    datasets: [{
      label: "Anomaly score",
      data: anomalies.map(a => a.anomalyScore),
      backgroundColor: anomalies.map(a => a.anomalyFlag ? "#ef4444" : "#22c55e"),
      borderRadius: 3
    }]
  };

  const s = { fontFamily: "system-ui, sans-serif", padding: "24px", maxWidth: 1200, margin: "0 auto" };

  return (
    <div style={s}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Anomaly Detection Dashboard</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#22c55e", marginRight: 6 }} />
            Live · refreshes every 30s
          </p>
        </div>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Last refresh: {lastRefresh.toLocaleTimeString()}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total transactions", value: transactions.length, sub: `${transactions.length} today`, up: false },
          { label: "Flagged anomalies", value: flagged.length, sub: `${transactions.length ? Math.round(flagged.length/transactions.length*100) : 0}% flag rate`, up: true },
          { label: "Avg anomaly score", value: avg, sub: "Isolation Forest", up: parseFloat(avg) > 0.7 },
          { label: "Model version", value: "python-rule-v1", sub: "Active", up: false },
        ].map((m, i) => (
          <div key={i} style={{ background: "#f8fafc", borderRadius: 8, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: i === 1 ? "#ef4444" : "#0f172a" }}>{m.value}</div>
            <div style={{ fontSize: 12, marginTop: 4, color: m.up ? "#991b1b" : "#166534" }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#64748b", marginBottom: 12 }}>Score distribution</div>
          <div style={{ height: 180 }}><Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { font: { size: 11 }, boxWidth: 10 } } }, cutout: "65%" }} /></div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#64748b", marginBottom: 12 }}>Score per transaction</div>
          <div style={{ height: 180 }}><Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 1, ticks: { font: { size: 11 } } }, x: { ticks: { font: { size: 10 }, maxRotation: 45, autoSkip: false }, grid: { display: false } } } }} /></div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
        {["all", "flagged", "transactions"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ fontSize: 13, padding: "6px 14px", borderRadius: 8, border: "1px solid", borderColor: tab === t ? "#94a3b8" : "#e2e8f0", background: tab === t ? "#f1f5f9" : "transparent", color: tab === t ? "#0f172a" : "#64748b", cursor: "pointer" }}>
            {t === "all" ? "All anomalies" : t === "flagged" ? "Flagged only" : "Transactions"}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "16px 20px", overflowX: "auto" }}>
        {tab !== "transactions" ? (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>{["Transaction ID","Score","Severity","Reason","Model","Created at"].map(h => (
                <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 500, color: "#64748b", padding: "6px 10px", borderBottom: "1px solid #f1f5f9" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {(tab === "all" ? anomalies : flagged).map(a => {
                const sev = severity(a.anomalyScore);
                return (
                  <tr key={a.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: 12 }}>{a.transactionId}</td>
                    <td style={{ padding: "8px 10px", minWidth: 120 }}><ScoreBar score={a.anomalyScore} /></td>
                    <td style={{ padding: "8px 10px" }}><span style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 4, background: sev.color, color: sev.text }}>{sev.label}</span></td>
                    <td style={{ padding: "8px 10px", color: "#64748b" }}>{a.anomalyReason}</td>
                    <td style={{ padding: "8px 10px", color: "#64748b" }}>{a.modelVersion}</td>
                    <td style={{ padding: "8px 10px", color: "#64748b", fontSize: 12 }}>{a.createdAt?.replace("T", " ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>{["Event ID","Amount","Received at"].map(h => (
                <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 500, color: "#64748b", padding: "6px 10px", borderBottom: "1px solid #f1f5f9" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.eventId} style={{ borderBottom: "1px solid #f8fafc" }}>
                  <td style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: 12 }}>{t.eventId}</td>
                  <td style={{ padding: "8px 10px", fontWeight: 500 }}>${Number(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: "8px 10px", color: "#64748b", fontSize: 12 }}>{t.receivedAt?.replace("T", " ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}