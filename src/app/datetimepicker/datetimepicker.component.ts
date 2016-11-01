import { Component, OnInit, ViewChild, ElementRef, ComponentRef,Input } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { DatetimepickerDirective } from './datetimepicker.directive';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css'],
  entryComponents: [CalendarComponent]
})
export class DatetimepickerComponent implements OnInit {

  @Input() public dateValue;
  

  /* calendar component reference since its getting created when its required*/
  private calendarComponentRef: ComponentRef<CalendarComponent>;

  /* calendar element */
  private calendarEl: HTMLElement;

  private el: HTMLInputElement; /* input element */


  constructor(elementRef:ElementRef) {
  }

  ngAfterViewInit() {
    this.el = this._dateTimeInputField.nativeElement;
  }

  @ViewChild(DatetimepickerDirective) appDatetimepicker: DatetimepickerDirective;
  @ViewChild('dateTimeInputField') private _dateTimeInputField:ElementRef;

  //showing the calendar
  public showCalendar($event: Event) {
    if (this.calendarComponentRef) { /* if already shown, do nothing */
      return ;
    }
    console.log($event);
    this.calendarComponentRef = this.appDatetimepicker.createCalendar();
    this.calendarEl = this.calendarComponentRef.location.nativeElement;
    let component = this.calendarComponentRef.instance;
    //component.initDateTime(this.dateValue);

    component.valueChanged.subscribe(this.valueChanged);

    // add a click listener to document, so that it can hide when others clicked
    document.body.addEventListener('click', this.destroyCalendarComponent);

  }

  ngOnInit() {

  }


  public destroyCalendarComponent = (event?): void => {
    if (this.calendarComponentRef) {
      if (  /* invoked by clicking on somewhere in document */
        event &&
        event.type === 'click' &&
        event.target !== this.el &&
        !this.elementIn(event.target, this.calendarEl)
      ) {
        this.calendarComponentRef.destroy();
        this.calendarComponentRef.instance.valueChanged.unsubscribe;
        this.calendarComponentRef = undefined;
        document.body.removeEventListener('click', this.destroyCalendarComponent);
        console.log("Destroyed");
      }
    }
  };


  private elementIn(el: Node, containerEl: Node): boolean {
    while (el = el.parentNode) {
      if (el === containerEl) return true;
    }
    return false;
  };


  /* input element string value is changed */
  valueChanged = (date: Date): void => {
    this.dateValue  = date;
  };
}
