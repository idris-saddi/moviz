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
  formData: { [key: string]: any } = {};
  genres: string[] = [];
  stars: string[] = [];
  ratings: string[] = [];
  directors: string[] = [];
  studios: string[] = [];

  ngOnInit(): void {
    this.predictService.getFeatures().subscribe({
      next: (res) => {
        console.log(res);
        Object.entries(res.features).forEach(([category, values]) => {
          if (Array.isArray(values)) {
            values.forEach((value) => {
              if (value.trim()) {
                const key = category === 'numerical' ? value : `${category}_${value}`;
                this.formData[key] = 0;
              }
            });
            if (category === 'stars') this.stars=values;
            if (category === 'genres') this.genres=values;
            if (category === 'ratings') this.ratings = values;
            if (category === 'director') this.directors = values.filter(v => v.trim());
            if (category === 'production companies') this.studios = values;
          }
        });
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
