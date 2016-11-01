import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import { DatetimepickerDirective } from './datetimepicker/datetimepicker.directive';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DatetimepickerComponent,
    DatetimepickerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
