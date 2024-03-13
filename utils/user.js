export class User {
	constructor(email, name) {
		this.email = email;
		this.name = name;
		this.logged = false;
	}

	login() {
		this.logged = true;
	}

	logout() {
		this.logged = false;
	}
}