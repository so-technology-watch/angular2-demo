import { AppNotification } from './../../model/app-notification.model';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { Driver } from '../driver.model';
import { Router } from '@angular/router';
import { EmitterService } from '../../services/emitter.service';
import { TransferDriverDataService } from './../services/transferDriverData.service';

@Component({
  selector: 'app-driver-manage',
  templateUrl: './driver-manage.component.html',
  styleUrls: ['./driver-manage.component.css']
})
export class DriverManageComponent implements OnInit, OnChanges {

  @Input() driverToEdit: Driver;
  @Input() listId: string;
  @Input() editing: Boolean;

  notif: AppNotification;

  constructor(
    private _transferDriverData: TransferDriverDataService,
    private _driverService: DriverService,
    private router: Router) { }

  ngOnInit() { }

  // Listen to driverToEdit Input, if true => edit button else add button
  ngOnChanges(...args: any[]) {
    if (this.driverToEdit) {
      this.editing = true;
    } else {
      this.editing = false;
    }
  }

  editDriver = (): void => {
    if (this.driverToEdit) {
      console.log(JSON.stringify(this.driverToEdit));

      // Use driverDataTransfer service to send driver to edit to form component
      this._transferDriverData.setDriver(this.driverToEdit);

      // Navigate to driver form component
      this.router.navigate(['./driver-form']);
    }
  }

  deleteDriver = (): void => {
    if (this.driverToEdit) {
      // Call delete service
      this._driverService.Delete(Number(this.driverToEdit.id)).subscribe(
        result => {
          console.log(result);

          // Notify driver list to refresh
          EmitterService.get(this.listId).emit(result);

          // Setting up the notification to send
          this.notif = {
            type: 'success',
            title: 'Deleted',
            message: 'The driver entry with the id=\'' + this.driverToEdit.id + '\' was deleted successfuly'
          };

          // Notify app component to show the notification
          EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);

          // resetting data
          this.driverToEdit = undefined;
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
        title: 'Driver not selected',
        message: 'You have to select a driver to delete'
      };

      // Notify app component to show the notification
      EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);
    }
  }

}