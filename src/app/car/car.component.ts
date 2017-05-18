import { Observable } from 'rxjs/Observable';
import { CarService } from './car.service';
import { Car } from './car.model';
import 'rxjs/add/observable/timer';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [CarService]
})
export class CarComponent implements OnInit, OnChanges {

  private listOfcars: Car[];

  // Event tracking properties
  private listId = 'CAR_COMPONENT_LIST';

  constructor(private _carService: CarService) { }

  ngOnInit() {
    this.getAllCars();

    // Listen to the 'list'emitted event so as populate the model with the event payload
    EmitterService.get(this.listId).subscribe((data: Car[]) => { this.getAllCars(); });
  }

  ngOnChanges(changes: any) { }

  // Function calling the service carService to get the list of cars
  getAllCars(): void {
    this._carService.GetAll().subscribe(
      (data: Car[]) => {
        this.listOfcars = data;
      },
      error => {
        console.log(error);
      },
      () => console.log(JSON.stringify(this.listOfcars)));
  }
}
