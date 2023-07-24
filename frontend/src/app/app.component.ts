import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MovieMania';
  storedData: any;

  constructor(private router: Router) {}


  ngOnInit(): void {
    // Retrieve data from local storage
    this.storedData = localStorage.getItem('name'); // Replace 'key' with the actual key used to store the data
    this.storedData = JSON.parse(this.storedData);

    // Parse the data if it's in JSON format
    if (this.storedData) {
      this.storedData = JSON.parse(this.storedData);
    }

    // Now you can use the data in your component
    console.log(this.storedData);
  }

  logout(): void {
    // Clear any data from local storage that you want to remove on logout
    localStorage.removeItem('token'); // Replace 'key' with the actual key used to store the data

    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }

}
