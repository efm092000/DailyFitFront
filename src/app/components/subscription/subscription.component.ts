import {Component, OnInit} from '@angular/core';
import {countries} from "./country-data";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit{
  public countries: any = countries
  formPremium = this.fb.group({
      cardNumber: ['', [Validators.required,
        Validators.pattern("(?<!\\d)\\d{16}(?!\\d)")]
      ],
      expireDate: ['', [Validators.required,
        Validators.pattern("^(0[1-9]|1[0-2])\\/?([0-9]{2})$")]
      ],
      cvc: ['', [Validators.required,
        Validators.pattern("(?<!\\d)\\d{3}(?!\\d)")]
      ],
      streetAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required,
        Validators.pattern("^\\d{5}(?:[-\\s]\\d{4})?$")]]
    }
  );
  user: User = {email:'',name:'',isPremium:false,isAdmin:false,profilePicture:''};

  constructor(private userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(
      user => this.user = user
    );
  }

  get cardNumber() {
    return this.formPremium.get('cardNumber') as FormControl;
  }
  get expireDate() {
    return this.formPremium.get('expireDate') as FormControl;
  }
  get cvc() {
    return this.formPremium.get('cvc') as FormControl;
  }

  get streetAddress() {
    return this.formPremium.get('streetAddress') as FormControl;
  }

  get city() {
    return this.formPremium.get('city') as FormControl;
  }
  get zipCode() {
    return this.formPremium.get('zipCode') as FormControl;
  }


  buyPremium(){
    this.userService.getPremium(this.user.email)
  }

  isUserPremium() {
    return this.userService.isUserPremium();
  }

}
