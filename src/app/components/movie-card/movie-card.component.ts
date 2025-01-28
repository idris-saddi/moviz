import { Component, Input, OnInit } from '@angular/core';
import { RateChipComponent } from '../rate-chip/rate-chip.component';
import { MovieCardConfig } from '../../interfaces/ui-configs/movie-card-config.interface';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RateChipComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  ngOnInit(): void {}
  @Input() config!: MovieCardConfig;
}
