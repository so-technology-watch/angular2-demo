import { Router, RouterModule } from '@angular/router';

import { CarComponent } from './car/car.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DriverComponent } from './driver/driver.component';
import { CarFormComponent } from './car/car-form/car-form.component';
import { DriverFormComponent } from './driver/driver-form/driver-form.component';

export const routing = RouterModule.forRoot([
    { path: '', component: CarComponent },
    { path: 'driver', component: DriverComponent },
    { path: 'car-form', component: CarFormComponent },
    { path: 'driver-form', component: DriverFormComponent },
    { path: '**', component: NotFoundComponent }
]);
