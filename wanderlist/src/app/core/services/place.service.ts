// src/app/core/services/place.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaceService {
  constructor(private http: HttpClient) {}

  getPlaces(): Observable<any[]> {
    return this.http.get<any[]>('/api/places'); 
  }

  createPlace(place: any): Observable<any> {
    return this.http.post('/api/places', place); 
  }

  deletePlace(id: string): Observable<any> {
    return this.http.delete(`/api/places/${id}`);
  }
}
