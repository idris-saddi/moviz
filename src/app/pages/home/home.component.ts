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
  mediaSettingSubject = new BehaviorSubject<any>({
    pagination: 1,
    type: 'TRENDS',
  });
  searchSubject = new BehaviorSubject<string>('');

  mediaCardConfigs$: Observable<any[]> = combineLatest([
    this.mediaSettingSubject,
    this.searchSubject,
  ]).pipe(
    tap(() => (this.loading = true)),
    switchMap(([setting, searchTerm]) => {
      if (searchTerm) {
        // call search
        return this.movieService.searchMedia(searchTerm).pipe(
          map((res: any[]) => {
            return res
              .filter((item) => {
                const type = this.mediaSettingSubject.getValue().type;
                if (type == 'MOVIES') return item.media_type == 'movie';
                if (type == 'TV_SHOWS') return item.media_type == 'tv';
                return true;
              })
              .map((item) => ({
                img: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
                movieName: item.original_title || item.original_name,
                rate: item.vote_average,
                onClick: () => {
                  this.router.navigateByUrl(
                    `${item.first_air_date ? 'tvshows' : 'movie'}/${item.id}`
                  );
                },
              }));
          }),
          catchError((err) => {
            console.error(err);
            return of([]); // Return an empty array on error
          })
        );
      } else {
        // call media
        return this.movieService
          .getAllMedia(setting.pagination, setting.type)
          .pipe(
            map((res: any[]) => {
              return res.map((item) => ({
                img: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
                movieName: item.original_title || item.original_name,
                rate: item.vote_average,
                onClick: () => {
                  this.router.navigateByUrl(
                    `${item.first_air_date ? 'tvshows' : 'movie'}/${item.id}`
                  );
                },
              }));
            }),
            catchError((err) => {
              console.error(err);
              return of([]); // Return an empty array on error
            })
          );
      }
    }),
    scan(
      (
        acc: {
          previousSearchTerm: string | null;
          previousType: string | null;
          media: unknown;
        },
        newMedia: unknown
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
            media: [...(newMedia as any[])], // Reset media
          };
        }

        // Otherwise, append new media
        return {
          previousSearchTerm: currentSearchTerm,
          previousType: currentType,
          media: [...(acc.media as any[]), ...(newMedia as any[])],
        };
      },
      { previousSearchTerm: null, previousType: null, media: [] } // Initial accumulator value
    ),
    map((acc: any) => acc.media),
    finalize(() => {
      this.loading = false;
    })
  );

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      setInterval(this.onScroll.bind(this), 500); //khir melli nbindeha bel event taa el scroll
    }
  }

  filterMediaType(tab: string) {
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
}
