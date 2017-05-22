import { Injectable } from '@angular/core';
import { Car } from '../car.model';

// Class to transfer data between Car sibling components
@Injectable()
export class TransferCarDataService {
    private carData: Car;

    constructor() { }

    public setCar(val: Car): void {
        this.carData = val;
    }

    public getCar(): Car {
        return this.carData;
    }
}