import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
function AttackTable() {
  const [attacks, setAttacks] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loadAttacks = async () => {
      try {
        const res = await api.get(`/attacks?search=${search}`);
        setAttacks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadAttacks();

    const timer = setInterval(loadAttacks, 3000);

    return () => clearInterval(timer);
  }, [search]);

  const severityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "#DC2626";
      case "High":
        return "#EF4444";
      case "Medium":
        return "#F59E0B";
      default:
        return "#22C55E";
    }
  };

  return (
    <div
      style={{
        background: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        color: "white",
      }}
    >
      <h2>Recent Attacks</h2>
       {/* Search Box */}
    <input
      placeholder="Search Attack / IP / Severity"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "none",
      }}
    />

      

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Time</th>
            <th>IP Address</th>
            <th>Attack</th>
            <th>Confidence</th>
            <th>Severity</th>
          </tr>
        </thead>

        <tbody>
          {attacks.map((a, index) => (
           <tr
              key={index}
              onClick={() => navigate(`/attack/${a.id}`)}
              style={{
                cursor: "pointer"
              }}
>
              <td>{a.time}</td>
              <td>{a.ip}</td>
              <td>{a.attack}</td>
              <td>{a.confidence}%</td>
              <td
                style={{
                  color: severityColor(a.severity),
                  fontWeight: "bold",
                }}
              >
                {a.severity}
              </td>
            </tr>
          ))}

          {attacks.length === 0 && (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No attacks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttackTable;