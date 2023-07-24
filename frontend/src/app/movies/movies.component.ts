// src/app/movie-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  data: any[] = [];
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.loading = true;
    this.http.get<Movie[]>('http://localhost:8080/movies').subscribe(
      (data) => {
        this.data = data;
        this.loading = false;

        console.log(data)
      },
      (error) => {
        console.log('Error fetching movies:', error);
        this.loading = false;
      }
    );
  }
}
