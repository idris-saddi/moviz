import { inject, Injectable } from '@angular/core';
import { GenericHttpService } from '../generic-http/generic-http.service';
import { Endpoints } from '../../endpoints/Endpoints';
import {
  MovieDetailData,
  MovieDetailsResult,
} from '../../interfaces/models/movie-detail.interface';
import {
  TVDetailData,
  TvDetailsResult,
} from '../../interfaces/models/tv-detail.interface';
import { catchError, map, Observable, of } from 'rxjs';
import {
  SearchResult,
  SearchResultData,
} from '../../interfaces/models/search-result.interface';
import { Genre } from '../../interfaces/models/mediaCommon.interface';
import { DetailBannerConfig } from '../../interfaces/ui-configs/detail-banner-config.interface';
import { DetailConfig } from '../../interfaces/ui-configs/detail-config.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private genericService = inject(GenericHttpService);

  getMovieById(id: string): Observable<MovieDetailsResult> {
    return this.genericService
      .httpGet<MovieDetailData>(Endpoints.MOVIE_ID(id))
      .pipe(
        map((res: MovieDetailData) => {
          // Prepare genres
          const genres = res.genres.map((item: Genre) => item.name).join(', ');

          // Prepare bannerConfig
          const bannerConfig: DetailBannerConfig = {
            img: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
            pageName: 'Movies',
            path: 'movies',
            title: res.original_title,
          };

          // Prepare config
          const config: DetailConfig = {
            img: Endpoints.IMAGE_BASE + `w500${res.poster_path}`,
            subtitle: res.tagline,
            description: res.overview,
            rate: res.vote_average,
            isVertical: true,
            detailCards: [
              { title: 'Type', description: 'Movie' },
              { title: 'Release date', description: res.release_date },
              { title: 'Run time', description: res.runtime.toString() },
              { title: 'Genres', description: genres },
            ],
          };

          // Return a combined result
          return { bannerConfig, config };
        }),
        catchError((err) => {
          console.log(err);
          return of({} as MovieDetailsResult);
        })
      );
  }

  getTvShowById(id: string): Observable<TvDetailsResult> {
    return this.genericService
      .httpGet<TVDetailData>(Endpoints.TV_SHOW_ID(id))
      .pipe(
        map((res: TVDetailData) => {
          // Prepare genres
          const genres = res.genres.map((item: Genre) => item.name).join(', ');

          // Prepare bannerConfig
          const bannerConfig = {
            img: Endpoints.IMAGE_BASE + `/w1280${res.backdrop_path}`,
            pageName: 'TV Shows',
            path: 'tvshows',
            title: res.name,
          };

          // Prepare config
          const config = {
            img: Endpoints.IMAGE_BASE + `w500${res.poster_path}`,
            subtitle: res.tagline,
            description: res.overview,
            rate: res.vote_average,
            isVertical: false,
            detailCards: [
              { title: 'Type', description: 'Movie' },
              { title: 'Status', description: res.status },
              { title: 'First air date', description: res.first_air_date },
              { title: 'Last air date', description: res.last_air_date },
              {
                title: 'No. of seasons',
                description: res.number_of_seasons.toString(),
              },
              {
                title: 'No. of episodes',
                description: res.number_of_episodes.toString(),
              },
              { title: 'Episode run time', description: res.last_air_date },
              { title: 'Genres', description: genres },
            ],
          };

          return { bannerConfig, config };
        }),
        catchError((err) => {
          console.log(err);
          return of({} as TvDetailsResult);
        })
      );
  }

  getAllMedia(
    page = 1,
    mediaType: 'TRENDS' | 'MOVIES' | 'TV_SHOWS' = 'TRENDS'
  ) {
    const requestUrl = `${Endpoints[mediaType]}${
      mediaType == 'MOVIES' || mediaType == 'TV_SHOWS' ? '?' : '&'
    }page=${page}`;
    return this.genericService.httpGet(requestUrl).pipe(
      map((res: any) => res.results),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  searchMedia(searchValue: string): Observable<SearchResult[]> {
    return this.genericService
      .httpGet<SearchResultData>(`${Endpoints.SEARCH}?query=${searchValue}`)
      .pipe(
        map((res: SearchResultData) => {
          return res.results.filter(
            (item: SearchResult) =>
              item.media_type === 'movie' || item.media_type === 'tv'
          );
        }),
        catchError((error) => {
          console.error('Search Error:', error);
          return of([]);
        })
      );
  }
}
