import { Component } from '@angular/core';
import { JsonPipe, NgIf } from "@angular/common";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";

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

	constructor(private fb: FormBuilder) { }

	formSignUp = this.fb.group({
		'email': ['', [Validators.required, Validators.email]],
		'password': ['', [Validators.required]],
		'confirmPassword': ['', [Validators.required]]
	})

	get email() {
		return this.formSignUp.get('email') as FormControl;
	}

	get password() {
		return this.formSignUp.get('password') as FormControl;
	}

	get confirmPassword() {
		return this.formSignUp.get('confirmPassword') as FormControl;
	}

	signUp() {
		// TODO: Implement sign-up logic
	}

	passwordsMatch() {
		return this.password.value === this.confirmPassword.value;
	}
}
