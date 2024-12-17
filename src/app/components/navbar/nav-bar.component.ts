import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavItemConfig } from '../../interfaces/ui-configs/nav-item-config.interface';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  navItems: NavItemConfig[] = [
    {
      name: 'Movie',
      path: 'movies',
      active: false,
    },
    {
      name: 'TV Shows',
      path: 'tvshows',
      active: false,
    },
    //   {
    //     name: 'Suggest me',
    //     path: 'suggests',
    //     icon: 'bi bi-arrow-right',
    //     active: false
    //   }
  ];

  constructor(private router: Router) {}
  selectedItem(nav: NavItemConfig) {
    this.navItems.map((item: NavItemConfig) => {
      item.active = nav.name === item.name;
    });

    this.router.navigateByUrl(nav.path);
  }

  homePage() {
    this.router.navigateByUrl('');
  }
}
