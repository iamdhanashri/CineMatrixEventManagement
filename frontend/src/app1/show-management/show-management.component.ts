import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowManagementComponent {
  private baseUrl = '/api/shows';

  constructor(private http: HttpClient) {}

  getShows(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createShow(showData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, showData);
  }

  updateShow(showId: string, showData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${showId}`, showData);
  }

  deleteShow(showId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${showId}`);
  }
}
