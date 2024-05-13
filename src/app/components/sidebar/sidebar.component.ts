import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {NgClass, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  hideElements: boolean = false;
  image: string = "assets/images/left-arrow.png";
  isAdmin: boolean = false;
  private user: User = {email:'',name:'',isPremium:false,isAdmin:false,profilePicture:''};

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.user$.subscribe((user:User) => {this.user = user})
  }

  hideSidebar() {
    this.hideElements = !this.hideElements;
    this.image = this.hideElements ? "assets/images/right-arrow.png" : "assets/images/left-arrow.png";
  }

  checkAdmin() {
    return this.user.isAdmin;
  }
}
