import { Component, Renderer2} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
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
export class HeaderComponent {
  loggedIn: boolean = false;
  constructor(private userService: UserService, private renderer: Renderer2) {
  }

  ngOnInit(){
    this.userService.loggedInUser.subscribe(user => {
      this.loggedIn = user !== null;
    });
  }
  logOut(){
    this.userService.logout();
    this.loggedIn = false;
  }

  loadMenuToggle() {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      const currentDisplay = window.getComputedStyle(dropdownMenu).display;
      const newDisplay = currentDisplay === 'none' ? 'block' : 'none';
      this.renderer.setStyle(dropdownMenu, 'display', newDisplay);
    }
  }
}
