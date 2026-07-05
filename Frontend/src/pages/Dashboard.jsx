import { useEffect, useState } from "react";
import api from "../services/api";

import Layout from "../components/Layout/Layout";
import ThemeToggle from "../components/dashboard/ThemeToggle";
import NotificationPanel from "../components/common/NotificationPanel";

import KPI from "../components/cards/KPI";
import LivePrediction from "../components/cards/LivePrediction";

import ThreatChart from "../components/charts/ThreatChart";
import PieThreat from "../components/charts/PieThreat";

import AttackTable from "../components/tables/AttackTable";
import TrafficMonitor from "../components/traffic/TrafficMonitor";

import FeatureImportance from "../components/explainable/FeatureImportance";

import AlertBox from "../components/alerts/AlertBox";
import IncidentReport from "../components/reports/IncidentReport";

import AttackMap from "../components/map/AttackMap";

import NetworkTopology from "../components/network/NetworkTopology";
import PacketCapture from "../components/network/PacketCapture";

import SOCDashboard from "../components/dashboard/SOCDashboard";
import AIResponse from "../components/dashboard/AIResponse";
import SystemHealth from "../components/dashboard/SystemHealth";
import RiskScore from "../components/dashboard/RiskScore";
import MitreMapping from "../components/dashboard/MitreMapping";
import AIRecommendations from "../components/dashboard/AIRecommendations";
import EventLogs from "../components/dashboard/EventLogs";
import ThreatFeed from "../components/dashboard/ThreatFeed";
import AttackTimeline from "../components/dashboard/AttackTimeline";
import ExportButtons from "../components/dashboard/ExportButtons";
import AIExplanation from "../components/explainable/AIExplanation";
import StatusBar from "../components/dashboard/StatusBar";
function Dashboard() {

    const [stats, setStats] = useState({
        total_attacks: 0,
        brute_force: 0,
        normal: 0,
        critical: 0,
    });

    const [prediction, setPrediction] = useState({
        prediction: "Loading...",
        confidence: 0,
        severity: "Low",
    });

    const fetchStatistics = async () => {
        try {
            const res = await api.get("/statistics");
            setStats(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchPrediction = async () => {
        try {
            const res = await api.get("/live");
            setPrediction(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchStatistics();
        fetchPrediction();

        const statsInterval = setInterval(fetchStatistics, 5000);
        const predInterval = setInterval(fetchPrediction, 5000);

        return () => {
            clearInterval(statsInterval);
            clearInterval(predInterval);
        };
    }, []);

    return (
  <Layout>

    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <h2>🛡 Welcome {localStorage.getItem("username")}</h2>
    <p>CyberShield AI Security Operations Center is running.</p>
  </div>

  <ThemeToggle />
</div>
    {/* SOC Dashboard */}
    <SOCDashboard />
    <StatusBar />
    {/* KPI Cards */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <KPI title="Total Attacks" value={stats.total_attacks} color="#EF4444" />
      <KPI title="Brute Force" value={stats.brute_force} color="#F59E0B" />
      <KPI title="Normal" value={stats.normal} color="#22C55E" />
      <KPI title="Critical" value={stats.critical} color="#3B82F6" />
    </div>

    {/* Prediction + Health */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <LivePrediction prediction={prediction} />
      <SystemHealth />
      <RiskScore />
    </div>

    {/* Charts */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <ThreatChart />
      <PieThreat />
    </div>

    {/* AI Section */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <FeatureImportance />
      <AIExplanation />
      <AIRecommendations />
    </div>

    {/* Security Intelligence */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <MitreMapping />
      <ThreatFeed />
    </div>

    {/* Monitoring */}
    <TrafficMonitor />

    <AttackTimeline />

    <EventLogs />

    <AttackTable />

    {/* AI Response */}
    <AIResponse />

    {/* Network */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <PacketCapture />
      <NetworkTopology prediction={prediction} />
    </div>

    <AttackMap />

    {/* Alerts & Reports */}
    <AlertBox prediction={prediction} />

    <IncidentReport />

    <ExportButtons />

    <NotificationPanel />

    {/* Footer */}
    <div
      style={{
        marginTop: "40px",
        padding: "15px",
        textAlign: "center",
        color: "#94A3B8",
      }}
    >
      CyberShield AI v1.0 | AI Powered Network Intrusion Detection & Response System
    </div>

  </Layout>
);

}

export default Dashboard;