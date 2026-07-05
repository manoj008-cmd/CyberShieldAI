import { useEffect, useState } from "react";
import api from "../../services/api";

function AIExplanation() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/explanation");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    load();

    const timer = setInterval(load, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!data) return null;

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
      <h2>🧠 AI Decision Explanation</h2>

      <p>
        <b>Prediction:</b> {data.prediction}
      </p>

      <p>
        <b>Confidence:</b> {data.confidence}%
      </p>

      <p>
        <b>Reason:</b>
      </p>

      <p>{data.reason}</p>

      <h3>Top Features</h3>

      <ul>
        {data.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

export default AIExplanation;