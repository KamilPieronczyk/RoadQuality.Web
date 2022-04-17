import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthCheckerComponent } from './auth-checker/auth-checker.component';
import { FullPageLoadingComponent } from './full-page-loading/full-page-loading.component';
import { HorizontalChartComponent } from './horizontal-chart/horizontal-chart.component';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { NumberChartComponent } from './number-chart/number-chart.component';
import { VerticalChartComponent } from './vertical-chart/vertical-chart.component';

@NgModule({
  declarations: [
    MenuComponent,
    MapComponent,
    AuthCheckerComponent,
    FullPageLoadingComponent,
    VerticalChartComponent,
    HorizontalChartComponent,
    NumberChartComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    GoogleMapsModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    BrowserAnimationsModule 
  ],
  exports: [
    MenuComponent,
    MapComponent,
    AuthCheckerComponent,
    VerticalChartComponent,
    HorizontalChartComponent,
    NumberChartComponent
  ]
})
export class ComponentsModule { }
