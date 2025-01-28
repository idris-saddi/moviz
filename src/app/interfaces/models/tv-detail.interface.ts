import { DetailBannerConfig } from '../ui-configs/detail-banner-config.interface';
import { DetailConfig } from '../ui-configs/detail-config.interface';
import {
  CommonDetailData,
  CreatedBy,
  LastEpisodeToAir,
  NextEpisodeToAir,
  Season,
} from './mediaCommon.interface';

export interface TVDetailData extends CommonDetailData {
  created_by: CreatedBy[];
  episode_run_time: any[];
  first_air_date: string;
  in_production: boolean;
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: NextEpisodeToAir;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  type: string;
}

export interface TvDetailsResult {
  bannerConfig: DetailBannerConfig;
  config: DetailConfig;
}
