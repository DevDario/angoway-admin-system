import React from "react";
import "./AlertPreview.css";

type AlertPreviewProps = {
  type: string;
  driverId: number;
  timestamp: number;
  message: string;
  location: { lat: number; lng: number };
};

export default function AlertPreview({
  type,
  driverId,
  timestamp,
  message,
  location,
}: AlertPreviewProps) {
  return (
    <div className="alert-preview-card-container">
      <div className="alert-type-container">
        <div className="alert-type">
          <p className="alert-type-text">{type}</p>
        </div>
      </div>
      <div className="emitter-id-container">
        <h1 className="emitter-label preview-label">Emitido:</h1>
        <h2 className="emitter-id-value">{driverId}</h2>
      </div>
      <div className="timestamp-container">
        <h1 className="timestamp-label preview-label">Emitido em:</h1>
        <h2 className="timestamp-value">{timestamp}</h2>
      </div>
      <div className="message-container">
        <h1 className="message-label preview-label">Mensagem:</h1>
        <h2 className="message-value">{message}</h2>
      </div>
      <div className="location-container">
        <h1 className="location-label preview-label">Localização:</h1>
        <h2 className="location-value">{location.lat + "," + location.lng}</h2>
        <div className="map-container"></div>
      </div>
    </div>
  );
}
