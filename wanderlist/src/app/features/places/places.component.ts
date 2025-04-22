import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../core/services/place.service';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent {
  places: Array<any> = [];
  placesToShow: Array<any> = [];
  showMore = false;
  currentUsername: string = '';
  userId: number | null = null;


  newPlace = {
    title: '',
    description: '',
    country: '',
    city: '',
    is_visited: false,
    image: null as File | null
  };

    constructor(private placeService: PlaceService) {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.user_id;
    }
  
    this.loadPlaces();
  }

  setCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.currentUsername = decoded.username;
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newPlace.image = file;
    }
  }

  addPlace() {
    const formData = new FormData();
    formData.append('title', this.newPlace.title);
    formData.append('description', this.newPlace.description);
    formData.append('country', this.newPlace.country);
    formData.append('city', this.newPlace.city);
    formData.append('is_visited', String(this.newPlace.is_visited));
    if (this.newPlace.image) {
      formData.append('image', this.newPlace.image);
    }

    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.placeService.createPlace(formData, headers).subscribe(
      () => {
        this.resetForm();
        this.loadPlaces();
      },
      error => console.error('Error creating place:', error)
    );
  }

  resetForm() {
    this.newPlace = {
      title: '',
      description: '',
      country: '',
      city: '',
      is_visited: false,
      image: null
    };
  }

  loadPlaces() {
    this.placeService.getPlaces().subscribe(
      (data) => {
        this.places = Array.isArray(data) ? data : [];
        this.updatePlacesToShow();
      },
      (error) => console.error('Error loading places', error)
    );
  }

  removePlace(id: string) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.placeService.deletePlace(id).subscribe(() => this.loadPlaces());
  }

  showMorePlaces() {
    this.showMore = true;
    this.updatePlacesToShow();
  }

  showLessPlaces() {
    this.showMore = false;
    this.updatePlacesToShow();
  }

  updatePlacesToShow() {
    this.placesToShow = this.showMore ? this.places : this.places.slice(0, 3);
  }

  getFullImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `http://127.0.0.1:8000${imagePath}`;
  }

  isOwner(place: any): boolean {
    return place.username === this.currentUsername;
  }
}
