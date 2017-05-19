import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Car } from '../car.model';
import { Configuration } from '../../app.configuration';

@Injectable()
export class CarService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        // Getting API URL and specify the root
        this.actionUrl = _configuration.serverWithApiUrl + 'car/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    // Function to get all cars - API CALL: /
    public GetAll = (): Observable<Car[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <Car[]>response.json())
            .catch(this.handleError);
    }

    // Function to get a car by specific id - API CALL: /:id
    public GetSingle = (id: number): Observable<Car> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <Car>response.json())
            .catch(this.handleError);
    }

    // Function to add a car - API CALL: /create
    public Add = (newCar: Car): Observable<Car> => {
        return this._http.post(this.actionUrl + '/create', JSON.stringify(newCar), { headers: this.headers })
            .catch(this.handleError);
    }

    // Function to update a car - API CALL: /
    public Update = (carToUpdate: Car): Observable<Car> => {
        return this._http.put(this.actionUrl, JSON.stringify(carToUpdate), { headers: this.headers })
            .catch(this.handleError);
    }

    // Function to delete a car - API CALL: /:id
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
