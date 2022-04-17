import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from '../shared/components/components.module';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { PagesRoutingModule } from './pages-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    HomeComponent,
    MapComponent,
    UserProfileComponent,
    ErrorComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ComponentsModule,
    MatInputModule,
    MatGridListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PagesModule { }
