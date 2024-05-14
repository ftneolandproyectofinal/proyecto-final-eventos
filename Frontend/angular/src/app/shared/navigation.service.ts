import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateToEventList(eventName: string | null) {
    this.router.navigateByUrl(`/eventlist/${eventName}`);
  }
}
