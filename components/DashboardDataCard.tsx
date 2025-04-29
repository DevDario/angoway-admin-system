import React from "react";
import "./DashboardDataCard.css"

export default function DashboardDataCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="data-card-container">
      <div className="data-label">
        <img src="" alt={label + " icon"} className="card-icon" />
        <p className="label">{label}</p>
      </div>
      <div className="data">
        <h2 className="data-value">{value}</h2>
      </div>
    </div>
  );
}
