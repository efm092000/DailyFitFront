import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  hideElements: boolean = false;
  image: string = "assets/images/left-arrow.png";

  hideSidebar() {
    this.hideElements = !this.hideElements;
    this.image = this.hideElements ? "assets/images/right-arrow.png" : "assets/images/left-arrow.png";
  }
}
