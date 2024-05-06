import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: User = {name:"", email:""};
  numRoutines: number = 0;
  newName: string = '';
  isEditModalOpen: boolean = false;
  constructor(private userService: UserService, private routinesService: RoutinesService) { }

  ngOnInit(): void {

    //this.user = this.userService.getLoggedInUser();
    this.userService.user$.subscribe(
      user => this.user = user
    );
    this.routinesService.getNumberOfRoutines().subscribe(
      num => this.numRoutines = num
    );
  }
  openEditModal(): void {
    this.newName = this.user.name; // Pre-fill the input with current name
    this.isEditModalOpen = true;
    console.log(this.isEditModalOpen);
  }

  closeEditModal(): void {
    this.isEditModalOpen = false; // Hide the modal
  }

  submitEditProfile(): void {
    // Update user name
    this.userService.updateName(this.user.email, this.newName);
    this.closeEditModal();
  }
}

