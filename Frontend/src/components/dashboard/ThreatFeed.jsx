import { useEffect, useState } from "react";
import api from "../../services/api";

function ThreatFeed() {

  const [feed, setFeed] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/threat-feed");
      setFeed(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const color = (severity) => {
    if (severity === "Critical") return "#DC2626";
    if (severity === "High") return "#F59E0B";
    return "#22C55E";
  };

  return (
    <div
      style={{
        background: "#1E293B",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h2>🌍 Threat Intelligence Feed</h2>

      <table
        style={{
          width: "100%",
          marginTop: "15px",
        }}
      >
        <thead>
          <tr>
            <th align="left">CVE</th>
            <th align="left">Threat</th>
            <th align="left">Severity</th>
          </tr>
        </thead>

        <tbody>
          {feed.map((item, index) => (
            <tr key={index}>
              <td>{item.cve}</td>
              <td>{item.title}</td>
              <td
                style={{
                  color: color(item.severity),
                  fontWeight: "bold",
                }}
              >
                {item.severity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThreatFeed;