import { AppNotification } from './model/app-notification.model';
import { EmitterService } from './services/emitter.service';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Notification Event tracking ID
  private notificationID = 'MAIN_NOTIFICATION';

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

  constructor(private _notificationsService: NotificationsService) { }

  ngOnInit() {
    // Listen to the 'notification' emitted event so as populate the model with the event payload
    EmitterService.get(this.notificationID).subscribe(
      (notif: AppNotification) => {
        this.showNotif(notif);
      });
  }

  // Function to show notification depending on the type
  showNotif = (notif: AppNotification): void => {
    if (notif.type === 'success') {
      this._notificationsService.success(
        notif.title,
        notif.message
      );
    } else if (notif.type === 'error') {
      this._notificationsService.error(
        notif.title,
        notif.message
      );
    } else {
      this._notificationsService.warn(
        'Invalid',
        'Wrong notification type'
      );
    }
  }

}
