import { Directive,OnInit, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';


@Directive({
  selector: '[appDatetimepicker]'
})
export class DatetimepickerDirective implements OnInit{

  /* Calendar component reference */
  private calendarComponentRef:ComponentRef<CalendarComponent>;
  
  
  // /* input element */ 
  // private inputEl: HTMLInputElement;                                                  

  constructor(private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { 
    }

  //creating the calendar dynamically 
  public createCalendar(): ComponentRef<CalendarComponent> {
    console.log("creating the calendar dynamically using directive.....");
    this.viewContainer.clear();
    let calendarComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(CalendarComponent);
    this.calendarComponentRef = this.viewContainer.createComponent(calendarComponentFactory);
    return this.calendarComponentRef;
  }

  public ngOnInit(): void {
    console.log("I am here directive ")
  }

  

}
