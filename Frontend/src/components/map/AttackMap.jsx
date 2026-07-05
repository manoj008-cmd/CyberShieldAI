import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const attacks = [
  {
    country: "India",
    attack: "Brute Force",
    position: [20.5937, 78.9629],
    color: "red",
  },
  {
    country: "USA",
    attack: "DDoS",
    position: [37.0902, -95.7129],
    color: "orange",
  },
  {
    country: "Germany",
    attack: "Port Scan",
    position: [51.1657, 10.4515],
    color: "yellow",
  },
  {
    country: "China",
    attack: "Botnet",
    position: [35.8617, 104.1954],
    color: "red",
  },
];

function AttackMap() {
  return (
    <div
      style={{
        background: "#1E293B",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
      }}
    >
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        🌍 Global Attack Map
      </h2>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {attacks.map((item, index) => (
          <CircleMarker
            key={index}
            center={item.position}
            radius={10}
            pathOptions={{
              color: item.color,
              fillColor: item.color,
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <strong>{item.country}</strong>
              <br />
              Attack: {item.attack}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default AttackMap;