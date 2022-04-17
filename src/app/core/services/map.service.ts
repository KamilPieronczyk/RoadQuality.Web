import { Injectable } from '@angular/core';
import * as lodash from 'lodash';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Bounds } from 'src/app/shared/classes/Bounds';
import { MapFilterBuilder } from 'src/app/shared/classes/MapFilterBuilder';
import { MapDataType } from 'src/app/shared/constants/MapDataType';
import { GeoPoint } from 'src/app/shared/interfaces/geo-points';
import { PointsFilters } from 'src/app/shared/interfaces/mapForm';
import { MapSettings } from 'src/app/shared/interfaces/mapSettings';
import { QualityPoint } from 'src/app/shared/interfaces/qualityPoint';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private qualityPoints: BehaviorSubject<QualityPoint[] | null> = new BehaviorSubject<QualityPoint[] | null>(null);
  readonly QualityPoints = this.qualityPoints.asObservable();

  private currentMapDataType = new BehaviorSubject<MapDataType>(MapDataType.Quality);
  readonly CurrentMapDataType = this.currentMapDataType.asObservable();

  private mapSettings = new BehaviorSubject<MapSettings>({
    fitPoints: true,
    mapDataType: MapDataType.Quality,
    radius: 5000,
    geoSearch: true
  });
  readonly MapSettings = this.mapSettings.asObservable().pipe(
    distinctUntilChanged((x, y) => lodash.isEqual(x, y))
  );

  private mapSearching = new BehaviorSubject<boolean>(false);
  readonly MapSearching = this.mapSearching.asObservable();

  private searchedBounds = new BehaviorSubject<Bounds>(null);
  readonly SearchedBounds = this.searchedBounds.asObservable();

  currentSearchBounds: Bounds = null;
  lastMapBounds: google.maps.LatLngBounds = null;

  fetchSubs = new Subscription();

  mapFilterBuilder = new MapFilterBuilder();

  constructor(private apiSrv: ApiService) {
  }

  get currentMapSettings() {
    return this.mapSettings.value;
  }

  fetchQualityPointsByGeo(bounds: google.maps.LatLngBounds = this.lastMapBounds): void {
    if (bounds === null) {
      throw new Error('Map bounds are not set');
    }
    const searchPoint: GeoPoint = {
      latitude: bounds.getCenter().lat(),
      longitude: bounds.getCenter().lng(),
    }
  
    this.mapFilterBuilder.setGeoPoint(searchPoint);

    const params = this.mapFilterBuilder.build();
    const radius = this.mapFilterBuilder.getRadius();

    if (this.currentSearchBounds !== null && this.currentSearchBounds.areBoundsWithinRadius(bounds)) {
      return;
    }

    this.setMapSearching();

    this.currentSearchBounds = new Bounds(searchPoint, radius);
    this.searchedBounds.next(this.currentSearchBounds);

    this.unsubscribe();

    const sub = this.apiSrv.get('route/getPointsByGeo', { params }).subscribe(x => {
      this.qualityPoints.next(x);
      this.setMapAsLoaded();
    });
    this.fetchSubs.add(sub);
  }

  fetchQualityPoints() {
    const params = this.mapFilterBuilder.build();

    this.setMapSearching();

    this.unsubscribe();

    const sub = this.apiSrv.get('route/getPoints', { params }).subscribe(x => {
      this.qualityPoints.next(x);
      console.log(x);
      this.setMapAsLoaded();
    });
    this.fetchSubs.add(sub);
  }

  setCurrentMapDataType(type: MapDataType) {
    this.currentMapDataType.next(type);
  }

  private unsubscribe() {
    this.fetchSubs.unsubscribe();
    this.fetchSubs = new Subscription();
  }

  private setMapSearching() {
    this.mapSearching.next(true);
  }

  private setMapAsLoaded() {
    this.mapSearching.next(false);
  }

  setPointsFilters(values: PointsFilters) {
    this.mapFilterBuilder.setPointsFilters(values);
  }

  setGeoFilters(point: GeoPoint) {
    this.mapFilterBuilder.setGeoPoint(point);
  }

  setLastMapBounds(bounds: google.maps.LatLngBounds) {
    this.lastMapBounds = bounds;
  }

  updateMapSettings(settings: MapSettings) {
    if (this.currentMapSettings.geoSearch === true && !settings.geoSearch) {
      this.fetchQualityPoints();
    }
    this.mapSettings.next(settings);
  }  
}
