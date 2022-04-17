import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { StatsChartSeries } from 'src/app/shared/classes/StatsChartSeries';
import { GroupedChartData } from 'src/app/shared/interfaces/groupedChartData';
import { OverallStats } from 'src/app/shared/interfaces/overallStatistics';
import { UserStatisticsRecord } from 'src/app/shared/interfaces/userStatisticsRrecord';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(
    private statisticsService: StatisticsService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  overallStats: OverallStats;
  userOverallStats: OverallStats;
  userOverallStatsData: GroupedChartData = {
    name: 'User',
    series: new StatsChartSeries(0, 0).get(),
  };

  userStats: UserStatisticsRecord[] = [];
  overallStatsData: GroupedChartData = {
    name: 'Overall',
    series: new StatsChartSeries(0, 0).get(),
  };

  userStatsData: GroupedChartData[] = []

  ngOnInit(): void {
    this.statisticsService.fetchOverallStats().subscribe(data => {
      this.overallStats = data;
      this.overallStatsData.series = new StatsChartSeries(data.distanceTraveled, data.pointsCollected).get();
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();        
      }, 50);
    })

    this.statisticsService.fetchUserOverallStats().subscribe(data => {
      this.userOverallStats = data;
      this.userOverallStatsData.series = new StatsChartSeries(data.distanceTraveled, data.pointsCollected).get();
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();        
      }, 50);
    })

    this.statisticsService.fetchUserStats().subscribe(data => {
      this.userStats = data;
      this.userStats.forEach(val => {
        this.userStatsData.push({
          name: format(new Date(val.date), 'MM-yyyy'),
          series: new StatsChartSeries(val.distanceTraveled, val.pointsCollected).get(),
        })
      })
      this.userStatsData = [...this.userStatsData];
    })
  }

}
