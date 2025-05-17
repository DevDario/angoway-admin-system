import React, { useRef } from "react";
import Layout from "../_layout";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapPage.css";

// Dummy data for demonstration. Replace with real data from your hooks/api.
const activeDrivers = [
  {
    id: 1,
    name: "João Silva",
    busId: "BUS-101",
    route: "Luanda - Viana",
    lat: -8.8383,
    lng: 13.2344,
  },
  {
    id: 2,
    name: "Maria Santos",
    busId: "BUS-102",
    route: "Viana - Cacuaco",
    lat: -8.95,
    lng: 13.25,
  },
  {
    id: 3,
    name: "Carlos Lima",
    busId: "BUS-103",
    route: "Cacuaco - Talatona",
    lat: -8.92,
    lng: 13.3,
  },
  {
    id: 4,
    name: "Carlos Lima",
    busId: "BUS-103",
    route: "Cacuaco - Talatona",
    lat: -8.92,
    lng: 13.3,
  },
  {
    id: 5,
    name: "Carlos Lima",
    busId: "BUS-103",
    route: "Cacuaco - Talatona",
    lat: -8.92,
    lng: 13.3,
  },
  {
    id: 6,
    name: "Carlos Lima",
    busId: "BUS-103",
    route: "Cacuaco - Talatona",
    lat: -8.92,
    lng: 13.3,
  },
  {
    id: 7,
    name: "Carlos Lima",
    busId: "BUS-103",
    route: "Cacuaco - Talatona",
    lat: -8.92,
    lng: 13.3,
  },
];

const busIcon = new L.Icon({
  iconUrl: "/busStopIcon.png",
  iconSize: [32, 32],
});

// Helper component to animate map view
function FlyToLocation({ position }: { position: [number, number] | null }) {
  const map = useMap();
  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.2 });
    }
  }, [position, map]);
  return null;
}

export default function MapPage() {
  const [selectedPosition, setSelectedPosition] = React.useState<
    [number, number] | null
  >(null);

  function handleDeactivateDriver(id: number): void {
    alert(`Motorista com ID ${id} desativado.`);
  }

  return (
    <Layout>
      <div className="map-page-container">
        <aside className="map-page-sidebar">
          <h2 className="sidebar-title">Motoristas Ativos</h2>
          <ul className="drivers-list">
            {activeDrivers.map((driver) => (
              <li
                key={driver.id}
                className="driver-list-item"
                onClick={() => setSelectedPosition([driver.lat, driver.lng])}
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                <div className="driver-route">{driver.route}</div>
                <div className="driver-name">{driver.name}</div>
                <div className="driver-busid">Autocarro: {driver.busId}</div>
                <div
                  style={{ display: "flex", gap: "8px", marginBottom: "2px" }}
                >
                  <button
                    style={{
                      background: "#ffeaea",
                      color: "#d32f2f",
                      borderRadius: "4px",
                      padding: "4px",
                      cursor: "pointer",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                    onClick={() => handleDeactivateDriver(driver.id)}
                  >
                    Desativar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <div className="map-area">
          <MapContainer
            center={[-8.92, 13.25]}
            zoom={12}
            style={{ width: "100%", borderRadius: "8px" }}
            className="bg-map-container"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            {activeDrivers.map((driver) => (
              <Marker
                key={driver.id}
                position={[driver.lat, driver.lng]}
                icon={busIcon}
              >
                <Popup>
                  <div>
                    <strong>{driver.name}</strong>
                    <br />
                    Autocarro: {driver.busId}
                    <br />
                    <small>{driver.route}</small>
                  </div>
                </Popup>
              </Marker>
            ))}
            <FlyToLocation position={selectedPosition} />
          </MapContainer>
        </div>
      </div>
    </Layout>
  );
}
