import { MapSettings } from "./mapSettings";

export interface MapForm extends PointsFilters, MapSettings {}

export interface PointsFilters {
  searchByDate: boolean,
  startDate: Date,
  endDate: Date,
  onlyLoggedUser: boolean,
  radius: number
}