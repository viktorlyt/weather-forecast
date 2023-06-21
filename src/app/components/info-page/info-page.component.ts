import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPageComponent implements OnInit {
  forecast$ = this.forecastService.forecast$;

  constructor(private forecastService: ForecastService) {}

  ngOnInit(): void {
  }
}
