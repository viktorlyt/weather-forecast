import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Subject, tap } from 'rxjs';
import toastr from 'toastr'
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
    'Calgary',
    'Cape Town',
    'Dubai',
    'Istanbul',
    'Kyiv',
    'London',
    'Montreal',
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
  private _selectedScale: string = 'celsius';
  private forecast$$ = new Subject<Forecast>();
  forecast$ = this.forecast$$.asObservable();

  private error$$ = new Subject<string>();
  error$ = this.error$$.asObservable();
  errorMessage = '';

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

  updateTemperatureScale(scale: string) {
    this._selectedScale = scale;
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
            this.forecastCache[this.selectedCity] = {
              forecast: forecast,
              lastUpdated: Date.now(),
            };

            this.saveCache();
            this.forecast$$.next(forecast);
          }),
          catchError((error) => {
            toastr.error('Error fetching forecast!', 'Recheck your request or other params.', error);
            return of(null);
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
