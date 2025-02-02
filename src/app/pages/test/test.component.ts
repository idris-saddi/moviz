import { Component } from '@angular/core';
import { SegmentedControlComponent } from '../../components/segmented-control/segmented-control.component';
import { InputComponent } from '../../components/input/input.component';
import { RateChipComponent } from '../../components/rate-chip/rate-chip.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { SegmentedControlConfig } from '../../interfaces/ui-configs/segemented-control-config.interface';
import { MovieCardConfig } from '../../interfaces/ui-configs/movie-card-config.interface';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    SegmentedControlComponent,
    InputComponent,
    RateChipComponent,
    MovieCardComponent,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  segments: SegmentedControlConfig[] = [
    {
      name: 'All',
      active: true,
    },
    {
      name: 'Movies',
      active: false,
    },
    {
      name: 'TV Shows',
      active: false,
    },
  ];

  movieCards: MovieCardConfig[] = [
    {
      img: 'https://image.tmdb.org/t/p/w500/39rtdG2QoPIOISmS6KNdJDes8vy.jpg',
      rate: 7.28,
      movieName: 'Bug Array',
    },
  ];
}
