import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { FormComponent } from './components/form/form.component';
import { TempScaleComponent } from './components/temp-scale/temp-scale.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoPageComponent,
    FormComponent,
    TempScaleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
