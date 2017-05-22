import { AppNotification } from './../../model/app-notification.model';
import { EmitterService } from './../../services/emitter.service';
import { Car } from './../car.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from './../services/car.service';
import { TransferCarDataService } from './../services/transferCarData.service';
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
  notif: AppNotification;

  constructor(
    private _carService: CarService,
    private _transferCarData: TransferCarDataService,
    private router: Router,
    private _fb: FormBuilder) {

    // Use carDataTransfer service to get car to edit from carManageComponent
    if (this._transferCarData.getCar()) {
      this.carInput = this._transferCarData.getCar();
    }
  }

  ngOnInit() {
    // Form initialize
    // If we have a car
    if (this.carInput) {
      // Initialize Form with Car details
      this.carForm = this._fb.group({
        id: { value: this.carInput.id, disabled: true },
        maker: [this.carInput.maker, Validators.required],
        model: [this.carInput.model, Validators.required],
        year: [this.carInput.year, Validators.compose([Validators.required, Validators.pattern(this.YEAR_REGEX)])],
        driver: [this.carInput.driver, Validators.required]
      });
    } else {
      // Initialize form with empty values
      this.carForm = this._fb.group({
        id: { value: '', disabled: true },
        maker: ['', Validators.required],
        model: ['', Validators.required],
        year: ['', Validators.compose([Validators.required, Validators.pattern(this.YEAR_REGEX)])],
        driver: ['', Validators.required]
      });
    }
  }

  save = () => {
    if (!this.carInput) {
      // If we didn't get a car, call Add function from car service
      console.log('Adding new car');

      this._carService.Add(this.carForm.value).subscribe(
        result => {
          console.log(result);

          // Notify car list to refresh
          EmitterService.get('CAR_COMPONENT_LIST').emit(result);

          // reset form values
          this.resetForm();

          // Navigate back to car list
          this.router.navigate(['./']);

          // Setting up the notification to send
          this.notif = {
            type: 'success',
            title: 'Success',
            message: 'Car added successfuly'
          };

          // Notify app component to show the notification
          EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);
        },
        error => console.log(error));

    } else { // Updating the car, call update function from car service
      console.log('Updating old car \n' + JSON.stringify(<Car>this.carForm.getRawValue()));

      this._carService.Update(Number(this.carInput.id), <Car>this.carForm.getRawValue()).subscribe(
        result => {
          console.log(result);

          // Notify driver list to refresh
          EmitterService.get('CAR_COMPONENT_LIST').emit(result);

          // reset form values
          this.resetForm();

          // Navigate back to car list
          this.router.navigate(['./']);

          // Setting up the notification to send
          this.notif = {
            type: 'success',
            title: 'Success',
            message: 'Car edited successfuly'
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

 // Function to reset form values and carInput data
  resetForm() {
    this.carForm.reset();
    if (this.carInput || this._transferCarData.getCar()) {
      this.carInput = undefined;
      this._transferCarData.setCar(this.carInput);
    }
  }

}