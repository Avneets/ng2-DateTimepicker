import { Injectable } from '@angular/core';

@Injectable()
export class DatetimeService {

  months: any[];
  days: number[];
  daysOfWeek: any[];
  firstDayOfWeek: number;
  localizedDaysOfWeek: any[];

  constructor() { 
    this.initialize();
  }

  initialize (){
    this.months = [
      { fullName: 'January', shortName: 'Jan' },
      { fullName: 'February', shortName: 'Feb' },
      { fullName: 'March', shortName: 'Mar' },
      { fullName: 'April', shortName: 'Apr' },
      { fullName: 'May', shortName: 'May' },
      { fullName: 'June', shortName: 'Jun' },
      { fullName: 'July', shortName: 'Jul' },
      { fullName: 'August', shortName: 'Aug' },
      { fullName: 'September', shortName: 'Sep' },
      { fullName: 'October', shortName: 'Oct' },
      { fullName: 'November', shortName: 'Nov' },
      { fullName: 'December', shortName: 'Dec' }
    ];
    this.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    /**
     * According to International Standard ISO 8601, Monday is the first day of the week
     * followed by Tuesday, Wednesday, Thursday, Friday, Saturday,
     * and with Sunday as the seventh and final day.
     * However, in Javascript Sunday is 0, Monday is 1.. and so on
     */
    this.daysOfWeek = [
      {fullName: 'Sunday', shortName: 'Su', weekend: true},
      {fullName: 'Monday', shortName: 'Mo'},
      {fullName: 'Tuesday', shortName: 'Tu'},
      {fullName: 'Wednesday', shortName: 'We'},
      {fullName: 'Thursday', shortName: 'Th'},
      {fullName: 'Friday', shortName: 'Fr'},
      {fullName: 'Saturday', shortName: 'Sa', weekend: true}
    ];

    this.firstDayOfWeek = this.firstDayOfWeek || 0;
    this.localizedDaysOfWeek = this.daysOfWeek
      .concat(this.daysOfWeek)
      .splice(this.firstDayOfWeek, 7);


  }


  getMonthData(year: number, month: number): any {
    year = month > 11 ? year+1 :
      month < 0 ? year-1 : year;
    month = (month + 12) % 12;

    let firstDayOfMonth = new Date(year, month, 1);
    let lastDayOfMonth = new Date(year, month + 1, 0);
    let lastDayOfPreviousMonth = new Date(year, month, 0);
    let daysInMonth = lastDayOfMonth.getDate();
    let daysInLastMonth = lastDayOfPreviousMonth.getDate();
    let dayOfWeek = firstDayOfMonth.getDay();

    // Ensure there are always leading days to give context
    let leadingDays = (dayOfWeek - this.firstDayOfWeek + 7) % 7 || 7;
    let trailingDays = this.days.slice(0, 6 * 7 - (leadingDays + daysInMonth));
    if (trailingDays.length > 7) {
      trailingDays = trailingDays.slice(0, trailingDays.length-7);
    }

    let monthData = {
      year: year,
      month: month,
      days: this.days.slice(0, daysInMonth),
      leadingDays: this.days.slice(- leadingDays - (31 - daysInLastMonth), daysInLastMonth),
      trailingDays: trailingDays
    };

    return monthData;
  };

}
