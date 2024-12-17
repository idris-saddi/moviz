import { Component, Input, Output } from '@angular/core';
import { RateChipComponent } from '../rate-chip/rate-chip.component';
import { MovieCardConfig } from '../../interfaces/movie-card-config.interface';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RateChipComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() config!: MovieCardConfig;
}
