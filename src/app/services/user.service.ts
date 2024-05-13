import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../interfaces/user";
import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl: string = 'http://localhost:8080/api/user';
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({
    email: '',
    name: '',
    isPremium: false,
    profilePicture: ''
  });
  private USER_KEY = 'loggedInUser';
  userIsLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  saveUserToLocalStorage(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getLoggedInUser() {
    return this.user$.getValue()
  }

  createUser(email: string, username: string, password: string) {
    let signUpUrl = `${ this.userApiUrl }/${ email }?name=${ username }&password=${ password }`;
    return this.http.post(signUpUrl, {}, { responseType: 'text' })
  }

  login(email: string, password: string) {
    let loginUrl = `${ this.userApiUrl }/authenticate`;
    let body = {
      email: email,
      password: password
    }
    const response = this.http.post<User>(loginUrl, body);
    response.subscribe(
      user => {
        this.user$.next(user)
        this.userIsLogged$.next(true)
      }
    );
    return response;
  }

  logout() {
    this.userIsLogged$.next(false);
    this.user$.next({
      email: '',
      name: '',
      isPremium: false,
      profilePicture: ''
    });
  }

  updateName(email: string, name?: string): Observable<User> {

    const url = `${ this.userApiUrl }/${ email }`;
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    const response = this.http.put<User>(url, {}, { params: params });
    response.subscribe(
      user => this.user$.next(user)
    );
    return response;
  }

  uploadProfilePicture(email: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    firstValueFrom(this.http.post<User>(`${ this.userApiUrl }/${ email }/profile-picture`, formData)).then(
      user => this.user$.next(user)
    );
  }

  getPremium(email: String) {
    const url = `${ this.userApiUrl }/${ email }?premium=1`;
    let response = this.http.put<User>(url, {}, {});
    response.subscribe(
      user => this.user$.next(user)
    );
    return response;
  }

  isUserPremium() {
    return this.user$.value.isPremium;
  }
}
