import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {NgClass, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private userService: UserService) {
  }

  hideElements: boolean = false;
  image: string = "assets/images/left-arrow.png";
  isAdmin: boolean = this.userService.isUserAdmin();

  hideSidebar() {
    this.hideElements = !this.hideElements;
    console.log(this.isAdmin);
    this.image = this.hideElements ? "assets/images/right-arrow.png" : "assets/images/left-arrow.png";
  }
}
