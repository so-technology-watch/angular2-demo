import { Configuration } from './../app.configuration';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

export abstract class GenericService<T> {

    protected headers: Headers;
    protected actionUrl: string;

    constructor(private _http: Http, private _configuration: Configuration, private url: string) {
        this.actionUrl = _configuration.serverWithApiUrl + url;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    /**
     * Get all object by the GET Rest service
     * @param id Identifier
     * @param t Object to update
     * @return promise
     */
    public getAll = (): Observable<T[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => response.json() as T[])
            .catch(this.handleError);
    }

    /**
     * Get the object by the GET/:id Rest service
     * @param id Identifier
     * @param t Object to update
     * @return promise
     */
    public getSingle = (id: number): Observable<T> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => response.json() as T)
            .catch(this.handleError);
    }

    /**
     * Add the object by the POST Rest service
     * @param id Identifier
     * @param t Object to update
     * @return promise
     */
    public add = (newT: T): Observable<T> => {
        return this._http.post(this.actionUrl + 'create', JSON.stringify(newT), { headers: this.headers })
            .map((response: Response) => <T>response.json())
            .catch(this.handleError);
    }

    /**
     * Update the object by the UPDATE Rest service
     * @param id Identifier
     * @param t Object to update
     * @return promise
     */
    public update = (id: number, t: T): Observable<T> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(t), { headers: this.headers })
            .catch(this.handleError);
    }

    /**
     * Delete the object by the DELETE Rest service
     * @param id Identifier
     * @return promise
     */
    public delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    // Function to throw errors
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
