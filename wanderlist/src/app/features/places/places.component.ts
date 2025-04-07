import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../core/services/place.service'; 

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>My Places</h2>
      <input [(ngModel)]="newPlace.name" placeholder="Name">
      <input [(ngModel)]="newPlace.description" placeholder="Description">
      <button (click)="addPlace()">Add</button>

      <div *ngIf="places.length > 0">
        <div *ngFor="let place of placesToShow">
          {{ place.name }} - {{ place.description }}
          <button (click)="removePlace(place.id)">Remove</button>
        </div>

        <button *ngIf="places.length > 3 && !showMore" (click)="showMorePlaces()">Show More</button>
        <button *ngIf="showMore" (click)="showLessPlaces()">Show Less</button>
      </div>
    </div>
  `,
  styles: [` 
    .card { padding: 1rem; background: #fff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
    input { margin: 0.5rem 0; display: block; }
  `]
})
export class PlacesComponent {
  places: Array<{ id: string, name: string, description: string }> = [];
  placesToShow: Array<{ id: string, name: string, description: string }> = [];
  newPlace = { name: '', description: '' };
  showMore = false; 

  constructor(private placeService: PlaceService) {
    this.loadPlaces();
  }

  loadPlaces() {
    this.placeService.getPlaces().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.places = data;
          this.updatePlacesToShow();
        } else {
          console.error('Unexpected data format', data);
        }
      },
      (error) => {
        console.error('Error loading places', error);
      }
    );
  }

  addPlace() {
    this.placeService.createPlace(this.newPlace).subscribe(() => {
      this.loadPlaces();
    });
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

  updatePlacesToShow() {
    if (this.showMore) {
      this.placesToShow = this.places; 
    } else {
      this.placesToShow = this.places.slice(0, 3);
    }
  }
}
