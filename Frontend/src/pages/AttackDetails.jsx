import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import api from "../services/api";

function AttackDetails() {

  const { attackId } = useParams();

  const [attack, setAttack] = useState(null);

  useEffect(() => {

    const load = async () => {

      const res = await api.get(`/attack/${attackId}`);

      setAttack(res.data);

    };

    load();

  }, [attackId]);

  if (!attack)
    return (
      <Layout>
        <h2 style={{ color: "white" }}>Loading...</h2>
      </Layout>
    );

  return (
    <Layout>

      <h1 style={{ color: "white" }}>
        Attack Details
      </h1>

      <div
        style={{
          background: "#1E293B",
          padding: "20px",
          borderRadius: "12px",
          color: "white",
          marginTop: "20px",
        }}
      >
        <p><b>ID:</b> {attack.id}</p>
        <p><b>Time:</b> {attack.time}</p>
        <p><b>Source IP:</b> {attack.ip}</p>
        <p><b>Attack:</b> {attack.attack}</p>
        <p><b>Confidence:</b> {attack.confidence}%</p>
        <p><b>Severity:</b> {attack.severity}</p>

      </div>

    </Layout>
  );
}

export default AttackDetails;