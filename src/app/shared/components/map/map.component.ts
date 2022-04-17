import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { BehaviorSubject, combineLatest, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { MapService } from 'src/app/core/services/map.service';
import { MapDataType } from '../../constants/MapDataType';
import { GeoBoundaries } from '../../interfaces/GeoBoudaries';
import { MapSettings } from '../../interfaces/mapSettings';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  readonly MAX_INTENSITY = 5;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  rerender = new BehaviorSubject(true);
  
  lat: number = 50.264167;
  lon: number = 19.023611;
  zoom: number = 14;
  
  center: google.maps.LatLngLiteral = {
    lat: this.lat,
    lng: this.lon
  }
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8,
  }

  mapSettings: MapSettings = {
    fitPoints: true,
    mapDataType: MapDataType.Quality,
    radius: 5000,
    geoSearch: true
  }
  
  heatmapOptions = {
    radius: 10,
    dissipating: true,
    maxIntensity: this.MAX_INTENSITY,
    opacity: 1,
  };
  
  heatMapData = []

  currentMapDataType = new BehaviorSubject<MapDataType>(this.mapSettings.mapDataType);

  mapBoundsSubject = new Subject<google.maps.LatLngBounds>();

  currentBounds: GeoBoundaries = null;
  circleCenter: google.maps.LatLng = null;
  radius = 5000;
  
  constructor(
    private mapService: MapService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.mapBoundsSubject.pipe(debounceTime(1000)).subscribe(bounds => {
      if(this.mapSettings.geoSearch) {
        this.mapService.fetchQualityPointsByGeo(bounds);
      }
    })

    this.mapService.SearchedBounds.pipe(filter(bounds => bounds !== null)).subscribe(bounds => {
      this.circleCenter = new google.maps.LatLng(bounds.center.latitude, bounds.center.longitude);
      this.radius = bounds.radius;
    })

    combineLatest([this.mapService.QualityPoints, this.currentMapDataType.asObservable().pipe(distinctUntilChanged())]).subscribe(([points, dataType]) => {
      this.heatMapData = (points ?? []).map(point => ({
        location: new google.maps.LatLng(point.location.latitude, point.location.longitude),
        weight: dataType === MapDataType.Quality ? this.calculateWeight(point.vector) : this.calculateWeight(point.speed)
      }))
    })
    this.mapService.MapSettings.subscribe(settings => {
      this.mapSettings = settings;
      this.applySettings();
    })
  }

  getScale() {
    const lat = this.map.getCenter().lat();
    const zoom = this.map.getZoom();

    const meters_per_pixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom);

    let radius = (1 / meters_per_pixel) * 5;

    if (radius > 10) {
      this.heatmapOptions.radius = radius;
    } else {
      this.heatmapOptions.radius = 10;
    }
  }

  calcMaxIntensity() {
    const lat = this.map.getCenter().lat();
    const zoom = this.map.getZoom();

    const meters_per_pixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom);

    const basic_area_in_meters = 5
    const taken_area = this.heatmapOptions.radius * meters_per_pixel;

    this.heatmapOptions.maxIntensity = (taken_area / basic_area_in_meters) * 1.15;
    if(this.heatmapOptions.maxIntensity < this.MAX_INTENSITY) {
      this.heatmapOptions.maxIntensity = this.MAX_INTENSITY;
    }
  }

  onZoom() {
    this.getScale();
    this.calcMaxIntensity();

    this.changeDetectorRef.detectChanges();
    this.rerenderHeatMap();
  }

  calculateWeight(val: number) {
    if(val < 20) {
      return 1;
    } 
    if (val < 40) {
      return 2;
    }
    if (val < 70) {
      return 3;
    }
    return 5;
  }

  private applySettings() {
    if (this.mapSettings.fitPoints) {
      this.onZoom();
    } else {
      this.rerenderHeatMap();
    }
    this.currentMapDataType.next(this.mapSettings.mapDataType);
  }

  private rerenderHeatMap() {
    this.rerender.next(false);
    this.changeDetectorRef.detectChanges();
    timer(100).subscribe(() => {
      this.rerender.next(true);
      this.changeDetectorRef.detectChanges();
    })
  }

  centerChanged() {
    this.mapService.setLastMapBounds(this.map.getBounds());
    this.mapBoundsSubject.next(this.map.getBounds());
  }
}
