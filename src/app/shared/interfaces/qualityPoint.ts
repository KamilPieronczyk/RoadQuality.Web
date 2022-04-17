import { GeoPoint } from "./geo-points";

export interface QualityPoint {
  vector: number;
  speed: number;
  location: GeoPoint;
}