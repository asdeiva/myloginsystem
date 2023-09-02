import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Get user data from local storage
      const users = JSON.parse(localStorage.getItem('users') || '[]') as any[];

      // Check if a user with the provided email and password exists
      const { email, password } = this.loginForm.value;
      const authenticatedUser = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (authenticatedUser) {
        // User is authenticated
        // Redirect to the home page
        this.router.navigate(['/home']);
      } else {
        // Authentication failed, show an error message
        alert('User not available');
      }
    }
  }
}
