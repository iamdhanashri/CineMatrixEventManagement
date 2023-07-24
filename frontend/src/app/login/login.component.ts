// login.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: any = {
    email: '',
    password: ''
  };

  loading = false
  showPrompt: boolean = false;

  constructor(private http: HttpClient,  private router: Router) { }
    ngOnInit(): void {
  }
  

  login() {

    this.loading = true
    // Make a POST request to the login endpoint
    this.http.post<any>('http://localhost:8080/users/login', this.credentials).subscribe(
      (data) => {
        // Handle successful login, e.g., store token in local storage and redirect to other page
        // Example:
        console.log('Login successful:', data);
       

        // Show the prompt after successful login
        this.showPrompt = true;

        // Hide the prompt after 3 seconds
        setTimeout(() => {
          this.showPrompt = false;
        }, 3000);

        this.router.navigateByUrl('/');
        this.loading = false
      },
      (error) => {
        console.log('Login failed:', error);
        // Handle login error, e.g., display error message
        this.loading = false;
      }
    );
  }
}
