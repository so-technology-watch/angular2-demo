import { Driver } from './../driver.model';
import { Injectable } from '@angular/core';

// Class to transfer data between Driver sibling components
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