import { NotificationService } from './../../services/notification.service';
import { DriverService } from '../services/driver.service';
import { EmitterService } from './../../services/emitter.service';
import { Driver } from './../driver.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit {

  private driver: Driver;
  private form: FormGroup;
  private id: number;

  constructor(
    private _driverService: DriverService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService) { }

  ngOnInit() {

    this.getIdFromRouteParams();
    this.initForm();
  }

  getIdFromRouteParams = () => {
    this.id = this._route.snapshot.params['id'];
    if (typeof this.id === 'string') {
      this.id = +this.id;
    }
  }

  initForm = () => {
    this.form = this._formBuilder.group(this.getNewForm());
    if (this.id) {
      this.load();
    }
  }

  getNewForm = (driver?: Driver) => {
    return {
      id: [{
        value: (driver ? driver.id : ''),
        disabled: true
      }],
      firstName: [
        (driver ? driver.firstName : ''),
        Validators.required
      ],
      lastName: [
        (driver ? driver.lastName : ''),
        Validators.required
      ],
      car: [
        (driver ? driver.car : ''),
        Validators.required
      ]
    };
  }

  load = () => {
    this._driverService.getSingle(+this._route.snapshot.paramMap.get('id'))
        .subscribe((driver: Driver) => {
          this.driver = driver;
          this.form = this._formBuilder.group(this.getNewForm(driver));
        },
        error => this._notificationService.error('Driver not found', 'Couldn\'t find the driver with the given id'));
  }

  save = () => {
    // If we didn't get a driver, we are adding a driver
    if (!this.driver) {
      this.add();
    } else { // If we didn't get a driver, we are adding a driver
      this.update();
    }
  }

  add = () => {
    this._driverService.add(this.form.value).subscribe(
      result => this._notificationService.success('Success', 'Driver added successfuly'),
      error => {
        console.error(error);
        this._notificationService.error('Error', 'An error occured when trying to reach the server');
      });
  }

  update = () => {
    this._driverService.update(+this.driver.id, <Driver>this.form.getRawValue()).subscribe(
      result => this._notificationService.success('Success', 'Driver edited successfuly'),
      error => {
        console.error(error);
        this._notificationService.error('Error', 'An error occured when trying to reach the server');
      });
  }
}
