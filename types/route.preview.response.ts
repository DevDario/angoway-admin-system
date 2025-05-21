import { Stop } from "./Stop";

export type RoutePreviewResponse = {
  name: string;
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  status: string;
  routeStops: { stop: { name: string } }[];
  schedules: { departureTime: string; arrivalTime: string }[];
};
