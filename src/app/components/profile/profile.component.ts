import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RoutinesService} from "../../services/routines.service";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user: User = {name:"", email:"", isPremium: false, isAdmin: false, profilePicture: ''};

  numRoutines: number = 0;
  newName: string = '';
  isEditModalOpen: boolean = false;
  selectedFile: File | null = null;
  constructor(private userService: UserService, private routinesService: RoutinesService) { }

  ngOnInit(): void {

    this.userService.user$.subscribe(
      user => this.user = user
    );
    this.routinesService.getNumberOfRoutines().subscribe(
      num => this.numRoutines = num
    );

  }

  openEditModal(): void {
    this.newName = this.user.name;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  submitEditProfile(): void {

    if (this.selectedFile !== null) {
      this.userService.uploadProfilePicture(this.user.email, this.selectedFile);
    }

    if (this.newName !== this.user.name && this.newName !== '') {
      this.userService.updateName(this.user.email, this.newName).subscribe({
        next: (user: User) => {
          console.log("Name updated")
          this.user.name = user.name;
        },
        error: error => {
          console.error('Error updating name:', error);
        }
      });
    }

    this.closeEditModal();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


}

