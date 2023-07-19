// services/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = '/api/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }

  createEvent(eventData: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, eventData);
  }

  updateEvent(eventId: string, eventData: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${eventId}`, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${eventId}`);
  }
}
