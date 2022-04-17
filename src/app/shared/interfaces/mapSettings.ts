import { MapDataType } from "../constants/MapDataType";

export interface MapSettings {
  fitPoints: boolean;
  mapDataType: MapDataType;
  radius: number;
  geoSearch: boolean;
}