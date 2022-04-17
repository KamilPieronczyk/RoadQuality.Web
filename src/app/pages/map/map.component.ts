import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { subYears } from 'date-fns';
import { MapService } from 'src/app/core/services/map.service';
import { MapDataType } from 'src/app/shared/constants/MapDataType';
import { MapForm } from 'src/app/shared/interfaces/mapForm';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  MapDataType = MapDataType;

  form = new FormGroup({
    mapDataType: new FormControl(MapDataType.Quality),
    searchByDate: new FormControl(false),
    startDate: new FormControl(subYears(new Date(), 1)),
    endDate: new FormControl(new Date()),
    fitPoints: new FormControl(true),
    onlyLoggedUser: new FormControl(false),
    geoSearch: new FormControl(true),
    radius: new FormControl(5),
  })

  isLoadingMapData = false;

  constructor(
    private mapService: MapService
  ) { }

  getControl(name: string) {
    return this.form.get(name);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((values: MapForm) => {
      if (!this.form.valid) {
        return;
      }
      this.mapService.updateMapSettings({
        fitPoints: values.fitPoints,
        mapDataType: values.mapDataType,
        radius: values.radius * 1000,
        geoSearch: values.geoSearch
      });
      this.mapService.setPointsFilters(values);
    })

    this.mapService.MapSearching.subscribe(loading => {
      this.isLoadingMapData = loading;
    })
  }

  submit() {
    if(this.mapService.currentMapSettings.geoSearch) {
      this.mapService.fetchQualityPointsByGeo();
    } else {
      this.mapService.fetchQualityPoints();
    }
  }

}
