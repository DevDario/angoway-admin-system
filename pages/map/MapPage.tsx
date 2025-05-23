import { useEffect,useState } from "react";
import Layout from "../_layout";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapPage.css";
import { useBusesLocation } from "../../hooks/useBusesLocation";
import {
  AlertTriangleIcon,
  ArrowLeftRightIcon,
  BusFrontIcon,
  KeySquareIcon,
  LocateFixedIcon,
  UserIcon,
  UserSearchIcon,
} from "lucide-react";
import { toast } from "sonner";
import { StopsResponse } from "../../types/stops.response";
import { useGetStops } from "../../hooks/stops/useStopsQuerys";
import { useChangeBusStatus } from "../../hooks/bus/useBusMutations";

const busIcon = new L.Icon({
  iconUrl: "/busMarker2.png",
  iconSize: [32, 32],
});

const busAlertIcon = new L.Icon({
  iconUrl: "/busMarkerAlert.png",
  iconSize: [32, 32],
});

const busStopIcon = new L.Icon({
  iconUrl: "/busStopIcon.png",
  iconSize: [25, 25],
});

function FlyToLocation({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.2 });
    }
  }, [position, map]);
  return null;
}

export default function MapPage() {
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);
  const { buses } = useBusesLocation();
  const { data: fetchedStops } = useGetStops();

  const [stops, setStops] = useState<StopsResponse[]>([]);
  const {
    mutate: changeBusStatus,
    successMessage: statusSuccess,
    errorMessage: statusError,
  } = useChangeBusStatus();

  useEffect(() => {
    if (fetchedStops !== undefined) setStops(fetchedStops);
  }, [fetchedStops]);

  function handleDeactivateDriver(id: number) {
    changeBusStatus({
      driverId: id,
      body: {
        status: "OFF_SERVICE",
      }
    });
  }

  function handleCopyLocation(bus: { busId?: number; driverName?: string; route?: string; lat: any; lng: any; status?: string; driverPhoto?: string; }) {
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
            {buses.map((bus) =>
              bus.status !== "IN_TRANSIT" && bus.status !== "OFF_SERVICE" ? (
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
            )}

            {stops.map((stop) => (
              <Marker
                position={[stop.latitude, stop.longitude]}
                key={stop.id}
                icon={busStopIcon}
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
                      <BusFrontIcon color="#0C6BFF" size={15} />
                      <strong style={{ fontWeight: "bold", color: "#0C6BFF" }}>
                        {stop.name}
                      </strong>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            <FlyToLocation position={selectedPosition} />
          </MapContainer>
        </div>
        {statusSuccess && toast.success(statusSuccess)}
        {statusError && toast.error(statusError)}
      </div>
    </Layout>
  );
}
