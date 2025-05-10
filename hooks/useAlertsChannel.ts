import { useEffect, useState } from "react";
import { socket } from "../api/socket-instance";
import { AlertNotification } from "../types/alert.notification";

export function useAlertsChannel() {
  const [alerts, setAlerts] = useState<AlertNotification[]>([]);
  const [recentAlert, setRecentAlert] = useState<AlertNotification>();

  useEffect(() => {
    if (!socket.connected) socket.connect();

    function handleAlertsUpdate(data: AlertNotification) {
      //debug
      console.log("received alert update: ", data);

      setRecentAlert(data);

      setAlerts((prev) => {
        const index = prev.findIndex(
          (alert) => alert.driverId === data.driverId
        );
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        }
        return [...prev, data];
      });
    }

    socket.on("alertNotificationsUpdate", handleAlertsUpdate);
  }, []);

  return {
    alerts,
    recentAlert,
  };
}
