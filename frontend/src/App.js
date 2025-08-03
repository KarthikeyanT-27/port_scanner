import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [sp, setSp] = useState("");
  const [ep, setEp] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:5000/scan", {
        ip,
        sp,
        ep,
      });
      // Sort the results by port number
      const opened = res.data["opened ports"].sort((a, b) => a.port - b.port);
      const closed = res.data["closed ports"].sort((a, b) => a.port - b.port);
      setResult({ opened, closed });
    } catch (error) {
      console.error(error);
      alert("Error while scanning ports");
    }
    setLoading(false);
  };

  const renderTable = (ports, title, color) => {
    const isClosed = title.toLowerCase().includes("closed");

    return (
      <div className="result-card">
        <h3 className="result-title" style={{ color }}>
          {title}
        </h3>
        {ports.length === 0 ? (
          <p className="no-ports-message">None</p>
        ) : isClosed ? (
          <div className="closed-ports-grid">
            {ports.map((port, idx) => (
              <div key={idx} className="closed-port-item">
                {`${port.port} (${port.service})`}
              </div>
            ))}
          </div>
        ) : (
          <ul className="opened-ports-list">
            {ports.map((item, idx) => (
              <li key={idx} className="opened-port-item">
                <span className="port-number">{item.port}</span>
                <span className="port-service">{item.service}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
        <h2 className="main-title">
          <span role="img" aria-label="port scanner">
            🔍
          </span>{" "}
          Port Scanner Tool
        </h2>

        <div className="input-group">
          <input
            type="text"
            className="input-field"
            placeholder="IP Address (e.g., google.com)"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <input
            type="number"
            className="input-field"
            placeholder="Start Port"
            value={sp}
            onChange={(e) => setSp(e.target.value)}
          />
          <input
            type="number"
            className="input-field"
            placeholder="End Port"
            value={ep}
            onChange={(e) => setEp(e.target.value)}
          />
        </div>

        <button onClick={handleScan} disabled={loading} className="scan-button">
          {loading ? "Scanning..." : "Start Scan"}
        </button>

        {result && (
          <div className="results-container">
            {renderTable(result.opened, "✅ Opened Ports", "#38c75d")}
            {renderTable(result.closed, "❌ Closed Ports", "#ff5b5b")}
          </div>
        )}
    </div>
  );
}

export default App;