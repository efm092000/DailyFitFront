import {Component, OnInit} from '@angular/core';
import {countries} from "./country-data";
import {NgForOf} from "@angular/common";

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
