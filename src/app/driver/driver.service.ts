import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Driver } from './driver.model';
import { Configuration } from '../app.configuration';

@Injectable()
export class DriverService {
    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        // Getting API URL and specify the root
        this.actionUrl = _configuration.serverWithApiUrl + 'driver/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    // Function to get all drivers - API CALL: /
    public GetAll = (): Observable<Driver[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <Driver[]>response.json())
            .catch(this.handleError);
    }

    // Function to get a driver by specific id - API CALL: /:id
    public GetSingle = (id: number): Observable<Driver> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <Driver>response.json())
            .catch(this.handleError);
    }

    // Function to add a driver - API CALL: /create
    public Add = (newDriver: Driver): Observable<Driver> => {
        return this._http.post(this.actionUrl + '/create', JSON.stringify(newDriver), { headers: this.headers })
            .catch(this.handleError);
    }

    // Function to update a driver - API CALL: /
    public Update = (driverToUpdate: Driver): Observable<Driver> => {
        return this._http.put(this.actionUrl, JSON.stringify(driverToUpdate), { headers: this.headers })
            .catch(this.handleError);
    }

    // Function to delete a driver - API CALL: /:id
    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    // Function to throw errors
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
