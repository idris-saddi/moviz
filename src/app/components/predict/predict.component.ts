import { Component } from '@angular/core';
import { PredictService } from '../../services/predict/predict.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css'],
  standalone: true,
})
export class PredictComponent {
  prediction: any;
  movieData = {
    budget: 50000000,
    imdb_raters: 200000,
    genres_Action: 1,
    genres_Comedy: 0,
    genres_Drama: 0,
    genres_Romance: 1,
    top_Chris_Nolan: 1,
    top_Steven_Spielberg: 0,
    production_companies_Warner_Bros: 1,
    production_companies_Disney: 0,
    years_since_release: 5
  };

  constructor(private predictService: PredictService) {}

  // Call the backend to get prediction
  getMoviePrediction() {
    this.predictService.getPrediction(this.movieData).subscribe((response) => {
      this.prediction = response.prediction;
    });
  }
}
