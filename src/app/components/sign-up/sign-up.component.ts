import { Component } from '@angular/core';
import { JsonPipe, NgIf } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
	selector: 'app-sign-up',
	standalone: true,
	imports: [
		JsonPipe,
		NgIf,
		ReactiveFormsModule,
		RouterOutlet,
		RouterLink
	],
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
	question: string = 'Already have an account? Log in ';

	constructor(private fb: FormBuilder, private userService: UserService) { }

	formSignUp: FormGroup = this.fb.group({
		'email': ['', [Validators.required, Validators.email]],
		'username': ['', [Validators.required]],
		'password': ['', [Validators.required]],
		'confirmPassword': ['', [Validators.required]]
	})

	signUp(): void {
    this.userService.createUser(this.email.value, this.username.value, this.password.value)
    .subscribe({
      next: response => alert(response),
      error: response => alert(response.error)
    });
	}

	passwordsMatch(): boolean {
		return this.password.value === this.confirmPassword.value;
	}

	get username(): FormControl {
		return this.formSignUp.get('username') as FormControl;
	}

	get email(): FormControl {
		return this.formSignUp.get('email') as FormControl;
	}

	get password(): FormControl {
		return this.formSignUp.get('password') as FormControl;
	}

	get confirmPassword(): FormControl {
		return this.formSignUp.get('confirmPassword') as FormControl;
	}
}
