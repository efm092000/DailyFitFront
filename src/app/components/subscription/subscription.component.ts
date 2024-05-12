import {Component, OnInit} from '@angular/core';
import {countries} from "./country-data";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit{
  public countries: any = countries
  user: User = this.userService.getLoggedInUser();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(
      user => this.user = user
    );
  }

  buyPremium(){
    this.userService.getPremium(this.user.email)
  }

  isUserPremium() {
    return this.userService.isUserPremium();
  }

}
