import { MediaResultData } from './mediaCommon.interface';

export interface SearchResult extends MediaResultData {}

// Search Results
export interface SearchResultData {
  results: SearchResult[]; // Using the same shared MediaResultData structure
}
