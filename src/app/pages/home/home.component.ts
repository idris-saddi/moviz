import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { Endpoints } from '../../endpoints/Endpoints';
import { MoviesService } from '../../services/movies/movies.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  finalize,
  map,
  Observable,
  of,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import {
  MediaSettingType,
  MovieCardConfig,
} from '../../interfaces/ui-configs/movie-card-config.interface';
import { TabType } from '../../interfaces/ui-configs/segemented-control-config.interface';
import { SearchResult } from '../../interfaces/models/search-result.interface';
import { TrendsResult } from '../../interfaces/models/trends.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    InputComponent,
    MovieCardComponent,
    SegmentedControlComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private movieService = inject(MoviesService);
  private router = inject(Router);
  title: string = 'All';
  MinDiffScroll = 200;
  loading = false;
  searchSubject = new BehaviorSubject<string>('');
  mediaSettingSubject = new BehaviorSubject<MediaSettingType>({
    pagination: 1,
    type: 'TRENDS',
  });

  // combining search and tab streams to alter media display on change
  mediaCardConfigs$: Observable<MovieCardConfig[]> = combineLatest([
    this.mediaSettingSubject,
    this.searchSubject,
  ]).pipe(
    tap(() => (this.loading = true)),
    switchMap(([setting, searchTerm]) => {
      if (searchTerm) {
        // call search
        return this.movieService.searchMedia(searchTerm).pipe(
          map((res) => {
            const filteredSearch = res.filter((item) => {
              const type = this.mediaSettingSubject.getValue().type;
              if (type == 'MOVIES') return item.media_type == 'movie';
              if (type == 'TV_SHOWS') return item.media_type == 'tv';
              return true;
            });
            return this.prepareConfig(filteredSearch);
          }),
          catchError((err) => {
            console.error(err);
            return of([] as MovieCardConfig[]);
          }),
          finalize(() => {
            this.loading = false;
          })
        );
      } else {
        // call media
        return this.movieService
          .getAllMedia(setting.pagination, setting.type)
          .pipe(
            map((res) => {
              return this.prepareConfig(res);
            }),
            catchError((err) => {
              console.error(err);
              return of([] as MovieCardConfig[]);
            }),
            finalize(() => {
              this.loading = false;
            })
          );
      }
    }),
    scan(
      (
        acc: {
          previousSearchTerm: string;
          previousType: 'TRENDS' | 'MOVIES' | 'TV_SHOWS';
          media: MovieCardConfig[];
        },
        newMedia: MovieCardConfig[]
      ) => {
        const currentSearchTerm = this.searchSubject.getValue();
        const currentType = this.mediaSettingSubject.getValue().type;

        // Reset media if the search term or type changes
        if (
          acc.previousSearchTerm !== currentSearchTerm ||
          acc.previousType !== currentType
        ) {
          return {
            previousSearchTerm: currentSearchTerm,
            previousType: currentType,
            media: [...newMedia],
          };
        }

        // append new media
        return {
          previousSearchTerm: currentSearchTerm,
          previousType: currentType,
          media: [...acc.media, ...newMedia],
        };
      },
      // Initial accumulator value
      {
        previousSearchTerm: '',
        previousType: 'TRENDS',
        media: [] as MovieCardConfig[],
      }
    ),
    map((acc) => acc.media)
  );

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      setInterval(this.onScroll.bind(this), 500); //khir melli nbindeha bel event taa el scroll
    }
  }

  filterMediaType(tab: TabType) {
    this.title = tab;
    switch (tab) {
      case 'All':
        this.mediaSettingSubject.next({ pagination: 1, type: 'TRENDS' });
        break;
      case 'Movies':
        this.mediaSettingSubject.next({ pagination: 1, type: 'MOVIES' });

        break;
      case 'TV Shows':
        this.mediaSettingSubject.next({ pagination: 1, type: 'TV_SHOWS' });
        break;

      default:
        break;
    }
  }

  onScroll() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollHeight - scrollTop <= clientHeight + this.MinDiffScroll) {
      if (this.loading) return;
      const { pagination, type } = this.mediaSettingSubject.value;
      this.mediaSettingSubject.next({ pagination: pagination + 1, type });
    }
  }

  search(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  // maps service results into configs for the card component
  prepareConfig(data: SearchResult[] | TrendsResult[]): MovieCardConfig[] {
    return data.map((item) => ({
      img: item.backdrop_path
        ? Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`
        : '',
      movieName: item.original_title || item.original_name || '',
      rate: item.vote_average,
      onClick: () => {
        this.router.navigateByUrl(
          `${item.first_air_date ? 'tvshows' : 'movie'}/${item.id}`
        );
      },
    }));
  }
}
