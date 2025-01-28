import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailBannerComponent } from '../../components/detail-banner/detail-banner.component';
import { RateChipComponent } from '../../components/rate-chip/rate-chip.component';
import { Endpoints } from '../../endpoints/Endpoints';
import { MovieDetailData } from '../../interfaces/models/movie-detail.interface';
import { TVDetailData } from '../../interfaces/models/tv-detail.interface';
import { DetailBannerConfig } from '../../interfaces/ui-configs/detail-banner-config.interface';
import { DetailConfig } from '../../interfaces/ui-configs/detail-config.interface';
import { GenericHttpService } from '../../services/generic-http/generic-http.service';
import { MoviesService } from '../../services/movies/movies.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  providers: [GenericHttpService],
  imports: [
    DetailBannerComponent,
    HttpClientModule,
    RateChipComponent,
    CommonModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);
  bannerConfig!: DetailBannerConfig;
  config!: DetailConfig;
  private genericService = inject(GenericHttpService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: any) => {
      if (paramMap.params.movie_id) {
        this.moviesService
          .getMovieById(paramMap.params.movie_id)
          .pipe(
            tap(({ bannerConfig, config }) => {
              this.bannerConfig = bannerConfig;
              this.config = config;
            })
          )
          .subscribe();
      } else if (paramMap.params.series_id) {
        this.moviesService
          .getTvShowById(paramMap.params.series_id)
          .pipe(
            tap(({ bannerConfig, config }) => {
              this.bannerConfig = bannerConfig;
              this.config = config;
            })
          )
          .subscribe();
      }
    });
  }
}
