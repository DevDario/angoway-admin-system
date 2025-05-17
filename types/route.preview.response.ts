import { Stop } from "./Stop";
import {Schedule} from "./Schedule"

export type RoutePreviewResponse = {
  name: string;
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  status: string;
  stops: Stop[];
  schedules: Partial<Schedule>[];
};
