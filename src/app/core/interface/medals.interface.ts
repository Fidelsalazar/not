import { Customer } from "./customer.interface";

export interface Medals {
  id: number,
  timeWork: number,
  employees: Customer[],
  name: String,
}
