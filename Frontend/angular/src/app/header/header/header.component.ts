import { Component, Output, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationService } from '../../shared/navigation.service';

@Component({
  selector: 'evl-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  eventSearchString = '';
  homeLink = '';
  eventSearchControl = new FormControl('');

  constructor(private navigationService: NavigationService) {}

  /*   ngOnInit() {
    this.eventSearchControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  } */

  onSearchEvent() {
    this.navigationService.navigateToEventList(this.eventSearchControl.value);
  }
}
