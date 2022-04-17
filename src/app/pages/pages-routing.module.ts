import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent
  },
  {
    path: 'statistics',
    canActivate: [AuthGuard],
    component: StatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
