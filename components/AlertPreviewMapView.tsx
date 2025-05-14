import { MapContainer, TileLayer, Marker,Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function AlertPreviewMapView({lat, lng}: {lat: number, lng: number}) {

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
  });

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      style={{ height: "200px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <Marker
        key={"bus-last-loc"}
        position={[lat, lng]}
        icon={customIcon}
      >
        <Popup>Última localização conhecida</Popup>
      </Marker>
    </MapContainer>
  );
};

