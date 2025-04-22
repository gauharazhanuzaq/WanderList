import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../core/services/place.service';

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

  newPlace = {
    title: '',
    description: '',
    country: '',
    city: '',
    is_visited: false,
    image: null as File | null
  };

  constructor(private placeService: PlaceService) {
    this.loadPlaces();
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

    this.placeService.createPlace(formData).subscribe(() => {
      this.resetForm();
      this.loadPlaces();
    });
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
}
