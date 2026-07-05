import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import api from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const loadUsers = async () => {
    try {
      const role = localStorage.getItem("role");
      const res = await api.get("/users", {
        params: { role }
      });
      if (Array.isArray(res.data)) {
        setUsers(res.data);
        setErrorMsg("");
      } else {
        setErrorMsg(res.data.message || "Failed to load users.");
        setUsers([]);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg("Failed to connect to the server.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout>
      <h1 style={{ color: "white", marginBottom: "20px" }}>
        👥 User Management
      </h1>

      <div
        style={{
          background: "#1E293B",
          padding: "25px",
          borderRadius: "12px",
          color: "white",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>System Users</h2>

        {errorMsg ? (
          <div
            style={{
              padding: "12px",
              background: "#7F1D1D",
              border: "1px solid #DC2626",
              borderRadius: "8px",
              color: "#FCA5A5",
              marginBottom: "15px"
            }}
          >
            ⚠️ {errorMsg}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                color: "white",
                borderCollapse: "collapse",
                textAlign: "left"
              }}
            >
              <thead>
                <tr style={{ background: "#0F172A", borderBottom: "2px solid #334155" }}>
                  <th style={{ padding: "14px 16px" }}>ID</th>
                  <th style={{ padding: "14px 16px" }}>Username</th>
                  <th style={{ padding: "14px 16px" }}>Role</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: "1px solid #334155",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#334155")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px" }}>{user.id}</td>
                    <td style={{ padding: "14px 16px" }}>{user.username}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: user.role === "Administrator" ? "#3B82F6" : "#475569",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "13px",
                          fontWeight: "600"
                        }}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default UserManagement;