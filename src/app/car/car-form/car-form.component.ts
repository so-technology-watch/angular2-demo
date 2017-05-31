import { NotificationService } from './../../services/notification.service';
import { EmitterService } from './../../services/emitter.service';
import { Car } from './../car.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CarService } from './../services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  // Regex for model year, only digits and length = 4
  readonly YEAR_REGEX = /^[0-9]{4}$/;

  private title = 'Car Form';
  private car: Car;
  private form: FormGroup;
  private id: number;

  constructor(
    private _carService: CarService,
    private _route: ActivatedRoute,
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

  getNewForm = (car?: Car) => {
    return {
      car_id: [{
        value: (car ? car.car_id : ''),
        disabled: true
      }],
      car_maker: [
        (car ? car.car_maker : ''),
        Validators.required
      ],
      car_model: [
        (car ? car.car_model : ''),
        Validators.required
      ],
      car_year: [
        (car ? car.car_year : ''),
        Validators.compose([Validators.required, Validators.pattern(this.YEAR_REGEX)])
      ]
    };
  }

  load = () => {
    this._carService.getSingle(this.id)
        .subscribe((car: Car) => {
          this.car = car;
          this.form = this._formBuilder.group(this.getNewForm(car));
        },
        error => this._notificationService.error('Car not found', 'Couldn\'t find the car with the given id'));
  }

  save = () => {
    if (!this.car) {
      this.add();
    } else {
      this.update();
    }
  }

  add = () => {
    this._carService.add(this.form.value).subscribe(
      result => this._notificationService.success('Success', 'Car added successfuly'),
      error => this._notificationService.error('Error', 'An error occured when trying to reach the server')
    );
  }

  update = () => {
    this._carService.update(+this.car.car_id, <Car>this.form.getRawValue()).subscribe(
      result => this._notificationService.success('Success', 'Car edited successfuly'),
      error => this._notificationService.error('Error', 'An error occured when trying to reach the server')
    );
  }

}
