import { NotificationService } from './services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: String = 'SO-Angular4-ts';

  public navigation = [
    { title: 'Car', routerLink: '' },
    { title: 'Driver', routerLink: 'driver' }
  ];

  public optionsForNotifications = {
    position: ['bottom', 'left'],
    timeOut: 5000,
    lastOnBottom: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    preventDuplicates: true
  };

  constructor(
    private _notificationService: NotificationService) { }

  ngOnInit() {
    this._notificationService.init();
  }
}
