import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { TempService } from 'src/app/services/temp.service';

@Component({
  selector: 'app-temp-scale',
  templateUrl: './temp-scale.component.html',
  styleUrls: ['./temp-scale.component.scss'],
})
export class TempScaleComponent implements OnInit {
  selectedScale = '';

  constructor(
    private forecastService: ForecastService,
    private tempService: TempService
  ) {}

  ngOnInit(): void {
    this.tempService.selectedScale$.subscribe(
      (scale) => (this.selectedScale = scale)
    );
  }

  updateScale(scale: string) {
    this.forecastService.updateTemperatureScale(scale);
    this.tempService.setTemperatureScale(scale);
  }
}
