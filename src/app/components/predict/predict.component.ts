import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PredictService } from '../../services/predict/predict.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class PredictComponent implements OnInit {
  private predictService = inject(PredictService);
  // ====== Fetches the features, to avoid hardcoding them ======
  ngOnInit(): void {
    this.predictService.getFeatures().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  predictionResult = signal<number>(0);
  predictionMessage = computed<string>(() =>
    this.setPredictionMessage(this.predictionResult() as number)
  );
  showModal = false;

  // Define formData with an index signature
  formData: { [key: string]: any } = {
    // Metrics
    'cumulative worldwide': 0,
    'years since release': 0,

    // Ratings (single selection)
    rating: '', // Will store the selected rating (e.g., 'G', 'PG', etc.)

    // Genres (multiple selections)
    Action: 0,
    Adventure: 0,
    Animation: 0,
    Biography: 0,
    Comedy: 0,
    Crime: 0,
    Drama: 0,
    Family: 0,
    Fantasy: 0,
    History: 0,
    Horror: 0,
    Music: 0,
    Musical: 0,
    Mystery: 0,
    Romance: 0,
    'Sci-Fi': 0,
    Sport: 0,
    Thriller: 0,
    War: 0,
    Western: 0,

    // Directors (single selection)
    director: '', // Will store the selected director

    // Stars (multiple selections)
    'Dwayne Johnson': 0,
    'Matthew McConaughey': 0,
    'Kevin Hart': 0,
    'Tom Hanks': 0,
    'Margot Robbie': 0,
    'Samuel L. Jackson': 0,
    'Jake Gyllenhaal': 0,
    'Leonardo DiCaprio': 0,
    'Anna Kendrick': 0,
    'Will Smith': 0,
    'Michael Fassbender': 0,
    'Mark Wahlberg': 0,
    'Ryan Reynolds': 0,
    'Joel Edgerton': 0,
    'Matt Damon': 0,
    'Charlize Theron': 0,
    'Jessica Chastain': 0,
    'Steve Carell': 0,
    'Nicole Kidman': 0,
    'Woody Harrelson': 0,

    // Production Studios (single selection)
    studio: '', // Will store the selected studio
  };

  // Constants for ratings, directors, and studios
  ratings = ['G', 'PG', 'PG-13', 'R', 'TV-MA'];
  directors = [
    'Brad Bird',
    'Christopher Nolan',
    'Clint Eastwood',
    'Denis Villeneuve',
    'Deon Taylor',
    'Martin Scorsese',
    'Paul Feig',
    'Quentin Tarantino',
    'Ron Howard',
    'Steven Spielberg',
  ];
  studios = [
    'Columbia Pictures',
    'Universal Pictures',
    'Warner Bros.',
    'Walt Disney Pictures',
    'Paramount Pictures',
    'New Line Cinema',
    'Twentieth Century Fox',
    'Blumhouse Productions',
    'Summit Entertainment',
    'Perfect World Pictures',
    'TSG Entertainment',
    'Legendary Entertainment',
    'Metro-Goldwyn-Mayer (MGM)',
    'Lionsgate',
    'LStar Capital',
  ];

  onSubmit() {
    // Create a copy of formData to avoid mutating the original
    const payload = { ...this.formData };

    // Convert selected rating to 0 or 1
    this.ratings.forEach((rating) => {
      payload[rating] = payload[rating] === rating ? 1 : 0;
    });

    // Convert selected director to 0 or 1
    this.directors.forEach((director) => {
      payload[director] = payload[director] === director ? 1 : 0;
    });

    // Convert selected studio to 0 or 1
    this.studios.forEach((studio) => {
      payload[studio] = payload[studio] === studio ? 1 : 0;
    });

    // Remove the original selection fields (rating, director, studio) from the payload
    delete payload['rating'];
    delete payload['director'];
    delete payload['studio'];

    // print the payload where values are not zero
    console.log(
      'Payload:',
      Object.entries(payload).filter(([, value]) => value !== 0)
    );

    // Send the payload to the API
    this.predictService.getPrediction(payload).subscribe((response) => {
      this.predictionResult.set(response.prediction);
      this.showModal = true;
      // reset this form data
      for (const k in this.formData) {
        this.formData[k] = 0;
      }
    });
  }

  // Handle change events
  // onChange(key: string, event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   if (target.type === 'checkbox') {
  //     this.formData[key] = target.checked ? 1 : 0;
  //   } else if (target.type === 'radio') {
  //     for (const k in this.formData) {
  //       this.formData[k] = 0;
  //     }
  //     this.formData[key] = target.value;
  //   } else {
  //     this.formData[key] = +target.value; // Convert to number
  //   }
  //   console.log(`Updated ${key}:`, this.formData[key]);
  // }

  // Set prediction message based on the prediction result
  setPredictionMessage(prediction: number): string {
    console.log('prediction: ' + prediction);
    prediction = Number(prediction);
    switch (prediction) {
      case 0:
        return '';
      case 1:
        return 'The movie is predicted to be a flop (IMDb rating between 0 and 4).';
      case 2:
        return 'The movie is predicted to be average (IMDb rating between 4 and 7).';
      case 3:
        return 'The movie is predicted to be a hit (IMDb rating between 7 and 10).';
      default:
        return 'Invalid prediction result.';
    }
  }
  closeModal() {
    this.showModal = false;
  }
}
