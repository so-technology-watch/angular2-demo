import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { EmitterService } from './services/emitter.service';
import { NotificationsService } from 'angular2-notifications';
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

  constructor(
    private _notificationService: NotificationService,
    private _router: Router) { }

  ngOnInit() {
    this._notificationService.init();
  }

}
