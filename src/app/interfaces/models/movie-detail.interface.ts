import { DetailBannerConfig } from '../ui-configs/detail-banner-config.interface';
import { DetailConfig } from '../ui-configs/detail-config.interface';
import { BelongsToCollection, CommonDetailData } from './mediaCommon.interface';

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

export interface MovieDetailsResult {
  bannerConfig: DetailBannerConfig;
  config: DetailConfig;
}
