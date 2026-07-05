import Layout from "../components/Layout/Layout";

function Architecture() {
  return (
    <Layout>

      <h1 style={{ color: "white", marginBottom: "20px" }}>
        🏗 CyberShield AI Architecture
      </h1>

      <div
        style={{
          background: "#1E293B",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
        }}
      >

        <h2>System Workflow</h2>

        <br />

        <pre
          style={{
            color: "#22C55E",
            fontSize: "17px",
            lineHeight: "32px",
          }}
        >
{`
Network Traffic
       │
       ▼
Packet Capture (Scapy)
       │
       ▼
Feature Extraction
       │
       ▼
Random Forest Model
       │
       ▼
Attack Prediction
       │
       ▼
Risk Analysis Engine
       │
       ├─────────────┐
       ▼             ▼
 Dashboard      Incident Report
       │             │
       ▼             ▼
 Analytics      Alerts
       │
       ▼
 SOC Dashboard
`}
        </pre>

      </div>

      <br />

      <div
        style={{
          background: "#1E293B",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
        }}
      >

        <h2>Technology Stack</h2>

        <table style={{ width: "100%", marginTop: "20px" }}>

          <tbody>

            <tr>
              <td>Frontend</td>
              <td>React + Vite</td>
            </tr>

            <tr>
              <td>Backend</td>
              <td>FastAPI</td>
            </tr>

            <tr>
              <td>Database</td>
              <td>SQLite</td>
            </tr>

            <tr>
              <td>Machine Learning</td>
              <td>Random Forest</td>
            </tr>

            <tr>
              <td>Packet Capture</td>
              <td>Scapy</td>
            </tr>

            <tr>
              <td>Visualization</td>
              <td>Chart.js</td>
            </tr>

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Architecture;