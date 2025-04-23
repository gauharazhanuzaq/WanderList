import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PlaceService {
  private apiUrl = 'http://127.0.0.1:8000/api/places/';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('access');
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getPlaces(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get('http://127.0.0.1:8000/api/places/', { headers });
  }
  

  createPlace(data: FormData, headers: HttpHeaders): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/places/', data, { headers });
  }
  updatePlace(id: string, formData: FormData, headers: HttpHeaders) {
    return this.http.put(`http://127.0.0.1:8000/api/places/${id}/`, formData, { headers });
  }
  
  
  deletePlace(id: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    const url = `http://127.0.0.1:8000/api/places/${id}/`;
    return this.http.delete<any>(url, { headers });
  }
  
  
}
