import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnChanges {

  @Input() listOfCars: Car[];
  @Input() listId: string;

  isLoading: Boolean = true;
  selectedCar: Car;
  setCarToEdit: Function;
  editing: Boolean = false;

  constructor() {
    this.setCarToEdit = function (index, car: Car) {
      if (this.selectedRow !== index) {
        this.selectedRow = index;
        console.log(JSON.stringify(car));
        this.selectedCar = car;
        this.editing = true;
      } else {
        this.selectedRow = undefined;
        car = undefined;
        console.log(JSON.stringify(car));
        this.selectedCar = car;
        this.editing = false;
      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges(...args: any[]) {
    if (this.listOfCars) {
      this.isLoading = false;
    }
  }

}