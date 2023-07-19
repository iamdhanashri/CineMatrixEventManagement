import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieManagementComponent  {
  private baseUrl = '/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createMovie(movieData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, movieData);
  }

  updateMovie(movieId: string, movieData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${movieId}`, movieData);
  }

  deleteMovie(movieId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${movieId}`);
  }
}