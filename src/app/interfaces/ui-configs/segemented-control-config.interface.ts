export interface SegmentedControlConfig {
  name: string;
  active: boolean;
  onClick?: () => any;
}

export type TabType = 'All' | 'Movies' | 'TV Shows';
