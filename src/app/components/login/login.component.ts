import { Component } from '@angular/core';
import { JsonPipe, NgIf } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormControl } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    JsonPipe,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  question: string = 'Don\'t have an account? Sign up ';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.loggedInUser.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['/']); // Redirigir al usuario si ya está autenticado
      }
    });
  }

  formLogin = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required]]
  })

  get email() {
    return this.formLogin.get('email') as FormControl;
  }

  get password() {
    return this.formLogin.get('password') as FormControl;
  }

  login() {
    this.userService.login(this.email.value, this.password.value)
    .subscribe({
        next: response => {
          this.userService.updateLoggedInUSer(response);
          this.router.navigate(['/']);
        },
        error: response => alert(response.error)
      }
    );
  }
}
