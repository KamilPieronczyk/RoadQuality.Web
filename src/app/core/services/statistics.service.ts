import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { OverallStats } from 'src/app/shared/interfaces/overallStatistics';
import { UserStatisticsRecord } from 'src/app/shared/interfaces/userStatisticsRrecord';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private userStatistics = new BehaviorSubject<UserStatisticsRecord[]>(null);
  readonly UserStatistics = this.userStatistics.asObservable();

  private userOverallStatistics = new BehaviorSubject<OverallStats>(null);
  readonly UserOverallStatistics = this.userOverallStatistics.asObservable();

  private overallStatistics = new BehaviorSubject<OverallStats>(null);
  readonly OverallStatistics = this.overallStatistics.asObservable();

  constructor(private apiSrv: ApiService) { }

  public fetchUserStats(): Observable<UserStatisticsRecord[]> {
    return this.userStatistics.pipe(
      switchMap((stats) => {
        if(stats === null) {
          return this.apiSrv.get('statistics/getUserStats').pipe(
            tap(data => this.userStatistics.next(data))
          );
        } else {
          return this.UserStatistics;
        }
      })
    )
  }

  public fetchUserOverallStats(): Observable<OverallStats> {
    return this.userOverallStatistics.pipe(
      switchMap((stats) => {
        if(stats === null) {
          return this.apiSrv.get('statistics/getUserOverallStats').pipe(
            tap(data => this.userOverallStatistics.next(data))
          );
        } else {
          return this.UserOverallStatistics;
        }
      })
    )
  }

  public fetchOverallStats(): Observable<OverallStats> {
    return this.overallStatistics.pipe(
      switchMap((stats) => {
        if(stats === null) {
          return this.apiSrv.get('statistics/getOverallStats').pipe(
            tap(data => this.overallStatistics.next(data))
          );
        } else {
          return this.OverallStatistics;
        }
      })
    )
  }
}
