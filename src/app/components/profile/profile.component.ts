import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: User = {name:"", email:""};
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
  }

  editProfile(): void {
  }
}

