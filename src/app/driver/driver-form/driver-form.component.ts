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

  // Regex for model year, only digits and length = 4
  readonly YEAR_REGEX = /^[0-9]{4}$/;

  private driverInput: Driver;
  driverForm: FormGroup;

  constructor(
    // private _notificationsService: NotificationsService,
    private _driverService: DriverService,
    private _transferDriverData: TransferDriverDataService,
    private router: Router,
    private _fb: FormBuilder) {

    if (this._transferDriverData.getDriver()) {
      this.driverInput = this._transferDriverData.getDriver();
    }
  }

  ngOnInit() {
    // Form initialize
    if (this.driverInput) {
      // Initialize Form with Driver details
      this.driverForm = this._fb.group({
        id: { value: this.driverInput.id, disabled: true },
        firstName: [this.driverInput.firstName, Validators.required],
        lastName: [this.driverInput.lastName, Validators.required],
        car: [this.driverInput.car, Validators.required]
      });
    } else {
      this.driverForm = this._fb.group({
        id: { value: '', disabled: true },
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        car: ['', Validators.required]
      });
    }
  }

  ngOnChanges(...args: any[]) { }

  save() {
    if (!this.driverInput) {
      console.log('Adding new driver');

      this._driverService.Add(this.driverForm.value).subscribe(
        result => {
          console.log(result);
          EmitterService.get('DRIVER_COMPONENT_LIST').emit(result);
        },
        error => console.log(error));

      this.resetForm();
      this.router.navigate(['./driver']);

    } else {
      console.log('Updating old driver');

      this._driverService.Update(<Driver>this.driverForm.getRawValue()).subscribe(
        result => {
          console.log(result);
          EmitterService.get('DRIVER_COMPONENT_LIST').emit(result);
        },
        error => console.log(error));

      this.resetForm();
      this.router.navigate(['./driver']);
    }
   }

  resetForm() {
    this.driverForm.reset();
    if (this.driverInput) {
      this.driverInput = undefined;
    }
  }
}