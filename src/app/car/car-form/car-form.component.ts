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
    // private _notificationsService: NotificationsService,
    private _carService: CarService,
    private _transferCarData: TransferCarDataService,
    private router: Router,
    private _fb: FormBuilder) {

    if (this._transferCarData.getCar()) {
      this.carInput = this._transferCarData.getCar();
    }
  }

  ngOnInit() {
    // Form initialize
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
      this.carForm = this._fb.group({
        id: { value: '', disabled: true },
        maker: ['', Validators.required],
        model: ['', Validators.required],
        year: ['', Validators.compose([Validators.required, Validators.pattern(this.YEAR_REGEX)])],
        driver: ['', Validators.required]
      });
    }
  }

  ngOnChanges(...args: any[]) { }

  save() {
    if (!this.carInput) {
      console.log('Adding new car');

      this._carService.Add(this.carForm.value).subscribe(
        result => {
          console.log(result);
          EmitterService.get('CAR_COMPONENT_LIST').emit(result);

          this.resetForm();
          this.router.navigate(['./']);

          // Setting up the notification to send
          this.notif = {
            type: 'success',
            title: 'Success',
            message: 'Car added successfuly'
          };

          EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);
        },
        error => console.log(error));

    } else {
      console.log('Updating old car \n' + JSON.stringify(<Car>this.carForm.getRawValue()));

      this._carService.Update(Number(this.carInput.id), <Car>this.carForm.getRawValue()).subscribe(
        result => {
          console.log(result);
          EmitterService.get('CAR_COMPONENT_LIST').emit(result);

          this.resetForm();
          this.router.navigate(['./']);

          // Setting up the notification to send
          this.notif = {
            type: 'success',
            title: 'Success',
            message: 'Car edited successfuly'
          };

          EmitterService.get('MAIN_NOTIFICATION').emit(this.notif);
        },
        error => console.log(error));
    }
  }

  resetForm() {
    this.carForm.reset();
    if (this.carInput || this._transferCarData.getCar()) {
      this.carInput = undefined;
      this._transferCarData.setCar(this.carInput);
    }
  }

}