// src/app/core/services/place.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaceService {
  private apiUrl = 'http://127.0.0.1:8000/api/places/';

  constructor(private http: HttpClient) {}

  // Get token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('access');
  }

  // Build headers with Authorization
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getPlaces(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  createPlace(place: FormData): Observable<any> {
    return this.http.post(this.apiUrl, place, {
      headers: this.getAuthHeaders()
    });
  }

  deletePlace(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, {
      headers: this.getAuthHeaders()
    });
  }
}
