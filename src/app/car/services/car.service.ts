import { GenericService } from './../../services/generic.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Car } from '../car.model';
import { Configuration } from '../../app.configuration';

@Injectable()
export class CarService extends GenericService<Car>  {

    /**
     * Constructor
     * @param _http Http
     * @param _configuration Configuration
     */
    constructor(_http: Http, _configuration: Configuration) {
        super(_http, _configuration, 'car/');
    }

}
