import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { NavItemConfig } from '../../interfaces/ui-configs/nav-item-config.interface';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  navItems: NavItemConfig[] = [
    {
      name: 'Movie',
      path: 'home',
      queryParams: { currentSegment: 'Movies' },
    },
    {
      name: 'TV Shows',
      path: 'home',
      queryParams: { currentSegment: 'TV Shows' },
    },
    {
      name: 'Predict Success',
      path: 'predict',
      icon: 'bi bi-arrow-right',
    },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
    console.log('Logout success');
  }
}
