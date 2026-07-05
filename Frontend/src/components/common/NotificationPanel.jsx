import { useEffect, useState } from "react";
import api from "../../services/api";

function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(loadNotifications, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: "#1E293B",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2>🔔 Live Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #374151",
              padding: "10px 0",
            }}
          >
            <b>{n.attack}</b>

            <br />

            Confidence : {n.confidence}%

            <br />

            {n.time}
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationPanel;