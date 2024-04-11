import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl: string = 'http://localhost:8080/api/user';
  user: User | undefined;

  constructor(private http: HttpClient) { }

  getUser(email: string) {
    let userUrl = `${this.userApiUrl}/${email}`;
    return this.http.get<User>(userUrl);
  }

  createUser(email: string, username: string, password: string) {
    let signUpUrl = `${this.userApiUrl}/${email}?name=${username}&password=${password}`;
    this.http.post(signUpUrl, {}, { responseType: 'text'})
    .subscribe({
      next: response => alert(response),
      error: response => alert(response.error)
    });
  }
}
