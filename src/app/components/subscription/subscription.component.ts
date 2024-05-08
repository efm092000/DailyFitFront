import {Component, OnInit} from '@angular/core';
import {countries} from "./country-data";
import {NgForOf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit{
  public countries: any = countries
  user: User = {name:'',email: '', premium: false};

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

}
