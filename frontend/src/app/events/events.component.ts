

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit  {
  data: any[] = [];
  loading = false;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.loading = true;
    this.http.get<Event[]>('http://localhost:8080/events').subscribe(
      (data) => {
        this.data = data;
        this.loading = false;
console.log(data)
        // console.log(events)
      },
      (error) => {
        console.log('Error fetching movies:', error);
        this.loading = false;
      }
    );
  }
}
