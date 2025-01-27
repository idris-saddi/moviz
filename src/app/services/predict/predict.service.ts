import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  private apiUrl = environment.predictAPI;

  constructor(private http: HttpClient) { }

  // Method to send data to the backend and receive the prediction
  getPrediction(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    );
  }
}
