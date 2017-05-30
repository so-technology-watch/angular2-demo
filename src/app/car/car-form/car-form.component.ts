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

  private carInput: Car;
  carForm: FormGroup;

  private id: number;

  constructor(
    private _carService: CarService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this.id = +this._route.snapshot.params['id'];
    this.formInitialize(this.id);
  }

  /**
   * Function to initialize form values:
   * If we have an :id parameter sent to the component, the form
   * will initialize values with the data of the object we got from
   * the service carService.getSingle().
   * Otherwise, we initialize an empty form
   */
  formInitialize = (id: number) => {
    // Initialize form with empty values
    this.emptyForm();

    // If we have an id, get the car and fill the form with its values
    if (id) {
      this._carService.getSingle(id)
        .subscribe((car: Car) => {
          this.carInput = car;
          this.formWithCarDetails(this.carInput);
        },
        error => {
          this._notificationService.error('Car not found', 'Couldn\'t find the car with the given id');
        });
    }
  }

  emptyForm = () => {
    // Initialize form with empty values
    this.carForm = this._fb.group({
      id: { value: '', disabled: true },
      maker: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.compose([Validators.required, Validators.pattern(this.YEAR_REGEX)])],
      driver: ['', Validators.required]
    });
  }

  formWithCarDetails = (car: Car) => {
    // Initialize Form with Car details
    this.carForm = this._fb.group({
      id: { value: car.id, disabled: true },
      maker: [car.maker, Validators.required],
      model: [car.model, Validators.required],
      year: [car.year, Validators.compose([Validators.required, Validators.pattern(this.YEAR_REGEX)])],
      driver: [car.driver, Validators.required]
    });
  }

  save = () => {
    if (!this.carInput) {
      // If we didn't get a car, call Add function from car service
      this.add();
    } else {
      this.update();
    }
  }

  /**
   * Call CarService with add (POST) method
   * TODO:
   * - if success ? what to do
   */
  add = () => {
    this._carService.add(this.carForm.value).subscribe(
      result => this._notificationService.success('Success', 'Car added successfuly'),
      error => {
        console.error(error);
        this._notificationService.error('Error', 'An error occured when trying to reach the server');
      });
  }

  /**
   * Call CarService with update (PUT) method
   * TODO:
   * - if success ? what to do
   */
  update = () => {
    this._carService.update(+this.carInput.id, <Car>this.carForm.getRawValue()).subscribe(
      result => this._notificationService.success('Success', 'Car edited successfuly'),
      error => {
        console.error(error);
        this._notificationService.error('Error', 'An error occured when trying to reach the server');
      });
  }

  // Function to reset form values and carInput data
  resetForm() {
    this.carForm.reset();
  }
}
