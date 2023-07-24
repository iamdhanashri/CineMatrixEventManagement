import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}

  // Method to check if UserManagementComponent route is active
  isUserManagementRouteActive(): boolean {
    return this.router.isActive('/users', true);
  }

  // Method to check if MovieManagementComponent route is active
  isMovieManagementRouteActive(): boolean {
    return this.router.isActive('/movies', true);
  }

  // Method to check if ShowManagementComponent route is active
  // isShowManagementRouteActive(): boolean {
  //   return this.router.isActive('/shows', true);
  // }
}
