import { Component } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		NgIf,
		NgOptimizedImage
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent {
	mode: string = 'login';
	question: string = 'Don\'t have an account? Sign up ';

	toggleMode() {
		this.mode = this.mode === 'login' ? 'signUp' : 'login';
		this.question = this.question === "Already have an account? Log in " ? "Don't have an account? Sign up " : "Already have an account? Log in ";
	}

	login() {

	}

	signUp() {

	}
}
