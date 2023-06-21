import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, tap } from 'rxjs';
import { Forecast } from '../types/forecast';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f3349cba4084928b271e01d96f6b06ed';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  cities: string[] = [
    'Amsterdam',
    'Bangkok',
    'Barcelona',
    'Berlin',
    'Buenos Aires',
    'Cape Town',
    'Dubai',
    'Istanbul',
    'Kyiv',
    'London',
    'Moscow',
    'New York City',
    'Paris',
    'Prague',
    'Rio de Janeiro',
    'Rome',
    'San Francisco',
    'Singapore',
    'Sydney',
    'Tel Aviv',
    'Tokyo',
    'Toronto',
  ];
  private forecastCache: {
    [city: string]: { forecast: Forecast; lastUpdated: number };
  } = {};
  private _selectedCity: string = '';
  private forecast$$ = new Subject<Forecast>();
  forecast$ = this.forecast$$.asObservable();

  constructor(private http: HttpClient) {
    this.loadCache();
  }

  private loadCache(): void {
    const cachedData = localStorage.getItem('cache_local');
    if (cachedData) {
      this.forecastCache = JSON.parse(cachedData);
    }
  }

  private saveCache(): void {
    localStorage.setItem('cache_local', JSON.stringify(this.forecastCache));
  }

  set selectedCity(city: string) {
    if (this._selectedCity !== city) {
      this._selectedCity = city;
      this.getForecast().subscribe();
    }
  }

  get selectedCity(): string {
    return this._selectedCity;
  }

  getForecast() {
    const cachedData = this.forecastCache[this.selectedCity];
    if (cachedData && this.isForecastValid(cachedData.lastUpdated)) {
      this.forecast$$.next(cachedData.forecast);
      return of(cachedData.forecast);
    } else {
      return this.http
        .get<Forecast>(
          `${API_URL}?q=${this.selectedCity}&appid=${API_KEY}&units=metric`
        )
        .pipe(
          tap((forecast) => {
            console.log(forecast);
            this.forecastCache[this.selectedCity] = {
              forecast,
              lastUpdated: Date.now(),
            };

            this.saveCache();
            this.forecast$$.next(forecast);
          })
        );
    }
  }

  private isForecastValid(lastUpdated: number): boolean {
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    return currentTime - lastUpdated <= twentyFourHours;
  }
}
