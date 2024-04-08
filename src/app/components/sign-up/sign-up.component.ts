import { Component } from '@angular/core';
import { JsonPipe, NgIf } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpClient } from "@angular/common/http";

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

	constructor(private fb: FormBuilder, private http: HttpClient) { }

	formSignUp: FormGroup = this.fb.group({
		'email': ['', [Validators.required, Validators.email]],
		'username': ['', [Validators.required]],
		'password': ['', [Validators.required]],
		'confirmPassword': ['', [Validators.required]]
	})

	signUp(): void {
		let signUpUrl = `http://localhost:8080/api/user/${this.email.value}?name=${this.username.value}&password=${this.password.value}`;
		this.http.post(signUpUrl, {}, { responseType: 'text'})
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
