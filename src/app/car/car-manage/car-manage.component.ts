import { AppNotification } from './../../model/app-notification.model';
import { TransferCarDataService } from './../services/transferCarData.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { CarService } from '../services/car.service';
import { EmitterService } from '../../services/emitter.service';
import { Router } from '@angular/router';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-manage',
  templateUrl: './car-manage.component.html',
  styleUrls: ['./car-manage.component.css']
})
export class CarManageComponent implements OnInit, OnChanges {

  @Input() carToEdit: Car;
  @Input() listId: string;
  @Input() editing: Boolean;

  notif: AppNotification;

  constructor(
    private _transferCarData: TransferCarDataService,
    private _carService: CarService,
    private router: Router) { }

  ngOnInit() { }

  // Listen to carToEdit Input, if true => edit button else add button
  ngOnChanges(...args: any[]) {
    if (this.carToEdit) {
      this.editing = true;
    } else {
      this.editing = false;
    }
  }

  editCar = (): void => {
    if (this.carToEdit) {
      console.log(JSON.stringify(this.carToEdit));

      // Use carDataTransfer service to send car to edit to form component
      this._transferCarData.setCar(this.carToEdit);

      // Navigate to car form component
      this.router.navigate(['./car-form']);
    }
  }

  deleteCar = (): void => {
    if (this.carToEdit) {
      // Call delete service
      this._carService.Delete(Number(this.carToEdit.id)).subscribe(
        result => {
          console.log(result);

          // Notify driver list to refresh
          EmitterService.get(this.listId).emit(result);

          // Setting up the notification to send
          this.notif = {
            type: 'success',
            title: 'Deleted',
            message: 'The car entry with the id=\'' + this.carToEdit.id + '\' was deleted successfuly'
          };

          // Notify app component to show the notification
          EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);

          // resetting data
          this.carToEdit = undefined;
          this.editing = false;
        },
        error => {
          console.log(error);

          // Setting up the notification to send
          this.notif = {
            type: 'error',
            title: 'Error',
            message: 'An error occured when trying to reach the server'
          };

          // Notify app component to show the notification
          EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);
        });
    } else {
      // Setting up the notification to send
      this.notif = {
        type: 'error',
        title: 'Car not selected',
        message: 'You have to select a car to delete'
      };

      EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);
    }
  }
}
