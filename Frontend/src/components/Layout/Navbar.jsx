import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#1E293B",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
      }}
    >
      <h2>CyberShield AI Dashboard</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <span style={{ color: "#22C55E" }}>● System Online</span>

        <FaBell size={20} />

        <FaUserCircle size={28} />
      </div>
    </div>
  );
}

export default Navbar;