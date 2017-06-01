import { Car } from './../../car/car.model';
import { CarService } from './../../car/services/car.service';
import { NotificationService } from './../../../services/notification.service';
import { DriverService } from '../services/driver.service';
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

  private title = 'Driver Form';
  private driver: Driver;
  private form: FormGroup;
  private id: number;

  // Car Select
  private carsData: Car[];
  private selectedCarId: number;

  constructor(
    private _driverService: DriverService,
    private _carService: CarService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService) { }

  ngOnInit() {

    this.getIdFromRouteParams();
    this.fetchCars();
    this.initForm();
  }

  getIdFromRouteParams = () => {
    this.id = this._route.snapshot.params['id'];
    if (typeof this.id === 'string') {
      this.id = +this.id;
    }
  }

  fetchCars = () => {
    this._carService.getAll().subscribe(
      (data: Car[]) => this.carsData = data,
      error => console.error(error));
  }

  initForm = () => {
    this.form = this._formBuilder.group(this.getNewForm());
    if (this.id) {
      this.load();
    }
  }

  getNewForm = (driver?: Driver) => {
    return {
      driver_id: [{
        value: (driver ? driver.driver_id : ''),
        disabled: true
      }],
      driver_firstName: [
        (driver ? driver.driver_firstName : ''),
        Validators.required
      ],
      driver_lastName: [
        (driver ? driver.driver_lastName : ''),
        Validators.required
      ],
      driver_car: [
        (driver ? driver.driver_car : ''),
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
    this._driverService.add(this.form.value)
    .subscribe(
      response => {
        this._notificationService.success('Success', 'Driver added successfuly');
        this._router.navigate(['./driver-form', response.driver_id]);
      },
      error => {
        console.error(error);
        this._notificationService.error('Error', 'An error occured when trying to reach the server');
      });
  }

  update = () => {
    this._driverService.update(+this.driver.driver_id, <Driver>this.form.getRawValue()).subscribe(
      result => this._notificationService.success('Success', 'Driver edited successfuly'),
      error => {
        console.error(error);
        this._notificationService.error('Error', 'An error occured when trying to reach the server');
      });
  }
}
