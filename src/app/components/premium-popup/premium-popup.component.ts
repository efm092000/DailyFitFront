import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-premium-popup',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './premium-popup.component.html',
  styleUrl: './premium-popup.component.css'
})
export class PremiumPopupComponent {

  @Output() closePopup = new EventEmitter<boolean>();
  closeEvent() {
    this.closePopup.emit();
  }
}
