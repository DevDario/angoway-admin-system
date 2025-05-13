export type AlertNotification = {
  type: string;
  driverId?: number;
  driverName: string;
  busNIA: string;
  route: string;
  message: string;
  loc?: { lat: number; lng: number };
  timestamp?: number;
};
