import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../interfaces/user";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl: string = 'http://localhost:8080/api/user';
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({email: '', name: '', premium: false, profilePicture: ''});
  private USER_KEY = 'loggedInUser';
  userIsLogged: boolean = false;

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
    const response = this.http.post<User>(loginUrl, body);
    response.subscribe(
      user => {
        this.user$.next(user)
        this.userIsLogged = true;
      }
    );
    return response;
  }

  logout() {
    this.userIsLogged = false;
    localStorage.removeItem(this.USER_KEY);
  }

  updateName(email: string, name?: string): Observable<User> {

    const url = `${this.userApiUrl}/${email}`;
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    const response = this.http.put<User>(url, {}, {params: params});
    response.subscribe(
      user => this.user$.next(user)
    );
    return response;
  }

  uploadProfilePicture(email: string, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('file', file);
   const response: Observable<User> =  this.http.post<User>(`${this.userApiUrl}/${email}/profile-picture`, formData);
   response.subscribe(
     user  => {
       console.log(user);
       this.user$.next(user)
     }

   );
   return response;
  }

  getPremium(email: String) {
    const url = `${this.userApiUrl}/${email}?premium=1`;
    let response = this.http.put<User>(url, {}, {});
    response.subscribe(
      user => this.user$.next(user)
    );
    return response;
  }

  isUserPremium() {
    console.log(this.user$.value);
    return this.user$.value.isPremium;
  }

  isLogged() {
    return this.userIsLogged;
  }

}
