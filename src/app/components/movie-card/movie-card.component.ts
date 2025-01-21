import { Component, Input, OnInit } from '@angular/core';
import { MovieCardConfig } from '../../interfaces/movie-card-config.interface';
import { RateChipComponent } from '../rate-chip/rate-chip.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RateChipComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  ngOnInit(): void {
  
  }
  @Input() config!: MovieCardConfig;

}
