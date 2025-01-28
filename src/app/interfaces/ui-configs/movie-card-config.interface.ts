export interface MovieCardConfig {
  img: string;
  rate: number;
  movieName: string;
  onClick?: () => any;
}

export interface MediaSettingType {
  pagination: number;
  type: 'TRENDS' | 'MOVIES' | 'TV_SHOWS';
}
