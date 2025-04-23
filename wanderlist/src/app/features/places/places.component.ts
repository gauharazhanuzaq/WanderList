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
  searchTerm: string = '';
  filterCountry: string = '';
  filterCategory: string = '';
  filterStatus: string = ''; // 'all', 'planned', 'visited'
  sortOption: string = 'date'; // 'date', 'popularity', 'rating'
  
  showForm: boolean = false;  

  constructor(private placeService: PlaceService) {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.user_id;
    }

    this.setCurrentUser();
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

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
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

    this.placeService.createPlace(formData, this.getAuthHeaders()).subscribe(
      () => {
        this.resetForm();
        this.loadPlaces();
      },
      error => console.error('Error creating place:', error)
    );
  }
  updatePlacesToShow() {
    let filtered = [...this.places];
  
    // Поиск по названию, стране, категории
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(place =>
        place.title.toLowerCase().includes(term) ||
        place.country.toLowerCase().includes(term) ||
        (place.category && place.category.toLowerCase().includes(term))
      );
    }
  
    // Фильтрация по статусу
    if (this.filterStatus === 'planned') {
      filtered = filtered.filter(place => !place.is_visited);
    } else if (this.filterStatus === 'visited') {
      filtered = filtered.filter(place => place.is_visited);
    }
  
    // Сортировка
    switch (this.sortOption) {
      case 'popularity':
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // 'date'
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }
  
    this.placesToShow = this.showMore ? filtered : filtered.slice(0, 3);
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
        this.places = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          : [];
        this.updatePlacesToShow();
      },
      (error) => console.error('Error loading places', error)
    );
  }

  removePlace(id: string) {
    this.placeService.deletePlace(id).subscribe(() => {
      this.loadPlaces(); 
    });
  }

  showMorePlaces() {
    this.showMore = true;
    this.updatePlacesToShow();
  }

  showLessPlaces() {
    this.showMore = false;
    this.updatePlacesToShow();
  }

  getFullImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    return imagePath.startsWith('http') ? imagePath : `http://127.0.0.1:8000${imagePath}`;
  }

  isOwner(place: any): boolean {
    return place.user === this.userId;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
