export type Schedule = {
  id: number;
  routeId: number;
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string | Date;
  arrivalTime: string | Date;
  estimatedDurationMinutes: number;
  status: string;
  distanceKM: number;
};
