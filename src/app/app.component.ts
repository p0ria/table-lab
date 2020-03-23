import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {interval, Observable, onErrorResumeNext} from "rxjs";
import {take} from "rxjs/operators";
import {TableRowComponent} from "./components/table/table-row/table-row.component";

interface Item {
  group: string,
  title: string,
  capacity: string,
  duration: string,
  date: string
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  items: Item[] = [];

  ngOnInit(): void {
    this.items = [
      {
        group: 'تبریز، کندوان و جلفا، دیار حیدربابا',
        title: 'هتل- اتوبوس VIP',
        capacity: 'موجود',
        duration: '3.5 روزه',
        date: '1399/01/19'
      },
      {
        group: 'ترکمن صحرا',
        title: 'خانه محلی- اتوبوس VIP- فولبرد- دیار اسب و دوتار',
        capacity: 'موجود',
        duration: '2.5 روزه',
        date: '1399/01/20'
      },
      {
        group: 'خرقان تا تخت سلیمان',
        title: 'بوم‌گردی- فولبرد - میراث جهانی',
        capacity: 'موجود',
        duration: '2 روزه',
        date: '1399/01/20'
      }
    ];

  }


  change() {
    this.items = [...this.items, {
      group: 'دنا و سی سخت',
      title: 'خانه‌سنتی- اتوبوس VIP- خفر تا مارگون',
      capacity: 'موجود',
      duration: '3.5 روزه',
      date: '1399/01/19'
    }];
  }
}

