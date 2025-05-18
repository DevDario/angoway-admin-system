import { useEffect, useState } from "react";
import { socket } from "../api/socket-instance";
import { BusLocationGatewayResponse } from "../types/bus-location-gateway.response";

export function useBusesLocation() {
  const [buses, setBuses] = useState<BusLocationGatewayResponse[]>([]);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    function handleLocationUpdate(data:BusLocationGatewayResponse) {
      setBuses((prev) => {
        const index = prev.findIndex((b) => b.busId === data.busId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        }
        return [...prev, data];
      });
    }

    socket.on("driverLocationUpdate", handleLocationUpdate);

    return () => {
      socket.off("driverLocationUpdate", handleLocationUpdate);
      socket.disconnect();
    };
  }, []);

  return {
    buses,
  };
}