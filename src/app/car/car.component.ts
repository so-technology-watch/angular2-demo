import { CarService } from './services/car.service';
import { Car } from './car.model';
import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [CarService]
})
export class CarComponent implements OnInit {

  private listOfcars: Car[];

  // Car list Event tracking ID
  private listId = 'CAR_COMPONENT_LIST';

  constructor(private _carService: CarService) { }

  ngOnInit() {
    // On init get all Cars
    this.getAllCars();

    // Listen to the 'list' emitted event so as populate the model with the event payload
    // Refresh car list
    EmitterService.get(this.listId).subscribe((data: Car[]) => { this.getAllCars(); });
  }

  // Function calling the service carService to get the list of cars
  getAllCars = (): void => {
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
