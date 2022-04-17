import { getDistance, isPointWithinRadius } from 'geolib';
import { GeoPoint } from '../interfaces/geo-points';

export class Bounds {
  private _radius = 5000;
  private _center: GeoPoint;

  constructor(center: GeoPoint, radius = 5000) {
    this._radius = radius;
    this._center = center;
  }

  get center() {
    return this._center;
  }

  get radius() {
    return this._radius;
  }

  areBoundsWithinRadius(bounds: google.maps.LatLngBounds) {
    const directions = bounds.toJSON();
    const ne: GeoPoint = {
      latitude: directions.north,
      longitude: directions.east,
    }
    const se: GeoPoint = {
      latitude: directions.south,
      longitude: directions.east,
    }
    const sw: GeoPoint = {
      latitude: directions.south,
      longitude: directions.west,
    }
    const nw: GeoPoint = {
      latitude: directions.north,
      longitude: directions.west,
    }
    if (isPointWithinRadius(ne, this.center, this.radius)
      && isPointWithinRadius(se, this.center, this.radius)
      && isPointWithinRadius(sw, this.center, this.radius)
      && isPointWithinRadius(nw, this.center, this.radius)
    ) {
      return true;
    } else {
      return false;
    }
  }

  contains(bounds: google.maps.LatLngBounds, radius: number = 5000): boolean {
    this.areBoundsWithinRadius(bounds);
    const newCenter: GeoPoint = {
      latitude: bounds.getCenter().lat(),
      longitude: bounds.getCenter().lng(),
    }
    const distance = getDistance(this.center, newCenter);
    if (this.radius > radius) {
      return false;
    } else if (distance > this.radius - radius ) {
      return false;
    } else {
      return true;
    }
  }
}