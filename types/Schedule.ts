export type Schedule = {
  routeId: number;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: Date;
  arrivalTime: Date;
  estimatedDurationMinutes: number;
  status: string;
  distanceKM: number;
};
