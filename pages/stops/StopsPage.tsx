import { useEffect,useState } from "react";
import Layout from "../_layout";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./StopsPage.css";
import {
  BusFrontIcon,
  CopyIcon,
  UserSearchIcon,
} from "lucide-react";
import { toast } from "sonner";
import { StopsResponse } from "../../types/stops.response";
import { useGetStops } from "../../hooks/stops/useStopsQuerys";

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

export default function StopsPage() {
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);
  const { data: fetchedStops } = useGetStops();

  const [stops, setStops] = useState<StopsResponse[]>([]);

  useEffect(() => {
    if (fetchedStops !== undefined) setStops(fetchedStops);
  }, [fetchedStops]);

  function handleCopyLocation(stop: StopsResponse) {
    if (stop.latitude) {
      navigator.clipboard.writeText(`${stop.latitude},${stop.longitude}`);
      toast.success("Localização Copiada");
    } else {
      toast.error("Não foi possível salvar a Localização");
    }
  }

  return (
    <Layout>
      <div className="map-page-container">
        <aside className="map-page-sidebar">
          <h2 className="sidebar-title">Paragens em Luanda</h2>
          <ul className="drivers-list">
            {stops.length > 0 ? (
              stops.map((stop) => (
                <li
                  key={stop.id}
                  className="driver-list-item"
                  onClick={() =>
                    setSelectedPosition([stop.latitude, stop.longitude])
                  }
                  tabIndex={0}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="driver-name">
                    {stop.name === "N/A"
                      ? `[${stop.latitude},${stop.longitude}]`
                      : stop.name}
                  </div>
                  <button
                    style={{
                      color: "#0C6BFF",
                      cursor: "copy",
                    }}
                    onClick={() => handleCopyLocation(stop)}
                    title="copiar localização"
                  >
                    <CopyIcon size={15} />
                  </button>
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
                <p>0 paragens</p>
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
      </div>
    </Layout>
  );
}
