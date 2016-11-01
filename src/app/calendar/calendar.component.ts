import { Component, OnInit,EventEmitter } from '@angular/core';
import {DatetimeService} from './datetime.service';

@Component({
  selector: 'app-calendar',
  providers: [DatetimeService],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{

  public monthData:any;  // month calendar data
  public selectedDate:Date; //currently selected date
  public hour:number;
  public minute:number;

  public valueChanged:EventEmitter<any> = new EventEmitter();


  constructor(public dateTime:DatetimeService) { }

  ngOnInit() {
    let date = new Date(); 
    this.initDateTime(date);
  }

  public initDateTime (date:Date) {
    date = date || new Date();
    this.selectedDate = date;
    this.hour         = this.selectedDate.getHours();
    this.minute       = this.selectedDate.getMinutes();
    this.monthData    = this.dateTime.getMonthData(this.year, this.month);
  }

  // show prev/next month calendar 
  updateMonthData(num : number){
    this.monthData = this.dateTime.getMonthData(this.monthData.year, this.monthData.month + num);

  };

  /**
   * set the selected date and close it when closeOnSelect is true
   */
  public selectDate (dayNum:number) {
    if (dayNum){
      this.selectedDate = new Date (this.monthData.year, this.monthData.month , dayNum);
    }
    this.selectedDate.setHours(parseInt( ''+this.hour || '0', 10));
    this.selectedDate.setMinutes(parseInt( ''+this.minute|| '0', 10));
    console.log(this.selectedDate);
    this.valueChanged.emit(this.selectedDate);
    
  };

  public toDate (year:number, month:number, day:number):Date {
    let date = new Date(year, month, day);
    let dayTemp = date.getDay();
    return date ;
  }

  public toDateOnly (date:Date) {
    let dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    return dateOnly ;
  }


  public get year ():number {
    return this.selectedDate.getFullYear();
  }

  public get month ():number {
    return this.selectedDate.getMonth();
  }

  public get day ():number {
    return this.selectedDate.getDate();
  }

  public get today ():Date {
    let dt = new Date();
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }
}
