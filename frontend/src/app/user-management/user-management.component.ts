import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  userForm!: FormGroup;
  users: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loadUsers();
  }

  // Helper method to fetch all users from the backend
  loadUsers(): void {
    this.http.get<any[]>('/api/users').subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Method to handle form submission for creating a new user
  createUser(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.http.post('/api/users', newUser).subscribe(
        () => {
          this.loadUsers(); // Reload the list of users after creating a new user
          this.userForm.reset();
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  // Method to handle form submission for updating a user
  updateUser(userId: string): void {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      this.http.put(`/api/users/${userId}`, updatedUser).subscribe(
        () => {
          this.loadUsers(); // Reload the list of users after updating a user
          this.userForm.reset();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  // Method to handle deleting a user
  deleteUser(userId: string): void {
    this.http.delete(`/api/users/${userId}`).subscribe(
      () => {
        this.loadUsers(); // Reload the list of users after deleting a user
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
