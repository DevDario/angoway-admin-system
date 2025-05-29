export type RoutePreviewResponse = {
  id:number,
  name: string;
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  status: string;
  routeStops: { stop: { name: string } }[];
  schedules: { id:number, departureTime: string; arrivalTime: string }[];
};
