import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  constructor(private httpClient: HttpClient) {}

  httpGet<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${url}`, {
      headers: {
        Authorization: `Bearer ${environment.token}`,
      },
    });
  }
}
