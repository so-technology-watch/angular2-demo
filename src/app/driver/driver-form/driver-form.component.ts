import { AppNotification } from './../../model/app-notification.model';
import { TransferDriverDataService } from './../services/transferDriverData.service';
import { DriverService } from '../services/driver.service';
import { EmitterService } from './../../services/emitter.service';
import { Driver } from './../driver.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit {

  private driverInput: Driver;
  driverForm: FormGroup;
  notif: AppNotification;

  constructor(
    private _driverService: DriverService,
    private _transferDriverData: TransferDriverDataService,
    private router: Router,
    private _fb: FormBuilder) {

    // Use driverDataTransfer service to get driver to edit from driverManageComponent
    if (this._transferDriverData.getDriver()) {
      this.driverInput = this._transferDriverData.getDriver();
    }
  }

  ngOnInit() {
    // Form initialize
    // If we have a driver
    if (this.driverInput) {
      // Initialize Form with Driver details
      this.driverForm = this._fb.group({
        id: { value: this.driverInput.id, disabled: true },
        firstName: [this.driverInput.firstName, Validators.required],
        lastName: [this.driverInput.lastName, Validators.required],
        car: [this.driverInput.car, Validators.required]
      });
    } else {
      // Initialize form with empty values
      this.driverForm = this._fb.group({
        id: { value: '', disabled: true },
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        car: ['', Validators.required]
      });
    }
  }

  save = () => {
    // If we didn't get a driver, call Add function from driver service
    if (!this.driverInput) {
      console.log('Adding new driver');

      this._driverService.Add(this.driverForm.value).subscribe(
        result => {
          console.log(result);

          // Notify driver list to refresh
          EmitterService.get('DRIVER_COMPONENT_LIST').emit(result);

          // reset form values
          this.resetForm();

          // Navigate back to driver list
          this.router.navigate(['./driver']);

          // Setting up the notification to send
          this.notif = {
            type: 'success',
            title: 'Success',
            message: 'Driver added successfuly'
          };

          // Notify app component to show the notification
          EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);
        },
        error => console.log(error));

    } else { // Updating the driver, call update function from driver service
      console.log('Updating old driver');

      this._driverService.Update(Number(this.driverInput.id), <Driver>this.driverForm.getRawValue()).subscribe(
        result => {
          console.log(result);

          // Notify driver list to refresh
          EmitterService.get('DRIVER_COMPONENT_LIST').emit(result);

          // reset form values
          this.resetForm();

          // Navigate back to driver list
          this.router.navigate(['./driver']);

          // Setting up the notification to send
          this.notif = {
            type: 'success',
            title: 'Success',
            message: 'Driver edited successfuly'
          };

          // Notify app component to show the notification
          EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);
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
    }
  }

  // Function to reset form values and driverInput data
  resetForm = () => {
    this.driverForm.reset();
    if (this.driverInput || this._transferDriverData.getDriver()) {
      this.driverInput = undefined;
      this._transferDriverData.setDriver(this.driverInput);
    }
  }
}