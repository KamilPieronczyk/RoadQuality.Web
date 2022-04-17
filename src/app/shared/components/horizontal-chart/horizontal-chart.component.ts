import { Component, Input, OnInit } from '@angular/core';
import { GroupedChartData } from '../../interfaces/groupedChartData';

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalChartComponent implements OnInit {
  @Input() data: GroupedChartData[] = []

  showXAxis: boolean = false;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = false;
  showDataLabel = true;

  colorScheme = 'cool'

  constructor() { }

  ngOnInit(): void {
  }

}
