import { Component } from '@angular/core';

@Component({
  selector: 'evl-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  eventSearchString = '';
  homeLink = '';
}
