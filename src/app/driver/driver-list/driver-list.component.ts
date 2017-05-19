import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Driver } from '../driver.model';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  @Input() listOfDrivers: Driver[];
  @Input() listId: string;
  isLoading: Boolean = true;

  selectedDriver: Driver;
  setDriverToEdit: Function;
  editing: Boolean = false;

  constructor() {

    this.setDriverToEdit = function (index, driver: Driver) {
      if (this.selectedRow !== index) {
        this.selectedRow = index;
        console.log(JSON.stringify(driver));
        this.selectedDriver = driver;
        this.editing = true;
      } else {
        this.selectedRow = undefined;
        driver = undefined;
        console.log(JSON.stringify(driver));
        this.selectedDriver = driver;
        this.editing = false;
      }
    }
  }

  ngOnInit() {
    this.selectedDriver = undefined;
   }

  ngOnChanges(...args: any[]) {

    if (this.listOfDrivers) {
      this.isLoading = false;
    }
  }

}