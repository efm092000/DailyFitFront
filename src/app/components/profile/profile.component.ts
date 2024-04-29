import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {NgOptimizedImage} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";

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
  numRoutines: number = 0;
  constructor(private userService: UserService, private routinesService: RoutinesService) { }

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
    this.routinesService.getNumberOfRoutines().subscribe(
      num => this.numRoutines = num
    );
  }

  editProfile(): void {
  }
}

