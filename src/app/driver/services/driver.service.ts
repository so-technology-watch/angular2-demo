import { Driver } from './../driver.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GenericService } from './../../services/generic.service';
import { Configuration } from '../../app.configuration';

@Injectable()
export class DriverService extends GenericService<Driver> {

    /**
     * Constructor
     * @param _http Http
     * @param _configuration Configuration
     */
    constructor(_http: Http, _configuration: Configuration) {
        super(_http, _configuration, 'driver/');
    }
}
