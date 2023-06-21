import { Component } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(private forecastService: ForecastService) {}

  trackByFn(index: number, city: string): string {
    return city;
  }

  get cities(): string[] {
    return this.forecastService.cities;
  }

  get selectedCity(): string {
    return this.forecastService.selectedCity;
  }

  set selectedCity(city: string) {
    this.forecastService.selectedCity = city;
  }
}
