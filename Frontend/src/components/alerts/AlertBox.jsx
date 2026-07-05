import { useEffect, useState } from "react";

function AlertBox({ prediction }) {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (prediction && prediction.prediction) {
      if (
        prediction.prediction !== "Normal" &&
        prediction.prediction !== "Loading..." &&
        prediction.confidence >= 95
      ) {
        setAlert(prediction);
      } else {
        setAlert(null);
      }
    }
  }, [prediction]);

  if (!alert) return null;

  return (

    <div
      style={{
        background: "#7F1D1D",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        border: "2px solid red",
        boxShadow: "0px 0px 20px red",
      }}
    >
      <h2>🚨 CRITICAL ALERT</h2>

      <h3>{alert.prediction}</h3>

      <p>
        Confidence : {alert.confidence}%
      </p>

      <hr />

      <h4>Recommended Actions</h4>

      <ul>
        <li>Block Source IP</li>
        <li>Notify SOC Team</li>
        <li>Increase Firewall Protection</li>
        <li>Capture Network Packets</li>
      </ul>

    </div>

  );

}

export default AlertBox;