import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import { FaProjectDiagram } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import {

  FaShieldAlt,
  FaHome,
  FaChartLine,
  FaNetworkWired,
  FaFileAlt,
  FaCog,
  FaExclamationTriangle,
  FaUsers,
  FaBell,
} from "react-icons/fa";

function Sidebar() {
  const role = localStorage.getItem("role");

  const menu = [
    {
      icon: <FaHome />,
      text: "Dashboard",
      path: "/dashboard",
    },
    {
    icon: <FaClipboardList />,
    text: "Activity Logs",
    path: "/activity-logs",
    },
    {
      icon: <FaNetworkWired />,
      text: "Live Traffic",
      path: "/live",
    },
    {
    icon:<FaProjectDiagram />,
    text:"Architecture",
    path:"/architecture",
},
    {
      icon: <FaBell />,
      text: "Alerts",
      path: "/alerts",
    },
    {
      icon: <FaChartLine />,
      text: "Analytics",
      path: "/analytics",
    },
    {
      icon: <FaFileAlt />,
      text: "Reports",
      path: "/reports",
    },
    {
      icon: <FaExclamationTriangle />,
      text: "Incidents",
      path: "/incidents",
    },
    {
      icon: <FaUsers />,
      text: "Users",
      path: "/users",
    },
    {
      icon: <FaCog />,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      style={{
        width: "240px",
        background: "#111827",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "40px",
        }}
      >
        <FaShieldAlt color="#3B82F6" />
        CyberShield AI
      </h2>

      {menu
        .filter((item) => {
          if (item.path === "/users" && role !== "Administrator") {
            return false;
          }
          return true;
        })
        .map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                cursor: "pointer",
                borderRadius: "8px",
                marginBottom: "8px",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1E293B")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          </Link>
        ))}
      <hr style={{ borderColor: "#1F2937", margin: "15px 0" }} />
      <LogoutButton />
    </div>
  );
}

export default Sidebar;