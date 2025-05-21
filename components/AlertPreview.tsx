import React from "react";
import "./AlertPreview.css";
import { AlertNotification } from "../types/alert.notification";
import AlertPreviewMapView from "../components/AlertPreviewMapView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { formatTimestamp } from "../utils/date-time-formatter";

export default function AlertPreview({
  type,
  driverId,
  driverName,
  timestamp,
  message,
  loc,
  busNIA,
  route,
}: AlertNotification) {
  
  const formattedTimestamp = formatTimestamp(Number(timestamp));

  function handleCopyLocation() {
    if (loc) {
      navigator.clipboard.writeText(`${loc.lat},${loc.lng}`);
      toast.success("Localização Copiada");
    } else {
      toast.error("Não foi possível salvar a Localização");
    }
  }

  return (
    <div className="alert-preview-card-container">
      <div className="alert-type-container">
        <div className="alert-type">
          <p className="alert-type-text">{type}</p>
        </div>
      </div>
      <div className="emitter-id-container">
        <h1 className="emitter-label preview-label">Emitido Por:</h1>
        <h2 className="emitter-id-value">{`${driverName} (#${driverId})`}</h2>
      </div>
      <div className="timestamp-container">
        <h1 className="timestamp-label preview-label">Emitido em:</h1>
        <h2 className="timestamp-value">{formattedTimestamp}</h2>
      </div>
      <div className="details-container">
        <h1 className="details-label preview-label">Detalhes do Autocarro:</h1>
        <ol style={{ listStyleType: "disc", listStyle: "inside" }}>
          <li className="details-value">{`NIA: ${busNIA}`}</li>
          <li className="details-value">{`Rota: ${route}`}</li>
        </ol>
      </div>
      <div className="message-container">
        <h1 className="message-label preview-label">Mensagem:</h1>
        <h2 className="message-value">{message}</h2>
      </div>
      <div className="location-container">
        <h1 className="location-label preview-label">Localização:</h1>
        <h2 className="location-value">
          {loc?.lat + "," + loc?.lng}
          <FontAwesomeIcon
            icon={faCopy}
            style={{ cursor: "pointer", marginLeft: 8 }}
            onClick={() => handleCopyLocation()}
            title="Copiar localização"
            color="#0C6BFF"
          />
        </h2>
        <div className="map-container">
          <AlertPreviewMapView lat={loc?.lat || 0} lng={loc?.lng || 0} />
        </div>
      </div>
    </div>
  );
}
