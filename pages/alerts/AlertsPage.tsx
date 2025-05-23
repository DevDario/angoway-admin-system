import { useState } from "react";
import Layout from "../_layout";
import SectionHeader from "../../components/SectionHeader";
import { faBoxOpen, faEye, faWarning } from "@fortawesome/free-solid-svg-icons";
import AlertChip from "../../components/AlertChip";
import AlertPreview from "../../components/AlertPreview";
import "./AlertsPage.css";
import { useAlertsChannel } from "../../hooks/useAlertsChannel";
import { AlertNotification } from "../../types/alert.notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AlertsPage() {
  const [visible, setVisible] = useState<boolean>(false);
  const [previewAlert, setPreviewAlert] = useState<AlertNotification>();
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faBoxOpen}
                width={15}
                height={15}
                color="#FCFCFB"
              />
              <p style={{ marginLeft: "8px" }}>Sem alertas no momento</p>
            </div>
          )}
        </div>
        <div className="alert-preview-container">
          <SectionHeader title="Preview" icon={faEye} />
          <div className="preview-box">
            {visible && previewAlert !== undefined ? (
              <AlertPreview
                driverId={Number(previewAlert.driverId)}
                driverName={previewAlert.driverName}
                busNIA={previewAlert.busNIA}
                route={previewAlert.route}
                loc={previewAlert.loc || { lat: 0, lng: 0 }}
                message={previewAlert.message}
                timestamp={Number(previewAlert.timestamp)}
                type={previewAlert.type}
                key={"selected-alert"}
              />
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
