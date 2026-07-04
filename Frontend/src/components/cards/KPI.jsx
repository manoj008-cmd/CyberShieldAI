function KPI({ title, value, color }) {
  return (
    <div
      style={{
        background: "#1E293B",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color,
          fontSize: "34px",
          marginTop: "10px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default KPI;