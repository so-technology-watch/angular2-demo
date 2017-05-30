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

  private driverInput: Driver;
  driverForm: FormGroup;

  private id: number;

  constructor(
    private _driverService: DriverService,
    private _route: ActivatedRoute,
    private _router: Router,
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
   * the service driverService.getSingle().
   * Otherwise, we initialize an empty form
   */
  formInitialize = (id: number) => {
    // Initialize form with empty values
    this.emptyForm();

    if (id) {
      this._driverService.getSingle(+this._route.snapshot.paramMap.get('id'))
        .subscribe((driver: Driver) => {
          this.driverInput = driver;
          this.formWithDriverDetails(this.driverInput);
        },
        error => {
          this._notificationService.error('Driver not found', 'Couldn\'t find the driver with the given id');
        });
    }
  }

  emptyForm = () => {
    // Initialize form with empty values
    this.driverForm = this._fb.group({
      id: { value: '', disabled: true },
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      car: ['', Validators.required]
    });
  }

  formWithDriverDetails = (driver: Driver) => {
    // Initialize Form with Driver details
    this.driverForm = this._fb.group({
      id: { value: driver.id, disabled: true },
      firstName: [driver.firstName, Validators.required],
      lastName: [driver.lastName, Validators.required],
      car: [driver.car, Validators.required]
    });
  }

  save = () => {
    // If we didn't get a driver, we are adding a driver
    if (!this.driverInput) {
      this.add();
    } else { // If we didn't get a driver, we are adding a driver
      this.update();
    }
  }

  /**
   * Call DriverService with add (POST) method
   * TODO:
   * - if success ? what to do
   */
  add = () => {
    this._driverService.add(this.driverForm.value).subscribe(
      result => this._notificationService.success('Success', 'Driver added successfuly'),
      error => {
        console.error(error);
        this._notificationService.error('Error', 'An error occured when trying to reach the server');
      });
  }

  /**
   * Call DriverService with update (PUT) method
   * TODO:
   * - if success ? what to do
   */
  update = () => {
    this._driverService.update(+this.driverInput.id, <Driver>this.driverForm.getRawValue()).subscribe(
      result => this._notificationService.success('Success', 'Driver edited successfuly'),
      error => {
        console.error(error);
        this._notificationService.error('Error', 'An error occured when trying to reach the server');
      });
  }

  // Function to reset form values and driverInput data
  resetForm = () => {
    // this.driverForm.reset();
    this.goToForm();
  }

  goToForm() {
    this._router.navigate(['./driver-form']);
  }
}
