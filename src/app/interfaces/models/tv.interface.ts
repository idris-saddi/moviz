import { MediaResultData } from './mediaCommon.interface';

export interface TVData {
  page: number;
  results: TVResult[];
  total_pages: number;
  total_results: number;
}

// Specific TV Result (inherits from MediaResultData for shared fields)
export interface TVResult extends MediaResultData {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}
