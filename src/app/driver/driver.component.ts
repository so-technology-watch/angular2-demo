import { EmitterService } from './../services/emitter.service';
import { DriverService } from './driver.service';
import { Driver } from './driver.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  private listOfDrivers: Driver[];

  // Event tracking properties
  private listId = 'DRIVER_COMPONENT_LIST';

  constructor(private _driverService: DriverService) { }

  ngOnInit() {
    this.getAllDrivers();

    // Listen to the 'list'emitted event so as populate the model with the event payload
    EmitterService.get(this.listId).subscribe((data: Driver[]) => { this.getAllDrivers(); });
  }

  // Function calling the service carService to get the list of cars
  getAllDrivers(): void {
    this._driverService.GetAll().subscribe(
      (data: Driver[]) => {
        this.listOfDrivers = data;
      },
      error => {
        console.log(error);
      },
      () => console.log(JSON.stringify(this.listOfDrivers)));
  }
}
