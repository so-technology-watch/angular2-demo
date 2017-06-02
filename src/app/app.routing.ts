import { Router, RouterModule } from '@angular/router';

import { CarComponent } from './entities/car/car.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DriverComponent } from './entities/driver/driver.component';
import { CarFormComponent } from './entities/car/car-form/car-form.component';
import { DriverFormComponent } from './entities/driver/driver-form/driver-form.component';
import { AboutComponent } from './about/about.component';

export const routing = RouterModule.forRoot([
    { path: '', component: CarComponent },
    { path: 'driver', component: DriverComponent },
    { path: 'car-form/:id', component: CarFormComponent },
    { path: 'car-form', component: CarFormComponent },
    { path: 'driver-form/:id', component: DriverFormComponent },
    { path: 'driver-form', component: DriverFormComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: NotFoundComponent }
]);
