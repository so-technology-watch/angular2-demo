// import { Component, OnInit, OnChanges } from '@angular/core';
// import { Router } from '@angular/router';
// import { Car } from './../models/car';
// import { NotificationsService } from 'angular2-notifications';
// import { CarService } from '../services/car.service';
// import { RouterDataLinkService } from '../services/routerDataLink.service';
// import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
// import { routerTransition } from '../animations/router.animations';
// import { EmitterService } from '../services/emitter.service';

// @Component({
//   selector: 'app-add-edit-form',
//   templateUrl: './add-edit-form.component.html',
//   styleUrls: ['./add-edit-form.component.css'],
//   animations: [routerTransition()],
//   host: { '[@routerTransition]': '' }
// })
// export class AddEditFormComponent implements OnInit, OnChanges {

//   // Regex for model year, only digits and length = 4
//   readonly YEAR_REGEX = /^[0-9]{4}$/;

//   private carInput: Car;
//   dataForm: FormGroup;

//   constructor(
//     private _notificationsService: NotificationsService,
//     private _carService: CarService,
//     private _routerService: RouterDataLinkService,
//     private router: Router,
//     private _fb: FormBuilder) {

//     if (this._routerService.getCar()) {
//       this.carInput = this._routerService.getCar();
//     }
//   }

//   ngOnInit() {
//     // Form initialize
//     if (this.carInput) {
//       // Initialize Form with Car details
//       this.dataForm = this._fb.group({
//         id: { value: this.carInput.id, disabled: true },
//         maker: [this.carInput.maker, Validators.required],
//         model: [this.carInput.model, Validators.required],
//         year: [this.carInput.year, Validators.compose([Validators.required, Validators.pattern(this.YEAR_REGEX)])],
//         driver: [this.carInput.driver, Validators.required]
//       });
//     } else {
//       this.dataForm = this._fb.group({
//         id: { value: '', disabled: true },
//         maker: ['', Validators.required],
//         model: ['', Validators.required],
//         year: ['', Validators.compose([Validators.required, Validators.pattern(this.YEAR_REGEX)])],
//         driver: ['', Validators.required]
//       });
//     }
//   }

//   ngOnChanges(...args: any[]) { }

//   save() {
//     if (!this.carInput) {
//       console.log('Adding new car');

//       this._carService.Add(this.dataForm.value).subscribe(
//         result => {
//           console.log(result);
//           EmitterService.get('CAR_COMPONENT_LIST').emit(result);
//         },
//         error => console.log(error));

//       this.resetForm();
//       this.router.navigate(['./']);

//     } else {
//       console.log('Updating old car');

//       this._carService.Update(<Car>this.dataForm.getRawValue()).subscribe(
//         result => {
//           console.log(result);
//           EmitterService.get('CAR_COMPONENT_LIST').emit(result);
//         },
//         error => console.log(error));

//       this.resetForm();
//       this.router.navigate(['./']);
//     }
//    }

//   resetForm() {
//     this.dataForm.reset();
//     if (this.carInput) {
//       this.carInput = undefined;
//     }
//   }
// }
