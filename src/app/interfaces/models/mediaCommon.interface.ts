// Shared Base Interfaces
export interface CommonResultData {
  id: number;
  backdrop_path?: string;
  poster_path?: string;
  adult: boolean;
  original_language: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}

// Shared Detail Interface
export interface CommonDetailData {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  homepage: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

// Additional Interfaces
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  runtime: number;
  season_number: number;
  still_path: string;
}

export interface NextEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  runtime: number;
  season_number: number;
  still_path: string;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MediaResultData extends CommonResultData {
  media_type: 'movie' | 'tv';
  // Optional properties for movies and TV shows
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}
