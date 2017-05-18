import { Router, RouterModule } from '@angular/router';

import { CarComponent } from './car/car.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DriverComponent } from './driver/driver.component';
// import { AddEditFormComponent } from './add-edit-form/add-edit-form.component';

export const routing = RouterModule.forRoot([
    { path: '', component: CarComponent },
    { path: 'driver', component: DriverComponent },
    // { path: 'add-edit-form', component: AddEditFormComponent },
    { path: '**', component: NotFoundComponent }
]);
