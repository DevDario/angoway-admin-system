import React from "react";
import Layout from "../_layout";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapPage.css";
import { useBusesLocation } from "../../hooks/useBusesLocation";
import {
  AlertTriangle,
  AlertTriangleIcon,
  ArrowLeftRightIcon,
  KeySquareIcon,
  LocateFixedIcon,
  UserIcon,
  UserSearchIcon,
} from "lucide-react";
import AlertModal from "../../components/AlertModal";
import { toast } from "sonner";

const busIcon = new L.Icon({
  iconUrl: "/busMarker.png",
  iconSize: [32, 32],
});

const busAlertIcon = new L.Icon({
  iconUrl: "/busMarkerAlert.png",
  iconSize: [32, 32],
});

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
  const { buses } = useBusesLocation();
  const [success, setSuccess] = React.useState<string>("");

  function handleDeactivateDriver(id: number) {
    setSuccess("Autocarro desativado");
  }

  function handleCopyLocation(bus) {
    if (bus.lat) {
      navigator.clipboard.writeText(`${bus.lat},${bus.lng}`);
      toast.success("Localização Copiada");
    } else {
      toast.error("Não foi possível salvar a Localização");
    }
  }

  return (
    <Layout>
      <div className="map-page-container">
        <aside className="map-page-sidebar">
          <h2 className="sidebar-title">Motoristas Ativos</h2>
          <ul className="drivers-list">
            {buses.length > 0 ? (
              buses.map((bus) => (
                <li
                  key={bus.busId}
                  className="driver-list-item"
                  onClick={() => setSelectedPosition([bus.lat, bus.lng])}
                  tabIndex={0}
                  style={{ cursor: "pointer" }}
                >
                  <div className="driver-route">{bus.route}</div>
                  <div className="driver-name">{bus.driverName}</div>
                  <div className="driver-busid">Autocarro: {bus.busId}</div>
                  {bus.status === "IN_TRANSIT" ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "4px",
                        marginBottom: "2px",
                      }}
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
                        onClick={() => handleDeactivateDriver(bus.busId)}
                      >
                        Desativar
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <UserSearchIcon size={20} />
                <p>Nenhum Motorista Ativo</p>
              </div>
            )}
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
            {buses.map(
              (bus) =>
                bus.status !== "IN_TRANSIT" ? (
                  <Marker
                    key={bus.busId}
                    position={[bus.lat, bus.lng]}
                    icon={busAlertIcon}
                  >
                    <Popup>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                          }}
                        >
                          <AlertTriangleIcon size={14} color="#d32f2f" />
                          <strong
                            style={{ fontWeight: "bold", color: "#d32f2f" }}
                          >
                            {bus.status}
                          </strong>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                          }}
                        >
                          <UserIcon size={14} color="#121212" />
                          <strong
                            style={{ fontWeight: "bold", color: "#121212" }}
                          >
                            {bus.driverName}
                          </strong>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                          }}
                        >
                          <KeySquareIcon size={14} color="#121212" />
                          <strong
                            style={{ fontWeight: "bold", color: "#121212" }}
                          >
                            {bus.busId}
                          </strong>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                          }}
                        >
                          <LocateFixedIcon size={14} color="#121212" />
                          <button
                            style={{
                              fontWeight: "bold",
                              color: "#0C6BFF",
                              cursor: "copy",
                            }}
                            onClick={() => handleCopyLocation(bus)}
                          >
                            [{bus.lat + "" + bus.lng}]
                          </button>
                        </div>
                        <small>{bus.route}</small>
                      </div>
                    </Popup>
                  </Marker>
                ) : (
                  <Marker
                    key={bus.busId}
                    position={[bus.lat, bus.lng]}
                    icon={busIcon}
                  >
                    <Popup>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                          }}
                        >
                          <ArrowLeftRightIcon size={14} color="#121212" />
                          <strong
                            style={{ fontWeight: "bold", color: "#0C6BFF" }}
                          >
                            {bus.status}
                          </strong>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                          }}
                        >
                          <UserIcon size={14} color="#121212" />
                          <strong
                            style={{ fontWeight: "bold", color: "#121212" }}
                          >
                            {bus.driverName}
                          </strong>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                          }}
                        >
                          <KeySquareIcon size={14} color="#121212" />
                          <strong
                            style={{ fontWeight: "bold", color: "#121212" }}
                          >
                            {bus.busId}
                          </strong>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                          }}
                        >
                          <LocateFixedIcon size={14} color="#121212" />
                          <button
                            style={{
                              fontWeight: "bold",
                              color: "#0C6BFF",
                              cursor: "copy",
                            }}
                            onClick={() => handleCopyLocation(bus)}
                          >
                            [{bus.lat + "" + bus.lng}]
                          </button>
                        </div>
                        <small>{bus.route}</small>
                      </div>
                    </Popup>
                  </Marker>
                )
              //acaba
            )}
            <FlyToLocation position={selectedPosition} />
          </MapContainer>
        </div>
        {success && (
          <AlertModal
            text="Autocarro Desativado"
            type="warning"
            key={"success-alert"}
          />
        )}
      </div>
    </Layout>
  );
}
