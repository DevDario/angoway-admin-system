import React from "react";
import Layout from "../_layout";
import SectionHeader from "../../components/SectionHeader";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import AlertChip from "../../components/AlertChip";
import "./AlertsPage.css";

const alerts = [
  {
    id: 1,
    message: "Um autocarro teve um acidente",
    timestamp: new Date().getHours() + ":" + new Date().getMinutes(),
  },
  {
    id: 2,
    message: "Um autocarro sofreu avaria total",
    timestamp: new Date().getHours() + ":" + new Date().getMinutes(),
  },
  {
    id: 3,
    message: "Um autocarro teve um acidente",
    timestamp: new Date().getHours() + ":" + new Date().getMinutes(),
  },
  {
    id: 4,
    message: "Um autocarro sofreu avaria total",
    timestamp: new Date().getHours() + ":" + new Date().getMinutes(),
  },
];

export default function AlertsPage() {
  return (
    <Layout>
      <div className="content-container">
        <div className="alerts-container">
          <SectionHeader title="Alertas" icon={faWarning} />
          {alerts.map((alert) => (
            <AlertChip
              id={alert.id}
              message={alert.message}
              timestamp={alert.timestamp}
              onClick={() => null}
              key={alert.id}
            />
          ))}
        </div>
        <div className="alert-preview-container">
          <SectionHeader title="Preview" icon={faWarning} />
          <div className="preview-box">
            <p className="preview-box-text">
              Escolhe um alerta para visualizar
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
