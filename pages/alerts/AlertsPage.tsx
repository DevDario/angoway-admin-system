import React, { useState } from "react";
import Layout from "../_layout";
import SectionHeader from "../../components/SectionHeader";
import { faEye, faWarning } from "@fortawesome/free-solid-svg-icons";
import AlertChip from "../../components/AlertChip";
import "./AlertsPage.css";
import { useAlertsChannel } from "../../hooks/useAlertsChannel";
import { AlertNotification } from "../../types/alert.notification";

export default function AlertsPage() {
  const [visible, setVisible] = useState<boolean>(false);
  const [previewAlert, setPreviewAlert] = useState<AlertNotification | null>(null);
  const { alerts } = useAlertsChannel();

  function handleAlertSelect(alert: AlertNotification) {
    setPreviewAlert(alert);
    setVisible(true);
  }

  return (
    <Layout>
      <div className="alerts-page-content-container content-container">
        <div className="alerts-container">
          <SectionHeader title="Alertas" icon={faWarning} />
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <AlertChip
                id={alerts.length}
                message={alert.message}
                timestamp={alert.timestamp + ""}
                onClick={() => handleAlertSelect(alert)}
                key={alert.driverId}
              />
            ))
          ) : (
            <p>Sem alertas no momento</p>
          )}
        </div>
        <div className="alert-preview-container">
          <SectionHeader title="Preview" icon={faEye} />
          <div className="preview-box">
            {visible && previewAlert !== null ? (
              <p>preview alert</p>
            ) : (
              <p className="preview-box-text">
                Escolhe um alerta para visualizar
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
