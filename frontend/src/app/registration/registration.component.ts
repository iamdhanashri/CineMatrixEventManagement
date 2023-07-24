import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    const registrationData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    // Make the HTTP POST request to the registration endpoint
    this.http.post('http://localhost:8080/users/regi', registrationData).subscribe(
      () => {
        // Registration successful, redirect to the login page
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Error registering user:', error);
      
        // Handle error and display appropriate message if needed
      }
    );
  }
}
