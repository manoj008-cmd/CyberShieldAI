import Layout from "../components/Layout/Layout";
import IncidentReport from "../components/reports/IncidentReport";

function Reports() {
  return (
    <Layout>
      <h1 style={{ color: "white", marginBottom: "20px" }}>
        📄 Reports Center
      </h1>

      <div
        style={{
          background: "#1E293B",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Incident Reports Generator</h2>
        <p style={{ color: "#94A3B8", marginBottom: "25px", lineHeight: "1.6" }}>
          Generate and download a comprehensive security report detailing the latest network intrusion events, 
          AI model classification confidence, and immediate defense response recommendations.
        </p>

        <IncidentReport />
      </div>
    </Layout>
  );
}

export default Reports;