import { MediaResultData } from './mediaCommon.interface';

export interface TrendData {
  page: number;
  results: TrendsResult[];
  total_pages: number;
  total_results: number;
}

export interface TrendsResult extends MediaResultData {}
