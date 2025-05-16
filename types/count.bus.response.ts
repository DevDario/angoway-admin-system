import { BusResponse } from "./bus.response";

export type CountBusResponse = {
    count: number;
    buses: BusResponse[];
}