import Layout from "../components/Layout/Layout";

function Settings() {
  return (
    <Layout>
      <h1 style={{ color: "white" }}>⚙ Settings</h1>

      <div
        style={{
          background: "#1E293B",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <h2>Application Settings</h2>

        <p>Project : CyberShield AI</p>

        <p>Version : 1.0.0</p>

        <p>Status : Running</p>

        <p>Database : SQLite</p>

        <p>Machine Learning : Random Forest</p>

        <p>Backend : FastAPI</p>

        <p>Frontend : React + Vite</p>
      </div>
    </Layout>
  );
}

export default Settings;