import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

function LivePrediction({ prediction }) {
  // Prevent repeated notifications
  const lastPrediction = useRef("");

  useEffect(() => {
    if (prediction && prediction.prediction && prediction.prediction !== "Loading...") {
      // Show notification only when prediction changes
      if (lastPrediction.current !== prediction.prediction) {
        lastPrediction.current = prediction.prediction;

        if (prediction.prediction !== "Normal") {
          toast.error(
            `🚨 ${prediction.prediction}\nConfidence: ${prediction.confidence}%`,
            {
              autoClose: 5000,
            }
          );
        } else {
          toast.success("✅ Network Traffic Normal", {
            autoClose: 3000,
          });
        }
      }
    }
  }, [prediction]);

  const predictionColor =
    prediction.prediction === "Normal" ? "#22C55E" : "#EF4444";

  const severityColor = () => {
    switch (prediction.severity) {
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
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
      }}
    >
      <h2>🤖 Live AI Prediction</h2>

      <h1
        style={{
          color: predictionColor,
          marginTop: "15px",
        }}
      >
        {prediction.prediction}
      </h1>

      <h3>Confidence: {prediction.confidence}%</h3>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#334155",
          borderRadius: "10px",
          marginTop: "15px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${prediction.confidence}%`,
            height: "100%",
            background: predictionColor,
            transition: "0.5s",
          }}
        />
      </div>

      {/* Severity Badge */}
      <div
        style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "8px 16px",
          background: severityColor(),
          borderRadius: "20px",
          fontWeight: "bold",
        }}
      >
        Severity: {prediction.severity}
      </div>
    </div>
  );
}

export default LivePrediction;