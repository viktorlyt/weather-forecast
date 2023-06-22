import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TempService {
  private selectedScale$$: BehaviorSubject<string> =
    new BehaviorSubject<string>('celsius');
  selectedScale$ = this.selectedScale$$.asObservable();

  constructor() {}

  setTemperatureScale(scale: string) {
    this.selectedScale$$.next(scale);
  }
}
