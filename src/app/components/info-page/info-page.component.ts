import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { TempService } from 'src/app/services/temp.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPageComponent implements OnInit {
  forecast$ = this.forecastService.forecast$;
  selectedScale$ = this.tempService.selectedScale$;
  selectedScale = '';
  errorMessage = '';

  constructor(
    private forecastService: ForecastService,
    private tempService: TempService
  ) {}

  ngOnInit(): void {
    this.tempService.selectedScale$.subscribe((scale) => {
      this.selectedScale = scale;
    });

    this.forecastService.error$.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
    });
  }

  getTemperature(temperature: number, selectedScale: string | null): string {
    let convertedTemperature: number;
    let unit: string;

    if (selectedScale === 'kelvin') {
      convertedTemperature = temperature + 273.15;
      unit = 'K';
    } else if (selectedScale === 'fahrenheit') {
      convertedTemperature = (temperature * 9) / 5 + 32;
      unit = '°F';
    } else {
      convertedTemperature = temperature;
      unit = '°C';
    }

    return `${convertedTemperature.toFixed(2)}${unit}`;
  }
}
