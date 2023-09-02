import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      userId: ['', [Validators.required, Validators.pattern('^[a-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }


  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // Get user data from the form
      const userData = this.signupForm.value;

      // Retrieve the existing 'users' data from localStorage
      const usersData = localStorage.getItem('users');

      // Check if 'users' data exists in localStorage
      if (usersData) {
        // Parse the JSON data
        const users = JSON.parse(usersData);

        // Ensure 'users' is an array, or initialize it as an empty array if it's not
        const usersArray = Array.isArray(users) ? users : [];

        // Push the new user data
        usersArray.push(userData);

        // Store the updated 'users' in localStorage
        localStorage.setItem('users', JSON.stringify(usersArray));
      } else {
        // If 'users' data doesn't exist, initialize it as an array
        localStorage.setItem('users', JSON.stringify([userData]));
      }

      // Redirect to login page
      this.router.navigate(['/login']);
    }
  }
}
