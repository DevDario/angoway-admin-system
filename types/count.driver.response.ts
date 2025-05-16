import {DriverResponse} from "./driver.response"

export type CountDriverResponse = {
    count: number;
    drivers: Partial<DriverResponse[]>;
};
