import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Routing
import { routing } from './app.routing';

// Directives
import { MDL } from './directives/MDLDirective.directive';

// Components
import { CarComponent } from './car/car.component';
import { CarListComponent } from './car/car-list/car-list.component';
import { CarManageComponent } from './car/car-manage/car-manage.component';
import { DriverComponent } from './driver/driver.component';
import { DriverListComponent } from './driver/driver-list/driver-list.component';
import { DriverManageComponent } from './driver/driver-manage/driver-manage.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MaterialModule } from '@angular/material';

// Services
import { Configuration } from './app.configuration';
import { CarService } from './car/car.service';
import { DriverService } from './driver/driver.service';
import { EmitterService } from './services/emitter.service';
// import { RouterDataLinkService } from './services/routerDataLink.service';

@NgModule({
  declarations: [
    AppComponent,
    MDL,
    CarComponent,
    CarListComponent,
    CarManageComponent,
    DriverComponent,
    DriverListComponent,
    DriverManageComponent,
    NotFoundComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    Configuration,
    CarService,
    DriverService,
    EmitterService,
    // RouterDataLinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
