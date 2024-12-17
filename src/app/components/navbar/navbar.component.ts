import { Component } from '@angular/core';
import { NavItemConfig } from '../../interfaces/ui-configs/nav-item-config.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navItems:NavItemConfig[]=[
    { name: 'Movie', path: 'movies', active:false },
    { name: 'Series', path: 'series', active:false },
    { name: 'Suggest me', path: 'suggests', active:false },
    { name: 'Sign in', path: 'signin', active:false },
    { name: 'Sign up', path: 'signup', active:false},
  ]

  selectedItem(nav: NavItemConfig){
    this.navItems.map((item: NavItemConfig) => {
      item.active= item.name===nav.name
    })

  }

}
