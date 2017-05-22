import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Driver } from '../driver.model';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit, OnChanges {

  @Input() listOfDrivers: Driver[];
  @Input() listId: string;

  isLoading: Boolean = true;
  selectedDriver: Driver;
  setDriverToEdit: Function;
  editing: Boolean = false;

  constructor() {
    // Function to select the driver to edit from the table
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
    // if we have a list of driver, set loading to false, otherwise show loading animation
    if (this.listOfDrivers) {
      this.isLoading = false;
    }
  }

}