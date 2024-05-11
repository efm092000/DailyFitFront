import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { User } from "../interfaces/user";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl: string = 'http://localhost:8080/api/user';
  private readonly USER_KEY = 'loggedInUser';
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({email: '', name: '', premium: false, profilePicture: ''});
  //readonly user$ = this._user$;
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
      user => this.user$.next(user)
    );
    return response;
  }

  logout() {
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

}
