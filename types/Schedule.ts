export type Schedule = {
  routeId: number;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string;
  arrivalTime: string;
  estimatedDurationMinutes: number;
  status: string;
  distanceKM: number;
};
