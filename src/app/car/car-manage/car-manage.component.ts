import { TransferCarDataService } from './../services/transferCarData.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { CarService } from '../services/car.service';
import { EmitterService } from '../../services/emitter.service';
import { Router } from '@angular/router';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-manage',
  templateUrl: './car-manage.component.html',
  styleUrls: ['./car-manage.component.css']
})
export class CarManageComponent implements OnInit, OnChanges {

  @Input() carToEdit: Car;
  @Input() listId: string;
  @Input() editing: Boolean;

  // Options for notifications
  public options = {
    position: ['bottom', 'left'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    preventDuplicates: true
  };

  constructor(
    private _notificationsService: NotificationsService,
    private _transferCarData: TransferCarDataService,
    private _carService: CarService,
    private router: Router) { }

  ngOnInit() {

  }

  ngOnChanges(...args: any[]) {
    if (this.carToEdit) {
      this.editing = true;
    } else {
      this.editing = false;
    }
  }

  editCar = (): void => {
    if (this.carToEdit) {
      console.log(JSON.stringify(this.carToEdit));
      this._transferCarData.setCar(this.carToEdit);
      this.router.navigate(['./car-form']);
    }
  }

  deleteCar = (): void => {
    if (this.carToEdit) {
      this._carService.Delete(Number(this.carToEdit.id)).subscribe(
        result => {
          console.log(result);
          EmitterService.get(this.listId).emit(result);
          this.carToEdit = undefined;
          this.editing = false;
        },
        error => console.log(error));
      this._notificationsService.success(
        'Deleted',
        'The car entry with the id=\'' + this.carToEdit.id + '\' was deleted successfuly'
      );
    } else {
      this._notificationsService.error(
        'Car not selected',
        'You have to select a car to delete'
      );
    }
  }
}
