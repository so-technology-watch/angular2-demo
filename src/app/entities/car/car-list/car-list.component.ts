import { PagerService } from './../../../services/pager.service';
import { EmitterService } from './../../../services/emitter.service';
import { NotificationService } from './../../../services/notification.service';
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

  private title = 'List of Cars';
  private isLoading: Boolean = true;

  // pager object
  private pager: any = {};
  // paged items
  private pagedItems: any[];

  constructor(
    private _carService: CarService,
    private _router: Router,
    private _notificationService: NotificationService,
    private pagerService: PagerService) { }

  ngOnInit() { }

  ngOnChanges(...args: any[]) {
    // if we have a list of car, set loading to false, otherwise show loading animation
    if (this.listOfCars) {
      this.isLoading = false;
      // initialize to page 1
      this.setPage(1);
    }
  }

  editCar = (car: Car): void => {
    if (car) {
      // Navigate to car form component
      this.goToCarForm(+car.car_id);
    }
  }

  deleteCar = (carID): void => {
    // Call delete service
    this._carService.delete(+carID).subscribe(
      result => {
        // Notify driver list to refresh
        EmitterService.get(this.listId).emit(result);

        this._notificationService.success(
          'Deleted',
          `The car entry with the id='${carID}' was deleted successfuly`);
      },
      error => {
        console.error(error);
        this._notificationService.error(
          'Error',
          'An error occured when trying to reach the server');
      });
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
