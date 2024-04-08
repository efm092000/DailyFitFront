import { Component } from '@angular/core';
import { JsonPipe, NgIf } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormControl } from '@angular/forms';
import { RouterLink } from "@angular/router";

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
	mode: string = 'login';
	question: string = 'Don\'t have an account? Sign up ';

	constructor(private fb: FormBuilder) {
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
		let loginUrl = `http://localhost:8080/api/user/${this.email}`;
		fetch(loginUrl).then(
			response => response.json())
			.then(
				async user => {
					if (user.password === this.password) alert("good");
					else {
						alert('Incorrect password');
					}
				}
			).catch(
			error => alert('User not found')
		)
	}
}
