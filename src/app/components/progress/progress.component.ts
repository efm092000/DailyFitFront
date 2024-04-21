import { Component } from '@angular/core';
import {NgxChartsModule} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  single = [
    {
      name: 'Values',
      series: [
        {"name": "2024-04-01T00:00:00.000Z", "value": 65},
        {"name": "2024-04-02T00:00:00.000Z", "value": 70},
        {"name": "2024-04-03T00:00:00.000Z", "value": 75},
        {"name": "2024-04-04T00:00:00.000Z", "value": 80},
        {"name": "2024-04-05T00:00:00.000Z", "value": 85},
        {"name": "2024-04-06T00:00:00.000Z", "value": 90},
        {"name": "2024-04-07T00:00:00.000Z", "value": 95},
        {"name": "2024-04-08T00:00:00.000Z", "value": 100},
        {"name": "2024-04-09T00:00:00.000Z", "value": 65},
        {"name": "2024-04-10T00:00:00.000Z", "value": 70},
        {"name": "2024-04-11T00:00:00.000Z", "value": 75},
        {"name": "2024-04-12T00:00:00.000Z", "value": 80},
        {"name": "2024-04-13T00:00:00.000Z", "value": 85},
        {"name": "2024-04-14T00:00:00.000Z", "value": 90},
        {"name": "2024-04-15T00:00:00.000Z", "value": 95},
        {"name": "2024-04-16T00:00:00.000Z", "value": 100},
        {"name": "2024-04-17T00:00:00.000Z", "value": 65},
        {"name": "2024-04-18T00:00:00.000Z", "value": 70},
        {"name": "2024-04-19T00:00:00.000Z", "value": 75},
        {"name": "2024-04-20T00:00:00.000Z", "value": 80},
        {"name": "2024-04-21T00:00:00.000Z", "value": 85},
        {"name": "2024-04-22T00:00:00.000Z", "value": 90},
        {"name": "2024-04-23T00:00:00.000Z", "value": 95},
        {"name": "2024-04-24T00:00:00.000Z", "value": 100},
        {"name": "2024-04-25T00:00:00.000Z", "value": 65},
        {"name": "2024-04-26T00:00:00.000Z", "value": 70},
        {"name": "2024-04-27T00:00:00.000Z", "value": 75},
        {"name": "2024-04-28T00:00:00.000Z", "value": 80},
        {"name": "2024-04-29T00:00:00.000Z", "value": 85},
        {"name": "2024-04-30T00:00:00.000Z", "value": 90}
      ]
    }
  ];

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Weight';
  timeline = true;

  constructor() {
  }
}
