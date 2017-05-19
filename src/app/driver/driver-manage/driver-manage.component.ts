import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { Driver } from '../driver.model';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { EmitterService } from '../../services/emitter.service';
import { TransferDriverDataService } from './../services/transferDriverData.service';

@Component({
  selector: 'app-driver-manage',
  templateUrl: './driver-manage.component.html',
  styleUrls: ['./driver-manage.component.css']
})
export class DriverManageComponent implements OnInit {

  @Input() driverToEdit: Driver;
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
    private _transferDriverData: TransferDriverDataService,
    private _driverService: DriverService,
    private router: Router) { }

  ngOnInit() {

  }

  ngOnChanges(...args: any[]) {
    if (this.driverToEdit) {
      this.editing = true;
    } else {
      this.editing = false;
    }
  }

  editDriver = (): void => {
    if (this.driverToEdit) {
      console.log(JSON.stringify(this.driverToEdit));
      this._transferDriverData.setDriver(this.driverToEdit);
      this.router.navigate(['./driver-form']);
    }
  }

  deleteDriver = (): void => {
    if (this.driverToEdit) {
      this._driverService.Delete(Number(this.driverToEdit.id)).subscribe(
        result => {
          console.log(result);
          EmitterService.get(this.listId).emit(result);
          this.driverToEdit = undefined;
          this.editing = false;
        },
        error => console.log(error));
      this._notificationsService.success(
        'Deleted',
        'The driver entry with the id=\'' + this.driverToEdit.id + '\' was deleted successfuly'
      );
    } else {
      this._notificationsService.error(
        'Driver not selected',
        'You have to select a driver to delete'
      );
    }
  }

}