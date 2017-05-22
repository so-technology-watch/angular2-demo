import { EmitterService } from './../services/emitter.service';
import { DriverService } from './services/driver.service';
import { Driver } from './driver.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  private listOfDrivers: Driver[];

  // Driver list Event tracking ID
  private listId = 'DRIVER_COMPONENT_LIST';

  constructor(private _driverService: DriverService) { }

  ngOnInit() {
    // On init get all drivers
    this.getAllDrivers();

    // Listen to the 'list'emitted event so as populate the model with the event payload
    // Refresh driver list
    EmitterService.get(this.listId).subscribe((data: Driver[]) => { this.getAllDrivers(); });
  }

  // Function calling the service driverService to get the list of drivers
  getAllDrivers = (): void => {
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
