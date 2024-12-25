export interface SearchResultData {
  results: SearchResult[];
}

export interface SearchResult {
    backdrop_path: string;
    original_title?: string;
    original_name?: string;
    vote_average: number;
    first_air_date?: string;
    id: number;
  }
  