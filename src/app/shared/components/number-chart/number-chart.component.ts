import { Component, Input, OnInit } from '@angular/core';
import { ChartSeries } from '../../interfaces/groupedChartData';

@Component({
  selector: 'app-number-chart',
  templateUrl: './number-chart.component.html',
  styleUrls: ['./number-chart.component.scss']
})
export class NumberChartComponent implements OnInit {
  @Input() data: ChartSeries[] = []

  colorScheme = 'cool';
  cardColor: string = '#232837';

  constructor() { }

  ngOnInit(): void {
  }

}
