import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const login = async () => {
    try {
      const res = await api.post("/login", {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);

        navigate("/dashboard");
      } else {
        alert(res.data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0F172A",
      }}
    >
      <div
        style={{
          width: "350px",
          background: "#1E293B",
          padding: "30px",
          borderRadius: "12px",
          color: "white",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          CyberShield AI
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #334155",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #334155",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default Login;