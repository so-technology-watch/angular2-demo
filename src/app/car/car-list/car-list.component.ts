import { PagerService } from './../../services/pager.service';
import { EmitterService } from './../../services/emitter.service';
import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { CarService } from './../services/car.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnChanges {

  @Input() listOfCars: Car[];
  @Input() listId: string;

  isLoading: Boolean = true;
  selectedCar: Car;
  setCarToEdit: Function;
  editing: Boolean = false;

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private _carService: CarService,
    private _router: Router,
    private _notificationService: NotificationService,
    private pagerService: PagerService) {

    // Function to select the car to edit from the table
    this.setCarToEdit = function (index, car: Car) {
      if (this.selectedRow !== index) {
        this.selectedRow = index;
        console.log(JSON.stringify(car));
        this.selectedCar = car;
        this.editing = true;
      } else {
        this.selectedRow = undefined;
        car = undefined;
        console.log(JSON.stringify(car));
        this.selectedCar = car;
        this.editing = false;
      }
    };
  }

  ngOnInit() {
    this.selectedCar = undefined;
  }

  ngOnChanges(...args: any[]) {
    // if we have a list of car, set loading to false, otherwise show loading animation
    if (this.listOfCars) {
      this.isLoading = false;
      // initialize to page 1
      this.setPage(1);
    }
  }

  editCar = (): void => {
    if (this.selectedCar) {
      // Navigate to car form component
      this.goToCarForm(+this.selectedCar.id);
    }
  }

  deleteCar = (): void => {
    if (!this.selectedCar) {
      this._notificationService.error('Car not selected', 'You have to select a car to delete');
      return;
    } else {
      // Call delete service
      this._carService.delete(+this.selectedCar.id).subscribe(
        result => {
          // Notify driver list to refresh
          EmitterService.get(this.listId).emit(result);

          this._notificationService.success(
            'Deleted',
            `The car entry with the id='${this.selectedCar.id}' was deleted successfuly`);

          // resetting data
          this.selectedCar = undefined;
          this.editing = false;
        },
        error => {
          console.error(error);
          this._notificationService.error(
            'Error',
            'An error occured when trying to reach the server');
        });
    }
  }

  goToCarForm(id: number) {
    this._router.navigate(['./car-form', id]);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.listOfCars.length, page);

    // get current page of items
    this.pagedItems = this.listOfCars.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
