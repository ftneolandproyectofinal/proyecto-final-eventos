import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderModule } from './header/header.module';

@Component({
  selector: 'evl-root',
  standalone: true,
  imports: [RouterOutlet, HeaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'eventland';
}
