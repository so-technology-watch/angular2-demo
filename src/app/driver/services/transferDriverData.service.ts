import { Driver } from './../driver.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TransferDriverDataService {

    private driverData: Driver;

    constructor() { }

    public setDriver(val: Driver): void {
        this.driverData = val;
    }

    public getDriver(): Driver {
        return this.driverData;
    }
}