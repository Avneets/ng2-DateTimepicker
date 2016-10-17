import { Component, OnInit } from '@angular/core';
import {DatetimeService} from './datetime.service';

@Component({
  selector: 'app-calendar',
  providers: [DatetimeService],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {



  constructor(private dateTime:DatetimeService) { }

  ngOnInit() {
  }

  // show prev/next month calendar 
  updateMonthData(num : number){
    this.monthData = this.dateTime.getMonthData(this.monthData.year, this.monthData.month + num);

  };

}
