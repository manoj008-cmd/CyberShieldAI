import { useEffect, useState } from "react";
import api from "../../services/api";

function PacketCapture() {
  const [packets, setPackets] = useState({
    total: 0,
    tcp: 0,
    udp: 0,
    icmp: 0,
    other: 0,
  });

  const fetchPackets = async () => {
    try {
      const res = await api.get("/capture");
      setPackets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPackets();

    const interval = setInterval(fetchPackets, 3000);

    return () => clearInterval(interval);
  }, []);

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
      <h2>📡 Live Packet Capture</h2>

      <p><strong>Total Packets:</strong> {packets.total}</p>

      <p><strong>TCP:</strong> {packets.tcp}</p>

      <p><strong>UDP:</strong> {packets.udp}</p>

      <p><strong>ICMP:</strong> {packets.icmp}</p>

      <p><strong>Other:</strong> {packets.other}</p>
    </div>
  );
}

export default PacketCapture;