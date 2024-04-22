import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl: string = 'http://localhost:8080/api/user';
  private readonly USER_KEY = 'loggedInUser';

  constructor(private http: HttpClient) {
  }

  saveUserToLocalStorage(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getLoggedInUser() {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      return JSON.parse(userJson);
    }
  }

  createUser(email: string, username: string, password: string) {
    let signUpUrl = `${this.userApiUrl}/${email}?name=${username}&password=${password}`;
    return this.http.post(signUpUrl, {}, {responseType: 'text'})
  }

  login(email: string, password: string) {
    let loginUrl = `${this.userApiUrl}/authenticate`;
    let body = {
      email: email,
      password: password
    }
    return this.http.post<User>(loginUrl, body);
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }
}
