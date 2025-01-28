import { BelongsToCollection, CommonDetailData } from './mediaCommon.interface';

// Movie Details
export interface MovieDetailData extends CommonDetailData {
  belongs_to_collection: BelongsToCollection;
  budget: number;
  imdb_id: string;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  video: boolean;
}
