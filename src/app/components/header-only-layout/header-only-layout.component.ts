import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-header-only-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './header-only-layout.component.html',
  styleUrl: './header-only-layout.component.css'
})
export class HeaderOnlyLayoutComponent {

}
