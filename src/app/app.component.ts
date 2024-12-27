import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/navbar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/auth/login/login.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'moviz';
}
