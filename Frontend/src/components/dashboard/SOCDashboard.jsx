import { useEffect, useState } from "react";
import api from "../../services/api";

function SOCDashboard() {

    const [data, setData] = useState(null);

    const load = async () => {
        try {
            const res = await api.get("/soc-status");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        load();

        const timer = setInterval(load, 5000);

        return () => clearInterval(timer);

    }, []);

    if (!data) return null;

    return (
        <div
            style={{
                background: "#1E293B",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
            }}
        >
            <h2>🛡 Security Operations Center</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "15px",
                    marginTop: "20px",
                }}
            >
                <div style={{ background: "#0F172A", padding: "15px", borderRadius: "8px" }}>
                    <h3>Total Attacks</h3>
                    <h1>{data.total}</h1>
                </div>

                <div style={{ background: "#0F172A", padding: "15px", borderRadius: "8px" }}>
                    <h3>Critical</h3>
                    <h1 style={{ color: "#EF4444" }}>{data.critical}</h1>
                </div>

                <div style={{ background: "#0F172A", padding: "15px", borderRadius: "8px" }}>
                    <h3>Alerts</h3>
                    <h1>{data.alerts}</h1>
                </div>

                <div style={{ background: "#0F172A", padding: "15px", borderRadius: "8px" }}>
                    <h3>Incidents</h3>
                    <h1>{data.incidents}</h1>
                </div>
            </div>

            {data.latest && (
                <div
                    style={{
                        marginTop: "20px",
                        background: "#0F172A",
                        padding: "15px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>Latest Attack</h3>

                    <p><b>Attack:</b> {data.latest[0]}</p>

                    <p><b>Source IP:</b> {data.latest[1]}</p>

                    <p><b>Confidence:</b> {data.latest[2]}%</p>
                </div>
            )}
        </div>
    );
}

export default SOCDashboard;