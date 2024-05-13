import { Component, OnInit } from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import { User } from "../../interfaces/user";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  loggedIn?: boolean;
  user?: User;
  constructor(private userService: UserService) {
  }

  ngOnInit(){
    this.userService.userIsLogged$.subscribe(isLogged => this.loggedIn = isLogged);
    this.userService.user$.subscribe(user => this.user = user);
  }

  logOut(){
    this.userService.logout();
  }
}
