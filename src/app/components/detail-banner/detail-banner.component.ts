import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DetailBannerConfig } from '../../interfaces/ui-configs/detail-banner-config.interface';

@Component({
  selector: 'app-detail-banner',
  standalone: true,
  imports: [],
  templateUrl: './detail-banner.component.html',
  styleUrl: './detail-banner.component.scss',
})
export class DetailBannerComponent {
  @Input() config!: DetailBannerConfig;
  constructor(private router: Router) {}

  open(link: string) {
    this.router.navigateByUrl(link);
  }
}
