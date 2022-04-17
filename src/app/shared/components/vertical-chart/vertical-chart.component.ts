import { Component, Input, OnInit } from '@angular/core';
import { GroupedChartData } from '../../interfaces/groupedChartData';

@Component({
  selector: 'app-vertical-chart',
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.scss']
})
export class VerticalChartComponent implements OnInit {
  @Input() data: GroupedChartData[] = []

  showXAxis: boolean = true;
  showYAxis: boolean = false;
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
