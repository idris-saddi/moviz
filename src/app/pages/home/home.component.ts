import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { Endpoints } from '../../endpoints/Endpoints';
import {
  MovieResult,
  MoviesData,
} from '../../interfaces/models/movies.interface';
import {
  TrendData,
  TrendsResult,
} from '../../interfaces/models/trends.interface';
import { TVData, TVResult } from '../../interfaces/models/tv.interface';
import { MovieCardConfig } from '../../interfaces/movie-card-config.interface';
import {
  SearchResult,
  SearchResultData,
} from '../../interfaces/models/search-result.interface';
import { GenericHttpService } from '../../services/generic-http/generic-http.service';
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segemented-control-config.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [GenericHttpService],
  imports: [
    CommonModule,
    InputComponent,
    MovieCardComponent,
    HttpClientModule,
    SegmentedControlComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  title: string = 'All';
  Tpage = 1;
  Mpage = 1;
  Spage = 1;
  MinDiffScroll = 200;
  loading = false;
  movieCards: MovieCardConfig[] = [];
  trendingCards: MovieCardConfig[] = [];
  TVShowCards: MovieCardConfig[] = [];

  segments: SegmentedControlConfig[] = [
    {
      name: 'All',
      active: true,
    },
    {
      name: 'Movies',
      active: false,
    },
    {
      name: 'TV Shows',
      active: false,
    },
  ];
  constructor(
    private genericHttpService: GenericHttpService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      setInterval(this.onScroll.bind(this), 500); //khir melli nbindeha bel event taa el scroll
    }
    this.segments.map((item: SegmentedControlConfig) => {
      item.onClick = () => {
        this.title = item.name;
        if (item.name.toLowerCase().includes('movie')) {
          this.getMovies();
        } else if (item.name.toLowerCase().includes('tv shows')) {
          this.getTVShows();
        } else {
          this.getAllTrending();
        }
      };
    });
    console.log('Title:', this.title);
    console.log('Trending Cards:', this.trendingCards);
    console.log('Movie Cards:', this.movieCards);
    console.log('TV Show Cards:', this.TVShowCards);
  }
  onScroll() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollHeight - scrollTop <= clientHeight + this.MinDiffScroll) {
      this.loadMore();
    }
  }

  loadMore() {
    console.log('loading', this.title, this.loading);

    if (this.loading) return;
    this.loading = true;

    this.WhichToLoad();
  }

  getAllTrending(page = 1) {
    console.log('page', page);
    this.genericHttpService
      .httpGet(`trending/all/day?language=en-US&page=${page}`)
      .subscribe({
        next: (res: TrendData) => {
          // console.log(res.results);

          const newTrendingCards = res.results
            .map((item: TrendsResult) => {
              return {
                img: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
                movieName: item.original_title || item.original_name,
                rate: item.vote_average,
                onClick: () => {
                  if (item.first_air_date) {
                    this.router.navigateByUrl(`tvshows/${item.id}`);
                  } else {
                    this.router.navigateByUrl(`movie/${item.id}`);
                  }
                },
              } as MovieCardConfig;
            })
            .filter((item) => item.movieName);
          this.trendingCards = [...this.trendingCards, ...newTrendingCards];
          this.Tpage++;
          this.loading = false;
        },
        error: (error: any) => {
          console.error(error);
          this.loading = false;
        },
      });
  }
  getTVShows(page = 1) {
    console.log('page', page);
    this.genericHttpService
      .httpGet(`${Endpoints.TV_SHOWS}?page=${page}`)
      .subscribe({
        next: (res: TVData) => {
          const newShowCards = res.results
            .map((item: TVResult) => {
              return {
                img: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
                movieName: item.original_name,
                rate: item.vote_average,
                onClick: () => {
                  // console.log('Click : ', item);

                  this.router.navigateByUrl(`tvshows/${item.id}`);
                },
              } as MovieCardConfig;
            })
            .filter((item) => item.movieName);
          this.TVShowCards = [...this.TVShowCards, ...newShowCards];
          this.Spage++;
          this.loading = false;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  getMovies(page = 1) {
    console.log('page', page);
    this.genericHttpService
      .httpGet(`${Endpoints.MOVIES}?page=${page}`)
      .subscribe({
        next: (res: MoviesData) => {
          const newMovieCards = res.results
            .map((item: MovieResult) => {
              return {
                img: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
                movieName: item.original_title,
                rate: item.vote_average,
                onClick: () => {
                  this.router.navigateByUrl(`movie/${item.id}`);
                },
              } as MovieCardConfig;
            })
            .filter((item) => item.movieName);
          this.movieCards = [...this.movieCards, ...newMovieCards];
          this.Mpage++;
          this.loading = false;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  search(searchValue: string) {
    if (!searchValue.trim()) {
      this.getAllTrending(); // show trending if empty search
      return;
    }

    this.genericHttpService
      .httpGet(`${Endpoints.SEARCH}?query=${searchValue}`)
      .subscribe({
        next: (res: SearchResultData) => {
          this.movieCards = [];
          this.TVShowCards = [];
          this.trendingCards = [];

          const filteredResults = res.results.filter(
            (item: SearchResult) =>
              item.media_type === 'movie' || item.media_type === 'tv'
          );

          const allResults: MovieCardConfig[] = [];

          filteredResults.forEach((item: SearchResult) => {
            const config: MovieCardConfig = {
              img: Endpoints.IMAGE_BASE + `/w500${item.backdrop_path}`,
              movieName: item.original_title || item.original_name,
              rate: item.vote_average,
              onClick: () => {
                if (item.first_air_date) {
                  this.router.navigateByUrl(`tvshows/${item.id}`);
                } else {
                  this.router.navigateByUrl(`movie/${item.id}`);
                }
              },
            };

            if (item.media_type === 'movie') {
              this.movieCards.push(config);
            } else if (item.media_type === 'tv') {
              this.TVShowCards.push(config);
            }

            allResults.push(config);
          });

          if (this.title.toLowerCase() === 'all') {
            this.trendingCards = allResults;
          }
          this.WhichToLoad();
        },
        error: (error: any) => {
          console.error('Search Error:', error);
        },
      });
  }

  WhichToLoad() {
    switch (this.title.toLowerCase()) {
      case 'all':
        this.getAllTrending(this.Tpage);
        break;
      case 'movies':
        this.getMovies(this.Mpage);
        break;
      case 'tv shows':
        this.getTVShows(this.Spage);
        break;
      default:
        console.error('Unknown segment:', this.title);
        this.loading = false;
    }
  }
}
