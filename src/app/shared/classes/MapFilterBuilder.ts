import { HttpParams } from "@angular/common/http";
import { format } from "date-fns";
import { GeoPoint } from "../interfaces/geo-points";
import { PointsFilters } from "../interfaces/mapForm";

export class MapFilterBuilder {
  private params: HttpParams = new HttpParams();

  private pointsFilters: PointsFilters = null;
  private geoPoint: GeoPoint = null;

  constructor() {}

  private buildPointsFilters(values: PointsFilters) {
    this.params = this.params
    .set('onlyLoggedUserData', values?.onlyLoggedUser ?? false)
    .set('radius', (values?.radius ?? 5) * 1000);

    if (values?.startDate && values?.endDate && values?.searchByDate) {
      this.params = this.params
        .set('start', format(values.startDate, 'yyyy-MM-dd'))
        .set('end', format(values.endDate, 'yyyy-MM-dd'))
    } else {
      this.params = this.params.delete('start').delete('end');
    }
    
    return this;
  }

  setPointsFilters(values: PointsFilters) {
    this.pointsFilters = values;
    return this;
  }

  private buildGeoPoint(point: GeoPoint) {
    this.params = this.params
      .set('latitude', point.latitude)
      .set('longitude', point.longitude);

    return this;    
  }

  setGeoPoint(point: GeoPoint) {
    this.geoPoint = point;

    return this;    
  }

  getRadius() {
    return (this.pointsFilters?.radius ?? 5) * 1000
  }

  build() {
    this.params = new HttpParams();
    this.buildPointsFilters(this.pointsFilters);

    if(this.geoPoint !== null) {
      this.buildGeoPoint(this.geoPoint);
    }
    return this.params;
  }
}