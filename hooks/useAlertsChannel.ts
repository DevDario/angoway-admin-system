import { useEffect, useState } from "react";
import { socket } from "../api/socket-instance";
import { AlertNotification } from "../types/alert.notification";
import { saveAlert, getAlerts } from "../utils/secure-store";

export function useAlertsChannel() {
  const [alerts, setAlerts] = useState<AlertNotification[]>([]);
  const [recentAlert, setRecentAlert] = useState<AlertNotification>();

  useEffect(() => {
    (async () => {
      const storedAlerts = getAlerts();
      if (storedAlerts) setAlerts(storedAlerts);
    })();
  }, []);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    function handleAlertsUpdate(data: AlertNotification) {
      setRecentAlert(data);

      setAlerts((prev) => {
        const index = prev.findIndex(
          (alert) => alert.driverId === data.driverId
        );
        let updated;
        if (index !== -1) {
          updated = [...prev];
          updated[index] = data;
        } else {
          updated = [...prev, data];
        }
        
        saveAlert(data); 
        return updated;
      });
    }

    socket.on("alertNotificationsUpdate", handleAlertsUpdate);

    return () => {
      socket.off("alertNotificationsUpdate", handleAlertsUpdate);
    };
  }, []);

  return {
    alerts,
    recentAlert,
  };
}
