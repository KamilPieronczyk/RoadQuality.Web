import { ChartSeries } from "../interfaces/groupedChartData";

export class StatsChartSeries {
  private distance: number = 0;
  private points: number = 0;
  
  constructor(distance: number, points: number) {
    this.distance = distance;
    this.points = points;
  }

  get(): ChartSeries[] {
    return [
      {
        name: 'Distance in meters',
        value: this.distance,
      },
      {
        name: 'Number of points',
        value: this.points
      }
    ]
  }
}