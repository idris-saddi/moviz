import { MediaResultData } from './mediaCommon.interface';

export interface MoviesData {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult extends MediaResultData {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}
